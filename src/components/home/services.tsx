import { categories, headings } from '@/content/site';

import { Band } from '../layout/band';
import { PixelReveal } from '../motion/pixel-reveal';
import { Icon, iconFor } from '../ui/icon';
import { SERVICE_SCENES } from '../visuals/scenes';
import { SectionHead } from './section-head';

/**
 * aoutive's feature section, three times over: each service gets an isometric scene that arrives
 * through the pixel dissolve, then its promise and its five sub-services. The cards sit in one
 * bordered row with shared hairlines, the way aoutive's grids are drawn.
 */
const TINTS = ['bg-tint-violet', 'bg-tint-sky', 'bg-tint-mint'];
const COVERS = ['#eceefb', '#e5f3fb', '#e6f7ee'];

export function Services() {
  return (
    <Band id="services" labelledBy="services-heading" className="py-24 lg:py-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHead
          id="services"
          eyebrow="Services"
          heading={headings.services}
          intro="Website design and development, hosting, and monthly care. Choose the one you need, or leave all three to us."
        />
      </div>
      <ul className="mt-14 grid overflow-hidden rounded-[var(--radius-panel)] border border-line bg-white md:grid-cols-3">
        {categories.map((category, index) => {
          const Scene = SERVICE_SCENES[category.slug as keyof typeof SERVICE_SCENES];
          return (
            <li
              key={category.slug}
              id={category.slug}
              data-reveal=""
              style={{ ['--i' as string]: index }}
              className="flex flex-col border-line max-md:border-b max-md:last:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className={`relative m-3 overflow-hidden rounded-2xl ${TINTS[index]}`}>
                <PixelReveal
                  cover={COVERS[index]}
                  delay={index * 150}
                  className="grid h-64 place-items-center px-6 py-6 [&_svg]:max-h-52"
                >
                  {Scene ? <Scene /> : null}
                </PixelReveal>
              </div>
              <div className="flex flex-1 flex-col px-7 pt-4 pb-8">
                <p className="font-tech text-xs text-ink-2">0{index + 1}</p>
                <h3 className="mt-2 text-h3 tracking-[var(--tracking-heading)]">{category.name}</h3>
                <p className="mt-1 text-body text-ink-2">{category.line}</p>
                <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                  {category.services.map((service) => (
                    <li
                      key={service.anchor}
                      id={service.anchor}
                      className="group flex scroll-mt-40 items-center gap-3 py-3 text-sm"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-line transition-colors duration-300 group-hover:bg-graphite group-hover:text-white">
                        <Icon name={iconFor(service.anchor)} size={14} />
                      </span>
                      <span className="font-medium text-ink">{service.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </Band>
  );
}
