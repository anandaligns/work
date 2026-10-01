import type { IconName } from '../ui/icon';

/**
 * The product screens, as data. Every screen on a story-led page is one of these, written into
 * the page's content file with its example business's sample data: Indian names, rupee amounts,
 * Bangalore localities. Figures inside a screen are part of the example, never a result claimed.
 * A WhatsApp conversation is drawn the way WhatsApp draws it, so it reads as the real thing; no
 * other third-party marks inside a screen, and a payment page names no gateway. One accent per
 * screen — the example business's own, from its concept site.
 */
export type BrandId =
  | 'kora'
  | 'saffron'
  | 'northfield'
  | 'loom'
  | 'brightpath'
  | 'ember'
  | 'meridian'
  | 'fieldnote'
  | 'tessel'
  /** The reader's own business: the product as they would have it, in the page's accent. */
  | 'yours'
  /** The reader's own salon: the booking page under test. */
  | 'yoursalon'
  /** The reader's own studio, selling pieces and booking workshops. */
  | 'yourstudio'
  // One per service page, each a different kind of business in its own colour.
  | 'interiordesign'
  | 'fashionstore'
  | 'partsdistributor'
  | 'logistics'
  | 'restaurant'
  | 'solarenergy'
  | 'school'
  | 'realestate'
  | 'construction'
  | 'recruitment'
  | 'dentalclinic'
  | 'salon'
  | 'travelagency'
  | 'lawfirm'
  | 'accounting';

export type Tone = 'green' | 'amber' | 'grey' | 'accent' | 'red';
export type Pill = { text: string; tone?: Tone };

export type Message = {
  from: 'them' | 'us' | 'note';
  text?: string;
  time?: string;
  /** Quick replies or a call to action under the message. */
  buttons?: string[];
  /** A document, attached. */
  doc?: { title: string; meta?: string };
  /** A place, with a map pin. */
  location?: string;
  /** Where an assistant's answer came from, shown as a small chip under it. */
  source?: string;
};

/**
 * A message in a WhatsApp conversation, as WhatsApp draws it. `customer` and `business` say who
 * sent it, so the same thread reads right on the customer's phone (theirs on the right, in green)
 * and in the business's inbox (the business's on the right).
 */
export type WaMessage = {
  from: 'customer' | 'business' | 'day' | 'system' | 'note';
  text: string;
  time?: string;
  /** A template's bold header, over the text. */
  header?: string;
  /** A template's grey footer, under the text. */
  footer?: string;
  /** Reply buttons, under the bubble. */
  buttons?: string[];
  /** A place, with its map. */
  location?: { name: string; line: string };
  /** Sent by an automation: the inbox names which. */
  auto?: string;
  /** Who on the team sent it, or wrote the note. */
  by?: string;
};

export type Row = { cells: string[]; pill?: Pill; highlight?: boolean };

/** A picture of a product for a store's screens, drawn in SVG. */
export type ProductArt = 'kurta' | 'saree' | 'tote' | 'stole' | 'cushion' | 'mug' | 'vase';

/** A tone for a chart, an event or a bar: the page's accent, or one of the quiet colours. */
export type Hue = 'accent' | 'green' | 'amber' | 'red' | 'blue' | 'violet' | 'grey';

/**
 * One block of a software screen, laid on a 12-column grid (`span`, 12 when not set): figures,
 * a chart, a table, a board, a calendar, a record, a document, a log… Each draws the way real
 * software draws it, at desktop size, with the example business's sample data.
 */
export type DeskBlock = { span?: number } & (
  | {
      type: 'kpis';
      items: { label: string; value: string; delta?: string; down?: boolean; spark?: number[] }[];
    }
  | {
      type: 'chart';
      title: string;
      meta?: string;
      /** `area` and `line` draw the series as lines; `bars` draws the first as bars. */
      style: 'area' | 'line' | 'bars';
      labels: string[];
      series: { name: string; points: number[]; hue?: Hue; dashed?: boolean }[];
      /** A value format for the axis and the marker, e.g. "₹{}k" or "{}%". */
      unit?: string;
      /** The point the marker sits on: the last, unless set. */
      mark?: number;
      height?: number;
    }
  | {
      type: 'donut';
      title: string;
      meta?: string;
      parts: { label: string; value: number; hue?: Hue }[];
      centre: { value: string; label: string };
    }
  | {
      type: 'table';
      title?: string;
      meta?: string;
      filters?: string[];
      columns: string[];
      /** A bar column's heading, when rows carry `bar`. */
      barLabel?: string;
      rows: {
        cells: string[];
        /** An avatar with initials, a tool's logo or a product picture before the first cell. */
        avatar?: boolean;
        logo?: string;
        art?: ProductArt;
        icon?: IconName;
        bar?: number;
        pill?: Pill;
        highlight?: boolean;
        fresh?: boolean;
        muted?: boolean;
      }[];
    }
  | {
      type: 'board';
      columns: {
        name: string;
        hue?: Hue;
        count?: string;
        cards: {
          title: string;
          meta?: string;
          amount?: string;
          tag?: Pill;
          people?: string[];
          due?: string;
          late?: boolean;
          art?: ProductArt;
          fresh?: boolean;
          highlight?: boolean;
        }[];
      }[];
    }
  | {
      type: 'calendar';
      title?: string;
      /** Column heads: days, or people and rooms. */
      heads: string[];
      /** The first hour shown, and how many. */
      start: number;
      hours: number;
      /** A column to shade as today. */
      today?: number;
      /** Where the red "now" line sits, in hours. */
      now?: number;
      events: {
        col: number;
        from: number;
        to: number;
        title: string;
        meta?: string;
        hue?: Hue;
        fresh?: boolean;
      }[];
    }
  | {
      type: 'record';
      title: string;
      subtitle?: string;
      avatar?: boolean;
      icon?: IconName;
      fields?: [string, string][];
      tags?: Pill[];
      timeline?: { time: string; text: string; icon?: IconName; logo?: string }[];
      actions?: string[];
    }
  | {
      type: 'doc';
      title: string;
      from: string;
      meta: [string, string, string?][];
      lines: { item: string; qty: string; amount: string; mark?: string }[];
      total: string;
      /** Labels drawn over the page where fields were read from, e.g. "Invoice no." */
      marks?: string[];
      stamp?: string;
    }
  | {
      type: 'fields';
      title: string;
      meta?: string;
      items: { label: string; value: string; confidence?: number; flag?: string }[];
      actions?: string[];
    }
  | {
      type: 'log';
      title: string;
      meta?: string;
      items: {
        time: string;
        title: string;
        meta?: string;
        logo?: string;
        icon?: IconName;
        pill?: Pill;
        fresh?: boolean;
      }[];
    }
  | {
      type: 'list';
      title: string;
      meta?: string;
      items: {
        title: string;
        meta?: string;
        value?: string;
        pill?: Pill;
        icon?: IconName;
        logo?: string;
        avatar?: boolean;
        hue?: Hue;
        done?: boolean;
      }[];
    }
  | {
      type: 'progress';
      title: string;
      meta?: string;
      items: { label: string; value: number; note?: string; hue?: Hue }[];
    }
  | {
      type: 'assistant';
      title: string;
      meta?: string;
      messages: { from: 'user' | 'bot'; text: string; sources?: string[] }[];
      input?: string;
    }
  | {
      type: 'connections';
      title?: string;
      items: { tool: string; status: Pill; meta: string }[];
    }
  | {
      type: 'uptime';
      title: string;
      value: string;
      /** One day each: 2 up, 1 slow, 0 down. */
      days: number[];
      meta?: string;
    }
  | {
      type: 'scores';
      title: string;
      meta?: string;
      items: { label: string; value: number }[];
      metrics?: [string, string][];
    }
  | {
      type: 'funnel';
      title: string;
      meta?: string;
      items: { label: string; value: number; text: string }[];
    }
  | {
      type: 'sheet';
      title: string;
      columns: string[];
      rows: { cells: string[]; fresh?: boolean }[];
    }
  | {
      type: 'mapping';
      title: string;
      from: { tool: string; fields: string[] };
      to: { tool: string; fields: string[] };
    }
  | {
      type: 'stages';
      title?: string;
      items: { label: string; meta?: string; state: 'done' | 'now' | 'next' }[];
    }
  | {
      type: 'roadmap';
      title: string;
      heads: string[];
      /** One bar a row, or several in `bars` (a room's stays, a machine's jobs). */
      rows: {
        label: string;
        from?: number;
        to?: number;
        text?: string;
        hue?: Hue;
        bars?: { from: number; to: number; text: string; hue?: Hue; fresh?: boolean }[];
      }[];
      /** Where "today" falls, in columns from the left. */
      now?: number;
    }
  | { type: 'site'; title?: string; brand: BrandId; url: string }
  | {
      type: 'form';
      title: string;
      meta?: string;
      fields: { label: string; value: string; kind?: 'text' | 'select' | 'toggle' | 'area' }[];
      actions?: string[];
    }
  | {
      type: 'cohort';
      title: string;
      meta?: string;
      heads: string[];
      rows: { label: string; values: number[] }[];
    }
  | {
      type: 'requests';
      title: string;
      items: { method: string; path: string; status: number; ms: number; time: string }[];
    }
  | {
      type: 'matrix';
      title: string;
      heads: string[];
      rows: { label: string; values: boolean[] }[];
    }
  | {
      type: 'plans';
      title: string;
      items: { name: string; price: string; line: string; current?: boolean }[];
    }
  | { type: 'note'; title: string; text: string; icon?: IconName; hue?: Hue }
  | { type: 'whatsapp'; title: string; meta?: string; messages: WaMessage[] }
);

/**
 * One block of a phone screen, top to bottom: a figure card, figures, a chart, a list, steps,
 * choices, dates and times, fields, a product, a payment, bubbles, a map, a document…
 */
export type PhoneBlock =
  | { t: 'hero'; eyebrow?: string; value: string; label?: string; line?: string; dark?: boolean }
  | { t: 'stats'; items: { label: string; value: string; delta?: string; down?: boolean }[] }
  | {
      t: 'chart';
      title: string;
      meta?: string;
      points: number[];
      labels?: string[];
      bars?: boolean;
    }
  | {
      t: 'list';
      title?: string;
      action?: string;
      items: {
        title: string;
        meta?: string;
        value?: string;
        pill?: Pill;
        icon?: IconName;
        logo?: string;
        avatar?: boolean;
        art?: ProductArt;
        done?: boolean;
        hue?: Hue;
      }[];
    }
  | {
      t: 'steps';
      title?: string;
      items: { title: string; meta?: string; state: 'done' | 'now' | 'next' }[];
    }
  | { t: 'chips'; label?: string; items: string[]; active?: number }
  | { t: 'dates'; label?: string; items: [string, string][]; active: number }
  | { t: 'slots'; label?: string; items: string[]; active?: number; taken?: number[] }
  | { t: 'fields'; items: { label: string; value: string; focus?: boolean }[] }
  | {
      t: 'product';
      art: ProductArt;
      name: string;
      price: string;
      was?: string;
      line?: string;
      sizes?: string[];
      size?: number;
    }
  | { t: 'pay'; to: string; amount: string; methods: string[]; active: number }
  | { t: 'note'; text: string; icon?: IconName; tone?: 'accent' | 'green' | 'amber' }
  | { t: 'chat'; messages: { from: 'user' | 'bot'; text: string; sources?: string[] }[] }
  | { t: 'map'; line: string; meta?: string }
  | {
      t: 'doc';
      title: string;
      meta?: string;
      lines: [string, string][];
      total?: [string, string];
    }
  | { t: 'check'; title?: string; items: { text: string; done?: boolean }[]; photos?: number }
  | {
      t: 'results';
      query: string;
      local: { name: string; rating: string; meta: string; mine?: boolean }[];
      links: { site: string; title: string; text: string }[];
    }
  | {
      t: 'mail';
      from: string;
      subject: string;
      time: string;
      lines: string[];
      fields?: [string, string][];
    }
  | { t: 'flow'; items: { tool: string; title: string; meta: string; done?: boolean }[] }
  | { t: 'sign'; name: string }
  | { t: 'buttons'; items: string[] }
  | { t: 'share'; app: string; url: string };

/** A phone screen made of blocks: its header, the blocks, and a button held at the foot. */
export type PhoneScreen = {
  type: 'screen';
  /** `app` is an app's own header; `google`, `mail` and `camera` are those apps. */
  chrome?: 'app' | 'google' | 'mail' | 'camera';
  title?: string;
  sub?: string;
  back?: boolean;
  action?: IconName;
  grey?: boolean;
  blocks: PhoneBlock[];
  cta?: string;
  ctaNote?: string;
  /** A second button beside the first. */
  alt?: string;
};

/** A dish, drawn for a food app's pictures. */
export type Dish = 'dosa' | 'coffee' | 'thali' | 'idli' | 'vada';

/** One screen of a real app, as its customer sees it. */
export type MobileView =
  | {
      type: 'home';
      place: string;
      greeting: string;
      promo: { eyebrow: string; title: string; line: string; dish: Dish };
      chips: string[];
      again: { name: string; price: string; dish: Dish }[];
    }
  | {
      type: 'item';
      name: string;
      line: string;
      price: string;
      dish: Dish;
      options: { label: string; choices: string[] }[];
      cta: string;
    }
  | {
      type: 'cart';
      pickup: string;
      items: { name: string; qty: number; price: string; dish: Dish }[];
      bill: [string, string][];
      total: string;
      method: string;
      cta: string;
    }
  | {
      type: 'track';
      status: string;
      eta: string;
      steps: string[];
      current: number;
      code: string;
      place: string;
    }
  | {
      type: 'rewards';
      tier: string;
      points: string;
      next: string;
      progress: number;
      perks: { title: string; cost: string; dish: Dish }[];
    }
  | {
      type: 'booking';
      dates: { day: string; date: string }[];
      date: number;
      guests: number;
      times: string[];
      time: number;
      note: string;
      cta: string;
    }
  | { type: 'signin'; title: string; line: string; phone: string; code: string; cta: string }
  | { type: 'about'; version: string; rows: [string, string][]; notes: string[] }
  /** WhatsApp, open on a chat with the business: the customer's own phone. */
  | { type: 'whatsapp'; name?: string; line?: string; messages: WaMessage[]; draft?: string }
  | PhoneScreen;

export type Screen =
  | {
      kind: 'chat';
      /** The example business; without one, the thread is "Your Business". */
      brand?: BrandId;
      /** A phone around it, or a plain card. */
      frame?: 'phone' | 'card';
      title?: string;
      messages: Message[];
    }
  | { kind: 'notice'; title: string; line?: string; brand?: BrandId }
  | {
      kind: 'email';
      brand?: BrandId;
      from: string;
      subject: string;
      lines?: string[];
      action?: string;
    }
  | {
      kind: 'doc';
      brand?: BrandId;
      title: string;
      meta?: string;
      rows?: [string, string][];
      total?: [string, string];
      stamp?: Pill;
      action?: string;
    }
  | {
      kind: 'table';
      brand?: BrandId;
      title: string;
      filters?: string[];
      columns: string[];
      rows: Row[];
      panel?: { title: string; lines: string[]; action?: string };
    }
  | {
      kind: 'record';
      brand?: BrandId;
      name: string;
      meta: string[];
      pill?: Pill;
      timeline: { time: string; text: string }[];
      next?: string;
    }
  | {
      kind: 'dashboard';
      brand?: BrandId;
      title: string;
      tiles: { label: string; value: string; note?: string }[];
      chart?: { label: string; bars: number[]; line?: boolean };
      columns?: string[];
      rows?: Row[];
    }
  | {
      kind: 'board';
      brand?: BrandId;
      title: string;
      columns: { name: string; cards: { title: string; meta?: string; highlight?: boolean }[] }[];
    }
  | {
      kind: 'list';
      brand?: BrandId;
      title: string;
      items: { text: string; meta?: string; pill?: Pill; done?: boolean; highlight?: boolean }[];
      action?: string;
    }
  | {
      kind: 'stepper';
      brand?: BrandId;
      title: string;
      steps: number;
      current: number;
      label: string;
      card?: { title: string; line?: string; action?: string };
    }
  | {
      kind: 'form';
      brand?: BrandId;
      title: string;
      fields: { label: string; value: string }[];
      action?: string;
      note?: string;
    }
  | { kind: 'search'; results: { title: string; url: string; text: string }[] }
  | {
      /** A whole application window: a sidebar of sections, then its panes. */
      kind: 'app';
      brand?: BrandId;
      title: string;
      nav?: { label: string; count?: string; active?: boolean }[];
      panes: Pane[];
    }
  | { kind: 'flow'; brand?: BrandId; title: string; status?: Pill; nodes: FlowNode[] }
  /** Any screen inside a phone: an app's own screen, as a customer holds it. */
  | { kind: 'phone'; brand?: BrandId; app?: string; screen: Screen }
  /**
   * A real-looking iPhone: an app (its name in the header, an iOS tab bar at the foot) or, with
   * `url`, Safari showing a website.
   */
  | {
      kind: 'iphone';
      brand?: BrandId;
      app?: string;
      /** The app's tab bar, and which tab is chosen (the first, unless set). */
      tabs?: string[];
      tab?: number;
      url?: string;
      /** The lock screen, with notifications, in place of the app. */
      lock?: {
        date: string;
        /** `whatsapp`: the notification came on WhatsApp, and wears its icon. */
        notes: { title: string; text: string; time: string; via?: 'whatsapp' }[];
      };
      screen?: Screen;
    }
  /** A real-looking MacBook, with Chrome open on `url`. */
  | { kind: 'macbook'; brand?: BrandId; url: string; tab: string; screen: Screen }
  /** A real app's screen, on an iPhone: its own header, its tab bar. */
  | { kind: 'mobile'; brand?: BrandId; tabs?: string[]; tab?: number; view: MobileView }
  /** A business's admin, as real software looks: sidebar, figures, the table and a record. */
  | {
      kind: 'admin';
      brand?: BrandId;
      section: string;
      nav: string[];
      counts?: Record<string, string>;
      outlets?: string[];
      tabs?: string[];
      kpis: { label: string; value: string; note?: string; spark?: number[] }[];
      /** The first column is the record; the rest follow. */
      columns: string[];
      rows: {
        title: string;
        meta?: string;
        /** Dish pictures shown in the first data column. */
        dishes?: Dish[];
        cells: string[];
        pill?: Pill;
        highlight?: boolean;
        /** The row that arrives as the page opens. */
        fresh?: boolean;
      }[];
      detail?: {
        title: string;
        subtitle?: string;
        items: { dish?: Dish; name: string; qty?: string; price?: string }[];
        timeline: { time: string; text: string }[];
        action?: string;
      };
    }
  /**
   * The business's WhatsApp team inbox, at desktop size: its views, the conversations, the open
   * chat as WhatsApp draws it, and the contact beside it with the automations that ran.
   */
  | {
      kind: 'inbox';
      brand?: BrandId;
      views: { label: string; count?: string }[];
      chats: {
        name: string;
        text: string;
        time: string;
        /** Where the conversation began: Website, Instagram ad, Google, WhatsApp. */
        source?: string;
        tag?: Pill;
        unread?: number;
        /** The last message was sent by an automation. */
        auto?: boolean;
        active?: boolean;
        /** The conversation that arrives as the page opens. */
        fresh?: boolean;
      }[];
      thread: { name: string; phone: string; line?: string; messages: WaMessage[]; draft?: string };
      contact: {
        fields: [string, string][];
        tags: Pill[];
        automations: { title: string; meta: string; pill: Pill }[];
        next?: { title: string; line: string };
      };
    }
  /**
   * The automation builder, at desktop size: the list of automations, the open one's steps on
   * a canvas, and the chosen step's settings with a preview of its WhatsApp message.
   */
  | {
      kind: 'automation';
      brand?: BrandId;
      flows: { name: string; line: string; status: Pill; runs?: string }[];
      /** Which flow is open. */
      open: number;
      /** The open flow's figures, e.g. "312 started". */
      stats?: string[];
      nodes: FlowNode[];
      /** Which step is chosen. */
      selected?: number;
      inspector: {
        title: string;
        fields: [string, string][];
        status?: string;
        preview: WaMessage;
        rules?: string[];
      };
    }
  /**
   * Any other software at desktop size: a sidebar of sections, a top bar with the page's title,
   * tabs and actions, and blocks on a 12-column grid, with a panel down the right when set.
   */
  | {
      kind: 'desk';
      brand?: BrandId;
      /** The product's name at the top of the sidebar: the business's, unless set. */
      app?: string;
      nav: { label: string; icon: IconName; count?: string }[];
      active?: number;
      group?: { title: string; items: string[] };
      user?: { name: string; role: string };
      crumbs?: string[];
      title: string;
      tabs?: string[];
      actions?: string[];
      blocks: DeskBlock[];
      aside?: DeskBlock[];
    }
  /** Two devices together: a MacBook, and an iPhone over its lower right corner. */
  | { kind: 'duo'; back: Screen; front: Screen }
  | {
      kind: 'site';
      brand: BrandId;
      device: 'desktop' | 'phone';
      note?: string;
      /** Drawn in grey: the site as it was, before. */
      faded?: boolean;
    };

/**
 * One pane of an application window: the conversation list, a thread, a record's details, a
 * table, a board or a row of figures — side by side, as the product lays them out.
 */
export type Pane =
  | {
      kind: 'conversations';
      title?: string;
      filters?: string[];
      items: {
        name: string;
        text: string;
        time: string;
        tag?: Pill;
        active?: boolean;
        unread?: number;
      }[];
    }
  | { kind: 'thread'; name: string; meta?: string; messages: Message[]; composer?: string }
  | {
      kind: 'details';
      title: string;
      subtitle?: string;
      fields?: [string, string][];
      tags?: Pill[];
      sections?: {
        title: string;
        items: { text: string; meta?: string; pill?: Pill; done?: boolean }[];
      }[];
    }
  | { kind: 'table'; title?: string; filters?: string[]; columns: string[]; rows: Row[] }
  | {
      kind: 'board';
      columns: { name: string; cards: { title: string; meta?: string; highlight?: boolean }[] }[];
    }
  | {
      kind: 'stats';
      tiles: { label: string; value: string; note?: string }[];
      chart?: { label: string; bars: number[] };
    };

/** A step of an automation, as the flow builder draws it. */
export type FlowNode = {
  kind: 'trigger' | 'send' | 'wait' | 'check' | 'alert' | 'stop';
  title: string;
  text?: string;
  /** For a check: its two answers. */
  branches?: [string, string];
};

/**
 * A hero: its main screen, one more over its lower right, sometimes a third over its lower left
 * (from the small tablet up), and the notification card.
 */
export type HeroScreen = {
  main: Screen;
  side?: Screen;
  extra?: Screen;
  notice: { title: string; line?: string };
};
