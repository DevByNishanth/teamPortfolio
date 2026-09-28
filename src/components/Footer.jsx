import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";

/* =========================================================
   CONTENT
   No personal contact details. No invented company name:
   set BRAND_NAME below if/when the studio has one.
========================================================= */

const BRAND_NAME = ""; // e.g. "Acme Studio" — leave empty to use the generic wordmark

const EXPLORE = [
  { label: "Home", target: "top" },
  { label: "About", target: "about-us" },
  { label: "Team", target: "our-team" },
  { label: "Services", target: "our-services" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" },
];

const SERVICES = [
  "Web Development",
  "Application Development",
  "UI / UX Design",
  "Custom Software",
  "API & Backend",
  "Maintenance",
];

const WHAT_WE_DO = [
  "Digital Products",
  "Web Experiences",
  "Business Solutions",
  "Software Development",
];

const ease = [0.16, 1, 0.3, 1];

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const stagger = (gap = 0.12, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease },
  },
};

const lineReveal = {
  hidden: { y: "108%", clipPath: "inset(0 0 100% 0)" },
  visible: {
    y: "0%",
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1, ease },
  },
};

const columnReveal = {
  hidden: { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease },
  },
};

const scrollToTarget = (e, target) => {
  e.preventDefault();
  if (target === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document
    .getElementById(target)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* =========================================================
   BACKGROUND: animated grid
========================================================= */

const GRID = 52;

const AnimatedGrid = ({ reduce }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_35%,black,transparent_78%)]"
  >
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(245,233,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.6) 1px, transparent 1px)",
        backgroundSize: `${GRID}px ${GRID}px`,
      }}
      variants={{
        hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 0.05,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 1.6, ease },
        },
      }}
    />
    {/* slow drift layer */}
    {!reduce && (
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(229,107,63,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(229,107,63,0.9) 1px, transparent 1px)",
          backgroundSize: `${GRID * 4}px ${GRID * 4}px`,
        }}
        animate={{
          backgroundPosition: [`0px 0px`, `${GRID * 4}px ${GRID * 4}px`],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
    )}
    {/* tiny nodes on grid intersections */}
    {[
      [3, 2],
      [9, 5],
      [14, 1],
      [19, 4],
      [24, 2],
      [6, 8],
      [21, 8],
    ].map(([c, r], i) => (
      <motion.span
        key={i}
        className="absolute hidden h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e56b3f] lg:block"
        style={{ left: c * GRID, top: r * GRID }}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 0.5,
            scale: 1,
            transition: { delay: 0.6 + i * 0.12, duration: 0.5, ease },
          },
        }}
      />
    ))}
  </div>
);

/* =========================================================
   BACKGROUND: orbital signal system (SVG)
========================================================= */

const ORBITS = [
  { r: 70, dur: 40, dir: 1, nodes: [0, 200], dash: "" },
  { r: 130, dur: 70, dir: -1, nodes: [60, 250], dash: "2 6" },
  { r: 195, dur: 110, dir: 1, nodes: [130, 300], dash: "" },
  { r: 260, dur: 160, dir: -1, nodes: [20], dash: "1 8" },
];

const OrbitalSystem = ({ reduce }) => (
  <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute right-[-30%] top-[6%] w-[130%] max-w-[760px] sm:right-[-14%] sm:w-[78%] lg:right-[-6%] lg:top-[-2%] lg:w-[54%]"
    variants={{
      hidden: { opacity: 0, scale: 0.88 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.8, ease },
      },
    }}
  >
    <svg viewBox="0 0 600 600" className="h-auto w-full">
      {/* crosshair */}
      <line
        x1="300"
        y1="10"
        x2="300"
        y2="590"
        stroke="#71352d"
        strokeOpacity="0.28"
      />
      <line
        x1="10"
        y1="300"
        x2="590"
        y2="300"
        stroke="#71352d"
        strokeOpacity="0.28"
      />

      {ORBITS.map((o, i) => (
        <g key={o.r}>
          <circle
            cx="300"
            cy="300"
            r={o.r}
            fill="none"
            stroke="#71352d"
            strokeOpacity={0.38 - i * 0.05}
            strokeDasharray={o.dash}
          />
          <motion.g
            style={{ transformOrigin: "300px 300px" }}
            animate={reduce ? undefined : { rotate: 360 * o.dir }}
            transition={{ duration: o.dur, repeat: Infinity, ease: "linear" }}
          >
            {o.nodes.map((deg) => {
              const a = (deg * Math.PI) / 180;
              const x = 300 + o.r * Math.cos(a);
              const y = 300 + o.r * Math.sin(a);
              return (
                <g key={deg}>
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#e56b3f"
                    fillOpacity="0.85"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="none"
                    stroke="#e56b3f"
                    strokeOpacity="0.25"
                  />
                </g>
              );
            })}
          </motion.g>
        </g>
      ))}

      {/* connecting signal lines between center and outer nodes */}
      <motion.g
        style={{ transformOrigin: "300px 300px" }}
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
      >
        <line
          x1="300"
          y1="300"
          x2="560"
          y2="300"
          stroke="#e56b3f"
          strokeOpacity="0.18"
          strokeDasharray="1 5"
        />
        <line
          x1="300"
          y1="300"
          x2="118"
          y2="118"
          stroke="#e56b3f"
          strokeOpacity="0.12"
          strokeDasharray="1 5"
        />
      </motion.g>

      {/* core */}
      <circle
        cx="300"
        cy="300"
        r="34"
        fill="#0a0604"
        stroke="#e56b3f"
        strokeOpacity="0.55"
      />
      {!reduce && (
        <motion.circle
          cx="300"
          cy="300"
          fill="none"
          stroke="#e56b3f"
          strokeWidth="1"
          initial={{ r: 34, opacity: 0.5 }}
          animate={{ r: 62, opacity: 0 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <text
        x="300"
        y="303.5"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        letterSpacing="2.4"
        fill="#f5e9df"
        fillOpacity="0.8"
      >
        BUILD
      </text>

      {/* tick labels */}
      <text
        x="306"
        y="22"
        fontSize="7"
        letterSpacing="2"
        fill="#f5e9df"
        fillOpacity="0.28"
      >
        N 000°
      </text>
      <text
        x="566"
        y="292"
        fontSize="7"
        letterSpacing="2"
        fill="#f5e9df"
        fillOpacity="0.28"
        textAnchor="end"
      >
        E 090°
      </text>
    </svg>
  </motion.div>
);

/* =========================================================
   PIECES
========================================================= */

const FooterLink = ({ label, target }) => (
  <a
    href={target === "top" ? "#" : `#${target}`}
    onClick={(e) => scrollToTarget(e, target)}
    className="group relative inline-flex w-fit items-center gap-2 py-1 text-[13px] text-[#f5e9df]/60 transition-colors duration-300 hover:text-[#f5e9df] focus-visible:text-[#f5e9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f]"
  >
    <span className="h-px w-0 bg-[#e56b3f] transition-all duration-300 group-hover:w-3 group-focus-visible:w-3" />
    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
      {label}
    </span>
  </a>
);

const ColumnHead = ({ num, children }) => (
  <div className="mb-4 flex items-center gap-3 border-t border-[#71352d]/45 pt-4">
    <span className="text-[10px] font-semibold tabular-nums tracking-widest text-[#e56b3f]">
      {num}
    </span>
    <h3 className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#f5e9df]/50">
      {children}
    </h3>
  </div>
);

/* =========================================================
   FOOTER
========================================================= */

const Footer = () => {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const view = { once: true, amount: 0.25 };

  return (
    <footer
      id="footer"
      className="relative w-full overflow-x-clip overflow-y-hidden bg-[#0a0604] text-[#f5e9df]"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_82%_12%,rgba(229,107,63,0.09),transparent_62%)]"
      />

      {/* =====================================================
          LAYER 1 — FINAL CTA
      ===================================================== */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={view}
        variants={stagger(0.14)}
        className="relative px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 md:px-8 lg:px-14 lg:pb-28 lg:pt-32"
      >
        <AnimatedGrid reduce={reduce} />
        <OrbitalSystem reduce={reduce} />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-[1px] w-10 bg-[#e56b3f]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#f5e9dfaa] sm:text-xs">
              05 / Start a project
            </span>
          </motion.div>

          <h2 className="text-[clamp(34px,7.2vw,84px)] font-bold uppercase leading-[1.02] tracking-tight">
            <span className="block overflow-hidden py-[3px]">
              <motion.span variants={lineReveal} className="block">
                Let&apos;s build
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[3px]">
              <motion.span variants={lineReveal} className="block">
                Something
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[3px]">
              <motion.span
                variants={lineReveal}
                className="heading-font block font-normal italic normal-case text-[#e56b3f]"
              >
                Meaningful.
              </motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[470px] text-sm leading-relaxed text-[#f5e9dfb3] sm:text-[15px]"
          >
            From business ideas to digital products, let&apos;s turn meaningful
            problems into thoughtful solutions.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            {/* <a
              href="#contact"
              onClick={(e) => scrollToTarget(e, "contact")}
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-[#e56b3f] bg-[#e56b3f] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#150c09] transition-colors duration-500 hover:text-[#150c09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f5e9df]"
            >
           
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#f5e9df] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              <span className="relative">Start a project</span>
              <ArrowRight
                aria-hidden="true"
                className="relative h-4 w-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:-rotate-45 group-focus-visible:-rotate-45"
              />
            </a> */}

            <p className="text-[10px] uppercase leading-[1.9] tracking-[0.24em] text-[#f5e9df]/45">
              We design.
              <br />
              We develop.
              <br />
              We deliver.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* =====================================================
          LAYER 2 — NAVIGATION
      ===================================================== */}
      <div className="relative px-4 sm:px-6 md:px-8 lg:px-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.12)}
          className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 pb-16 sm:gap-x-10 lg:grid-cols-[1.35fr_1fr_1.2fr_1fr] lg:pb-20"
        >
          {/* brand lockup */}
          <motion.div
            variants={columnReveal}
            className="col-span-2 lg:col-span-1"
          >
            <div className="border-t border-[#71352d]/45 pt-4">
              {BRAND_NAME ? (
                <p className="text-2xl font-bold uppercase leading-[1.05] tracking-tight sm:text-3xl">
                  {BRAND_NAME}
                  <span className="text-[#e56b3f]">.</span>
                </p>
              ) : (
                <></>
                // <p className="text-2xl font-bold uppercase leading-[1.05] tracking-tight sm:text-3xl">
                //   Digital
                //   <br />
                //   <span className="heading-font font-normal italic normal-case text-[#e56b3f]">
                //     Studio.
                //   </span>
                // </p>
              )}
              <p className="mt-5 max-w-[260px] text-[10px] uppercase leading-[1.9] tracking-[0.22em] text-[#f5e9df]/40">
                Digital experiences.
                <br />
                Thoughtfully built.
              </p>
            </div>
          </motion.div>

          <motion.nav variants={columnReveal} aria-label="Footer navigation">
            <ColumnHead num="01">Explore</ColumnHead>
            <ul className="flex flex-col">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav variants={columnReveal} aria-label="Services">
            <ColumnHead num="02">Services</ColumnHead>
            <ul className="flex flex-col">
              {SERVICES.map((label) => (
                <li key={label}>
                  <FooterLink label={label} target="our-services" />
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={columnReveal}>
            <ColumnHead num="03">What we do</ColumnHead>
            <ul className="flex flex-col">
              {WHAT_WE_DO.map((label) => (
                <li key={label} className="py-1 text-[13px] text-[#f5e9df]/45">
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          LAYER 3 — BRAND / COPYRIGHT (over oversized word)
      ===================================================== */}
      <div className="relative">
        {/* oversized background word, cropped by the footer edge */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease }}
          className="pointer-events-none select-none absolute inset-x-0 bottom-0 flex justify-end overflow-hidden"
        >
          <span
            className="whitespace-nowrap pr-2 font-extrabold uppercase leading-[0.78] tracking-tighter sm:pr-6 lg:pr-10 translate-y-[22%]"
            style={{
              fontSize: "clamp(110px, 27vw, 460px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(113,53,45,0.28)",
            }}
          >
            Build
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease }}
          className="relative z-10 px-4 pb-8 pt-[clamp(90px,18vw,300px)] sm:px-6 md:px-8 lg:px-14"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-[#71352d]/45 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#f5e9df]/45">
              &copy; {year}
              {BRAND_NAME ? ` ${BRAND_NAME}.` : ""} All rights reserved.
            </p>
            <p className="hidden text-[9px] uppercase tracking-[0.24em] text-[#f5e9df]/25 md:block">
              Build / Scale / Support
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex w-fit items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#f5e9df]/60 transition-colors duration-300 hover:text-[#e56b3f] focus-visible:text-[#e56b3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f]"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
