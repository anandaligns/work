import { PortalScene } from '@/components/visuals/scenes';
import { SHARE_SIZE, shareImage } from '@/lib/share-image';

/**
 * The share image for every page without its own — home, About, Contact and the legal pages: the
 * portal cube with the mark inside it, and the hero's own line.
 */
export const size = SHARE_SIZE;
export const contentType = 'image/png';
export const alt = 'Pixel Kinetix: technology built around your business';

export default async function Image() {
  return shareImage({
    eyebrow: 'Pixel Kinetix',
    title: 'Technology built around your business.',
    line: 'Websites, software and automation, engineered as one system.',
    tint: 'paper',
    scene: <PortalScene />,
  });
}
