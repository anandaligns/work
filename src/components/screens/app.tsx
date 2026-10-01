import type { CSSProperties } from 'react';

import { Icon, type IconName } from '../ui/icon';
import {
  BoardColumns,
  Bubble,
  Mark,
  type Size,
  StatTiles,
  StatusPill,
  TableRows,
  Window,
} from './parts';
import type { FlowNode, Pane, Screen } from './types';

/**
 * The product, whole: an application window with its sidebar and panes side by side — the
 * conversation list, the thread, the record — as Lightfield shows its CRM. On narrower screens
 * the sidebar goes first (under 1536px), then the third pane (under 1280px); a phone shows one
 * pane, the thread where there is one — so what shows is never squeezed.
 */
const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('');

function Conversations({ pane }: { pane: Extract<Pane, { kind: 'conversations' }> }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-black/[0.06] p-2.5">
        <p className="rounded-md bg-black/[0.04] px-2 py-1.5 text-[10.5px] text-ink-3">
          Search {pane.title?.toLowerCase() ?? 'conversations'}
        </p>
        {pane.filters?.length ? (
          <div className="mt-2 flex gap-1">
            {pane.filters.map((filter, i) => (
              <span
                key={filter}
                className={`rounded-full px-2 py-0.5 text-[10px] ${i === 0 ? 'bg-ink text-white' : 'text-ink-2'}`}
              >
                {filter}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <ul className="min-h-0 flex-1 overflow-hidden">
        {pane.items.map((item, i) => (
          <li
            key={item.name + item.time}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className={`flex gap-2 border-b border-black/[0.04] px-2.5 py-2 ${item.active ? 'bg-[color-mix(in_srgb,var(--accent)_8%,white)]' : ''}`}
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-black/[0.06] text-[10px] font-semibold text-ink-2">
              {initials(item.name)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[11.5px] font-semibold text-ink">{item.name}</span>
                <span className="shrink-0 text-[9.5px] text-ink-3">{item.time}</span>
              </span>
              <span className="mt-0.5 flex items-center justify-between gap-2">
                <span className="truncate text-[10.5px] text-ink-2">{item.text}</span>
                {item.unread ? (
                  <span
                    className="grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    {item.unread}
                  </span>
                ) : null}
              </span>
              {item.tag ? (
                <span className="mt-1 block">
                  <StatusPill pill={item.tag} />
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Thread({ pane }: { pane: Extract<Pane, { kind: 'thread' }> }) {
  return (
    <div className="flex h-full flex-col bg-[#f6f7f9]">
      <div className="flex items-center gap-2 border-b border-black/[0.06] bg-white px-3 py-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-black/[0.06] text-[10px] font-semibold text-ink-2">
          {initials(pane.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-semibold text-ink">{pane.name}</span>
          {pane.meta ? (
            <span className="block truncate text-[10px] text-ink-2">{pane.meta}</span>
          ) : null}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
        {pane.messages.map((message, i) => (
          <Bubble key={i} message={message} index={i} />
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-black/[0.06] bg-white px-3 py-2">
        <span className="flex-1 truncate rounded-full bg-black/[0.04] px-3 py-1.5 text-[10.5px] text-ink-3">
          {pane.composer ?? 'Type a message'}
        </span>
        <span
          className="grid size-6 shrink-0 place-items-center rounded-full text-white"
          style={{ background: 'var(--accent)' }}
        >
          <Icon name="arrow" size={12} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}

function Details({ pane }: { pane: Extract<Pane, { kind: 'details' }> }) {
  return (
    <div className="h-full overflow-hidden p-3">
      <p className="text-[12.5px] font-semibold text-ink">{pane.title}</p>
      {pane.subtitle ? <p className="text-[10.5px] text-ink-2">{pane.subtitle}</p> : null}
      {pane.tags?.length ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {pane.tags.map((tag) => (
            <StatusPill key={tag.text} pill={tag} />
          ))}
        </div>
      ) : null}
      {pane.fields?.length ? (
        <dl className="mt-3 flex flex-col gap-1.5 border-t border-black/[0.06] pt-2.5">
          {pane.fields.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 text-[10.5px]">
              <dt className="text-ink-2">{label}</dt>
              <dd className="truncate text-right text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {pane.sections?.map((section) => (
        <div key={section.title} className="mt-3 border-t border-black/[0.06] pt-2.5">
          <p className="text-[9.5px] font-semibold tracking-[0.06em] text-ink-2 uppercase">
            {section.title}
          </p>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {section.items.map((item, i) => (
              <li
                key={item.text}
                data-reveal=""
                style={{ '--i': i } as CSSProperties}
                className="flex items-center gap-2"
              >
                {item.done !== undefined ? (
                  <span
                    className={`grid size-3.5 shrink-0 place-items-center rounded-full ${item.done ? 'bg-signal-green text-white' : 'border border-black/[0.15]'}`}
                  >
                    {item.done ? <Icon name="check" size={9} strokeWidth={3} /> : null}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[10.5px] text-ink">{item.text}</span>
                  {item.meta ? (
                    <span className="block truncate text-[9.5px] text-ink-2">{item.meta}</span>
                  ) : null}
                </span>
                {item.pill ? <StatusPill pill={item.pill} /> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** How wide each pane is, and from which width a pane past the first two shows. */
const PANE_WIDTH: Record<Pane['kind'], string> = {
  conversations: 'w-52 shrink-0',
  thread: 'min-w-[15rem] flex-1',
  details: 'w-48 shrink-0',
  table: 'min-w-[18rem] flex-1',
  board: 'min-w-[18rem] flex-1',
  stats: 'min-w-[16rem] flex-1',
};

function PaneView({ pane }: { pane: Pane }) {
  switch (pane.kind) {
    case 'conversations':
      return <Conversations pane={pane} />;
    case 'thread':
      return <Thread pane={pane} />;
    case 'details':
      return <Details pane={pane} />;
    case 'table':
      return (
        <div className="h-full overflow-hidden">
          {pane.title || pane.filters?.length ? (
            <div className="flex items-center gap-2 border-b border-black/[0.06] px-3 py-2">
              {pane.title ? (
                <span className="text-[12px] font-semibold text-ink">{pane.title}</span>
              ) : null}
              <span className="ml-auto flex gap-1">
                {pane.filters?.map((filter, i) => (
                  <span
                    key={filter}
                    className={`rounded-full px-2 py-0.5 text-[10px] ${i === 0 ? 'bg-ink text-white' : 'border border-black/[0.08] text-ink-2'}`}
                  >
                    {filter}
                  </span>
                ))}
              </span>
            </div>
          ) : null}
          <TableRows columns={pane.columns} rows={pane.rows} />
        </div>
      );
    case 'board':
      return <BoardColumns columns={pane.columns} />;
    case 'stats':
      return <StatTiles tiles={pane.tiles} chart={pane.chart} />;
  }
}

export function AppWindow({
  screen,
  size,
}: {
  screen: Extract<Screen, { kind: 'app' }>;
  size: Size;
}) {
  // A window with a conversation keeps a fixed height, as a messaging app does; a board or a
  // table is as tall as what's in it.
  const chat = screen.panes.some((pane) => pane.kind === 'thread' || pane.kind === 'conversations');
  const height = !chat ? '' : size === 'lg' ? 'h-[22rem] sm:h-[26rem]' : 'h-[20rem] sm:h-[22rem]';
  // On a phone one pane shows: the thread, where there is one, else the first.
  const phone = Math.max(
    0,
    screen.panes.findIndex((pane) => pane.kind === 'thread'),
  );
  return (
    <Window brand={screen.brand} title={screen.title}>
      <div className={`flex overflow-hidden ${height}`}>
        {screen.nav?.length ? (
          <nav className="hidden w-32 shrink-0 flex-col gap-0.5 border-r border-black/[0.06] bg-[#fafafb] p-2 2xl:flex">
            <span className="mb-2 px-1.5 pt-1">
              <Mark brand={screen.brand} small />
            </span>
            {screen.nav.map((item) => (
              <span
                key={item.label}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[11px] ${item.active ? 'bg-white font-semibold text-ink shadow-[0_1px_2px_rgb(11_13_18/0.08)]' : 'text-ink-2'}`}
              >
                <span className="truncate">{item.label}</span>
                {item.count ? (
                  <span className="text-[9.5px] text-ink-3 tabular-nums">{item.count}</span>
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}
        {screen.panes.map((pane, i) => (
          <div
            key={i}
            className={`min-h-0 ${PANE_WIDTH[pane.kind]} ${i > 0 ? 'sm:border-l sm:border-black/[0.06]' : ''} ${
              i === phone ? 'max-sm:flex-1' : 'max-sm:hidden'
            } ${i >= 2 ? 'sm:hidden xl:block' : ''}`}
          >
            <PaneView pane={pane} />
          </div>
        ))}
      </div>
    </Window>
  );
}

// --- the flow builder -----------------------------------------------------------------------------

const NODE_ICON: Record<FlowNode['kind'], IconName> = {
  trigger: 'spark',
  send: 'chat',
  wait: 'clock',
  check: 'filter',
  alert: 'bell',
  stop: 'check',
};

const NODE_LABEL: Record<FlowNode['kind'], string> = {
  trigger: 'When',
  send: 'Send',
  wait: 'Wait',
  check: 'If',
  alert: 'Alert',
  stop: 'Stop',
};

/** An automation as its builder draws it: one step under the next, joined by a hairline. */
export function Flow({ screen }: { screen: Extract<Screen, { kind: 'flow' }> }) {
  return (
    <Window brand={screen.brand} title={screen.title}>
      <div className="relative bg-[#fafafb] px-4 py-4">
        {screen.status ? (
          <span className="absolute top-3 right-3">
            <StatusPill pill={screen.status} />
          </span>
        ) : null}
        <ol className="mx-auto flex max-w-[20rem] flex-col items-stretch">
          {screen.nodes.map((node, i) => (
            <li
              key={i}
              data-reveal=""
              style={{ '--i': i } as CSSProperties}
              className="flex flex-col items-center"
            >
              {i > 0 ? <span className="h-3 w-px bg-black/[0.15]" /> : null}
              <div
                className={`flex w-full items-start gap-2.5 rounded-lg border bg-white px-2.5 py-2 ${node.kind === 'trigger' ? 'border-[var(--accent)]' : 'border-black/[0.08]'}`}
              >
                <span
                  className="grid size-6 shrink-0 place-items-center rounded-md text-[var(--accent)]"
                  style={{ background: 'color-mix(in srgb, var(--accent) 12%, white)' }}
                >
                  <Icon name={NODE_ICON[node.kind]} size={13} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
                    {NODE_LABEL[node.kind]}
                  </span>
                  <span className="block text-[11.5px] font-semibold text-ink">{node.title}</span>
                  {node.text ? (
                    <span className="block text-[10.5px] leading-[1.4] text-ink-2">
                      {node.text}
                    </span>
                  ) : null}
                </span>
              </div>
              {node.branches ? (
                <span className="mt-1.5 flex w-full justify-between gap-2 text-[9.5px]">
                  <span className="rounded-full bg-[#e6f7ee] px-2 py-0.5 text-[#136b3d]">
                    {node.branches[0]}
                  </span>
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-ink-2">
                    {node.branches[1]}
                  </span>
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Window>
  );
}
