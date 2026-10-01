import type { CSSProperties } from 'react';

import type { Brand } from './concept-sites';

/**
 * The service pages' pictures: one drawing per example business, in nothing but the business's own
 * colour — white, pale steps of it, the colour itself and a deep step of it, with ink for the
 * outlines.
 */

export type FamilyArtKind =
  | 'tooth'
  | 'scissors'
  | 'hanger'
  | 'sofa'
  | 'van'
  | 'plate'
  | 'solar'
  | 'towers'
  | 'books'
  | 'parts'
  | 'crane'
  | 'people'
  | 'plane'
  | 'gavel'
  | 'ledger';

export function FamilyArt({ kind, b }: { kind: FamilyArtKind; b: Brand }) {
  /** A pale step of the colour: `p`% of it on white. */
  const t = (p: number): CSSProperties => ({
    fill: `color-mix(in srgb, ${b.accent} ${p}%, white)`,
  });
  /** A deep step of the colour: `p`% of it on ink. */
  const dk = (p: number): CSSProperties => ({
    fill: `color-mix(in srgb, ${b.accent} ${p}%, #0b0d12)`,
  });
  const line = { stroke: b.ink, strokeWidth: 3, strokeLinejoin: 'round' as const };
  const common = { width: '100%', height: '100%', preserveAspectRatio: 'xMidYMid slice' } as const;

  switch (kind) {
    case 'tooth':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(14)} />
          <circle cx="300" cy="70" r="120" style={t(24)} />
          <circle cx="90" cy="260" r="90" style={t(34)} />
          <path
            d="M150 110c0-30 25-45 50-35 25-10 50 5 50 35 0 40-15 70-25 90-6 12-16 10-18-4l-7-40-7 40c-2 14-12 16-18 4-10-20-25-50-25-90z"
            fill="#fff"
            {...line}
          />
          <path d="M290 84l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill={b.accent} />
          <path
            d="M118 70l3.5 9 9 3.5-9 3.5-3.5 9-3.5-9-9-3.5 9-3.5z"
            fill={b.accent}
            opacity="0.7"
          />
          <g transform="rotate(28 318 214)">
            <rect x="311" y="176" width="14" height="96" rx="7" fill={b.accent} />
            <rect x="307" y="150" width="22" height="34" rx="6" fill="#fff" {...line} />
            <path d="M312 160h12M312 168h12M312 176h12" stroke={b.ink} strokeWidth="2" />
          </g>
        </svg>
      );
    case 'scissors':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="290" cy="90" r="115" style={t(24)} />
          <circle cx="70" cy="250" r="80" style={t(34)} />
          <circle cx="272" cy="118" r="72" fill="#fff" {...line} />
          <circle cx="272" cy="118" r="60" style={t(20)} />
          <path
            d="M236 92c10-15 25-22 40-22"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <g transform="translate(142 176)">
            {[-20, 20].map((deg) => (
              <g key={deg} transform={`rotate(${deg})`}>
                <path d="M-6 0L-3-112q3-9 6 0L6 0z" fill="#fff" {...line} />
                <path d="M0 0v22" stroke={b.ink} strokeWidth="6" />
                <circle cx="0" cy="42" r="19" fill="none" stroke={b.accent} strokeWidth="9" />
              </g>
            ))}
            <circle r="6" fill={b.ink} />
          </g>
          <rect x="232" y="218" width="124" height="20" rx="6" style={dk(70)} />
          {Array.from({ length: 14 }, (_, i) => (
            <path
              key={i}
              d={`M${240 + i * 8} 236v20`}
              style={{ stroke: `color-mix(in srgb, ${b.accent} 70%, #0b0d12)` }}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case 'hanger':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="90" cy="70" r="90" style={t(24)} />
          <circle cx="340" cy="250" r="80" style={t(30)} />
          <path d="M40 40H360" stroke={b.ink} strokeWidth="4" strokeLinecap="round" />
          <path d="M200 40v12c0 8-8 10-8 16" stroke={b.ink} strokeWidth="3" fill="none" />
          <path
            d="M160 78l40-12 40 12 42 32-22 30-18-12v130H158V128l-18 12-22-30z"
            fill={b.accent}
            {...line}
          />
          <path d="M186 72q14 22 28 0" stroke="#fff" strokeWidth="3" fill="none" />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => (
              <path
                key={`${r}-${c}`}
                d={`M${178 + c * 22} ${136 + r * 28}l6-7 6 7-6 7z`}
                style={t(55)}
              />
            )),
          )}
          <g transform="rotate(12 276 180)">
            <path d="M252 152h46v62h-46z" fill="#fff" {...line} />
            <circle cx="275" cy="164" r="4" fill={b.ink} />
            <rect x="262" y="184" width="26" height="6" rx="3" fill={b.accent} />
            <rect x="262" y="196" width="18" height="6" rx="3" style={t(40)} />
          </g>
          <rect x="36" y="206" width="92" height="18" rx="5" style={t(45)} {...line} />
          <rect x="30" y="224" width="104" height="18" rx="5" style={dk(80)} {...line} />
          <rect x="40" y="242" width="86" height="18" rx="5" style={t(25)} {...line} />
        </svg>
      );
    case 'sofa':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(10)} />
          <rect y="232" width="400" height="68" style={t(24)} />
          <rect x="72" y="52" width="110" height="78" rx="6" fill="#fff" {...line} />
          <path d="M80 122l30-30 22 18 18-14 24 26z" style={t(45)} />
          <circle cx="152" cy="76" r="8" fill={b.accent} />
          <ellipse cx="190" cy="262" rx="150" ry="16" style={t(42)} />
          <path d="M330 92v136" stroke={b.ink} strokeWidth="3" />
          <path d="M306 92h48l-10-34h-28z" fill={b.accent} {...line} />
          <ellipse cx="330" cy="230" rx="18" ry="4" fill={b.ink} />
          <rect x="86" y="140" width="208" height="60" rx="16" fill={b.accent} />
          <rect x="104" y="152" width="80" height="40" rx="12" style={t(45)} />
          <rect x="196" y="152" width="80" height="40" rx="12" style={t(45)} />
          <rect x="70" y="186" width="240" height="34" rx="12" style={dk(75)} />
          <rect x="60" y="166" width="34" height="58" rx="12" style={dk(75)} />
          <rect x="286" y="166" width="34" height="58" rx="12" style={dk(75)} />
          <path d="M82 224v14M298 224v14" stroke={b.ink} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'van':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="320" cy="70" r="100" style={t(24)} />
          <rect y="232" width="400" height="68" style={t(28)} />
          <rect x="262" y="160" width="80" height="72" style={t(42)} {...line} />
          <path d="M302 160v72" stroke="#fff" strokeWidth="5" />
          <rect x="280" y="104" width="60" height="56" fill={b.accent} {...line} />
          <path d="M310 104v56" stroke="#fff" strokeWidth="5" />
          <rect x="40" y="118" width="156" height="94" rx="10" fill="#fff" {...line} />
          <rect x="40" y="168" width="156" height="12" style={t(40)} />
          <circle cx="92" cy="146" r="13" fill={b.accent} />
          <path d="M196 140h38l28 32v40h-66z" fill={b.accent} {...line} />
          <path d="M204 148h26l20 24h-46z" style={t(30)} {...line} strokeWidth={2} />
          {[88, 226].map((x) => (
            <g key={x}>
              <circle cx={x} cy="214" r="19" fill={b.ink} />
              <circle cx={x} cy="214" r="7" style={t(40)} />
            </g>
          ))}
        </svg>
      );
    case 'plate':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="200" cy="150" r="135" style={t(22)} />
          <ellipse cx="200" cy="196" rx="156" ry="54" fill="#fff" {...line} />
          <ellipse cx="200" cy="196" rx="122" ry="38" style={t(8)} />
          <path d="M130 152h140a70 62 0 0 1-140 0z" fill={b.accent} {...line} />
          <ellipse cx="200" cy="152" rx="70" ry="12" style={dk(70)} />
          <ellipse cx="200" cy="148" rx="56" ry="8" style={t(50)} />
          <path d="M78 196h44a22 18 0 0 1-44 0z" style={t(45)} {...line} strokeWidth={2.5} />
          <path d="M278 196h44a22 18 0 0 1-44 0z" style={t(45)} {...line} strokeWidth={2.5} />
          <path
            d="M178 118c-10-15 10-25 0-40M202 118c-10-15 10-25 0-40M226 118c-10-15 10-25 0-40"
            style={{ stroke: `color-mix(in srgb, ${b.accent} 50%, white)` }}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M336 122l26-52" stroke={b.ink} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="366" cy="62" rx="9" ry="14" fill={b.ink} transform="rotate(27 366 62)" />
        </svg>
      );
    case 'solar':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(10)} />
          <circle cx="318" cy="70" r="30" fill={b.accent} />
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d="M318 30v-12"
              stroke={b.accent}
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${i * 45} 318 70)`}
            />
          ))}
          <rect y="236" width="400" height="64" style={t(26)} />
          <rect x="64" y="144" width="236" height="96" fill="#fff" {...line} />
          <path d="M56 144h252" stroke={b.ink} strokeWidth="5" strokeLinecap="round" />
          {[0, 1, 2].map((i) => {
            const x = 80 + i * 72;
            return (
              <g key={i}>
                <path d={`M${x} 140l12-40h54l-6 40z`} style={dk(78)} {...line} />
                <path
                  d={`M${x + 21} 140l10-40M${x + 41} 140l8-40M${x + 6} 120h60`}
                  style={{ stroke: `color-mix(in srgb, ${b.accent} 45%, white)` }}
                  strokeWidth="2"
                />
              </g>
            );
          })}
          <rect x="94" y="168" width="44" height="34" style={t(30)} {...line} strokeWidth={2.5} />
          <rect x="226" y="168" width="44" height="34" style={t(30)} {...line} strokeWidth={2.5} />
          <rect
            x="162"
            y="186"
            width="40"
            height="54"
            fill={b.accent}
            {...line}
            strokeWidth={2.5}
          />
        </svg>
      );
    case 'towers':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(10)} />
          <circle cx="300" cy="80" r="100" style={t(22)} />
          <rect y="244" width="400" height="56" style={t(28)} />
          <rect x="90" y="66" width="92" height="178" fill="#fff" {...line} />
          {Array.from({ length: 6 }, (_, r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={102 + c * 26}
                y={82 + r * 26}
                width="16"
                height="13"
                style={(r + c) % 4 === 1 ? { fill: b.accent } : t(30)}
              />
            )),
          )}
          <rect x="190" y="108" width="112" height="136" fill={b.accent} {...line} />
          {Array.from({ length: 4 }, (_, r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={202 + c * 24}
                y={124 + r * 28}
                width="14"
                height="14"
                style={t(55)}
              />
            )),
          )}
          <circle cx="54" cy="220" r="24" style={t(45)} />
          <rect x="51" y="232" width="6" height="14" fill={b.ink} />
          <path d="M338 196v48" stroke={b.ink} strokeWidth="4" />
          <rect
            x="306"
            y="170"
            width="66"
            height="34"
            rx="5"
            fill="#fff"
            {...line}
            strokeWidth={2.5}
          />
          <rect x="316" y="183" width="46" height="8" rx="4" fill={b.accent} />
        </svg>
      );
    case 'books':
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="320" cy="60" r="80" style={t(24)} />
          <circle cx="60" cy="250" r="60" style={t(32)} />
          <rect x="110" y="192" width="200" height="30" rx="4" fill={b.accent} {...line} />
          <rect x="125" y="162" width="175" height="30" rx="4" style={t(40)} {...line} />
          <rect x="100" y="132" width="190" height="30" rx="4" fill="#fff" {...line} />
          <path d="M140 132v30M270 162v30M140 192v30" stroke={b.ink} strokeWidth="2" />
          <path d="M200 58l60 25-60 25-60-25z" fill={b.ink} />
          <path d="M235 93v25c-20 12-50 12-70 0V93" fill="none" stroke={b.ink} strokeWidth="3" />
          <path d="M260 83v34" stroke={b.accent} strokeWidth="3" />
          <circle cx="260" cy="120" r="5" fill={b.accent} />
          <g transform="rotate(-40 330 190)">
            <rect
              x="300"
              y="182"
              width="70"
              height="16"
              style={t(55)}
              {...line}
              strokeWidth={2.5}
            />
            <path d="M370 182l16 8-16 8z" fill={b.ink} />
            <rect x="292" y="182" width="10" height="16" fill={b.accent} />
          </g>
        </svg>
      );
    case 'parts':
      // An industrial distributor's stock: a rack of bins, a gear and a bolt.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="310" cy="80" r="100" style={t(24)} />
          <rect y="240" width="400" height="60" style={t(28)} />
          <path d="M52 56v184M236 56v184" stroke={b.ink} strokeWidth="4" strokeLinecap="round" />
          {[104, 170, 236].map((y, r) => (
            <g key={y}>
              {[0, 1, 2].map((c) => {
                const fill =
                  (r + c) % 3 === 0 ? { fill: b.accent } : (r + c) % 3 === 1 ? t(45) : t(18);
                return (
                  <g key={c}>
                    <rect
                      x={62 + c * 58}
                      y={y - 38}
                      width="50"
                      height="38"
                      rx="4"
                      style={fill}
                      {...line}
                      strokeWidth={2.5}
                    />
                    <rect x={74 + c * 58} y={y - 26} width="26" height="8" rx="3" fill="#fff" />
                  </g>
                );
              })}
              <rect x="46" y={y} width="196" height="8" rx="2" style={dk(75)} />
            </g>
          ))}
          <g transform="translate(314 188)">
            {Array.from({ length: 8 }, (_, i) => (
              <rect
                key={i}
                x="-8"
                y="-44"
                width="16"
                height="18"
                rx="3"
                fill={b.accent}
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle r="32" fill={b.accent} />
            <circle r="12" style={t(20)} {...line} strokeWidth={2.5} />
          </g>
          <g transform="rotate(-30 300 96)">
            <path d="M282 72h36l8 14-8 14h-36l-8-14z" style={dk(75)} />
            <rect
              x="292"
              y="100"
              width="16"
              height="56"
              rx="3"
              style={t(55)}
              {...line}
              strokeWidth={2.5}
            />
            <path d="M292 112h16M292 124h16M292 136h16" stroke={b.ink} strokeWidth="2" />
          </g>
        </svg>
      );
    case 'crane':
      // A building going up under a tower crane.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(10)} />
          <circle cx="330" cy="70" r="80" style={t(22)} />
          <rect y="240" width="400" height="60" style={t(30)} />
          <path d="M170 120V86M245 120V86M320 120V86M170 86h150" stroke={b.ink} strokeWidth="3" />
          <rect x="170" y="120" width="150" height="120" fill="#fff" {...line} />
          <path d="M170 160h150M170 200h150" stroke={b.ink} strokeWidth="2" />
          {[0, 1].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={182 + c * 34}
                y={130 + r * 40}
                width="22"
                height="20"
                style={t(35)}
              />
            )),
          )}
          <rect
            x="222"
            y="206"
            width="46"
            height="34"
            fill={b.accent}
            {...line}
            strokeWidth={2.5}
          />
          <path
            d="M74 240V52M94 240V52M74 60l20 20-20 20 20 20-20 20 20 20-20 20 20 20-20 20 20 20"
            style={{ stroke: `color-mix(in srgb, ${b.accent} 60%, #0b0d12)` }}
            strokeWidth="3.5"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M36 46h268M36 60h268M60 46l14 14 14-14 14 14 14-14 14 14 14-14 14 14 14-14 14 14 14-14 14 14 14-14 14 14 14-14 14 14 14-14"
            style={{ stroke: `color-mix(in srgb, ${b.accent} 60%, #0b0d12)` }}
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
          />
          <rect x="30" y="60" width="32" height="24" rx="3" fill={b.ink} />
          <rect
            x="94"
            y="60"
            width="26"
            height="20"
            rx="3"
            fill={b.accent}
            {...line}
            strokeWidth={2}
          />
          <path d="M272 60v44" stroke={b.ink} strokeWidth="2" />
          <rect
            x="238"
            y="104"
            width="68"
            height="12"
            rx="3"
            fill={b.accent}
            {...line}
            strokeWidth={2}
          />
        </svg>
      );
    case 'people':
      // A recruiter's shortlist: three candidates, one matched, joined up.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="320" cy="70" r="90" style={t(24)} />
          <circle cx="60" cy="250" r="70" style={t(32)} />
          {[
            [48, 96],
            [252, 104],
          ].map(([x, y]) => (
            <g key={x}>
              <rect x={x} y={y} width="110" height="130" rx="14" fill="#fff" {...line} />
              <circle cx={x! + 55} cy={y! + 40} r="18" style={t(40)} />
              <path d={`M${x! + 31} ${y! + 84}a24 18 0 0 1 48 0z`} style={t(40)} />
              <rect x={x! + 25} y={y! + 96} width="60" height="8" rx="4" style={t(45)} />
              <rect x={x! + 33} y={y! + 110} width="44" height="6" rx="3" style={t(25)} />
            </g>
          ))}
          <rect x="145" y="58" width="120" height="164" rx="14" fill="#fff" {...line} />
          <circle cx="205" cy="104" r="22" fill={b.accent} />
          <path d="M175 156a30 22 0 0 1 60 0z" fill={b.accent} />
          <rect x="170" y="166" width="70" height="9" rx="4.5" style={dk(70)} />
          <rect x="165" y="188" width="80" height="20" rx="10" fill={b.accent} />
          <path
            d="M193 198l6 5 11-10"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M103 238c30 30 170 30 204 0"
            style={{ stroke: `color-mix(in srgb, ${b.accent} 60%, #0b0d12)` }}
            strokeWidth="3"
            strokeDasharray="6 7"
            fill="none"
          />
        </svg>
      );
    case 'plane':
      // A trip: the plane on its way, the route behind it, the case packed.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="322" cy="66" r="32" fill={b.accent} />
          <ellipse cx="96" cy="72" rx="42" ry="14" fill="#fff" />
          <ellipse cx="126" cy="62" rx="26" ry="14" fill="#fff" />
          <ellipse cx="312" cy="138" rx="38" ry="12" fill="#fff" />
          <path
            d="M40 262C120 240 170 190 236 136"
            style={{ stroke: `color-mix(in srgb, ${b.accent} 60%, #0b0d12)` }}
            strokeWidth="3"
            strokeDasharray="8 8"
            fill="none"
          />
          <g transform="rotate(-32 262 122)">
            <path d="M262 118l-32-44h18l42 44z" fill={b.accent} {...line} strokeWidth={2.5} />
            <path d="M262 126l-32 44h18l42-44z" fill={b.accent} {...line} strokeWidth={2.5} />
            <path d="M200 116l-14-24h12l20 24z" fill={b.accent} {...line} strokeWidth={2.5} />
            <path
              d="M198 114h110c16 0 28 4 28 8s-12 8-28 8H198c-7 0-12-4-12-8s5-8 12-8z"
              fill="#fff"
              {...line}
            />
            {[222, 238, 254, 270, 286].map((x) => (
              <circle key={x} cx={x} cy="120" r="3" style={dk(60)} />
            ))}
          </g>
          <rect x="60" y="178" width="84" height="62" rx="10" fill={b.accent} {...line} />
          <path d="M86 178v-12h32v12" stroke={b.ink} strokeWidth="3" fill="none" />
          <path d="M82 184v50M122 184v50" stroke="#fff" strokeOpacity="0.55" strokeWidth="5" />
          <circle cx="76" cy="244" r="5" fill={b.ink} />
          <circle cx="128" cy="244" r="5" fill={b.ink} />
        </svg>
      );
    case 'gavel':
      // Scales and a gavel on the desk.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="300" cy="80" r="110" style={t(24)} />
          <rect y="244" width="400" height="56" style={t(28)} />
          <path d="M150 74v160" stroke={b.ink} strokeWidth="5" />
          <path d="M112 244h76l-10-14h-56z" style={dk(75)} />
          <path d="M88 92h124" stroke={b.ink} strokeWidth="4" strokeLinecap="round" />
          <circle cx="150" cy="72" r="9" fill={b.accent} {...line} strokeWidth={2} />
          <path
            d="M88 92l-22 56M88 92l22 56M212 92l-22 56M212 92l22 56"
            stroke={b.ink}
            strokeWidth="2"
          />
          <path d="M62 148h52a26 13 0 0 1-52 0z" fill={b.accent} {...line} />
          <path d="M186 148h52a26 13 0 0 1-52 0z" fill={b.accent} {...line} />
          <rect x="266" y="226" width="80" height="16" rx="5" style={dk(75)} />
          <g transform="rotate(-35 306 170)">
            <rect x="300" y="150" width="13" height="92" rx="6" style={dk(70)} />
            <rect x="268" y="124" width="78" height="32" rx="8" fill={b.accent} {...line} />
            <rect x="280" y="124" width="9" height="32" style={t(55)} />
            <rect x="325" y="124" width="9" height="32" style={t(55)} />
          </g>
        </svg>
      );
    case 'ledger':
      // The books: a ledger page with its total ticked, and a calculator.
      return (
        <svg viewBox="0 0 400 300" {...common}>
          <rect width="400" height="300" style={t(12)} />
          <circle cx="90" cy="70" r="80" style={t(24)} />
          <circle cx="340" cy="250" r="80" style={t(30)} />
          <rect x="64" y="44" width="172" height="214" rx="10" fill="#fff" {...line} />
          <rect x="84" y="64" width="80" height="10" rx="5" fill={b.ink} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x="84" y={94 + i * 22} width="92" height="7" rx="3.5" style={t(35)} />
              <rect x="186" y={94 + i * 22} width="30" height="7" rx="3.5" style={t(60)} />
            </g>
          ))}
          <path d="M84 212h132" stroke={b.ink} strokeWidth="2" />
          <rect x="162" y="222" width="54" height="11" rx="5.5" fill={b.accent} />
          <circle cx="232" cy="52" r="18" fill={b.accent} />
          <path
            d="M224 52l6 6 11-12"
            stroke="#fff"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="252" y="112" width="104" height="136" rx="14" style={dk(78)} />
          <rect x="264" y="124" width="80" height="28" rx="6" style={t(40)} />
          {Array.from({ length: 4 }, (_, r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={264 + c * 28}
                y={162 + r * 21}
                width="22"
                height="15"
                rx="4"
                style={c === 2 ? { fill: b.accent } : { fill: '#fff', opacity: 0.9 }}
              />
            )),
          )}
        </svg>
      );
  }
}
