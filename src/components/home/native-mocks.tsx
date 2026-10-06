import type { CSSProperties, ReactNode } from 'react';

import { Fit } from '../lab/fit';
import * as Home from '../showcase/home';
import { BrandSymbol } from '../ui/brand';
import { Icon, type IconName } from '../ui/icon';

/**
 * The home page's pictures. The four promises and the four solutions are drawn in the showcase
 * kit (`components/showcase/home.tsx`), as the Services pictures are; the portal below is a
 * window of its own, after Lightfield's opening dashboard. The sample people and figures are the
 * same invented ones the product pages use.
 */

export const PROMISE_MOCKS = [
  Home.PriceMock,
  Home.TimelineMock,
  Home.ChangesMock,
  Home.WarrantyMock,
];

// --- the portal --------------------------------------------------------------------

/** A stage's progress, as Lightfield scores a row: five short dashes, filled from the left. */
function Dashes({ filled, color }: { filled: number; color: string }) {
  return (
    <span className="flex gap-[3px]">
      {[0, 1, 2, 3, 4].map((k) => (
        <span
          key={k}
          className="h-[3px] w-[14px] rounded-full"
          style={{ background: k < filled ? color : '#e6e7eb' }}
        />
      ))}
    </span>
  );
}

const STATUS = {
  done: { text: 'Done', bg: '#eaf7ef', fg: '#15803d', line: '#cfeedd' },
  now: { text: 'In progress', bg: '#eef3ff', fg: '#2f5fd0', line: '#d8e3fb' },
  next: { text: 'Up next', bg: '#fff5e0', fg: '#a15c07', line: '#f7e2b5' },
  later: { text: 'Planned', bg: '#f3f3f5', fg: '#6b7080', line: '#e6e7eb' },
} as const;

export type PortalView = 'stage' | 'files' | 'agreement' | 'invoices' | 'requests';

/** A status pill, in Lightfield's soft colours. */
function Status({ kind }: { kind: keyof typeof STATUS }) {
  const st = STATUS[kind];
  return (
    <span
      className="rounded-[7px] border px-2 py-[3px] text-[11.5px] whitespace-nowrap"
      style={{ background: st.bg, color: st.fg, borderColor: st.line }}
    >
      {st.text}
    </span>
  );
}

const AVATAR_TONES = ['#fde2d8', '#e5f3fb', '#eceefb', '#e6f7ee'];

function Avatars({ who, seed = 0 }: { who: string[]; seed?: number }) {
  return (
    <span className="flex -space-x-1.5">
      {who.map((name, k) => (
        <span
          key={name}
          className="grid size-[22px] place-items-center rounded-full border-[1.5px] border-white text-[8.5px] font-semibold text-ink-2"
          style={{ background: AVATAR_TONES[(k + seed) % AVATAR_TONES.length] }}
        >
          {name}
        </span>
      ))}
    </span>
  );
}

/** A row's lead cell: a glyph on grey and its name. */
function Lead({ icon, name, dot }: { icon: IconName; name: string; dot?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-[#f3f3f5] text-ink-2">
        <Icon name={icon} size={13} />
      </span>
      <span className="truncate">{name}</span>
      {dot ? <span className="mr-3 ml-auto size-1.5 shrink-0 rounded-full bg-[#3b82f6]" /> : null}
    </span>
  );
}

const muted = (text: string) => <span className="text-[12px] text-ink-3">{text}</span>;

type Table = {
  chip: [string, string];
  title: string;
  icon: IconName;
  view: string;
  columns: { icon: IconName; label: string }[];
  grid: string;
  rows: ReactNode[][];
};

/** What the portal shows for each of its five parts. */
function tableFor(view: PortalView): Table {
  const bar = (k: keyof typeof STATUS) =>
    k === 'done' ? '#22c55e' : k === 'now' ? '#3b82f6' : '#f0a500';
  switch (view) {
    case 'files':
      return {
        chip: ['Homepage design v2 added', 'Waiting in Files for you'],
        title: 'Files',
        icon: 'file',
        view: 'All files',
        columns: [
          { icon: 'file', label: 'File' },
          { icon: 'layers', label: 'Kind' },
          { icon: 'clock', label: 'Added' },
          { icon: 'people', label: 'By' },
        ],
        grid: 'grid-cols-[1.6fr_0.9fr_0.9fr_0.6fr]',
        rows: [
          [
            <Lead key="n" icon="pen" name="Homepage design · v2" dot />,
            muted('Design'),
            muted('Today'),
            <Avatars key="a" who={['MR']} seed={2} />,
          ],
          [
            <Lead key="n" icon="file" name="Content sheet" />,
            muted('Document'),
            muted('Mon'),
            <Avatars key="a" who={['YB']} />,
          ],
          [
            <Lead key="n" icon="spark" name="Logo files" />,
            muted('Brand'),
            muted('4 Sep'),
            <Avatars key="a" who={['YB']} />,
          ],
          [
            <Lead key="n" icon="eye" name="Service photos · 24" />,
            muted('Images'),
            muted('3 Sep'),
            <Avatars key="a" who={['YB']} />,
          ],
          [
            <Lead key="n" icon="clipboard" name="System Blueprint" />,
            muted('Document'),
            muted('1 Sep'),
            <Avatars key="a" who={['AK']} seed={1} />,
          ],
          [
            <Lead key="n" icon="tasks" name="Launch checklist" />,
            muted('Document'),
            muted('1 Sep'),
            <Avatars key="a" who={['AK']} seed={1} />,
          ],
          [
            <Lead key="n" icon="table" name="Price list" />,
            muted('Sheet'),
            muted('30 Aug'),
            <Avatars key="a" who={['YB']} />,
          ],
        ],
      };
    case 'agreement':
      return {
        chip: ['Agreement signed', 'By you, on 2 Sep'],
        title: 'Agreement',
        icon: 'pen',
        view: 'Connected Website',
        columns: [
          { icon: 'file', label: 'Term' },
          { icon: 'layers', label: 'What we agreed' },
          { icon: 'refresh', label: 'Status' },
        ],
        grid: 'grid-cols-[1fr_1.6fr_0.8fr]',
        rows: [
          [
            <Lead key="n" icon="clipboard" name="Scope" />,
            muted('Website, replies, booking, dashboard'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="rupee" name="Price" />,
            muted('₹45,000, fixed'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="calendar" name="Timeline" />,
            muted('4–6 weeks'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="receipt" name="Payments" />,
            muted('Start, design approval, launch'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="shield" name="Warranty" />,
            muted('30 days from launch'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="refresh" name="Evolve" />,
            muted('3 months included'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="pen" name="Signed" />,
            muted('By you, 2 Sep'),
            <Status key="s" kind="done" />,
          ],
        ],
      };
    case 'invoices':
      return {
        chip: ['Invoice 2 of 3 paid', 'Receipt added to Invoices'],
        title: 'Invoices',
        icon: 'receipt',
        view: 'All invoices',
        columns: [
          { icon: 'receipt', label: 'Invoice' },
          { icon: 'rupee', label: 'Amount' },
          { icon: 'clock', label: 'When' },
          { icon: 'refresh', label: 'Status' },
        ],
        grid: 'grid-cols-[1.5fr_0.8fr_1fr_0.8fr]',
        rows: [
          [
            <Lead key="n" icon="receipt" name="1 of 3 · Start" />,
            muted('₹15,000'),
            muted('Paid 2 Sep'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="receipt" name="2 of 3 · Design approval" dot />,
            muted('₹15,000'),
            muted('Paid today'),
            <Status key="s" kind="done" />,
          ],
          [
            <Lead key="n" icon="receipt" name="3 of 3 · Launch" />,
            muted('₹15,000'),
            muted('At launch'),
            <Status key="s" kind="later" />,
          ],
          [
            <Lead key="n" icon="refresh" name="Evolve · month 4" />,
            muted('Your plan'),
            muted('After 3 months'),
            <Status key="s" kind="later" />,
          ],
        ],
      };
    case 'requests':
      return {
        chip: ['Request #214 done', 'The new branch timings are live'],
        title: 'Requests',
        icon: 'chat',
        view: 'All requests',
        columns: [
          { icon: 'chat', label: 'Request' },
          { icon: 'clock', label: 'Raised' },
          { icon: 'refresh', label: 'Status' },
          { icon: 'people', label: 'With' },
        ],
        grid: 'grid-cols-[1.6fr_0.9fr_0.9fr_0.6fr]',
        rows: [
          [
            <Lead key="n" icon="chat" name="New branch timings" dot />,
            muted('Mon, 10:12 am'),
            <Status key="s" kind="done" />,
            <Avatars key="a" who={['SV']} seed={1} />,
          ],
          [
            <Lead key="n" icon="chat" name="Diwali offer banner" />,
            muted('Tue, 4:30 pm'),
            <Status key="s" kind="now" />,
            <Avatars key="a" who={['MR']} seed={2} />,
          ],
          [
            <Lead key="n" icon="chat" name="Add a team member" />,
            muted('Today, 9:05 am'),
            <Status key="s" kind="next" />,
            <Avatars key="a" who={['AK']} />,
          ],
          [
            <Lead key="n" icon="chat" name="New service page" />,
            muted('28 Aug'),
            <Status key="s" kind="done" />,
            <Avatars key="a" who={['SV']} seed={1} />,
          ],
          [
            <Lead key="n" icon="chat" name="Change the enquiry form" />,
            muted('26 Aug'),
            <Status key="s" kind="done" />,
            <Avatars key="a" who={['AK']} />,
          ],
        ],
      };
    default: {
      const stages: {
        name: string;
        icon: IconName;
        filled: number;
        status: keyof typeof STATUS;
        with: string[];
        dot?: boolean;
      }[] = [
        {
          name: 'Plan and content',
          icon: 'clipboard',
          filled: 5,
          status: 'done',
          with: ['YB', 'AK'],
        },
        { name: 'Design', icon: 'pen', filled: 5, status: 'done', with: ['YB', 'MR'] },
        {
          name: 'Website build',
          icon: 'code',
          filled: 3,
          status: 'now',
          with: ['SV', 'AK'],
          dot: true,
        },
        {
          name: 'WhatsApp replies',
          icon: 'whatsapp',
          filled: 2,
          status: 'now',
          with: ['SV'],
          dot: true,
        },
        { name: 'Online booking', icon: 'calendar', filled: 1, status: 'next', with: ['MR'] },
        { name: 'Lead dashboard', icon: 'dashboard', filled: 1, status: 'next', with: ['AK'] },
        {
          name: 'Test on real phones',
          icon: 'phone',
          filled: 0,
          status: 'later',
          with: ['YB', 'SV'],
        },
        { name: 'Launch', icon: 'rocket', filled: 0, status: 'later', with: ['YB', 'AK', 'MR'] },
      ];
      return {
        chip: ['Design signed off', 'Stage moved to Website build'],
        title: 'Connected Website',
        icon: 'target',
        view: 'All stages',
        columns: [
          { icon: 'layers', label: 'Stage' },
          { icon: 'chart', label: 'Progress' },
          { icon: 'refresh', label: 'Status' },
          { icon: 'people', label: 'With' },
        ],
        grid: 'grid-cols-[1.5fr_1fr_0.95fr_0.7fr]',
        rows: stages.map((row, k) => [
          <Lead key="n" icon={row.icon} name={row.name} dot={row.dot} />,
          <span key="p" className="flex items-center gap-2.5">
            <Dashes filled={row.filled} color={bar(row.status)} />
            <span className="text-[11.5px] text-ink-3">{row.filled * 20}%</span>
          </span>,
          <Status key="s" kind={row.status} />,
          <Avatars key="a" who={row.with} seed={k} />,
        ]),
      };
    }
  }
}

/** The parts the portal's dashboard turns through, in order. */
export const PORTAL_VIEWS: { view: PortalView; label: string }[] = [
  { view: 'stage', label: 'Project stage' },
  { view: 'files', label: 'Files' },
  { view: 'agreement', label: 'Agreement' },
  { view: 'invoices', label: 'Invoices' },
  { view: 'requests', label: 'Requests' },
];

/**
 * The client portal, after the dashboard in Lightfield's opening: a chip saying what just
 * happened, then the portal itself — its sidebar of what it holds, and the open part as a table —
 * fading out at the foot. `view` picks the part: the project's stages, its files, the agreement,
 * the invoices or the requests.
 */
export function PortalMock({ view = 'stage' }: { view?: PortalView }) {
  const A = '#ff3d00';
  const table = tableFor(view);
  const nav: { view?: PortalView; icon: IconName; label: string }[] = [
    { icon: 'clock', label: 'Up next' },
    { view: 'stage', icon: 'gauge', label: 'Project stage' },
    { view: 'files', icon: 'file', label: 'Files' },
    { view: 'agreement', icon: 'pen', label: 'Agreement' },
    { view: 'invoices', icon: 'receipt', label: 'Invoices' },
    { view: 'requests', icon: 'chat', label: 'Requests' },
  ];
  const recent = ['New branch timings', 'Diwali offer banner', 'Add a team member'];
  return (
    <Fit w={900} h={540} max={1.2}>
      <div
        key={`chip-${view}`}
        className="view-swap absolute flex items-center gap-3 rounded-[14px] border border-[#e8e9ed] bg-white/90 py-3 pr-4 pl-4 text-[13px] shadow-[0_10px_30px_-18px_rgb(11_13_18/0.35)]"
        style={{ left: 30, top: 0, width: 470 }}
      >
        <span className="text-ink-2">
          <Icon name="check" size={15} strokeWidth={2.2} />
        </span>
        <span className="shrink-0 font-semibold">{table.chip[0]}</span>
        <span className="truncate text-ink-3">{table.chip[1]}</span>
      </div>
      <div
        className="frag-in absolute overflow-hidden rounded-[16px] border border-[#e8e9ed] bg-[#fbfbfc] shadow-[0_30px_70px_-40px_rgb(11_13_18/0.35)] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]"
        style={{ left: 30, top: 62, width: 870, height: 478, '--i': 1 } as CSSProperties}
      >
        <div className="flex h-full">
          <aside className="w-[232px] shrink-0 border-r border-[#eeeff2] px-3 py-3.5">
            <div className="flex items-center gap-2.5 px-2">
              <span className="grid size-7 place-items-center rounded-[8px] bg-[#0b0d12]">
                <BrandSymbol className="size-4" ink="#fff" />
              </span>
              <span className="flex-1 text-[14px] font-medium">Your portal</span>
              <span className="text-ink-3">
                <Icon name="bell" size={15} />
              </span>
              <span className="text-ink-3">
                <Icon name="search" size={15} />
              </span>
            </div>
            <div className="mt-4">
              {nav.map((item) => (
                <p
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-[8px] px-2 py-[7px] text-[13px] transition-colors duration-300 ${item.view === view ? 'bg-[#efeff2] text-ink' : 'text-ink-2'}`}
                >
                  <Icon name={item.icon} size={15} />
                  <span className="truncate">{item.label}</span>
                </p>
              ))}
            </div>
            <p className="mt-4 px-2 pb-1.5 text-[11.5px] text-ink-3">Recent requests</p>
            {recent.map((label) => (
              <p
                key={label}
                className="flex items-center gap-2.5 px-2 py-[7px] text-[13px] text-ink-2"
              >
                <Icon name="chat" size={15} />
                <span className="truncate">{label}</span>
              </p>
            ))}
          </aside>
          <div key={view} className="view-swap min-w-0 flex-1 bg-white">
            <div className="flex items-center gap-2.5 border-b border-[#eeeff2] px-5 py-3">
              <span className="text-ink-2">
                <Icon name={table.icon} size={16} />
              </span>
              <span className="text-[14px] font-medium">{table.title}</span>
              <span className="flex items-center gap-1.5 rounded-[7px] border border-[#e6e7eb] px-2 py-[3px] text-[12px]">
                <Icon name="table" size={13} />
                {table.view}
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-[12px] text-ink-3">
                <span className="size-1.5 rounded-full" style={{ background: A }} />
                Review on Thursday
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-[#eeeff2] px-5 py-2.5 text-[12.5px] text-ink-2">
              <Icon name="filter" size={14} />
              Filter
            </div>
            <div
              className={`grid ${table.grid} border-b border-[#eeeff2] px-5 py-2.5 text-[12px] text-ink-3`}
            >
              {table.columns.map((c) => (
                <span key={c.label} className="flex items-center gap-2">
                  <Icon name={c.icon} size={13} />
                  {c.label}
                </span>
              ))}
            </div>
            {table.rows.map((cells, k) => (
              <div
                key={k}
                className={`grid ${table.grid} items-center border-b border-[#f2f2f4] px-5 py-[9px] text-[13px]`}
              >
                {cells.map((cell, j) => (
                  <span key={j} className="min-w-0">
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fit>
  );
}
