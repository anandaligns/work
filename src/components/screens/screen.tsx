import type { CSSProperties, ReactNode } from 'react';

import { Icon } from '../ui/icon';
import { BRANDS, DesktopSite, MobileSite, Scaled } from '../visuals/concept-sites';
import { AppWindow, Flow } from './app';
import { MobileScreen } from './app-views';
import { DeskView, isDesk } from './desk-views';
import { Duo, IPhone, MacBook } from './devices';
import {
  BoardColumns,
  brandInfo,
  Bubble,
  Card,
  Mark,
  Phone,
  type Size,
  StatTiles,
  StatusPill,
  TableRows,
  Window,
} from './parts';
import type { BrandId, Screen } from './types';

/**
 * Product screens drawn in HTML and CSS — Lightfield's lesson, in our own ink: each sits on a
 * hairline border with soft corners and almost no shadow, its interface text small (11 to 13px),
 * its sample data believable and its one colour the example business's own. They are decorative:
 * the words beside them say what they show, so each one is hidden from assistive tech.
 *
 * `size` sets how much of the screen shows: `lg` for a hero, `md` for an outcome, `sm` for one
 * moment of a story — a single bubble, an alert or a row.
 */
// --- the pieces ----------------------------------------------------------------------------------

function Chat({ screen, size }: { screen: Extract<Screen, { kind: 'chat' }>; size: Size }) {
  const thread = (
    <div>
      <div className="flex items-center gap-2 border-b border-black/[0.06] bg-white px-3 py-2">
        <span
          className="grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {brandInfo(screen.brand ?? 'yours').name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12px] font-semibold text-ink">
            {screen.title ?? brandInfo(screen.brand ?? 'yours').name}
          </span>
          <span className="block text-[10px] text-ink-2">WhatsApp · business account</span>
        </span>
      </div>
      <div className={`flex flex-col gap-2 px-3 py-3 ${size === 'sm' ? '' : 'min-h-40'}`}>
        {screen.messages.map((message, i) => (
          <Bubble key={i} message={message} index={i} />
        ))}
      </div>
    </div>
  );
  return (screen.frame ?? (size === 'sm' ? 'card' : 'phone')) === 'phone' ? (
    <Phone className={size === 'lg' ? 'w-[16.5rem]' : 'w-[15rem]'}>{thread}</Phone>
  ) : (
    <Card className="overflow-hidden bg-[#f6f7f9]">{thread}</Card>
  );
}

export function Notice({
  title,
  line,
  big = false,
}: {
  title: string;
  line?: string;
  big?: boolean;
}) {
  return (
    <Card className={`flex items-start gap-2.5 ${big ? 'px-4 py-3' : 'px-3 py-2.5'}`}>
      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-signal-green" />
      <span className="min-w-0">
        <span className={`block font-semibold text-ink ${big ? 'text-[13px]' : 'text-[12px]'}`}>
          {title}
        </span>
        {line ? (
          <span className={`block text-ink-2 ${big ? 'text-[12px]' : 'text-[11px]'}`}>{line}</span>
        ) : null}
      </span>
    </Card>
  );
}

function Email({ screen }: { screen: Extract<Screen, { kind: 'email' }> }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-3 text-[11px] text-ink-2">
        <span className="truncate">
          From <span className="font-semibold text-ink">{screen.from}</span>
        </span>
        <Icon name="mail" size={14} />
      </div>
      <p className="mt-2 text-[13px] font-semibold text-ink">{screen.subject}</p>
      {screen.lines?.map((line) => (
        <p key={line} className="mt-1 text-[11.5px] leading-[1.5] text-ink-2">
          {line}
        </p>
      ))}
      {screen.action ? (
        <span
          className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {screen.action}
        </span>
      ) : null}
    </Card>
  );
}

function Doc({ screen }: { screen: Extract<Screen, { kind: 'doc' }> }) {
  return (
    <Card className="relative p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="min-w-0">
          <Mark brand={screen.brand} small />
          <span className="mt-2 block text-[13px] font-semibold text-ink">{screen.title}</span>
          {screen.meta ? <span className="block text-[11px] text-ink-2">{screen.meta}</span> : null}
        </span>
        {screen.stamp ? <StatusPill pill={screen.stamp} /> : null}
      </div>
      {screen.rows?.length ? (
        <ul className="mt-3 flex flex-col gap-1.5 border-t border-dashed border-black/[0.1] pt-3">
          {screen.rows.map(([label, value]) => (
            <li key={label} className="flex justify-between gap-4 text-[11.5px]">
              <span className="text-ink-2">{label}</span>
              <span className="text-ink tabular-nums">{value}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {screen.total ? (
        <p className="mt-3 flex justify-between border-t border-black/[0.08] pt-2.5 text-[12.5px] font-semibold text-ink">
          <span>{screen.total[0]}</span>
          <span className="tabular-nums">{screen.total[1]}</span>
        </p>
      ) : null}
      {screen.action ? (
        <span
          className="mt-3 flex justify-center rounded-lg py-1.5 text-[11.5px] font-semibold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {screen.action}
        </span>
      ) : null}
    </Card>
  );
}

function Table({ screen, size }: { screen: Extract<Screen, { kind: 'table' }>; size: Size }) {
  const body = (
    <div className="flex">
      <div className="min-w-0 flex-1 overflow-hidden">
        {screen.filters?.length ? (
          <div className="flex flex-wrap gap-1.5 px-3 pt-3 pb-1">
            {screen.filters.map((filter, i) => (
              <span
                key={filter}
                className={`rounded-full border px-2 py-0.5 text-[10.5px] ${i === 0 ? 'border-ink bg-ink text-white' : 'border-black/[0.1] text-ink-2'}`}
              >
                {filter}
              </span>
            ))}
          </div>
        ) : null}
        <TableRows columns={screen.columns} rows={screen.rows} />
      </div>
      {screen.panel && size !== 'sm' ? (
        <aside className="hidden w-44 shrink-0 border-l border-black/[0.06] bg-[#fafafb] p-3 sm:block">
          <p className="text-[12px] font-semibold text-ink">{screen.panel.title}</p>
          {screen.panel.lines.map((line) => (
            <p key={line} className="mt-1.5 text-[11px] leading-[1.45] text-ink-2">
              {line}
            </p>
          ))}
          {screen.panel.action ? (
            <span
              className="mt-3 flex justify-center rounded-lg py-1.5 text-[11px] font-semibold text-white"
              style={{ background: 'var(--accent)' }}
            >
              {screen.panel.action}
            </span>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
  return size === 'sm' ? (
    <Card className="overflow-hidden">{body}</Card>
  ) : (
    <Window brand={screen.brand} title={screen.title}>
      {body}
    </Window>
  );
}

function Record({ screen }: { screen: Extract<Screen, { kind: 'record' }> }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            {screen.name
              .split(' ')
              .map((part) => part.charAt(0))
              .slice(0, 2)
              .join('')}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-ink">{screen.name}</span>
            <span className="block truncate text-[11px] text-ink-2">{screen.meta.join(' · ')}</span>
          </span>
        </span>
        {screen.pill ? <StatusPill pill={screen.pill} /> : null}
      </div>
      <ol className="relative mt-4 flex flex-col gap-2.5 border-t border-black/[0.06] pt-3">
        {screen.timeline.map((item, i) => (
          <li
            key={i}
            data-reveal=""
            style={{ '--i': i } as CSSProperties}
            className="flex gap-2.5 text-[11.5px]"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
            <span className="w-14 shrink-0 text-ink-2 tabular-nums">{item.time}</span>
            <span className="text-ink">{item.text}</span>
          </li>
        ))}
      </ol>
      {screen.next ? (
        <p className="mt-3 rounded-lg bg-[color-mix(in_srgb,var(--accent)_8%,white)] px-2.5 py-1.5 text-[11px] text-ink">
          <span className="font-semibold">Next · </span>
          {screen.next}
        </p>
      ) : null}
    </Card>
  );
}

function Dashboard({
  screen,
  size,
}: {
  screen: Extract<Screen, { kind: 'dashboard' }>;
  size: Size;
}) {
  return (
    <Window brand={screen.brand} title={screen.title}>
      <StatTiles tiles={screen.tiles} chart={size === 'sm' ? undefined : screen.chart} />
      {screen.rows?.length && screen.columns ? (
        <div className="border-t border-black/[0.06]">
          <TableRows columns={screen.columns} rows={screen.rows} />
        </div>
      ) : null}
    </Window>
  );
}

function Board({ screen }: { screen: Extract<Screen, { kind: 'board' }> }) {
  return (
    <Window brand={screen.brand} title={screen.title}>
      <BoardColumns columns={screen.columns} />
    </Window>
  );
}

function List({ screen, size }: { screen: Extract<Screen, { kind: 'list' }>; size: Size }) {
  const body = (
    <ul className="flex flex-col">
      {screen.items.map((item, i) => (
        <li
          key={i}
          data-reveal=""
          style={{ '--i': i } as CSSProperties}
          className={`flex items-center gap-2.5 border-b border-black/[0.05] px-3 py-2 last:border-b-0 ${item.highlight ? 'bg-[color-mix(in_srgb,var(--accent)_7%,white)]' : ''}`}
        >
          {item.done !== undefined ? (
            <span
              className={`grid size-4 shrink-0 place-items-center rounded-full ${item.done ? 'bg-signal-green text-white' : 'border border-black/[0.15]'}`}
            >
              {item.done ? <Icon name="check" size={10} strokeWidth={3} /> : null}
            </span>
          ) : null}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11.5px] text-ink">{item.text}</span>
            {item.meta ? (
              <span className="block truncate text-[10.5px] text-ink-2">{item.meta}</span>
            ) : null}
          </span>
          {item.pill ? <StatusPill pill={item.pill} /> : null}
        </li>
      ))}
    </ul>
  );
  const foot = screen.action ? (
    <div className="border-t border-black/[0.06] p-3">
      <span
        className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white"
        style={{ background: 'var(--accent)' }}
      >
        {screen.action}
      </span>
    </div>
  ) : null;
  return size === 'sm' ? (
    <Card className="overflow-hidden">
      <p className="border-b border-black/[0.06] px-3 py-2 text-[11px] font-semibold text-ink">
        {screen.title}
      </p>
      {body}
      {foot}
    </Card>
  ) : (
    <Window brand={screen.brand} title={screen.title}>
      {body}
      {foot}
    </Window>
  );
}

function Stepper({ screen }: { screen: Extract<Screen, { kind: 'stepper' }> }) {
  return (
    <Window brand={screen.brand} title={screen.title}>
      <div className="p-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: screen.steps }, (_, i) => (
            <span
              key={i}
              className="h-1.5 flex-1 rounded-full"
              style={{
                background:
                  i < screen.current
                    ? 'var(--accent)'
                    : i === screen.current
                      ? 'color-mix(in srgb, var(--accent) 45%, white)'
                      : '#eceef2',
              }}
            />
          ))}
        </div>
        <p className="mt-2.5 text-[12px] font-semibold text-ink">{screen.label}</p>
        {screen.card ? (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-black/[0.07] px-3 py-2.5">
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold text-ink">{screen.card.title}</span>
              {screen.card.line ? (
                <span className="block text-[11px] text-ink-2">{screen.card.line}</span>
              ) : null}
            </span>
            {screen.card.action ? (
              <span
                className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
                style={{ background: 'var(--accent)' }}
              >
                {screen.card.action}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </Window>
  );
}

function Form({ screen }: { screen: Extract<Screen, { kind: 'form' }> }) {
  return (
    <Card className="p-4">
      <Mark brand={screen.brand} small />
      <p className="mt-2 text-[13px] font-semibold text-ink">{screen.title}</p>
      <div className="mt-3 flex flex-col gap-2">
        {screen.fields.map((field) => (
          <div key={field.label}>
            <p className="text-[10px] text-ink-2">{field.label}</p>
            <p className="mt-0.5 rounded-md border border-black/[0.1] px-2 py-1.5 text-[11.5px] text-ink">
              {field.value}
            </p>
          </div>
        ))}
      </div>
      {screen.note ? <p className="mt-2.5 text-[10.5px] text-ink-2">{screen.note}</p> : null}
      {screen.action ? (
        <span
          className="mt-3 flex justify-center rounded-lg py-1.5 text-[11.5px] font-semibold text-white"
          style={{ background: 'var(--accent)' }}
        >
          {screen.action}
        </span>
      ) : null}
    </Card>
  );
}

function Search({ screen }: { screen: Extract<Screen, { kind: 'search' }> }) {
  return (
    <Card className="flex flex-col gap-3 p-4">
      {screen.results.map((result) => (
        <div key={result.url}>
          <p className="truncate text-[10.5px] text-ink-2">{result.url}</p>
          <p className="text-[13px] font-semibold text-[var(--accent)]">{result.title}</p>
          <p className="text-[11.5px] leading-[1.45] text-ink-2">{result.text}</p>
        </div>
      ))}
    </Card>
  );
}

function Site({ screen, size }: { screen: Extract<Screen, { kind: 'site' }>; size: Size }) {
  const b = BRANDS[screen.brand]!;
  // The concept sites are drawn at 390 × 672 (phone) and 1280 × 800 (desktop) and scaled to a
  // frame of known size at each width, so `--k` is set here, never measured.
  const faded = screen.faded ? 'opacity-70 grayscale' : '';
  if (screen.device === 'phone') {
    return (
      <Phone className={`${size === 'sm' ? 'w-[11rem]' : 'w-[14rem]'} ${faded}`}>
        <Scaled
          className={
            size === 'sm' ? 'h-[282px] w-[164px] [--k:0.4205]' : 'h-[365px] w-[212px] [--k:0.5436]'
          }
        >
          <MobileSite b={b} />
        </Scaled>
      </Phone>
    );
  }
  return (
    <Window
      brand={screen.brand}
      title={screen.note ?? `${b.name.toLowerCase().replace(/[^a-z]+/g, '')}.in`}
      className={`mx-auto w-fit ${faded}`}
    >
      <Scaled
        className={
          size === 'lg'
            ? 'h-[175px] w-[280px] [--k:0.21875] sm:h-[300px] sm:w-[480px] sm:[--k:0.375] lg:h-[400px] lg:w-[640px] lg:[--k:0.5]'
            : 'h-[175px] w-[280px] [--k:0.21875] sm:h-[250px] sm:w-[400px] sm:[--k:0.3125]'
        }
      >
        <DesktopSite b={b} />
      </Scaled>
    </Window>
  );
}

/**
 * `accent` is the page's colour for screens that belong to no example business: with it, an
 * unbranded screen becomes the reader's own ("Your Business"), drawn in that colour.
 */
export function ScreenView({
  screen,
  size = 'md',
  accent,
}: {
  screen: Screen;
  size?: Size;
  accent?: string;
}) {
  const own = 'brand' in screen ? screen.brand : undefined;
  const brand: BrandId | undefined = own ?? (accent ? 'yours' : undefined);
  if (brand && 'brand' in screen) screen = { ...screen, brand } as Screen;
  const style = {
    '--accent': brand && brand !== 'yours' ? BRANDS[brand]!.accent : (accent ?? '#0b0d12'),
  } as CSSProperties;
  let body: ReactNode;
  switch (screen.kind) {
    case 'chat':
      body = <Chat screen={screen} size={size} />;
      break;
    case 'notice':
      body = <Notice title={screen.title} line={screen.line} big={size !== 'sm'} />;
      break;
    case 'email':
      body = <Email screen={screen} />;
      break;
    case 'doc':
      body = <Doc screen={screen} />;
      break;
    case 'table':
      body = <Table screen={screen} size={size} />;
      break;
    case 'record':
      body = <Record screen={screen} />;
      break;
    case 'dashboard':
      body = <Dashboard screen={screen} size={size} />;
      break;
    case 'board':
      body = <Board screen={screen} />;
      break;
    case 'list':
      body = <List screen={screen} size={size} />;
      break;
    case 'stepper':
      body = <Stepper screen={screen} />;
      break;
    case 'form':
      body = <Form screen={screen} />;
      break;
    case 'search':
      body = <Search screen={screen} />;
      break;
    case 'site':
      body = <Site screen={screen} size={size} />;
      break;
    case 'app':
      body = <AppWindow screen={screen} size={size} />;
      break;
    case 'flow':
      body = <Flow screen={screen} />;
      break;
    case 'iphone':
      body = (
        <IPhone
          size={size}
          brand={screen.brand}
          app={screen.app}
          tabs={screen.tabs}
          tab={screen.tab}
          url={screen.url}
          lock={screen.lock}
          site={screen.url && screen.screen?.kind === 'site' ? screen.screen.brand : undefined}
        >
          {screen.screen?.kind === 'mobile' ? (
            // An app's screen in Safari — a web app — drawn without a second phone around it.
            <MobileScreen view={screen.screen.view} />
          ) : screen.screen ? (
            <ScreenView screen={screen.screen} size="sm" accent={accent} />
          ) : null}
        </IPhone>
      );
      break;
    case 'macbook':
      body = (
        <MacBook
          size={size}
          brand={screen.brand}
          url={screen.url}
          tab={screen.tab}
          site={screen.screen.kind === 'site' ? screen.screen.brand : undefined}
          fill={isDesk(screen.screen)}
        >
          {isDesk(screen.screen) ? (
            <DeskView screen={screen.screen} frame={size} />
          ) : (
            <ScreenView screen={screen.screen} size="md" accent={accent} />
          )}
        </MacBook>
      );
      break;
    case 'mobile':
      body = (
        <IPhone
          size={size}
          brand={screen.brand}
          tabs={screen.tabs}
          tab={screen.tab}
          bare
          chrome={
            screen.view.type === 'whatsapp'
              ? '#f6f6f6'
              : screen.view.type === 'screen' && screen.view.chrome === 'camera'
                ? '#0c0d10'
                : screen.view.type === 'screen' && screen.view.grey
                  ? '#f4f5f7'
                  : undefined
          }
          night={screen.view.type === 'screen' && screen.view.chrome === 'camera'}
        >
          <MobileScreen view={screen.view} />
        </IPhone>
      );
      break;
    case 'admin':
    case 'inbox':
    case 'automation':
    case 'desk':
      body = (
        <div className="overflow-hidden rounded-[10px] shadow-[0_30px_70px_-30px_rgb(11_13_18/0.5)] ring-1 ring-black/[0.08]">
          <DeskView screen={screen} frame={size} />
        </div>
      );
      break;
    case 'duo':
      body = (
        <Duo
          back={<ScreenView screen={screen.back} size={size} accent={accent} />}
          front={<ScreenView screen={screen.front} size="md" accent={accent} />}
        />
      );
      break;
    case 'phone':
      body = (
        <Phone className={size === 'lg' ? 'w-[16.5rem]' : 'w-[15rem]'}>
          <div className="flex items-center gap-2 border-b border-black/[0.06] bg-white px-3 py-2">
            <span
              className="grid size-6 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-white"
              style={{ background: 'var(--accent)' }}
            >
              {brandInfo(screen.brand ?? 'yours').name.charAt(0)}
            </span>
            <span className="truncate text-[12px] font-semibold text-ink">
              {screen.app ?? brandInfo(screen.brand ?? 'yours').name}
            </span>
          </div>
          <div className="p-2.5 [&_.rounded-xl]:shadow-none">
            <ScreenView screen={screen.screen} size="sm" accent={accent} />
          </div>
        </Phone>
      );
      break;
  }
  return (
    <div aria-hidden="true" style={style} className="font-sans">
      {body}
    </div>
  );
}
