import type { ReactNode } from 'react';

import { ToolMark } from '../ui/brand-logos';
import { Icon, type IconName } from '../ui/icon';
import { Avatar, HUE } from './desk-blocks';
import { ProductArt } from './product-art';
import type { Hue, PhoneBlock, PhoneScreen as Screen, Pill } from './types';

/**
 * A phone screen made of blocks, drawn at the phone's own scale (9 to 12px type, 14px corners),
 * so it reads as a real app: its header — an app's own, Google's, a mail app's or the camera —
 * then the blocks in order, and a button held at the foot. The colour is the business's own
 * (`--accent`); everything else is ink and greys.
 */

const tint = (hue: Hue = 'accent', pct = 12) => `color-mix(in srgb, ${HUE[hue]} ${pct}%, white)`;

const PILL: Record<NonNullable<Pill['tone']>, string> = {
  green: 'bg-[#e6f7ee] text-[#136b3d]',
  amber: 'bg-[#fff3d6] text-[#7a5200]',
  grey: 'bg-[#f1f2f5] text-[#5b6070]',
  accent: 'bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-[var(--accent)]',
  red: 'bg-[#fdecee] text-[#b42318]',
};

function Tag({ pill }: { pill: Pill }) {
  return (
    <span
      className={`shrink-0 rounded-full px-1.5 py-px text-[8px] font-semibold whitespace-nowrap ${PILL[pill.tone ?? 'grey']}`}
    >
      {pill.text}
    </span>
  );
}

function Label({ children, action }: { children: ReactNode; action?: string }) {
  return (
    <p className="mb-1.5 flex items-baseline justify-between text-[10px] font-semibold text-ink">
      {children}
      {action ? (
        <span className="text-[8.5px] font-medium" style={{ color: 'var(--accent)' }}>
          {action}
        </span>
      ) : null}
    </p>
  );
}

function Block({ block }: { block: PhoneBlock }) {
  switch (block.t) {
    case 'hero':
      return (
        <div
          className="rounded-[14px] p-3 text-white"
          style={{
            background: block.dark
              ? 'linear-gradient(140deg, #1c1f27, #0b0d12)'
              : 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 80%, black), var(--accent))',
          }}
        >
          {block.eyebrow ? (
            <p className="text-[7.5px] font-semibold tracking-[0.08em] uppercase opacity-75">
              {block.eyebrow}
            </p>
          ) : null}
          <p className="mt-1 text-[21px] leading-none font-bold tracking-[-0.02em] tabular-nums">
            {block.value}
          </p>
          {block.label ? <p className="mt-1 text-[9px] opacity-85">{block.label}</p> : null}
          {block.line ? (
            <p className="mt-2 border-t border-white/20 pt-1.5 text-[8.5px] opacity-80">
              {block.line}
            </p>
          ) : null}
        </div>
      );
    case 'stats':
      return (
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${Math.min(block.items.length, 3)}, minmax(0,1fr))`,
          }}
        >
          {block.items.map((item) => (
            <div key={item.label} className="rounded-[10px] bg-white p-2 ring-1 ring-black/[0.05]">
              <p className="truncate text-[8px] text-ink-3">{item.label}</p>
              <p className="mt-0.5 text-[13px] font-bold tabular-nums">{item.value}</p>
              {item.delta ? (
                <p
                  className={`text-[7.5px] font-semibold ${item.down ? 'text-[#b42318]' : 'text-[#16794a]'}`}
                >
                  {item.down ? '↓' : '↑'} {item.delta}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      );
    case 'chart': {
      const max = Math.max(...block.points);
      const x = (i: number) => (i / (block.points.length - 1)) * 100;
      const y = (v: number) => 92 - (v / max) * 84;
      const d = block.points.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v)}`).join(' ');
      return (
        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          <p className="flex justify-between text-[9.5px] font-semibold">
            {block.title}
            {block.meta ? <span className="font-normal text-ink-3">{block.meta}</span> : null}
          </p>
          {block.bars ? (
            <div className="mt-2 flex h-[64px] items-end gap-[3px]">
              {block.points.map((v, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[2px]"
                  style={{
                    height: `${(v / max) * 100}%`,
                    background:
                      i === block.points.length - 1 ? 'var(--accent)' : tint('accent', 38),
                  }}
                />
              ))}
            </div>
          ) : (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-2 h-[64px] w-full">
              <path d={`${d} L100 100 L0 100Z`} fill="var(--accent)" fillOpacity="0.12" />
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}
          {block.labels ? (
            <p className="mt-1 flex justify-between text-[7px] text-ink-3">
              {block.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </p>
          ) : null}
        </div>
      );
    }
    case 'list':
      return (
        <div>
          {block.title ? <Label action={block.action}>{block.title}</Label> : null}
          <div className="overflow-hidden rounded-[12px] bg-white ring-1 ring-black/[0.05]">
            {block.items.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-2 border-b border-black/[0.05] px-2.5 py-2 last:border-b-0"
              >
                {item.art ? (
                  <span className="block size-7 shrink-0 overflow-hidden rounded-[6px]">
                    <ProductArt kind={item.art} className="size-full" />
                  </span>
                ) : item.logo ? (
                  <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-white ring-1 ring-black/[0.07]">
                    <ToolMark tool={item.logo} size={13} />
                  </span>
                ) : item.icon ? (
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-[7px]"
                    style={{ background: tint(item.hue, 13), color: HUE[item.hue ?? 'accent'] }}
                  >
                    <Icon name={item.icon} size={12} strokeWidth={2} />
                  </span>
                ) : item.avatar ? (
                  <Avatar name={item.title} size={24} />
                ) : item.done !== undefined ? (
                  <span
                    className={`grid size-3.5 shrink-0 place-items-center rounded-[4px] ${item.done ? 'text-white' : 'border border-[#cfd2d8]'}`}
                    style={item.done ? { background: 'var(--accent)' } : undefined}
                  >
                    {item.done ? <Icon name="check" size={9} strokeWidth={3} /> : null}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[10px] font-semibold ${item.done ? 'text-ink-3 line-through' : 'text-ink'}`}
                  >
                    {item.title}
                  </span>
                  {item.meta ? (
                    <span className="block truncate text-[8.5px] text-ink-3">{item.meta}</span>
                  ) : null}
                </span>
                {item.value ? (
                  <span className="shrink-0 text-[10px] font-bold tabular-nums">{item.value}</span>
                ) : null}
                {item.pill ? <Tag pill={item.pill} /> : null}
              </div>
            ))}
          </div>
        </div>
      );
    case 'steps':
      return (
        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          {block.title ? <Label>{block.title}</Label> : null}
          <ol>
            {block.items.map((item, i) => (
              <li key={item.title} className="relative flex gap-2 pb-2.5 last:pb-0">
                {i < block.items.length - 1 ? (
                  <span
                    className="absolute top-3.5 bottom-0 left-[5.5px] w-px"
                    style={{ background: item.state === 'done' ? 'var(--accent)' : '#e2e4e8' }}
                  />
                ) : null}
                <span
                  className="relative mt-0.5 grid size-3 shrink-0 place-items-center rounded-full"
                  style={{
                    background: item.state === 'next' ? '#e2e4e8' : 'var(--accent)',
                    boxShadow:
                      item.state === 'now'
                        ? '0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent)'
                        : undefined,
                  }}
                >
                  {item.state === 'done' ? (
                    <Icon name="check" size={8} strokeWidth={3.2} className="text-white" />
                  ) : null}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-[10px] font-semibold ${item.state === 'next' ? 'text-ink-3' : 'text-ink'}`}
                  >
                    {item.title}
                  </span>
                  {item.meta ? (
                    <span className="block text-[8.5px] text-ink-3">{item.meta}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'chips':
      return (
        <div>
          {block.label ? <Label>{block.label}</Label> : null}
          <div className="flex flex-wrap gap-1">
            {block.items.map((chip, i) => (
              <span
                key={chip}
                className={`rounded-full px-2 py-1 text-[8.5px] font-semibold ${i === block.active ? 'text-white' : 'bg-white text-ink-2 ring-1 ring-black/[0.08]'}`}
                style={i === block.active ? { background: 'var(--accent)' } : undefined}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      );
    case 'dates':
      return (
        <div>
          {block.label ? <Label>{block.label}</Label> : null}
          <div className="flex gap-1">
            {block.items.map(([day, date], i) => (
              <span
                key={day + date}
                className={`flex flex-1 flex-col items-center rounded-[10px] py-1.5 ${i === block.active ? 'text-white' : 'bg-white ring-1 ring-black/[0.06]'}`}
                style={i === block.active ? { background: 'var(--accent)' } : undefined}
              >
                <span
                  className={`text-[7.5px] ${i === block.active ? 'opacity-80' : 'text-ink-3'}`}
                >
                  {day}
                </span>
                <span className="text-[12px] font-bold">{date}</span>
              </span>
            ))}
          </div>
        </div>
      );
    case 'slots':
      return (
        <div>
          {block.label ? <Label>{block.label}</Label> : null}
          <div className="grid grid-cols-3 gap-1">
            {block.items.map((slot, i) => {
              const taken = block.taken?.includes(i);
              return (
                <span
                  key={slot}
                  className={`rounded-[8px] py-1.5 text-center text-[9px] font-semibold ${i === block.active ? 'text-white' : taken ? 'bg-[#f2f3f5] text-ink-3 line-through' : 'bg-white text-ink ring-1 ring-black/[0.08]'}`}
                  style={i === block.active ? { background: 'var(--accent)' } : undefined}
                >
                  {slot}
                </span>
              );
            })}
          </div>
        </div>
      );
    case 'fields':
      return (
        <div className="flex flex-col gap-1.5">
          {block.items.map((field) => (
            <label key={field.label} className="block">
              <span className="text-[8px] font-medium text-ink-3">{field.label}</span>
              <span
                className={`mt-0.5 flex h-[26px] items-center rounded-[8px] bg-white px-2 text-[9.5px] ${field.focus ? 'ring-[1.5px] ring-[var(--accent)]' : 'ring-1 ring-black/[0.09]'}`}
              >
                {field.value}
                {field.focus ? (
                  <span className="ml-px h-3 w-px animate-pulse bg-[var(--accent)]" />
                ) : null}
              </span>
            </label>
          ))}
        </div>
      );
    case 'product':
      return (
        <div>
          <div className="relative overflow-hidden rounded-[14px]">
            <ProductArt kind={block.art} className="block h-[150px] w-full" />
            <span className="absolute top-2 right-2 grid size-6 place-items-center rounded-full bg-white/90 text-ink shadow-sm">
              <Icon name="spark" size={11} />
            </span>
            <span className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full ${i === 0 ? 'w-3 bg-ink' : 'w-1 bg-ink/25'}`}
                />
              ))}
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-tight font-bold text-ink">{block.name}</p>
          {block.line ? <p className="mt-0.5 text-[8.5px] text-ink-3">{block.line}</p> : null}
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[13px] font-bold tabular-nums">{block.price}</span>
            {block.was ? (
              <span className="text-[9px] text-ink-3 line-through">{block.was}</span>
            ) : null}
          </p>
          {block.sizes ? (
            <div className="mt-2 flex gap-1">
              {block.sizes.map((size, i) => (
                <span
                  key={size}
                  className={`grid h-6 min-w-6 place-items-center rounded-[7px] px-1.5 text-[8.5px] font-semibold ${i === block.size ? 'bg-ink text-white' : 'bg-white ring-1 ring-black/[0.1]'}`}
                >
                  {size}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      );
    case 'pay':
      return (
        <div className="rounded-[14px] bg-white p-3 ring-1 ring-black/[0.05]">
          <p className="text-center text-[8.5px] text-ink-3">Paying {block.to}</p>
          <p className="mt-0.5 text-center text-[22px] font-bold tracking-[-0.02em] tabular-nums">
            {block.amount}
          </p>
          <div className="mt-2.5 flex flex-col gap-1">
            {block.methods.map((method, i) => (
              <span
                key={method}
                className={`flex items-center gap-2 rounded-[9px] px-2 py-1.5 text-[9.5px] font-medium ${i === block.active ? 'ring-[1.5px] ring-[var(--accent)]' : 'ring-1 ring-black/[0.07]'}`}
              >
                <span
                  className={`grid size-3 place-items-center rounded-full ${i === block.active ? '' : 'ring-1 ring-black/20'}`}
                  style={i === block.active ? { background: 'var(--accent)' } : undefined}
                >
                  {i === block.active ? <span className="size-1 rounded-full bg-white" /> : null}
                </span>
                {method}
              </span>
            ))}
          </div>
          <p className="mt-2 flex items-center justify-center gap-1 text-[7.5px] text-ink-3">
            <Icon name="lock" size={9} /> Secured payment · UPI, cards, net banking
          </p>
        </div>
      );
    case 'note': {
      const hue: Hue =
        block.tone === 'green' ? 'green' : block.tone === 'amber' ? 'amber' : 'accent';
      return (
        <div
          className="flex gap-2 rounded-[10px] p-2 text-[8.5px] leading-[1.4]"
          style={{ background: tint(hue, 9), color: '#2b2f38' }}
        >
          <span style={{ color: HUE[hue] }}>
            <Icon name={block.icon ?? 'bell'} size={12} strokeWidth={2} />
          </span>
          <span>{block.text}</span>
        </div>
      );
    }
    case 'chat':
      return (
        <div className="flex flex-col gap-1.5">
          {block.messages.map((m, i) =>
            m.from === 'user' ? (
              <p
                key={i}
                className="max-w-[82%] self-end rounded-[12px] rounded-br-[3px] px-2 py-1.5 text-[9.5px] leading-[1.4] text-white"
                style={{ background: 'var(--accent)' }}
              >
                {m.text}
              </p>
            ) : (
              <div
                key={i}
                className={`flex max-w-[90%] gap-1.5 ${i === block.messages.length - 1 ? 'wa-arrive' : ''}`}
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Icon name="spark" size={10} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block rounded-[12px] rounded-tl-[3px] bg-white px-2 py-1.5 text-[9.5px] leading-[1.4] ring-1 ring-black/[0.06]">
                    {m.text}
                  </span>
                  {m.sources?.length ? (
                    <span className="mt-1 flex flex-wrap gap-1">
                      {m.sources.map((source) => (
                        <span
                          key={source}
                          className="inline-flex items-center gap-0.5 rounded-full bg-white px-1.5 py-px text-[7.5px] text-ink-2 ring-1 ring-black/[0.08]"
                        >
                          <Icon name="file" size={8} /> {source}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </span>
              </div>
            ),
          )}
        </div>
      );
    case 'map':
      return (
        <div className="overflow-hidden rounded-[12px] bg-white ring-1 ring-black/[0.05]">
          <svg
            viewBox="0 0 240 110"
            className="block h-[104px] w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="240" height="110" fill="#eef1ea" />
            <path d="M150 0h90v50h-70Z" fill="#d6ebcf" />
            <path
              d="M0 78c50-8 110 6 160-2s60-10 80-12"
              stroke="#fff"
              strokeWidth="9"
              fill="none"
            />
            <path
              d="M92 0c-6 36 10 72 2 110M180 44l-30 66"
              stroke="#fff"
              strokeWidth="6"
              fill="none"
            />
            <path d="M0 30h80M130 18l52 26" stroke="#fff" strokeWidth="4" fill="none" />
            <path
              d="M30 80C60 76 80 70 94 60s30-30 58-28 36 12 44 14"
              stroke="var(--accent)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="30" cy="80" r="5" fill="#fff" stroke="var(--accent)" strokeWidth="3" />
            <path
              d="M196 30c-7 0-12 5-12 11 0 9 12 20 12 20s12-11 12-20c0-6-5-11-12-11Z"
              fill="#e5484d"
            />
            <circle cx="196" cy="41" r="4" fill="#fff" />
          </svg>
          <p className="flex items-center justify-between px-2.5 py-1.5 text-[9.5px] font-semibold">
            {block.line}
            {block.meta ? <span className="font-normal text-ink-3">{block.meta}</span> : null}
          </p>
        </div>
      );
    case 'doc':
      return (
        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          <p className="flex items-center justify-between text-[10px] font-bold">
            {block.title}
            <span className="grid size-5 place-items-center rounded-[6px] bg-[#fdecee] text-[#c0362c]">
              <Icon name="file" size={11} />
            </span>
          </p>
          {block.meta ? <p className="text-[8px] text-ink-3">{block.meta}</p> : null}
          <div className="mt-2 flex flex-col gap-1 border-t border-dashed border-black/10 pt-2">
            {block.lines.map(([label, value]) => (
              <p key={label} className="flex justify-between text-[9px]">
                <span className="text-ink-2">{label}</span>
                <span className="tabular-nums">{value}</span>
              </p>
            ))}
          </div>
          {block.total ? (
            <p className="mt-1.5 flex justify-between border-t border-black/10 pt-1.5 text-[10px] font-bold">
              <span>{block.total[0]}</span>
              <span className="tabular-nums">{block.total[1]}</span>
            </p>
          ) : null}
        </div>
      );
    case 'check':
      return (
        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          {block.title ? <Label>{block.title}</Label> : null}
          <ul className="flex flex-col gap-1.5">
            {block.items.map((item) => (
              <li key={item.text} className="flex items-center gap-2 text-[9.5px]">
                <span
                  className={`grid size-3.5 shrink-0 place-items-center rounded-[4px] ${item.done ? 'text-white' : 'ring-1 ring-black/20'}`}
                  style={item.done ? { background: 'var(--accent)' } : undefined}
                >
                  {item.done ? <Icon name="check" size={9} strokeWidth={3} /> : null}
                </span>
                <span className={item.done ? 'text-ink-3 line-through' : 'text-ink'}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
          {block.photos ? (
            <div className="mt-2 flex gap-1">
              {Array.from({ length: block.photos }, (_, i) => (
                <span
                  key={i}
                  className="block h-10 flex-1 rounded-[6px]"
                  style={{
                    background: [
                      'linear-gradient(135deg,#c9d3dc,#8a9aa8)',
                      'linear-gradient(135deg,#d8cfc2,#9c8b77)',
                      'linear-gradient(135deg,#cfd8cc,#7f9579)',
                    ][i % 3],
                  }}
                />
              ))}
              <span className="grid h-10 flex-1 place-items-center rounded-[6px] text-ink-3 ring-1 ring-black/15 ring-dashed">
                <Icon name="plus" size={12} />
              </span>
            </div>
          ) : null}
        </div>
      );
    case 'results':
      return (
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden rounded-[12px] bg-white ring-1 ring-black/[0.06]">
            <svg
              viewBox="0 0 240 70"
              className="block h-[64px] w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect width="240" height="70" fill="#e8eef3" />
              <path d="M0 44c60-6 120 8 240-4" stroke="#fff" strokeWidth="6" fill="none" />
              <path
                d="M80 0c-4 24 6 46 0 70M170 0l-20 70"
                stroke="#fff"
                strokeWidth="4"
                fill="none"
              />
              {[
                [60, 30],
                [120, 22],
                [180, 40],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <path
                    d={`M${cx} ${cy! - 12}c-5 0-8 3-8 7 0 6 8 13 8 13s8-7 8-13c0-4-3-7-8-7Z`}
                    fill={i === 0 ? '#ea4335' : '#e57373'}
                  />
                  <circle cx={cx} cy={cy! - 5} r="2.5" fill="#fff" />
                </g>
              ))}
            </svg>
            {block.local.map((place) => (
              <div
                key={place.name}
                className={`border-t border-black/[0.06] px-2.5 py-2 ${place.mine ? '' : ''}`}
              >
                <p className="text-[10.5px] font-semibold text-[#1a0dab]">{place.name}</p>
                <p className="flex items-center gap-1 text-[8.5px] text-[#4d5156]">
                  <span className="font-semibold">{place.rating}</span>
                  <span className="text-[#fbbc04]">★★★★★</span>
                  <span className="truncate">{place.meta}</span>
                </p>
                {place.mine ? (
                  <p className="mt-1.5 flex gap-1">
                    {['Website', 'Directions', 'Call'].map((action) => (
                      <span
                        key={action}
                        className="rounded-full px-2 py-0.5 text-[8px] font-semibold text-[#1a73e8] ring-1 ring-[#dadce0]"
                      >
                        {action}
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          {block.links.map((link) => (
            <div
              key={link.title}
              className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.06]"
            >
              <p className="flex items-center gap-1.5 text-[8.5px] text-[#4d5156]">
                <span
                  className="grid size-4 place-items-center rounded-full text-[7px] font-bold text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  Y
                </span>
                {link.site}
              </p>
              <p className="mt-1 text-[11px] leading-tight text-[#1a0dab]">{link.title}</p>
              <p className="mt-0.5 text-[8.5px] leading-[1.4] text-[#4d5156]">{link.text}</p>
            </div>
          ))}
        </div>
      );
    case 'mail':
      return (
        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          <p className="text-[11.5px] leading-tight font-semibold">{block.subject}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="grid size-6 place-items-center rounded-full text-[9px] font-bold text-white"
              style={{ background: 'var(--accent)' }}
            >
              {block.from.charAt(0)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[9.5px] font-semibold">{block.from}</span>
              <span className="block text-[8px] text-ink-3">to me · {block.time}</span>
            </span>
          </div>
          <div className="mt-2 flex flex-col gap-1 text-[9px] leading-[1.45] text-ink-2">
            {block.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {block.fields ? (
            <div className="mt-2 overflow-hidden rounded-[8px] ring-1 ring-black/[0.07]">
              {block.fields.map(([label, value]) => (
                <p
                  key={label}
                  className="flex justify-between gap-2 border-b border-black/[0.05] px-2 py-1 text-[8.5px] last:border-b-0"
                >
                  <span className="text-ink-3">{label}</span>
                  <span className="truncate font-medium">{value}</span>
                </p>
              ))}
            </div>
          ) : null}
        </div>
      );
    case 'flow':
      return (
        <ol className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          {block.items.map((item, i) => (
            <li key={item.title} className="relative flex gap-2 pb-3 last:pb-0">
              {i < block.items.length - 1 ? (
                <span className="absolute top-7 bottom-0 left-[13px] w-px bg-[#e2e4e8]" />
              ) : null}
              <span className="relative grid size-[27px] shrink-0 place-items-center rounded-[8px] bg-white ring-1 ring-black/[0.08]">
                <ToolMark tool={item.tool} size={14} />
              </span>
              <span className="min-w-0 flex-1 pt-0.5">
                <span className="block text-[9.5px] font-semibold">{item.title}</span>
                <span className="block text-[8px] text-ink-3">{item.meta}</span>
              </span>
              <span
                className={`mt-1 grid size-3.5 shrink-0 place-items-center rounded-full ${item.done ? 'bg-[#16a34a] text-white' : 'ring-1 ring-black/15'}`}
              >
                {item.done ? <Icon name="check" size={8} strokeWidth={3.2} /> : null}
              </span>
            </li>
          ))}
        </ol>
      );
    case 'sign':
      return (
        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-black/[0.05]">
          <p className="text-[8.5px] text-ink-3">Customer signature</p>
          <svg viewBox="0 0 200 50" className="mt-1 h-[46px] w-full">
            <path
              d="M10 36c10-20 18-26 22-12s-6 18 2 8 16-24 20-10-2 16 8 6 12-14 18-4 4 10 14 2 10-10 18-6 6 4 20-2 18-6 30-4"
              fill="none"
              stroke="#1f2a44"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <p className="border-t border-dashed border-black/15 pt-1 text-[8.5px] font-medium">
            {block.name}
          </p>
        </div>
      );
    case 'buttons':
      return (
        <div className="flex gap-1.5">
          {block.items.map((item, i) => (
            <span
              key={item}
              className={`flex h-7 flex-1 items-center justify-center rounded-[9px] text-[9.5px] font-semibold ${i === 0 ? 'text-white' : 'bg-white text-ink ring-1 ring-black/[0.1]'}`}
              style={i === 0 ? { background: 'var(--accent)' } : undefined}
            >
              {item}
            </span>
          ))}
        </div>
      );
    case 'share':
      return (
        <div className="-mx-3 mt-auto rounded-t-[16px] bg-[#f2f2f7] px-3 pt-2 pb-3 shadow-[0_-8px_24px_rgb(0_0_0/0.12)]">
          <span className="mx-auto block h-1 w-8 rounded-full bg-black/15" />
          <p className="mt-2 flex items-center gap-2">
            <span
              className="grid size-7 place-items-center rounded-[8px] text-[11px] font-bold text-white"
              style={{ background: 'var(--accent)' }}
            >
              {block.app.charAt(0)}
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-semibold">{block.app}</span>
              <span className="block truncate text-[8px] text-ink-3">{block.url}</span>
            </span>
          </p>
          <div className="mt-2 overflow-hidden rounded-[10px] bg-white">
            {[
              ['Copy', 'link'],
              ['Add to Home Screen', 'plus'],
              ['Add Bookmark', 'book'],
            ].map(([label, icon], i) => (
              <p
                key={label}
                className={`flex items-center justify-between border-b border-black/[0.06] px-2.5 py-1.5 text-[9.5px] last:border-b-0 ${i === 1 ? 'font-semibold' : ''}`}
                style={
                  i === 1
                    ? { background: 'color-mix(in srgb, var(--accent) 8%, white)' }
                    : undefined
                }
              >
                {label}
                <Icon name={icon as IconName} size={12} />
              </p>
            ))}
          </div>
        </div>
      );
  }
}

function Header({ screen }: { screen: Screen }) {
  const chrome = screen.chrome ?? 'app';
  if (chrome === 'google')
    return (
      <div className="shrink-0 bg-white px-3 pb-1.5">
        <p className="text-center text-[15px] font-medium tracking-[-0.02em]">
          <span className="text-[#4285f4]">G</span>
          <span className="text-[#ea4335]">o</span>
          <span className="text-[#fbbc05]">o</span>
          <span className="text-[#4285f4]">g</span>
          <span className="text-[#34a853]">l</span>
          <span className="text-[#ea4335]">e</span>
        </p>
        <span className="mt-1.5 flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[9.5px] shadow-[0_1px_4px_rgb(0_0_0/0.18)]">
          <Icon name="search" size={11} className="text-[#9aa0a6]" />
          <span className="truncate">{screen.title}</span>
        </span>
        <p className="mt-1.5 flex gap-3 border-b border-black/[0.08] text-[8.5px] text-[#5f6368]">
          {['All', 'Maps', 'Images', 'Reviews'].map((tab, i) => (
            <span
              key={tab}
              className={`pb-1 ${i === 0 ? 'border-b-2 border-[#1a73e8] font-semibold text-[#1a73e8]' : ''}`}
            >
              {tab}
            </span>
          ))}
        </p>
      </div>
    );
  if (chrome === 'mail')
    return (
      <div className="flex shrink-0 items-center gap-2 bg-white px-3 pb-2">
        <Icon name="arrow" size={13} className="rotate-180 text-ink-2" />
        <span className="ml-auto flex gap-3 text-ink-2">
          <Icon name="download" size={12} />
          <Icon name="mail" size={12} />
        </span>
      </div>
    );
  if (chrome === 'camera') return null;
  return (
    <div
      className={`flex shrink-0 items-center gap-2 px-3 pb-2 ${screen.grey ? 'bg-[#f4f5f7]' : 'bg-white'}`}
    >
      {screen.back ? (
        <span className="grid size-6 place-items-center rounded-full bg-white text-ink ring-1 ring-black/[0.06]">
          <Icon name="chevron" size={12} className="rotate-180" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] leading-tight font-bold tracking-[-0.01em] text-ink">
          {screen.title}
        </span>
        {screen.sub ? (
          <span className="block truncate text-[8.5px] text-ink-3">{screen.sub}</span>
        ) : null}
      </span>
      {screen.action ? (
        <span className="grid size-6 place-items-center rounded-full bg-white text-ink ring-1 ring-black/[0.06]">
          <Icon name={screen.action} size={12} />
        </span>
      ) : null}
    </div>
  );
}

/** The camera, framing a paper document, its corners found. */
function Camera({ screen }: { screen: Screen }) {
  return (
    <div className="relative flex h-full flex-col bg-[#0c0d10] text-white">
      <div className="flex items-center justify-between px-3 pt-1 text-[9px]">
        <Icon name="close" size={13} />
        <span className="rounded-full bg-black/40 px-2 py-0.5 font-semibold">{screen.title}</span>
        <Icon name="bulb" size={13} />
      </div>
      <div className="relative mx-3 mt-3 flex-1 overflow-hidden rounded-[12px] bg-[radial-gradient(90%_70%_at_50%_40%,#4a4136,#1e1b17)]">
        <div className="absolute inset-x-[14%] top-[10%] bottom-[14%] rotate-[-3deg] rounded-[2px] bg-[#f7f5f0] p-3 shadow-2xl">
          <p className="text-[8px] font-bold text-[#1f2a44]">TAX INVOICE</p>
          <p className="mt-0.5 text-[6.5px] text-[#6b7080]">Shree Balaji Traders · Peenya</p>
          <div className="mt-2 flex flex-col gap-1">
            {[80, 64, 72, 58, 70].map((w, i) => (
              <span key={i} className="flex justify-between">
                <span
                  className="h-[3px] rounded-full bg-[#c9ccd3]"
                  style={{ width: `${w - 20}%` }}
                />
                <span className="h-[3px] w-[16%] rounded-full bg-[#c9ccd3]" />
              </span>
            ))}
          </div>
          <p className="mt-2 flex justify-between border-t border-[#1f2a44]/40 pt-1 text-[7px] font-bold text-[#1f2a44]">
            <span>Total</span>
            <span>₹48,380</span>
          </p>
        </div>
        {[
          'top-[8%] left-[12%] border-t-[3px] border-l-[3px]',
          'top-[6%] right-[12%] border-t-[3px] border-r-[3px]',
          'bottom-[12%] left-[14%] border-b-[3px] border-l-[3px]',
          'bottom-[14%] right-[14%] border-b-[3px] border-r-[3px]',
        ].map((corner) => (
          <span
            key={corner}
            className={`absolute size-5 rounded-[3px] ${corner}`}
            style={{ borderColor: 'var(--accent)' }}
          />
        ))}
        <span
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-1 text-[8.5px] font-semibold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {screen.sub ?? 'Document found · hold still'}
        </span>
      </div>
      <div className="flex items-center justify-between px-6 py-3">
        <span className="size-7 rounded-[6px] bg-[linear-gradient(135deg,#d8cfc2,#9c8b77)]" />
        <span className="grid size-11 place-items-center rounded-full ring-2 ring-white">
          <span className="size-9 rounded-full bg-white" />
        </span>
        <span className="text-[9px] font-semibold">Auto</span>
      </div>
    </div>
  );
}

export function PhoneScreen({ screen }: { screen: Screen }) {
  if (screen.chrome === 'camera') return <Camera screen={screen} />;
  const share = screen.blocks.find((block) => block.t === 'share');
  return (
    <div className={`flex h-full flex-col ${screen.grey ? 'bg-[#f4f5f7]' : 'bg-white'}`}>
      <Header screen={screen} />
      <div
        className={`flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3 pt-1 ${screen.chrome === 'google' ? 'bg-[#f1f3f4] pt-2' : ''}`}
      >
        {screen.blocks
          .filter((block) => block.t !== 'share')
          .map((block, i) => (
            <Block key={i} block={block} />
          ))}
        {share ? <Block block={share} /> : null}
      </div>
      {screen.cta ? (
        <div
          className={`shrink-0 px-3 pt-2 pb-1 ${screen.grey ? 'bg-[#f4f5f7]' : 'bg-white'} border-t border-black/[0.05]`}
        >
          {screen.ctaNote ? (
            <p className="mb-1 text-center text-[8px] text-ink-3">{screen.ctaNote}</p>
          ) : null}
          <div className="flex gap-1.5">
            {screen.alt ? (
              <span className="flex h-[32px] flex-1 items-center justify-center rounded-[11px] bg-white text-[10.5px] font-semibold text-ink ring-1 ring-black/[0.1]">
                {screen.alt}
              </span>
            ) : null}
            <span
              className="flex h-[32px] flex-[1.4] items-center justify-center rounded-[11px] text-[10.5px] font-semibold text-white shadow-[0_6px_14px_-6px_var(--accent)]"
              style={{ background: 'var(--accent)' }}
            >
              {screen.cta}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
