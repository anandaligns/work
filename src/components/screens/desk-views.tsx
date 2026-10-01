import { Scaled } from '../visuals/concept-sites';
import {
  ADMIN_FRAMES,
  AdminDesk,
  AVATAR_TONES,
  CHANNEL_GLYPH,
  Glyph,
  NAV_GLYPHS,
  STATUS,
} from './admin-view';
import { Icon } from '../ui/icon';
import { Avatar as Person, DeskBlockView, spanStyle } from './desk-blocks';
import { brandInfo, type Size } from './parts';
import type { BrandId, FlowNode, Screen } from './types';
import { WaThread, waWallpaper } from './whatsapp-views';

/**
 * The business's own software at desktop size, 1280 × 800, scaled into its frame like a
 * screenshot: the admin, the WhatsApp team inbox and the automation builder. The inbox and the
 * builder share a narrow rail of sections, the way messaging tools lay themselves out.
 */
export type Desk = Extract<Screen, { kind: 'admin' | 'inbox' | 'automation' | 'desk' }>;
type Work = Extract<Screen, { kind: 'desk' }>;
type Inbox = Extract<Screen, { kind: 'inbox' }>;
type Automation = Extract<Screen, { kind: 'automation' }>;

export const isDesk = (screen: Screen): screen is Desk =>
  screen.kind === 'admin' ||
  screen.kind === 'inbox' ||
  screen.kind === 'automation' ||
  screen.kind === 'desk';

const G = {
  chat: 'M4 5h16v11H9l-5 4Z',
  bolt: 'M13 3 5 14h6l-1 7 8-11h-6Z',
  template: 'M6 3h9l4 4v14H6ZM14 3v5h5M9 13h7M9 17h5',
  people: NAV_GLYPHS.Customers!,
  megaphone: 'M3 10v4h3l7 4V6l-7 4ZM17 9a4 4 0 0 1 0 6',
  chart: NAV_GLYPHS.Reports!,
  settings: NAV_GLYPHS.Settings!,
  calendar: NAV_GLYPHS.Bookings!,
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-3.5-3.5',
  filter: 'M4 6h16M7 12h10M10 18h4',
  compose: 'M4 20h4L19 9l-4-4L4 16ZM14 6l4 4',
  check: 'M5 12.5 10 17l9-10',
  call: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z',
  mail: 'M3 6h18v12H3ZM3 7l9 6 9-6',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  branch:
    'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 9a9 9 0 0 1-9 9',
  bell: 'M6 16v-5a6 6 0 0 1 12 0v5l2 2H4ZM10 21h4',
  stop: 'M6 6h12v12H6Z',
  plus: 'M12 5v14M5 12h14',
  emoji: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01',
  attach: 'M20 11l-8.5 8.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-8.5 8.5a2 2 0 0 1-3-3L14 7',
  close: 'M6 6l12 12M18 6 6 18',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  down: 'M6 9l6 6 6-6',
  instagram:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17.5 6.5h.01',
};

/** Where a conversation began, by its source's first word. */
const SOURCE: Record<string, string> = {
  Website: CHANNEL_GLYPH.Website!,
  Instagram: G.instagram,
  Google: G.search,
  WhatsApp: CHANNEL_GLYPH.WhatsApp!,
  Call: G.call,
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2);

const tone = (name: string) =>
  AVATAR_TONES[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % AVATAR_TONES.length];

function Avatar({ name, size }: { name: string; size: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold text-[#3b3f4c]"
      style={{ width: size, height: size, fontSize: size * 0.34, background: tone(name) }}
    >
      {initials(name)}
    </span>
  );
}

function Pill({ pill }: { pill: { text: string; tone?: keyof typeof STATUS } }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-medium ${STATUS[pill.tone ?? 'grey']}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {pill.text}
    </span>
  );
}

/** The rail of sections down the left: inbox, automations, templates, contacts, broadcasts. */
function Rail({ brand, active, unread }: { brand: BrandId; active: number; unread?: number }) {
  const name = brandInfo(brand).name;
  return (
    <aside className="flex w-[68px] shrink-0 flex-col items-center gap-1.5 border-r border-[#ececef] bg-[#f8f8f9] py-4">
      <span
        className="mb-3 grid size-9 place-items-center rounded-[9px] text-[15px] font-bold text-white"
        style={{ background: 'var(--accent)' }}
      >
        {name.charAt(0)}
      </span>
      {[G.chat, G.bolt, G.template, G.people, G.megaphone, G.chart].map((d, i) => (
        <span
          key={d}
          className={`relative grid size-10 place-items-center rounded-[10px] ${i === active ? 'bg-white shadow-[0_1px_2px_rgb(0_0_0/0.07),0_0_0_1px_rgb(0_0_0/0.04)]' : ''}`}
        >
          <Glyph d={d} size={20} color={i === active ? 'var(--accent)' : '#6b7080'} />
          {i === 0 && unread ? (
            <span className="absolute -top-0.5 -right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#25d366] px-1 text-[10.5px] font-semibold text-white ring-2 ring-[#f8f8f9]">
              {unread}
            </span>
          ) : null}
        </span>
      ))}
      <span className="mt-auto grid size-10 place-items-center">
        <Glyph d={G.settings} size={20} color="#6b7080" />
      </span>
      <span className="grid size-8 place-items-center rounded-full bg-[#fde2cf] text-[12px] font-semibold text-[#7a3a12]">
        R
      </span>
    </aside>
  );
}

// --- the team inbox ------------------------------------------------------------------------------

export function InboxDesk({ screen }: { screen: Inbox }) {
  const { thread, contact } = screen;
  const unread = screen.chats.reduce((sum, chat) => sum + (chat.unread ?? 0), 0);
  return (
    <div
      className="flex h-[800px] w-[1280px] bg-white text-[#16181d]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <Rail brand={screen.brand ?? 'yours'} active={0} unread={unread} />

      {/* the conversations */}
      <section className="flex w-[340px] shrink-0 flex-col border-r border-[#ececef]">
        <div className="flex h-[60px] shrink-0 items-center gap-2 px-5">
          <span className="text-[18px] font-semibold tracking-[-0.01em]">Inbox</span>
          <span className="ml-auto grid size-8 place-items-center text-[#4b5060]">
            <Glyph d={G.filter} size={17} />
          </span>
          <span
            className="grid size-8 place-items-center rounded-[8px] text-white"
            style={{ background: 'var(--accent)' }}
          >
            <Glyph d={G.compose} size={16} />
          </span>
        </div>
        <div className="px-4">
          <div className="flex h-9 items-center gap-2 rounded-[9px] bg-[#f1f2f4] px-3 text-[13px] text-[#8b8f99]">
            <Glyph d={G.search} size={15} />
            Search name, number or message
          </div>
        </div>
        <div className="flex gap-1.5 px-4 pt-3 pb-2">
          {screen.views.map((view, i) => (
            <span
              key={view.label}
              className={`rounded-full px-3 py-1 text-[12.5px] ${i === 0 ? 'font-medium' : 'bg-[#f1f2f4] text-[#4b5060]'}`}
              style={
                i === 0
                  ? {
                      background: 'color-mix(in srgb, var(--accent) 12%, white)',
                      color: 'var(--accent)',
                    }
                  : undefined
              }
            >
              {view.label}
              {view.count ? <span className="ml-1 opacity-70">{view.count}</span> : null}
            </span>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          {screen.chats.map((chat) => (
            <div
              key={chat.name}
              className={`flex gap-3 px-4 pt-3 ${chat.active ? 'bg-[#f0f2f5]' : ''} ${chat.fresh ? 'admin-row-fresh' : ''}`}
            >
              <Avatar name={chat.name} size={44} />
              <div className="min-w-0 flex-1 border-b border-[#f0f0f2] pb-3">
                <div className="flex items-baseline gap-2">
                  <span className="truncate text-[14.5px] font-semibold">{chat.name}</span>
                  <span
                    className={`ml-auto shrink-0 text-[12px] ${chat.unread ? 'font-medium text-[#1fa855]' : 'text-[#8b8f99]'}`}
                  >
                    {chat.time}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-[#667781]">
                  {chat.auto ? (
                    <span className="shrink-0" style={{ color: 'var(--accent)' }}>
                      <Glyph d={G.bolt} size={13} />
                    </span>
                  ) : null}
                  <span className="truncate">{chat.text}</span>
                  {chat.unread ? (
                    <span className="ml-auto grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-[#25d366] px-1.5 text-[11px] font-semibold text-white">
                      {chat.unread}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  {chat.source ? (
                    <span className="flex items-center gap-1 text-[11.5px] text-[#8b8f99]">
                      <Glyph d={SOURCE[chat.source.split(' ')[0]!] ?? G.chat} size={12} />
                      {chat.source}
                    </span>
                  ) : null}
                  {chat.tag ? (
                    <span className="ml-auto">
                      <Pill pill={chat.tag} />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* the open chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[60px] shrink-0 items-center gap-3 border-b border-[#ececef] px-5">
          <Avatar name={thread.name} size={38} />
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold">{thread.name}</span>
            <span className="block truncate text-[12.5px] text-[#667781]">
              {thread.phone}
              {thread.line ? ` · ${thread.line}` : ''}
            </span>
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-[#cfeedd] bg-[#effaf3] px-2.5 py-1 text-[12px] font-medium text-[#16794a]">
            <Glyph d={G.clock} size={13} />
            23 h left
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-[8px] border border-[#e6e6ea] px-2 py-1 text-[12.5px] text-[#4b5060]">
            <span className="grid size-5 place-items-center rounded-full bg-[#fde2cf] text-[10px] font-semibold text-[#7a3a12]">
              R
            </span>
            Ritu
            <Glyph d={G.down} size={12} />
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-[8px] border border-[#e6e6ea] px-2.5 py-1 text-[12.5px] font-medium">
            <Glyph d={G.check} size={14} />
            Resolve
          </span>
        </div>
        <div
          className="flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-10 pb-5"
          style={waWallpaper(true)}
        >
          <WaThread messages={thread.messages} mine="business" desk />
        </div>
        <div className="shrink-0 border-t border-[#e6e6ea] bg-[#f0f2f5] px-4 pt-2 pb-3">
          <div className="flex gap-4 px-1 text-[12.5px]">
            <span
              className="border-b-2 pb-1.5 font-medium"
              style={{ borderColor: 'var(--accent)' }}
            >
              Reply
            </span>
            <span className="pb-1.5 text-[#667781]">Private note</span>
            <span className="ml-auto flex items-center gap-1 pb-1.5 text-[#667781]">
              <Glyph d={G.template} size={13} />
              Templates
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2.5">
            <Glyph d={G.emoji} size={22} color="#54656f" />
            <Glyph d={G.attach} size={21} color="#54656f" />
            <span
              className={`flex h-10 flex-1 items-center rounded-[9px] bg-white px-3.5 text-[14px] ${thread.draft ? 'text-[#111b21]' : 'text-[#8696a0]'}`}
            >
              {thread.draft ?? 'Type a message'}
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-[#00a884]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2Z" />
              </svg>
            </span>
          </div>
        </div>
      </main>

      {/* the contact */}
      <aside className="w-[300px] shrink-0 overflow-hidden border-l border-[#ececef] px-5 pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar name={thread.name} size={64} />
          <p className="mt-2.5 text-[16px] font-semibold">{thread.name}</p>
          <p className="text-[13px] text-[#667781]">{thread.phone}</p>
          <div className="mt-3 flex gap-2">
            {[G.call, G.mail, G.calendar].map((d) => (
              <span
                key={d}
                className="grid size-9 place-items-center rounded-[9px] border border-[#e6e6ea] text-[#4b5060]"
              >
                <Glyph d={d} size={16} />
              </span>
            ))}
          </div>
        </div>
        <dl className="mt-5 flex flex-col gap-2 border-t border-[#ececef] pt-4 text-[13px]">
          {contact.fields.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-[#8b8f99]">{label}</dt>
              <dd className="truncate text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {contact.tags.map((tag) => (
            <Pill key={tag.text} pill={tag} />
          ))}
        </div>
        {contact.next ? (
          <div
            className="mt-4 flex items-center gap-3 rounded-[10px] p-3"
            style={{ background: 'color-mix(in srgb, var(--accent) 7%, white)' }}
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-white"
              style={{ color: 'var(--accent)' }}
            >
              <Glyph d={G.calendar} size={17} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold">{contact.next.title}</span>
              <span className="block truncate text-[12px] text-[#667781]">{contact.next.line}</span>
            </span>
          </div>
        ) : null}
        <p className="mt-5 text-[12px] font-medium text-[#8b8f99]">Automations</p>
        <ol className="mt-2 flex flex-col gap-3">
          {contact.automations.map((run) => (
            <li key={run.title} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-[6px] bg-[#f1f2f4]"
                style={{ color: run.pill.tone === 'accent' ? 'var(--accent)' : '#6b7080' }}
              >
                <Glyph d={G.bolt} size={13} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium">{run.title}</span>
                <span className="block truncate text-[12px] text-[#8b8f99]">{run.meta}</span>
              </span>
              <Pill pill={run.pill} />
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

// --- the automation builder -------------------------------------------------------------------

const NODE: Record<FlowNode['kind'], { label: string; d: string; bg: string; fg: string }> = {
  trigger: { label: 'Trigger', d: G.bolt, bg: '#fff4e0', fg: '#b86e00' },
  send: { label: 'Send WhatsApp', d: G.chat, bg: '#e7f8ee', fg: '#128c4a' },
  wait: { label: 'Wait', d: G.clock, bg: '#f1f2f4', fg: '#5b6070' },
  check: { label: 'Condition', d: G.branch, bg: '#eef0ff', fg: '#4b55d6' },
  alert: { label: 'Alert the team', d: G.bell, bg: '#e8f2fb', fg: '#1a7ab8' },
  stop: { label: 'End', d: G.stop, bg: '#f1f2f4', fg: '#5b6070' },
};

function Node({ node, selected }: { node: FlowNode; selected: boolean }) {
  const look = NODE[node.kind];
  return (
    <div
      className={`relative w-full rounded-[12px] border bg-white p-3.5 ${selected ? 'border-transparent' : 'border-[#e4e5e9] shadow-[0_1px_2px_rgb(0_0_0/0.05)]'}`}
      style={
        selected
          ? {
              boxShadow:
                '0 0 0 2px var(--accent), 0 12px 28px -14px color-mix(in srgb, var(--accent) 60%, transparent)',
            }
          : undefined
      }
    >
      <div className="flex items-center gap-2.5">
        <span
          className="grid size-8 shrink-0 place-items-center rounded-[8px]"
          style={{ background: look.bg, color: look.fg }}
        >
          <Glyph d={look.d} size={16} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-medium tracking-[0.04em] text-[#8b8f99] uppercase">
            {look.label}
          </span>
          <span className="block truncate text-[14px] font-semibold">{node.title}</span>
        </span>
        <span className="text-[#a0a4ad]">
          <Glyph d={G.more} size={18} />
        </span>
      </div>
      {node.text ? (
        <p className="mt-2 text-[12.5px] leading-[1.45] text-[#5b6070]">{node.text}</p>
      ) : null}
      {node.kind === 'check' && node.branches ? (
        <span className="absolute top-1/2 left-full flex -translate-y-1/2 items-center">
          <span className="w-10 border-t-[1.5px] border-dashed border-[#c5c8cf]" />
          <span className="flex items-center gap-1.5 rounded-full border border-[#e4e5e9] bg-white px-3 py-1.5 text-[12px] font-medium whitespace-nowrap text-[#16794a] shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
            <span className="size-1.5 rounded-full bg-[#22c55e]" />
            {node.branches[0]}
          </span>
        </span>
      ) : null}
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <span className="relative flex h-10 w-full shrink-0 justify-center">
      <span className="h-full w-[1.5px] bg-[#c5c8cf]" />
      {label ? (
        <span className="absolute top-1/2 left-1/2 ml-3 -translate-y-1/2 rounded-full bg-[#eceef1] px-2 py-0.5 text-[11px] font-medium text-[#5b6070]">
          {label}
        </span>
      ) : (
        <span className="absolute top-1/2 left-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#d5d7dd] bg-white text-[#8b8f99]">
          <Glyph d={G.plus} size={11} />
        </span>
      )}
    </span>
  );
}

export function FlowDesk({ screen }: { screen: Automation }) {
  const open = screen.flows[screen.open]!;
  const live = screen.flows.filter((flow) => flow.status.tone === 'green').length;
  const { inspector } = screen;
  return (
    <div
      className="flex h-[800px] w-[1280px] bg-white text-[#16181d]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <Rail brand={screen.brand ?? 'yours'} active={1} />

      {/* the automations */}
      <section className="flex w-[268px] shrink-0 flex-col border-r border-[#ececef]">
        <div className="flex h-[60px] shrink-0 items-center px-5">
          <span className="text-[18px] font-semibold tracking-[-0.01em]">Automations</span>
          <span
            className="ml-auto flex items-center gap-1 rounded-[8px] px-2.5 py-1 text-[12.5px] font-semibold text-white"
            style={{ background: 'var(--accent)' }}
          >
            <Glyph d={G.plus} size={13} />
            New
          </span>
        </div>
        <p className="px-5 text-[12px] text-[#8b8f99]">
          {live} live · {screen.flows.length - live} draft
        </p>
        <div className="mt-2 flex flex-col gap-0.5 px-3">
          {screen.flows.map((flow, i) => (
            <div
              key={flow.name}
              className={`rounded-[10px] px-3 py-2.5 ${i === screen.open ? 'bg-[#f0f2f5]' : ''}`}
            >
              <span className="flex items-center gap-2">
                <span className="truncate text-[14px] font-semibold">{flow.name}</span>
                <span
                  className="ml-auto size-2 shrink-0 rounded-full"
                  style={{ background: flow.status.tone === 'green' ? '#22c55e' : '#c9ccd3' }}
                />
              </span>
              <span className="block truncate text-[12.5px] text-[#667781]">{flow.line}</span>
              <span className="mt-0.5 block text-[12px] text-[#8b8f99]">
                {flow.status.text}
                {flow.runs ? ` · ${flow.runs}` : ''}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* the canvas */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[60px] shrink-0 items-center gap-2.5 border-b border-[#ececef] px-5">
          <span className="text-[14px] text-[#8b8f99]">Automations</span>
          <span className="text-[#c5c8cf]">/</span>
          <span className="truncate text-[14px] font-semibold">{open.name}</span>
          <Pill pill={open.status} />
          <span className="ml-auto rounded-[8px] border border-[#e6e6ea] px-2.5 py-1 text-[12.5px] font-medium">
            Test
          </span>
          <span
            className="rounded-[8px] px-2.5 py-1 text-[12.5px] font-semibold text-white"
            style={{ background: 'var(--accent)' }}
          >
            Publish
          </span>
        </div>
        <div
          className="relative min-h-0 flex-1 overflow-hidden bg-[#f7f7f9]"
          style={{
            backgroundImage: 'radial-gradient(#d5d7dd 1.2px, transparent 1.2px)',
            backgroundSize: '20px 20px',
          }}
        >
          {screen.stats?.length ? (
            <span className="absolute top-4 left-5 flex items-center gap-2.5 rounded-full border border-[#e4e5e9] bg-white px-3.5 py-1.5 text-[12px] shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
              <span className="text-[#8b8f99]">Last 30 days</span>
              {screen.stats.map((stat) => (
                <span key={stat} className="flex items-center gap-2.5 font-medium">
                  <span className="size-1 rounded-full bg-[#c5c8cf]" />
                  {stat}
                </span>
              ))}
            </span>
          ) : null}
          <div className="absolute top-[72px] left-[64px] flex w-[300px] flex-col items-center">
            {screen.nodes.map((node, i) => {
              const before = screen.nodes[i - 1];
              return (
                <div key={node.title + i} className="contents">
                  {i > 0 ? (
                    <Connector
                      label={before?.kind === 'check' ? before.branches?.[1] : undefined}
                    />
                  ) : null}
                  <Node node={node} selected={i === screen.selected} />
                </div>
              );
            })}
          </div>
          <span className="absolute bottom-4 left-5 flex items-center gap-3 rounded-[8px] border border-[#e4e5e9] bg-white px-2.5 py-1 text-[12px] text-[#5b6070]">
            <span>−</span>
            100%
            <span>+</span>
          </span>
        </div>
      </main>

      {/* the chosen step */}
      <aside className="flex w-[340px] shrink-0 flex-col border-l border-[#ececef]">
        <div className="flex h-[60px] shrink-0 items-center gap-2.5 border-b border-[#ececef] px-5">
          <span
            className="grid size-7 place-items-center rounded-[7px]"
            style={{ background: NODE.send.bg, color: NODE.send.fg }}
          >
            <Glyph d={G.chat} size={14} />
          </span>
          <span className="text-[15px] font-semibold">{inspector.title}</span>
          <span className="ml-auto text-[#8b8f99]">
            <Glyph d={G.close} size={16} />
          </span>
        </div>
        <div className="flex gap-4 border-b border-[#ececef] px-5 text-[13px]">
          <span className="border-b-2 py-2.5 font-medium" style={{ borderColor: 'var(--accent)' }}>
            Message
          </span>
          <span className="py-2.5 text-[#8b8f99]">Settings</span>
        </div>
        <div className="px-5 pt-4">
          <dl className="grid grid-cols-2 gap-x-3 gap-y-3">
            {inspector.fields.map(([label, value], i) => (
              <div key={label} className={i === 0 ? 'col-span-2' : ''}>
                <dt className="text-[12px] text-[#8b8f99]">{label}</dt>
                <dd className="mt-1 flex h-9 items-center justify-between gap-2 rounded-[8px] border border-[#e6e6ea] px-3 text-[13px]">
                  <span className="truncate">{value}</span>
                  <span className="shrink-0 text-[#8b8f99]">
                    <Glyph d={G.down} size={13} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          {inspector.status ? (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e7f6ec] px-2.5 py-1 text-[12px] font-medium text-[#16794a]">
              <Glyph d={G.check} size={12} />
              {inspector.status}
            </p>
          ) : null}
          <p className="mt-4 text-[12px] font-medium text-[#8b8f99]">Preview</p>
          <div className="mt-2 rounded-[10px] px-4 py-3.5" style={waWallpaper(true)}>
            <WaThread messages={[inspector.preview]} mine="customer" desk />
          </div>
          {inspector.rules?.length ? (
            <>
              <p className="mt-4 text-[12px] font-medium text-[#8b8f99]">Send only if</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {inspector.rules.map((rule) => (
                  <li key={rule} className="flex items-center gap-2 text-[13px]">
                    <span style={{ color: 'var(--accent)' }}>
                      <Glyph d={G.check} size={14} />
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

// --- any other software ---------------------------------------------------------------------------

/**
 * Software as its makers draw it: a light sidebar with the workspace, search and sections, a top
 * bar with where you are, views and actions, and the page's blocks on a 12-column grid — with a
 * panel down the right for the chosen record when there is one.
 */
export function WorkDesk({ screen }: { screen: Work }) {
  const name = screen.app ?? brandInfo(screen.brand ?? 'yours').name;
  const active = screen.active ?? 0;
  const user = screen.user ?? { name: 'Ritu Menon', role: 'Admin' };
  return (
    <div
      className="flex h-[800px] w-[1280px] bg-white text-[#16181d]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <aside className="flex w-[224px] shrink-0 flex-col border-r border-[#ececef] bg-[#f8f8f9] px-3 py-4">
        <div className="flex items-center gap-2.5 px-2">
          <span
            className="grid size-7 place-items-center rounded-[7px] text-[13px] font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            {name.charAt(0)}
          </span>
          <span className="truncate text-[14px] font-semibold">{name}</span>
          <span className="ml-auto text-[#8b8f99]">
            <Glyph d={G.down} size={13} />
          </span>
        </div>
        <div className="mt-4 flex h-8 items-center gap-2 rounded-[8px] border border-[#e6e6ea] bg-white px-2.5 text-[13px] text-[#9a9ea8]">
          <Glyph d={G.search} size={14} />
          Search
          <span className="ml-auto rounded border border-[#e6e6ea] px-1 text-[11px]">⌘K</span>
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {screen.nav.map((item, i) => (
            <span
              key={item.label}
              className={`flex h-8 items-center gap-2.5 rounded-[8px] px-2.5 text-[13.5px] ${i === active ? 'bg-white font-medium shadow-[0_1px_2px_rgb(0_0_0/0.07),0_0_0_1px_rgb(0_0_0/0.04)]' : 'text-[#4b5060]'}`}
            >
              <span style={{ color: i === active ? 'var(--accent)' : '#6b7080' }}>
                <Icon name={item.icon} size={16} strokeWidth={1.8} />
              </span>
              {item.label}
              {item.count ? (
                <span className="ml-auto text-[12px] text-[#8b8f99] tabular-nums">
                  {item.count}
                </span>
              ) : null}
            </span>
          ))}
        </nav>
        {screen.group ? (
          <>
            <p className="mt-6 px-2.5 text-[11.5px] font-medium text-[#8b8f99]">
              {screen.group.title}
            </p>
            <div className="mt-1.5 flex flex-col gap-0.5">
              {screen.group.items.map((item, i) => (
                <span
                  key={item}
                  className="flex h-8 items-center gap-2.5 px-2.5 text-[13.5px] text-[#4b5060]"
                >
                  <span
                    className="size-2 rounded-[3px]"
                    style={{
                      background: ['var(--accent)', '#f59e0b', '#10b981', '#8b5cf6'][i % 4],
                    }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </>
        ) : null}
        <div className="mt-auto flex items-center gap-2.5 border-t border-[#ececef] px-2 pt-3">
          <Person name={user.name} size={28} />
          <span className="min-w-0 text-[13px] leading-tight">
            <span className="block truncate font-medium">{user.name}</span>
            <span className="block text-[12px] text-[#8b8f99]">{user.role}</span>
          </span>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[56px] shrink-0 items-center gap-2.5 border-b border-[#ececef] px-6">
          {screen.crumbs?.map((crumb) => (
            <span key={crumb} className="flex items-center gap-2.5 text-[14px] text-[#8b8f99]">
              {crumb}
              <span className="text-[#c5c8cf]">/</span>
            </span>
          ))}
          <span className="truncate text-[15.5px] font-semibold">{screen.title}</span>
          {screen.tabs?.length ? (
            <span className="ml-3 flex gap-1">
              {screen.tabs.map((tab, i) => (
                <span
                  key={tab}
                  className={`rounded-[7px] px-2.5 py-1 text-[13px] whitespace-nowrap ${i === 0 ? 'bg-[#f1f2f4] font-medium' : 'text-[#6b7080]'}`}
                >
                  {tab}
                </span>
              ))}
            </span>
          ) : null}
          <span className="ml-auto flex items-center gap-2">
            {(screen.actions ?? []).map((action, i, all) => (
              <span
                key={action}
                className={`rounded-[8px] px-2.5 py-1 text-[13px] whitespace-nowrap ${i === all.length - 1 ? 'font-semibold text-white' : 'border border-[#e6e6ea] text-[#4b5060]'}`}
                style={i === all.length - 1 ? { background: 'var(--accent)' } : undefined}
              >
                {action}
              </span>
            ))}
          </span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 overflow-hidden bg-[#fcfcfd] px-6 pt-5">
            <div className="grid grid-cols-12 content-start gap-3.5">
              {screen.blocks.map((block, i) => (
                <div key={i} className="min-w-0" style={spanStyle(block.span)}>
                  <DeskBlockView block={block} />
                </div>
              ))}
            </div>
          </div>
          {screen.aside?.length ? (
            <aside className="flex w-[320px] shrink-0 flex-col gap-3.5 overflow-hidden border-l border-[#ececef] bg-white p-4">
              {screen.aside.map((block, i) => (
                <DeskBlockView key={i} block={block} />
              ))}
            </aside>
          ) : null}
        </div>
      </main>
    </div>
  );
}

/**
 * A desk, scaled into a frame of known width — a window of its own, or a MacBook's screen.
 * `--k` is set per breakpoint by `frame`, never measured.
 */
export function DeskView({
  screen,
  frame,
}: {
  screen: Desk;
  frame: 'hero' | 'wide' | 'stage' | 'row' | Size;
}) {
  return (
    <Scaled className={ADMIN_FRAMES[frame]}>
      {screen.kind === 'admin' ? (
        <AdminDesk screen={screen} />
      ) : screen.kind === 'inbox' ? (
        <InboxDesk screen={screen} />
      ) : screen.kind === 'desk' ? (
        <WorkDesk screen={screen} />
      ) : (
        <FlowDesk screen={screen} />
      )}
    </Scaled>
  );
}
