import { Fragment, isValidElement, type ReactNode } from 'react';

/**
 * A drawing as SVG markup, for the share images: the scenes are plain function components — no
 * state, no effects — so walking the tree and writing out what it returns is all rendering them
 * takes. Attributes go from React's camelCase to SVG's own names; the root gets its namespace.
 */
const KEEP = new Set(['viewBox', 'pathLength', 'preserveAspectRatio']);
const SKIP = new Set(['children', 'key', 'ref', 'dangerouslySetInnerHTML']);

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const attribute = (name: string) =>
  name === 'className'
    ? 'class'
    : KEEP.has(name)
      ? name
      : name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

const styleOf = (style: Record<string, string | number>) =>
  Object.entries(style)
    .map(([key, value]) => `${attribute(key)}:${value}`)
    .join(';');

export function svgMarkup(node: ReactNode, root = true): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return escape(String(node));
  if (Array.isArray(node)) return node.map((child) => svgMarkup(child, root)).join('');
  if (!isValidElement(node)) return '';
  const { type } = node;
  const props = node.props as Record<string, unknown> & { children?: ReactNode };
  if (type === Fragment) return svgMarkup(props.children, root);
  if (typeof type === 'function') {
    return svgMarkup((type as (p: unknown) => ReactNode)(props), root);
  }
  if (typeof type !== 'string') return '';
  const attrs = Object.entries(props)
    .filter(
      ([name, value]) =>
        !SKIP.has(name) && value !== undefined && value !== null && value !== false,
    )
    .filter(([, value]) => typeof value !== 'function')
    .map(([name, value]) =>
      name === 'style' && typeof value === 'object'
        ? `style="${escape(styleOf(value as Record<string, string | number>))}"`
        : `${attribute(name)}="${escape(String(value))}"`,
    );
  if (type === 'svg' && root && !('xmlns' in props))
    attrs.unshift('xmlns="http://www.w3.org/2000/svg"');
  return `<${type}${attrs.length ? ` ${attrs.join(' ')}` : ''}>${svgMarkup(props.children, type === 'svg' ? false : root)}</${type}>`;
}
