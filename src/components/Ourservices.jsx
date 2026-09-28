import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  AppWindow,
  ArrowRight,
  Globe,
  LifeBuoy,
  PenTool,
  Plus,
  Server,
  Workflow,
} from "lucide-react";

/* =========================================================
   TOKENS
========================================================= */

const C = {
  cream: "#f5e9df",
  orange: "#e56b3f",
  brown: "#71352d",
  ink: "#150c09",
};

const ease = [0.16, 1, 0.3, 1];

/* how much scroll (in vh) each service gets in desktop sticky mode */
const SEGMENT_VH = 42;

const PHASES = ["Discover", "Design", "Develop", "Integrate", "Deliver"];

/* =========================================================
   SHARED SVG PRIMITIVES
========================================================= */

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stroke = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.85, ease } },
};

const Svg = ({ label, reduce, children }) => (
  <motion.svg
    viewBox="0 0 420 260"
    preserveAspectRatio="xMidYMid meet"
    className="h-full w-full"
    role="img"
    aria-label={label}
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduce ? 0 : 0.06,
          delayChildren: reduce ? 0 : 0.2,
        },
      },
    }}
  >
    {children}
  </motion.svg>
);

const Pulse = ({ x, y, reduce, delay = 0 }) => (
  <g>
    <circle cx={x} cy={y} r="3" fill={C.orange} />
    {!reduce && (
      <motion.circle
        cx={x}
        cy={y}
        fill="none"
        stroke={C.orange}
        strokeWidth="1"
        initial={{ r: 3, opacity: 0.7 }}
        animate={{ r: 11, opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay }}
      />
    )}
  </g>
);

const NodeBox = ({ x, y, w = 110, h = 40, label, sub, accent, fs = 9.5, pad = 12 }) => (
  <motion.g variants={item}>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="rgba(21,12,9,0.92)"
      stroke={accent ? C.orange : C.brown}
      strokeOpacity={accent ? 0.9 : 0.85}
    />
    <text
      x={x + pad}
      y={y + h / 2 - (sub ? 2 : -3)}
      fontSize={fs}
      fontWeight="700"
      letterSpacing="1.2"
      fill={C.cream}
    >
      {label}
    </text>
    {sub && (
      <text
        x={x + pad}
        y={y + h / 2 + 11}
        fontSize="6.5"
        letterSpacing="1.4"
        fill={C.cream}
        fillOpacity="0.4"
      >
        {sub}
      </text>
    )}
  </motion.g>
);

const Micro = ({ x, y, children, anchor = "start", accent, o = 0.4, size = 7 }) => (
  <motion.text
    variants={item}
    x={x}
    y={y}
    fontSize={size}
    letterSpacing="1.6"
    textAnchor={anchor}
    fill={accent ? C.orange : C.cream}
    fillOpacity={accent ? 0.9 : o}
  >
    {children}
  </motion.text>
);

/* =========================================================
   SERVICE VISUALS (abstract, all SVG)
========================================================= */

const WebVisual = ({ reduce }) => (
  <Svg label="Abstract browser interface" reduce={reduce}>
    <motion.rect variants={item} x="16" y="14" width="388" height="232" fill="rgba(21,12,9,0.6)" stroke={C.brown} strokeOpacity="0.8" />
    <motion.line variants={stroke} x1="16" y1="44" x2="404" y2="44" stroke={C.brown} strokeOpacity="0.8" />
    <motion.circle variants={item} cx="34" cy="29" r="3.5" fill={C.orange} />
    <motion.circle variants={item} cx="48" cy="29" r="3.5" fill="none" stroke={C.brown} />
    <motion.circle variants={item} cx="62" cy="29" r="3.5" fill="none" stroke={C.brown} />
    <motion.rect variants={item} x="92" y="21" width="190" height="16" fill="none" stroke={C.brown} strokeOpacity="0.7" />
    <Micro x="100" y="32" size={8} o={0.45}>yourbusiness.com</Micro>
    <Micro x="298" y="32" size={6.5} o={0.35}>HOME  WORK  CONTACT</Micro>

    <Micro x="36" y="70" accent>DIGITAL EXPERIENCE</Micro>
    <motion.text variants={item} x="36" y="100" fontSize="22" fontWeight="800" letterSpacing="1" fill={C.cream}>BUILT TO</motion.text>
    <motion.text variants={item} x="36" y="126" fontSize="22" fontWeight="800" letterSpacing="1" fill={C.cream}>PERFORM.</motion.text>
    {[130, 110, 90].map((w, i) => (
      <motion.rect key={w} variants={item} x="250" y={84 + i * 10} width={w} height="3" fill={C.cream} fillOpacity="0.16" />
    ))}
    <motion.rect variants={item} x="36" y="138" width="64" height="16" fill={C.orange} />
    <motion.text variants={item} x="45" y="149" fontSize="7" fontWeight="700" letterSpacing="1.5" fill={C.ink}>GET STARTED</motion.text>
    <Micro x="250" y="150" size={6.5}>320 / 768 / 1280 PX</Micro>

    <motion.rect variants={item} x="36" y="168" width="168" height="64" fill="none" stroke={C.brown} strokeOpacity="0.85" />
    <Micro x="48" y="186" size={8} o={0.8}>CONTENT</Micro>
    <motion.rect variants={item} x="48" y="196" width="100" height="3" fill={C.cream} fillOpacity="0.16" />
    <motion.rect variants={item} x="48" y="205" width="70" height="3" fill={C.cream} fillOpacity="0.12" />
    <motion.rect variants={item} x="216" y="168" width="168" height="64" fill="none" stroke={C.orange} strokeOpacity="0.85" />
    <Micro x="228" y="186" size={8} o={0.8}>PRODUCT</Micro>
    {[0, 1, 2].map((i) => (
      <motion.rect key={i} variants={item} x={228 + i * 44} y="196" width="36" height="26" fill="none" stroke={C.brown} strokeOpacity="0.9" />
    ))}
    <Pulse x="100" y="138" reduce={reduce} />
  </Svg>
);

const AppVisual = ({ reduce }) => {
  const rows = [
    { label: "APPLICATION", tag: "UI" },
    { label: "MODULES", tag: "MOD" },
    { label: "WORKFLOW", tag: "FLOW" },
    { label: "DATA", tag: "DB" },
  ];
  return (
    <Svg label="Application layers: application, modules, workflow, data" reduce={reduce}>
      {rows.map((r, i) => {
        const y = 18 + i * 62;
        return (
          <g key={r.label}>
            <motion.rect variants={item} x="20" y={y} width="150" height="44" fill="rgba(21,12,9,0.92)" stroke={i === 0 ? C.orange : C.brown} strokeOpacity="0.85" />
            <motion.text variants={item} x="34" y={y + 27} fontSize="9.5" fontWeight="700" letterSpacing="1.4" fill={C.cream}>{r.label}</motion.text>
            <Micro x="156" y={y + 27} anchor="end" size={6.5}>{r.tag}</Micro>
            {i < 3 && (
              <>
                <motion.line variants={stroke} x1="95" y1={y + 44} x2="95" y2={y + 62} stroke={C.orange} strokeOpacity="0.75" />
                <motion.circle variants={item} cx="95" cy={y + 62} r="2" fill={C.orange} />
              </>
            )}
            <motion.line variants={stroke} x1="170" y1={y + 22} x2="208" y2={y + 22} stroke={C.brown} strokeDasharray="2 3" />
          </g>
        );
      })}
      {/* fragment: window */}
      <motion.rect variants={item} x="210" y="18" width="190" height="44" fill="none" stroke={C.brown} strokeOpacity="0.85" />
      <motion.line variants={stroke} x1="210" y1="30" x2="400" y2="30" stroke={C.brown} />
      <motion.rect variants={item} x="220" y="40" width="70" height="12" fill={C.cream} fillOpacity="0.1" />
      <motion.rect variants={item} x="298" y="40" width="40" height="12" fill={C.orange} fillOpacity="0.8" />
      {/* fragment: modules */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <motion.rect variants={item} x={210 + i * 64} y="80" width="56" height="44" fill="none" stroke={i === 1 ? C.orange : C.brown} strokeOpacity="0.85" />
          <Micro x={210 + i * 64 + 10} y="106" size={7} o={0.55}>{`M${i + 1}`}</Micro>
        </g>
      ))}
      {/* fragment: workflow */}
      <motion.line variants={stroke} x1="228" y1="164" x2="386" y2="164" stroke={C.brown} />
      {[230, 305, 380].map((cx, i) => (
        <motion.circle key={cx} variants={item} cx={cx} cy="164" r="9" fill={C.ink} stroke={i === 1 ? C.orange : C.brown} />
      ))}
      <Pulse x="305" y="164" reduce={reduce} />
      {/* fragment: table */}
      <motion.rect variants={item} x="210" y="204" width="190" height="44" fill="none" stroke={C.brown} strokeOpacity="0.85" />
      <motion.line variants={stroke} x1="210" y1="219" x2="400" y2="219" stroke={C.brown} />
      <motion.line variants={stroke} x1="210" y1="234" x2="400" y2="234" stroke={C.brown} />
      <motion.line variants={stroke} x1="275" y1="204" x2="275" y2="248" stroke={C.brown} />
      <Micro x="220" y="214" size={6}>ID</Micro>
      <Micro x="285" y="214" size={6}>RECORD</Micro>
      <Micro x="220" y="229" size={6} accent>0001</Micro>
      <Micro x="285" y="229" size={6}>SYNCED</Micro>
      <Micro x="220" y="244" size={6}>0002</Micro>
      <Micro x="285" y="244" size={6}>PENDING</Micro>
    </Svg>
  );
};

const UxVisual = ({ reduce }) => {
  const ruler = Array.from({ length: 33 }, (_, i) => `M${16 + i * 12} 10v${i % 4 === 0 ? 10 : 5}`).join("");
  return (
    <Svg label="Wireframe, interface and user flow" reduce={reduce}>
      <motion.path variants={stroke} d={ruler} stroke={C.cream} strokeOpacity="0.22" fill="none" />
      {/* wireframe */}
      <motion.rect variants={item} x="16" y="40" width="112" height="160" fill="none" stroke={C.cream} strokeOpacity="0.45" strokeDasharray="4 3" />
      <motion.rect variants={item} x="28" y="52" width="88" height="52" fill="none" stroke={C.cream} strokeOpacity="0.3" />
      <motion.line variants={stroke} x1="28" y1="52" x2="116" y2="104" stroke={C.cream} strokeOpacity="0.25" />
      <motion.line variants={stroke} x1="116" y1="52" x2="28" y2="104" stroke={C.cream} strokeOpacity="0.25" />
      <motion.rect variants={item} x="28" y="116" width="88" height="4" fill={C.cream} fillOpacity="0.2" />
      <motion.rect variants={item} x="28" y="126" width="58" height="4" fill={C.cream} fillOpacity="0.14" />
      <motion.rect variants={item} x="28" y="168" width="44" height="18" fill="none" stroke={C.cream} strokeOpacity="0.4" strokeDasharray="3 2" />
      {/* interface */}
      <motion.rect variants={item} x="154" y="40" width="112" height="160" fill="rgba(21,12,9,0.9)" stroke={C.cream} strokeOpacity="0.8" />
      <motion.rect variants={item} x="154" y="40" width="112" height="14" fill={C.orange} fillOpacity="0.85" />
      <motion.rect variants={item} x="166" y="66" width="88" height="44" fill={C.cream} fillOpacity="0.09" />
      <motion.rect variants={item} x="166" y="118" width="88" height="4" fill={C.cream} fillOpacity="0.25" />
      <motion.rect variants={item} x="166" y="128" width="60" height="4" fill={C.cream} fillOpacity="0.16" />
      <motion.rect variants={item} x="166" y="170" width="60" height="18" fill={C.orange} />
      <motion.text variants={item} x="175" y="182" fontSize="7" fontWeight="700" letterSpacing="1.4" fill={C.ink}>CONTINUE</motion.text>
      {/* user flow */}
      <motion.rect variants={item} x="292" y="40" width="112" height="160" fill="none" stroke={C.brown} strokeOpacity="0.85" />
      {[
        [304, 56],
        [364, 96],
        [304, 146],
      ].map(([x, y], i) => (
        <motion.rect key={i} variants={item} x={x} y={y} width="30" height="22" fill={C.ink} stroke={i === 1 ? C.orange : C.cream} strokeOpacity={i === 1 ? 0.95 : 0.5} />
      ))}
      <motion.path variants={stroke} d="M334 67 C352 67 350 107 364 107" fill="none" stroke={C.orange} />
      <motion.path variants={stroke} d="M379 118 C379 140 350 157 334 157" fill="none" stroke={C.orange} />
      <Pulse x="364" y="107" reduce={reduce} />
      {/* connectors between stages */}
      <motion.path variants={stroke} d="M132 120 H150 M146 116 L150 120 L146 124" fill="none" stroke={C.orange} />
      <motion.path variants={stroke} d="M270 120 H288 M284 116 L288 120 L284 124" fill="none" stroke={C.orange} />
      <Micro x="72" y="222" anchor="middle" size={8} o={0.6}>WIREFRAME</Micro>
      <Micro x="210" y="222" anchor="middle" size={8} o={0.85}>INTERFACE</Micro>
      <Micro x="348" y="222" anchor="middle" size={8} o={0.6}>USER FLOW</Micro>
      <Micro x="16" y="248" size={6.5}>8 PX GRID / 12 COL</Micro>
    </Svg>
  );
};

const CustomVisual = ({ reduce }) => (
  <Svg label="Business rules flowing into workflow, automation and a live system" reduce={reduce}>
    <motion.path variants={stroke} d="M75 64 V104 H110" fill="none" stroke={C.orange} strokeOpacity="0.8" />
    <motion.path variants={stroke} d="M165 124 V164 H200" fill="none" stroke={C.orange} strokeOpacity="0.8" />
    <motion.path variants={stroke} d="M255 184 V224 H290" fill="none" stroke={C.orange} strokeOpacity="0.8" />
    <NodeBox x={20} y={24} label="BUSINESS" sub="RULES / PEOPLE" />
    <NodeBox x={110} y={84} label="WORKFLOW" sub="STEPS / APPROVALS" />
    <NodeBox x={200} y={144} label="AUTOMATION" sub="TRIGGERS / JOBS" accent />
    <NodeBox x={290} y={204} label="SYSTEM" sub="LIVE / MONITORED" />
    <Pulse x="310" y="164" reduce={reduce} />
    <Micro x="326" y="167" size={6.5} accent>AUTO</Micro>
    <Micro x="20" y="96" size={6.5}>MANUAL WORK</Micro>
    <Micro x="20" y="106" size={6.5} o={0.25}>— REMOVED</Micro>
    <Micro x="400" y="24" anchor="end" size={6.5}>INTERNAL TOOLS</Micro>
    <Micro x="400" y="36" anchor="end" size={6.5}>ADMIN PANELS</Micro>
  </Svg>
);

const ApiVisual = ({ reduce }) => {
  const xs = [14, 118, 222, 326];
  const y = 96;
  return (
    <Svg label="Client, API, server and database connected by data packets" reduce={reduce}>
      <Micro x="14" y="46" accent>API / REST / V1</Micro>
      <Micro x="406" y="46" anchor="end">STATUS 200</Micro>
      {[0, 1, 2].map((i) => {
        const x1 = xs[i] + 76;
        const x2 = xs[i + 1];
        return (
          <g key={i}>
            <motion.line variants={stroke} x1={x1} y1={y + 26} x2={x2} y2={y + 26} stroke={C.orange} strokeOpacity="0.7" />
            {!reduce && (
              <motion.circle
                r="2.5"
                cy={y + 26}
                fill={C.orange}
                initial={{ cx: x1, opacity: 0 }}
                animate={{ cx: [x1, x2], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.9 + i * 0.5, repeatDelay: 0.5 }}
              />
            )}
          </g>
        );
      })}
      <NodeBox x={xs[0]} y={y} w={76} h={52} label="CLIENT" sub="BROWSER" fs={8} pad={10} />
      <NodeBox x={xs[1]} y={y} w={76} h={52} label="API" sub="ROUTES" fs={8} pad={10} accent />
      <NodeBox x={xs[2]} y={y} w={76} h={52} label="SERVER" sub="LOGIC" fs={8} pad={10} />
      <motion.g variants={item}>
        <path d={`M${xs[3]} ${y + 8} a38 8 0 0 1 76 0 v36 a38 8 0 0 1 -76 0 z`} fill="rgba(21,12,9,0.92)" stroke={C.brown} strokeOpacity="0.9" />
        <path d={`M${xs[3]} ${y + 8} a38 8 0 0 0 76 0`} fill="none" stroke={C.brown} strokeOpacity="0.9" />
        <text x={xs[3] + 10} y={y + 33} fontSize="8" fontWeight="700" letterSpacing="1.2" fill={C.cream}>DATABASE</text>
        <text x={xs[3] + 10} y={y + 44} fontSize="6.5" letterSpacing="1.4" fill={C.cream} fillOpacity="0.4">SQL / NOSQL</text>
      </motion.g>
      <Micro x="14" y="190" size={7} accent>→ REQUEST</Micro>
      <Micro x="78" y="190" size={7}>GET /orders</Micro>
      <Micro x="14" y="204" size={7} accent>← RESPONSE</Micro>
      <Micro x="86" y="204" size={7}>200 OK · JSON</Micro>
      <Micro x="14" y="236" size={6.5}>LATENCY</Micro>
      <motion.rect variants={item} x="62" y="230" width="220" height="3" fill={C.brown} fillOpacity="0.5" />
      <motion.rect
        x="62"
        y="230"
        height="3"
        fill={C.orange}
        initial={{ width: 0 }}
        animate={{ width: 74 }}
        transition={{ delay: 0.9, duration: 1, ease }}
      />
    </Svg>
  );
};

const SupportVisual = ({ reduce }) => {
  const rows = [
    ["BUG FIXES", "RESOLVED"],
    ["OPTIMIZATION", "TUNED"],
    ["UPDATES", "CURRENT"],
    ["MONITORING", "24 / 7"],
  ];
  return (
    <Svg label="Maintenance status list and monitoring heartbeat" reduce={reduce}>
      {rows.map(([a, b], i) => {
        const y = 40 + i * 44;
        return (
          <g key={a}>
            <motion.circle variants={item} cx="26" cy={y} r="3.5" fill={i === 3 ? C.orange : "none"} stroke={C.orange} />
            <motion.text variants={item} x="42" y={y + 3} fontSize="9" fontWeight="700" letterSpacing="1.3" fill={C.cream}>{a}</motion.text>
            <Micro x="196" y={y + 3} anchor="end" size={6.5}>{b}</Micro>
            <motion.line variants={stroke} x1="16" y1={y + 22} x2="196" y2={y + 22} stroke={C.brown} strokeOpacity="0.6" />
          </g>
        );
      })}
      <motion.rect variants={item} x="222" y="30" width="182" height="120" fill="none" stroke={C.brown} strokeOpacity="0.85" />
      {[60, 90, 120].map((gy) => (
        <motion.line key={gy} variants={stroke} x1="222" y1={gy} x2="404" y2={gy} stroke={C.cream} strokeOpacity="0.07" />
      ))}
      <motion.path
        variants={stroke}
        d="M222 100 H262 L274 68 L286 128 L298 100 H334 L344 82 L354 114 L364 100 H396"
        fill="none"
        stroke={C.orange}
        strokeWidth="1.4"
      />
      <Pulse x="396" y="100" reduce={reduce} />
      <Micro x="230" y="44" size={6.5}>HEARTBEAT</Micro>
      <Micro x="222" y="178" size={7}>UPTIME TARGET</Micro>
      <motion.text variants={item} x="222" y="208" fontSize="26" fontWeight="800" fill={C.cream}>99.9%</motion.text>
      <Micro x="330" y="178" size={7}>LATEST PATCH</Micro>
      <motion.text variants={item} x="330" y="204" fontSize="13" fontWeight="700" fill={C.orange}>v2.4.1</motion.text>
      <Micro x="16" y="236" size={6.5}>BUILD / SCALE / SUPPORT</Micro>
    </Svg>
  );
};

/* =========================================================
   DATA
========================================================= */

const SERVICES = [
  {
    id: "web",
    num: "01",
    tag: "WEB",
    nav: "Web Development",
    title: "Web Development",
    phase: "Develop",
    icon: Globe,
    desc: "We create responsive, scalable web experiences designed around your business goals.",
    tech: ["React", "Next.js", "Node.js", "REST API"],
    Visual: WebVisual,
  },
  {
    id: "app",
    num: "02",
    tag: "APP",
    nav: "App Development",
    title: "Application Development",
    phase: "Develop",
    icon: AppWindow,
    desc: "Custom applications shaped around real-world workflows and business requirements.",
    tech: ["Web Apps", "Dashboards", "Business Apps", "Custom Systems"],
    Visual: AppVisual,
  },
  {
    id: "design",
    num: "03",
    tag: "DESIGN",
    nav: "UI / UX Design",
    title: "UI / UX Design",
    phase: "Design",
    icon: PenTool,
    desc: "Interfaces that make complex products easier to understand and use.",
    tech: ["Wireframes", "UI Systems", "Responsive Design", "Prototyping"],
    Visual: UxVisual,
  },
  {
    id: "software",
    num: "04",
    tag: "SOFTWARE",
    nav: "Custom Software",
    title: "Custom Software",
    phase: "Integrate",
    icon: Workflow,
    desc: "Purpose-built software for businesses that need more than an off-the-shelf solution.",
    tech: ["Workflow Systems", "Admin Panels", "Internal Tools", "Automation"],
    Visual: CustomVisual,
  },
  {
    id: "api",
    num: "05",
    tag: "API",
    nav: "API & Backend",
    title: "API & Backend Development",
    phase: "Integrate",
    icon: Server,
    desc: "Reliable backend systems that power your digital products and connect them to your data.",
    tech: ["Node.js", "Express", "Databases", "API Architecture"],
    Visual: ApiVisual,
  },
  {
    id: "support",
    num: "06",
    tag: "SUPPORT",
    nav: "Support",
    title: "Maintenance & Support",
    phase: "Deliver",
    icon: LifeBuoy,
    desc: "Continuous improvements, fixes and technical support after launch.",
    tech: ["Bug Fixes", "Optimization", "Updates", "Monitoring"],
    Visual: SupportVisual,
  },
];

const N = SERVICES.length;

/* =========================================================
   LAYOUT MODE
   desktop = sticky scroll console, tablet = 2-col, mobile = accordion
========================================================= */

const DESKTOP_Q = "(min-width: 1024px) and (min-height: 680px)";
const TABLET_Q = "(min-width: 768px)";

const getMode = () => {
  if (typeof window === "undefined") return "tablet";
  if (window.matchMedia(DESKTOP_Q).matches) return "desktop";
  if (window.matchMedia(TABLET_Q).matches) return "tablet";
  return "mobile";
};

const useLayoutMode = () => {
  const [mode, setMode] = useState(getMode);
  useEffect(() => {
    const qs = [window.matchMedia(DESKTOP_Q), window.matchMedia(TABLET_Q)];
    const handler = () => setMode(getMode());
    qs.forEach((q) => q.addEventListener("change", handler));
    return () => qs.forEach((q) => q.removeEventListener("change", handler));
  }, []);
  return mode;
};

/* =========================================================
   SMALL PIECES
========================================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease } },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const TechChips = ({ items, delay = 0.35 }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((t, i) => (
      <motion.span
        key={t}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + i * 0.06, duration: 0.45, ease }}
        className="border border-[#71352d]/60 px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase text-[#f5e9df]/75"
      >
        {t}
      </motion.span>
    ))}
  </div>
);

const ExploreCta = ({ href = "#contact" }) => (
  <a
    href={href}
    className="group relative inline-flex items-center gap-2 pb-1.5 text-[11px] font-medium tracking-[0.22em] uppercase text-[#e56b3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f]"
  >
    Explore service
    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    <span className="absolute bottom-0 left-0 h-px w-full bg-[#e56b3f]/30" />
    <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#e56b3f] transition-transform duration-500 group-hover:scale-x-100" />
  </a>
);

const VisualFrame = ({ s, reduce, className = "" }) => {
  const { Visual } = s;
  return (
    <div
      className={`relative w-full overflow-hidden bg-[radial-gradient(rgba(245,233,223,0.07)_1px,transparent_1px)] [background-size:18px_18px] ${className}`}
    >
      <span className="absolute left-2.5 top-2 z-10 text-[8px] tracking-[0.2em] text-[#f5e9df]/30">
        {s.num} / {s.tag}
      </span>
      <span className="absolute bottom-2 right-2.5 z-10 text-[8px] tracking-[0.2em] text-[#f5e9df]/25">
        ABSTRACT VIEW
      </span>
      <div className="h-full w-full p-3 sm:p-4">
        <Visual reduce={reduce} />
      </div>
    </div>
  );
};

const Corners = () => (
  <>
    <span className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-[#e56b3f]" />
    <span className="pointer-events-none absolute -right-px -top-px h-2.5 w-2.5 border-r border-t border-[#e56b3f]" />
    <span className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-[#e56b3f]" />
    <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-[#e56b3f]" />
  </>
);

/* =========================================================
   SERVICE NAVIGATION (tablet + desktop)
========================================================= */

const ServiceNav = ({ shown, onHover, onLeave, onSelect, reduce, mode }) => {
  const refs = useRef([]);

  const onKeyDown = (e, i) => {
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % N;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + N) % N;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onSelect(next);
  };

  return (
    <div onMouseLeave={onLeave}>
      <div className="mb-3 flex items-center justify-between text-[10px] tracking-[0.24em] uppercase text-[#f5e9df]/45">
        <span>Services</span>
        <span className="tabular-nums text-[#f5e9df]/30">
          {String(shown + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </span>
      </div>

      <div role="tablist" aria-orientation="vertical" aria-label="Services" className="border-t border-[#71352d]/45">
        {SERVICES.map((s, i) => {
          const on = i === shown;
          return (
            <button
              key={s.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              id={`svc-tab-${s.id}`}
              aria-selected={on}
              aria-controls="svc-panel"
              onMouseEnter={() => onHover(i)}
              onFocus={() => onHover(i)}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#e56b3f]"
            >
              <span
                className={`flex items-center gap-3 py-[15px] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:gap-4 lg:py-[19px] ${
                  on ? "translate-x-2" : "group-hover:translate-x-2"
                }`}
              >
                <span
                  className={`w-7 shrink-0 text-[11px] font-semibold tabular-nums tracking-widest transition-colors duration-300 ${
                    on ? "text-[#e56b3f]" : "text-[#e56b3f]/45 group-hover:text-[#e56b3f]"
                  }`}
                >
                  {s.num}
                </span>
                <motion.span
                  aria-hidden="true"
                  className={`shrink-0 text-[#e56b3f] transition-opacity duration-300 ${
                    on ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  animate={on && !reduce ? { x: [0, 4, 0] } : { x: 0 }}
                  transition={{ duration: 1.6, repeat: on && !reduce ? Infinity : 0, ease: "easeInOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
                <span
                  className={`min-w-0 flex-1 text-[15px] font-bold uppercase leading-tight tracking-tight transition-colors duration-300 md:text-base lg:text-[clamp(18px,1.9vw,26px)] ${
                    on ? "text-[#f5e9df]" : "text-[#f5e9df]/38 group-hover:text-[#f5e9df]/80"
                  }`}
                >
                  {s.nav}
                </span>
                <span
                  className={`hidden shrink-0 text-[9px] tracking-[0.2em] transition-colors duration-300 xl:block ${
                    on ? "text-[#f5e9df]/55" : "text-[#f5e9df]/20"
                  }`}
                >
                  {s.num} / {s.tag}
                </span>
              </span>
              <span className="absolute bottom-0 left-0 h-px w-full bg-[#71352d]/40" />
              <span
                className={`absolute bottom-0 left-0 h-px w-full origin-left bg-[#e56b3f] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      {mode === "desktop" && (
        <p className="mt-4 flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#f5e9df]/30">
          <span className="h-px w-6 bg-[#71352d]" />
          Scroll or select a service
        </p>
      )}
    </div>
  );
};

/* =========================================================
   ACTIVE SERVICE PANEL (tablet + desktop)
========================================================= */

const ServicePanel = ({ s, index, reduce }) => {
  const [inView, setInView] = useState(false);
  const Icon = s.icon;
  const dur = reduce ? 0.01 : 1;

  return (
    <motion.div
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.2 }}
      className="relative border border-[#71352d]/45 bg-[#150c09]/70"
    >
      <Corners />

      {/* console header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#71352d]/40 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase text-[#f5e9df]/45">
          <span className="relative flex h-1.5 w-1.5">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e56b3f]/60" />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#e56b3f]" />
          </span>
          Active service
        </div>
        <div className="hidden items-center gap-2 lg:flex" aria-label={`Project phase: ${s.phase}`}>
          {PHASES.map((p, i) => (
            <React.Fragment key={p}>
              {i > 0 && <span className="h-px w-3 bg-[#71352d]/60" />}
              <span
                className={`text-[8px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                  p === s.phase ? "text-[#e56b3f]" : "text-[#f5e9df]/25"
                }`}
              >
                {p}
              </span>
            </React.Fragment>
          ))}
        </div>
        <span className="text-[9px] tabular-nums tracking-[0.2em] text-[#f5e9df]/35">
          {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
        </span>
      </div>

      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${s.id}`} aria-live="polite">
        {inView && (
          <AnimatePresence mode="wait">
            <motion.div key={s.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, scale: 1.02, clipPath: "inset(100% 0 0 0)" }}
                transition={{ duration: 0.55 * dur, ease }}
                className="border-b border-[#71352d]/30"
              >
                <VisualFrame s={s} reduce={reduce} className="aspect-[420/260] md:aspect-auto md:h-[clamp(210px,38vh,320px)]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 * dur, duration: 0.6 * dur, ease } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.22 * dur } }}
                className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.25fr_1fr] lg:gap-8"
              >
                <div>
                  <p className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#e56b3f]">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {s.num} / {s.tag}
                  </p>
                  <h3 className="mt-3 text-[clamp(20px,2.3vw,30px)] font-bold uppercase leading-[1.08] tracking-tight text-[#f5e9df]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[440px] text-[13px] leading-relaxed text-[#f5e9df]/65 sm:text-sm">
                    {s.desc}
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-5">
                  <div>
                    <p className="mb-2.5 text-[9px] tracking-[0.24em] uppercase text-[#f5e9df]/35">Technology</p>
                    <TechChips items={s.tech} />
                  </div>
                  <div>
                    <ExploreCta />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

/* =========================================================
   MOBILE ACCORDION
========================================================= */

const MobileAccordion = ({ reduce }) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-[#71352d]/45">
      {SERVICES.map((s, i) => {
        const on = open === i;
        return (
          <div key={s.id} className="border-b border-[#71352d]/40">
            <button
              type="button"
              aria-expanded={on}
              aria-controls={`svc-m-${s.id}`}
              onClick={() => setOpen(on ? -1 : i)}
              className="flex w-full items-center gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#e56b3f]"
            >
              <span className={`w-6 shrink-0 text-[11px] font-semibold tabular-nums tracking-widest transition-colors ${on ? "text-[#e56b3f]" : "text-[#e56b3f]/50"}`}>
                {s.num}
              </span>
              <span className={`min-w-0 flex-1 text-[17px] font-bold uppercase leading-tight tracking-tight transition-colors ${on ? "text-[#f5e9df]" : "text-[#f5e9df]/45"}`}>
                {s.nav}
              </span>
              <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: reduce ? 0 : 0.3, ease }} className="shrink-0 text-[#e56b3f]">
                <Plus className="h-4 w-4" aria-hidden="true" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`svc-m-${s.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease }}
                  className="overflow-hidden"
                >
                  <div className="space-y-5 pb-6 pl-10">
                    <p className="text-[13px] leading-relaxed text-[#f5e9df]/65">{s.desc}</p>
                    <div>
                      <p className="mb-2.5 text-[9px] tracking-[0.24em] uppercase text-[#f5e9df]/35">Technology</p>
                      <TechChips items={s.tech} delay={0.1} />
                    </div>
                    <div className="relative border border-[#71352d]/45 bg-[#150c09]/70">
                      <VisualFrame s={s} reduce={reduce} className="aspect-[420/260]" />
                    </div>
                    <ExploreCta />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================
   SECTION
========================================================= */

const Ourservices = () => {
  const reduce = useReducedMotion();
  const mode = useLayoutMode();

  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(null);

  const trackRef = useRef(null);
  const lockRef = useRef(false);
  const lockTimer = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* desktop: scroll position drives the active service */
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (mode !== "desktop" || lockRef.current) return;
    setPreview(null);
    const i = Math.min(N - 1, Math.max(0, Math.floor(p * N)));
    setActive((prev) => (prev === i ? prev : i));
  });

  useEffect(() => () => clearTimeout(lockTimer.current), []);

  const select = (i) => {
    setPreview(null);
    setActive(i);
    if (mode === "desktop" && trackRef.current) {
      const el = trackRef.current;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      lockRef.current = true;
      clearTimeout(lockTimer.current);
      window.scrollTo({
        top: top + span * ((i + 0.5) / N),
        behavior: reduce ? "auto" : "smooth",
      });
      lockTimer.current = setTimeout(() => {
        lockRef.current = false;
      }, reduce ? 100 : 1000);
    }
  };

  const hover = (i) => {
    if (mode === "desktop") setPreview(i);
    else setActive(i);
  };

  const shown = mode === "desktop" && preview !== null ? preview : active;
  const isDesktop = mode === "desktop";

  const consoleEl = (
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
      >
        <ServiceNav shown={shown} onHover={hover} onLeave={() => setPreview(null)} onSelect={select} reduce={reduce} mode={mode} />
      </motion.div>
      <ServicePanel s={SERVICES[shown]} index={shown} reduce={reduce} />
    </div>
  );

  return (
    <section
      id="our-services"
      className="relative w-full overflow-x-clip bg-[#0f0906] px-4 py-20 text-[#f5e9df] sm:px-6 sm:py-24 md:px-8 lg:px-14 lg:py-28"
    >
      {/* ---------------- background: grid + coordinates ---------------- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_8%,rgba(229,107,63,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,233,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {[
          { l: 3, t: 2, label: "X 156 / Y 104" },
          { l: 18, t: 6, label: "X 936 / Y 312" },
          { l: 24, t: 3, label: "X 1248 / Y 156" },
        ].map((m) => (
          <span
            key={m.label}
            className="absolute hidden lg:block"
            style={{ left: `${m.l * 52}px`, top: `${m.t * 52}px` }}
          >
            <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-[#e56b3f]/45" />
            <span className="absolute left-2 top-1 whitespace-nowrap text-[8px] tracking-[0.2em] text-[#f5e9df]/18">
              {m.label}
            </span>
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ---------------- header ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerParent}
          className="mb-12 flex flex-col gap-10 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-[#e56b3f]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#f5e9dfaa] sm:text-xs">
                04 / Services
              </span>
            </motion.div>

            <div className="overflow-hidden py-[2px]">
              <motion.h2 variants={fadeUp} className="text-[clamp(30px,5.4vw,54px)] font-bold uppercase leading-[1.05] tracking-tight">
                Built around
              </motion.h2>
            </div>
            <div className="overflow-hidden py-[2px]">
              <motion.h2 variants={fadeUp} className="text-[clamp(30px,5.4vw,54px)] font-bold uppercase leading-[1.05] tracking-tight">
                <span className="heading-font font-normal italic text-[#e56b3f]">Your needs.</span>
              </motion.h2>
            </div>

            <motion.p variants={fadeUp} className="mt-5 max-w-[460px] text-sm leading-relaxed text-[#f5e9dfb3] sm:text-[15px]">
              From business websites to custom software platforms, we design and develop digital solutions around real business needs.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="hidden w-[210px] shrink-0 -rotate-1 border border-[#71352d]/30 px-3 py-2.5 opacity-70 md:block"
            aria-hidden="true"
          >
            <div className="flex justify-between text-[8px] tracking-[0.15em] text-[#f5e9df]/55">
              <span>SERVICES / 06</span>
              <span className="text-[#e56b3f]/70">ACTIVE</span>
            </div>
            <div className="my-2 h-px w-full bg-[#71352d]/40" />
            <div className="space-y-1 text-[8px] tracking-[0.12em] text-[#f5e9df]/40">
              <div>DIGITAL PRODUCTS</div>
              <div>WEB / APP / SYSTEMS</div>
              <div>BUILD / SCALE / SUPPORT</div>
            </div>
            <div className="relative mt-2.5 h-px w-full bg-[#71352d]/40">
              <span className="absolute left-[38%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#e56b3f]/60" />
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- service system ---------------- */}
        {/* the tracking wrapper always renders so useScroll has a target in every mode */}
        <div
          ref={trackRef}
          style={isDesktop ? { height: `${100 + N * SEGMENT_VH}vh` } : undefined}
        >
          {mode === "mobile" ? (
            <MobileAccordion reduce={reduce} />
          ) : isDesktop ? (
            <div className="sticky top-0 flex h-screen items-center">
              <div className="w-full">{consoleEl}</div>
            </div>
          ) : (
            consoleEl
          )}
        </div>

        {/* ---------------- footer transition ---------------- */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerParent}
          className="mt-16 flex flex-col gap-8 border-t border-[#71352d]/40 pt-10 sm:mt-20 md:flex-row md:items-end md:justify-between lg:mt-24"
        >
          <div>
            <div className="overflow-hidden py-[2px]">
              <motion.h3 variants={fadeUp} className="text-[clamp(26px,4vw,44px)] font-bold uppercase leading-[1.05] tracking-tight">
                Have a project
              </motion.h3>
            </div>
            <div className="overflow-hidden py-[2px]">
              <motion.h3 variants={fadeUp} className="text-[clamp(26px,4vw,44px)] font-bold uppercase leading-[1.05] tracking-tight">
                <span className="heading-font font-normal italic text-[#e56b3f]">In mind?</span>
              </motion.h3>
            </div>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-[280px] text-[13px] leading-relaxed text-[#f5e9df]/55 md:text-right">
              Tell us what you need to build. We will help you shape it.
            </p>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 border border-[#e56b3f] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f5e9df] transition-colors duration-300 hover:bg-[#e56b3f] hover:text-[#150c09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f]"
            >
              Let&apos;s talk
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Ourservices;
