import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

/* =========================================================
   ASSETS (existing project screenshots — unchanged)
========================================================= */

import arunaImage from "../assets/aruna.png";
import shadowArrowImage from "../assets/shadowArrow.png";
import avatarImage from "../assets/avatar.png";
import exploreMunnarImage from "../assets/exploremunnar.png";
import exploreMunnarDashboardImage from "../assets/exploreMunnarDashboard.png";
import hrmsImage from "../assets/hrms.png";
import eventsImage from "../assets/events.png";
import appraisalImage from "../assets/appraisal.jpg";
import lmsImage from "../assets/lms.png";
import bookMyCabsImage from "../assets/bookmycabs.png";

/* =========================================================
   DATA
   Titles, years, categories, descriptions, images and links
   are the existing project data. Two fields are new:
   - group: drives the filter (platform | system)
   - scope: short tags taken from each project's own description
   - tech:  OPTIONAL. Left empty on purpose so nothing is
            claimed that isn't true. Add e.g. ["React", "Node.js"]
            per project and a Technology row appears automatically.
========================================================= */

const PROJECTS = [
  {
    id: "aruna",
    title: "Aruna Caterer",
    year: "2024",
    category: "Web Application",
    group: "system",
    featured: true,
    description:
      "A complete catering management platform designed to manage bookings, customers, menus and day-to-day catering operations.",
    scope: ["Bookings", "Customers", "Menus", "Operations"],
    tech: [],
    image: arunaImage,
    link: "https://arunacaterer.com/",
  },
  {
    id: "shadow-arrow",
    title: "Shadow Arrow",
    year: "2024",
    category: "Web Application",
    group: "platform",
    description:
      "A modern business platform built with a focus on clean user experience, responsive interfaces and efficient application workflows.",
    scope: ["Clean UX", "Responsive UI", "App workflows"],
    tech: [],
    image: shadowArrowImage,
    link: "https://shadowarrow.com/",
  },
  {
    id: "avatar",
    title: "Avatar Public School",
    year: "2025",
    category: "Education",
    group: "platform",
    description:
      "A school management platform designed to provide students, parents and administrators with a simple and centralized digital experience.",
    scope: ["Students", "Parents", "Administrators"],
    tech: [],
    image: avatarImage,
    link: "https://avatarpublicschool.com/",
  },
  {
    id: "explore-munnar",
    title: "Explore Munnar",
    year: "2025",
    category: "Travel Platform",
    group: "platform",
    description:
      "A travel platform that helps users explore destinations, discover attractions and experience the beauty of Munnar through an engaging interface.",
    scope: ["Destinations", "Attractions", "Discovery"],
    tech: [],
    image: exploreMunnarImage,
    link: "https://www.exploringmunnar.com/",
  },
  {
    id: "explore-munnar-admin",
    title: "Explore Munnar Admin",
    nav: "Explore Munnar Admin",
    year: "2026",
    category: "Admin Dashboard",
    group: "system",
    description:
      "An administration dashboard for managing destinations, attractions, bookings and content for the Explore Munnar platform.",
    scope: ["Destinations", "Attractions", "Bookings", "Content"],
    tech: [],
    image: exploreMunnarDashboardImage,
    link: "https://exploremunnardashboard.netlify.app/",
  },
  {
    id: "hrms",
    title: "HRMS",
    year: "2026",
    category: "Management System",
    group: "system",
    description:
      "A human resource management system designed to streamline employee management, attendance, leave and organizational workflows.",
    scope: ["Employees", "Attendance", "Leave", "Workflows"],
    tech: [],
    image: hrmsImage,
    link: "https://srieshwarems.com/",
  },
  {
    id: "events",
    title: "Events Management System",
    nav: "Events Management",
    year: "2026",
    category: "Management System",
    group: "system",
    description:
      "A centralized platform for creating, managing and tracking events with dedicated workflows for event requests and approvals.",
    scope: ["Event requests", "Approvals", "Tracking"],
    tech: [],
    image: eventsImage,
    link: "https://srieshwarevents.com/",
  },
  {
    id: "appraisal",
    title: "Appraisal System",
    year: "2025",
    category: "HR Management",
    group: "system",
    cta: "View design",
    description:
      "An employee appraisal platform that simplifies performance reviews, evaluations and organizational assessment workflows.",
    scope: ["Reviews", "Evaluations", "Assessments"],
    tech: [],
    image: appraisalImage,
    link: "https://www.figma.com/design/x69g0wGXjAIop52zx4rd92/Appraisal-wireframe?node-id=0-1&p=f&t=J0uwLPZOWsIGR5BU-0",
  },
  {
    id: "lms",
    title: "Learning Management System",
    nav: "Learning Management",
    year: "2026",
    category: "Education Platform",
    group: "system",
    description:
      "A learning management platform that enables organizations to manage courses, learning content, users and educational workflows.",
    scope: ["Courses", "Learning content", "Users"],
    tech: [],
    image: lmsImage,
    link: "https://sece-lms.vercel.app/",
  },
  {
    id: "cabs",
    title: "Book My Cabs",
    year: "2025",
    category: "Transportation",
    group: "platform",
    description:
      "A cab booking platform designed to connect users with transportation services through a simple and efficient booking experience.",
    scope: ["Bookings", "Transport services", "Simple flow"],
    tech: [],
    image: bookMyCabsImage,
    link: "https://bookmycabs.in/",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "platform", label: "Platforms" },
  { id: "system", label: "Systems" },
];

/* =========================================================
   HELPERS
========================================================= */

const ease = [0.16, 1, 0.3, 1];
const SEGMENT_VH = 34; // scroll distance per project in desktop sticky mode
const pad = (n) => String(n).padStart(2, "0");

const hostOf = (link) => {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

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

const useFinePointer = () => {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = () => setFine(q.matches);
    handler();
    q.addEventListener("change", handler);
    return () => q.removeEventListener("change", handler);
  }, []);
  return fine;
};

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease } },
};

const stagger = (gap = 0.15) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap } },
});

/* directional clip-path reveal for the project screen */
const screenVariants = {
  enter: (d) => ({
    clipPath: d >= 0 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
    opacity: 0.35,
  }),
  center: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.8, ease },
  },
  exit: (d) => ({
    clipPath: d >= 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    opacity: 0.35,
    transition: { duration: 0.32, ease: [0.55, 0, 0.8, 0.4] },
  }),
};

const infoVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12, ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22 } },
};

/* =========================================================
   SMALL PIECES
========================================================= */

const Corners = () => (
  <>
    <span className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-[#e56b3f]" />
    <span className="pointer-events-none absolute -right-px -top-px h-2.5 w-2.5 border-r border-t border-[#e56b3f]" />
    <span className="pointer-events-none absolute -bottom-px -left-px h-2.5 w-2.5 border-b border-l border-[#e56b3f]" />
    <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-[#e56b3f]" />
  </>
);

const ProgressBar = ({ index, total }) => {
  const pct = total > 1 ? (index / (total - 1)) * 100 : 0;
  return (
    <div className="relative h-px min-w-[90px] flex-1 bg-[#71352d]/50" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-0 h-px bg-[#e56b3f]"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease }}
      />
      <motion.span
        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e56b3f]"
        animate={{ left: `${pct}%` }}
        transition={{ duration: 0.7, ease }}
      />
    </div>
  );
};

const FilterChips = ({ filter, onChange }) => (
  <div className="flex items-center gap-4" role="group" aria-label="Filter projects">
    {FILTERS.map((f) => {
      const on = filter === f.id;
      return (
        <button
          key={f.id}
          type="button"
          aria-pressed={on}
          onClick={() => onChange(f.id)}
          className={`relative py-1 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f] ${
            on ? "text-[#e56b3f]" : "text-[#f5e9df]/40 hover:text-[#f5e9df]/80"
          }`}
        >
          {f.label}
          <span
            className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#e56b3f] transition-transform duration-500 ${
              on ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </button>
      );
    })}
  </div>
);

const ProjectCta = ({ p }) => (
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-flex items-center gap-2 pb-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#e56b3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f]"
  >
    {p.cta || "View project"}
    <ArrowUpRight
      aria-hidden="true"
      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
    />
    <span className="sr-only"> (opens in a new tab)</span>
    <span className="absolute bottom-0 left-0 h-px w-full bg-[#e56b3f]/30" />
    <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#e56b3f] transition-transform duration-500 group-hover:scale-x-100" />
  </a>
);

const MetaBlock = ({ label, children }) => (
  <div>
    <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-[#f5e9df]/35">{label}</p>
    {children}
  </div>
);

const TagLine = ({ items }) => (
  <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
    {items.map((t, i) => (
      <span key={t} className="flex items-center gap-2">
        {i > 0 && <span className="text-[10px] text-[#71352d]">·</span>}
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#f5e9df]/70">{t}</span>
      </span>
    ))}
  </p>
);

/* =========================================================
   BROWSER-STYLE PRODUCT FRAME
========================================================= */

const ProjectFrame = ({ p, index, total, dir, reduce, viewportClass }) => {
  const [hover, setHover] = useState(false);
  const fine = useFinePointer();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 260, damping: 26, mass: 0.4 });

  const onMove = (e) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.01 : 1, ease }}
    >
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        aria-label={`${p.cta || "View project"}: ${p.title} (opens in a new tab)`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={onMove}
        className={`group relative block cursor-pointer border bg-[#150c09]/80 transition-[transform,border-color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e56b3f] ${
          hover ? "border-[#e56b3f]/70" : "border-[#71352d]/55"
        }`}
      >
        <Corners />

        {/* chrome */}
        <div className="flex items-center gap-3 border-b border-[#71352d]/45 px-3 py-2">
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#e56b3f]" />
            <span className="h-2 w-2 rounded-full border border-[#71352d]" />
            <span className="h-2 w-2 rounded-full border border-[#71352d]" />
          </span>
          <span className="flex h-5 min-w-0 flex-1 items-center border border-[#71352d]/50 px-2.5">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={p.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="truncate text-[9px] tracking-[0.12em] text-[#f5e9df]/50"
              >
                {hostOf(p.link)}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="hidden shrink-0 text-[9px] tabular-nums tracking-[0.2em] text-[#f5e9df]/35 sm:block">
            {pad(index + 1)} / {pad(total)}
          </span>
        </div>

        {/* screen */}
        <div className={`relative overflow-hidden bg-[#0a0604] ${viewportClass}`}>
          <div className="absolute inset-0 origin-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={p.id}
                custom={dir}
                variants={reduce ? undefined : screenVariants}
                initial={reduce ? false : "enter"}
                animate={reduce ? undefined : "center"}
                exit={reduce ? undefined : "exit"}
                className="absolute inset-0"
              >
                <motion.img
                  src={p.image}
                  alt={`${p.title} — ${p.category} screenshot`}
                  draggable={false}
                  decoding="async"
                  initial={reduce ? false : { scale: 1.07 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease }}
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0604]/80 to-transparent" />
          <span className="pointer-events-none absolute bottom-2 left-3 text-[8px] uppercase tracking-[0.2em] text-[#f5e9df]/55">
            {pad(index + 1)} / {p.category}
          </span>
          <span className="pointer-events-none absolute bottom-2 right-3 text-[8px] tracking-[0.2em] text-[#f5e9df]/45">
            {p.year}
          </span>

          {/* cursor follower (fine pointers only) */}
          {fine && !reduce && (
            <motion.span
              aria-hidden="true"
              style={{ x: sx, y: sy }}
              animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.6 }}
              transition={{ duration: 0.3, ease }}
              className="pointer-events-none absolute left-0 top-0 z-30 -ml-9 -mt-9 grid h-[72px] w-[72px] place-items-center rounded-full bg-[#e56b3f] text-center text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-[#150c09]"
            >
              <span>
                View
                <br />↗
              </span>
            </motion.span>
          )}
        </div>
      </a>
    </motion.div>
  );
};

/* =========================================================
   PROJECT INFORMATION
========================================================= */

const ProjectInfo = ({ p, index, total }) => (
  <div className="grid gap-6 pt-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
    <div>
      <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-[#e56b3f]">
        <span className="tabular-nums">{pad(index + 1)}</span>
        <span className="h-px w-6 bg-[#e56b3f]/60" />
        <span>{p.featured ? "Featured project" : "Selected project"}</span>
      </p>
      <h3 className="mt-3 text-[clamp(22px,2.4vw,34px)] font-bold uppercase leading-[1.08] tracking-tight text-[#f5e9df]">
        {p.title}
      </h3>
      <p className="mt-3 max-w-[480px] text-[13px] leading-relaxed text-[#f5e9df]/65 sm:text-sm">
        {p.description}
      </p>
    </div>

    <div className="flex flex-col gap-5">
      <MetaBlock label="Category">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f5e9df]">
          {p.category}
        </p>
      </MetaBlock>
      {p.tech.length > 0 && (
        <MetaBlock label="Technology">
          <TagLine items={p.tech} />
        </MetaBlock>
      )}
      <MetaBlock label="Scope">
        <TagLine items={p.scope} />
      </MetaBlock>
      <div className="pt-1">
        <ProjectCta p={p} />
      </div>
    </div>
  </div>
);

/* =========================================================
   NAVIGATION: vertical index + horizontal strip
========================================================= */

const ProjectList = ({ list, active, onSelect, mode }) => {
  const refs = useRef([]);

  const onKeyDown = (e, i) => {
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % list.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + list.length) % list.length;
    if (next === null) return;
    e.preventDefault();
    refs.current[next]?.focus();
    onSelect(next);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#f5e9df]/45">
        <span>Index</span>
        <span className="tabular-nums text-[#f5e9df]/30">{pad(list.length)} projects</span>
      </div>

      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Projects"
        className="border-t border-[#71352d]/45"
      >
        {list.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => (refs.current[i] = el)}
              type="button"
              role="tab"
              id={`proj-tab-${p.id}`}
              aria-selected={on}
              aria-controls="proj-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#e56b3f]"
            >
              {on && (
                <motion.span
                  layoutId="proj-bar"
                  className="absolute left-0 top-0 h-full w-[2px] bg-[#e56b3f]"
                  transition={{ duration: 0.5, ease }}
                />
              )}
              <span
                className={`flex items-center gap-3 py-[9px] pl-3 pr-1 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  on ? "translate-x-1.5" : "group-hover:translate-x-1.5"
                } ${mode === "desktop" ? "lg:py-[10px]" : ""}`}
              >
                <span
                  className={`w-6 shrink-0 text-[11px] font-semibold tabular-nums tracking-widest transition-colors duration-300 ${
                    on ? "text-[#e56b3f]" : "text-[#e56b3f]/45 group-hover:text-[#e56b3f]"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className={`min-w-0 flex-1 text-[13px] font-bold uppercase leading-tight tracking-tight transition-colors duration-300 lg:text-[clamp(13px,1.2vw,17px)] ${
                    on ? "text-[#f5e9df]" : "text-[#f5e9df]/38 group-hover:text-[#f5e9df]/80"
                  }`}
                >
                  {p.nav || p.title}
                </span>
                <span
                  className={`hidden shrink-0 text-[9px] tabular-nums tracking-[0.2em] transition-colors duration-300 xl:block ${
                    on ? "text-[#f5e9df]/55" : "text-[#f5e9df]/20"
                  }`}
                >
                  {p.year}
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
        <p className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-[#f5e9df]/30">
          <span className="h-px w-6 bg-[#71352d]" />
          Scroll or select a project
        </p>
      )}
    </div>
  );
};

const ProjectStrip = ({ list, active, onSelect, scrollable }) => {
  const wrapRef = useRef(null);

  /* keep the active number in view inside the strip (mobile) without moving the page */
  useEffect(() => {
    if (!scrollable || !wrapRef.current) return;
    const wrap = wrapRef.current;
    const btn = wrap.children[active];
    if (!btn) return;
    wrap.scrollTo({
      left: btn.offsetLeft - wrap.clientWidth / 2 + btn.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active, scrollable]);

  return (
    <div
      ref={wrapRef}
      role="group"
      aria-label="Jump to project"
      className={`flex border-t border-[#71352d]/40 ${
        scrollable
          ? "gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "justify-between"
      }`}
    >
      {list.map((p, i) => {
        const on = i === active;
        return (
          <button
            key={p.id}
            type="button"
            aria-label={`Project ${i + 1}: ${p.title}`}
            aria-current={on}
            onClick={() => onSelect(i)}
            className={`relative shrink-0 px-3 py-3 text-[11px] font-semibold tabular-nums tracking-[0.22em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#e56b3f] ${
              on ? "text-[#e56b3f]" : "text-[#f5e9df]/35 hover:text-[#f5e9df]/80"
            } ${scrollable ? "min-w-11" : ""}`}
          >
            {pad(i + 1)}
            {on && (
              <motion.span
                layoutId={scrollable ? "strip-bar-m" : "strip-bar"}
                className="absolute -top-px left-0 h-[2px] w-full bg-[#e56b3f]"
                transition={{ duration: 0.5, ease }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

/* huge background number that slides between projects */
const BigNumber = ({ n, reduce }) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-8 right-0 z-0 hidden select-none overflow-hidden md:block lg:-bottom-12"
  >
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={n}
        initial={reduce ? false : { y: "35%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: "-35%", opacity: 0 }}
        transition={{ duration: reduce ? 0.01 : 0.8, ease }}
        className="block font-extrabold leading-[0.8] tracking-tighter"
        style={{
          fontSize: "clamp(120px, 16vw, 250px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(113,53,45,0.32)",
        }}
      >
        {pad(n)}
      </motion.span>
    </AnimatePresence>
  </div>
);

/* =========================================================
   SECTION
========================================================= */

const Projects = () => {
  const reduce = useReducedMotion();
  const mode = useLayoutMode();

  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const trackRef = useRef(null);
  const lockRef = useRef(false);
  const lockTimer = useRef(null);
  const firstFilter = useRef(true);

  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.group === filter);
  const N = list.length;
  const safeActive = Math.min(active, N - 1);
  const current = list[safeActive];
  const isDesktop = mode === "desktop";

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* desktop: scroll position drives the active project */
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (mode !== "desktop" || lockRef.current) return;
    const i = Math.min(N - 1, Math.max(0, Math.floor(p * N)));
    setActive((prev) => {
      if (prev === i) return prev;
      setDir(i > prev ? 1 : -1);
      return i;
    });
  });

  useEffect(() => () => clearTimeout(lockTimer.current), []);

  const scrollToIndex = useCallback(
    (i, count) => {
      const el = trackRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      lockRef.current = true;
      clearTimeout(lockTimer.current);
      window.scrollTo({
        top: top + span * ((i + 0.5) / count),
        behavior: reduce ? "auto" : "smooth",
      });
      lockTimer.current = setTimeout(() => {
        lockRef.current = false;
      }, reduce ? 100 : 1000);
    },
    [reduce]
  );

  const select = (i) => {
    setDir(i >= safeActive ? 1 : -1);
    setActive(i);
    if (isDesktop) scrollToIndex(i, N);
  };

  const changeFilter = (f) => {
    if (f === filter) return;
    setDir(1);
    setActive(0);
    setFilter(f);
  };

  /* after a filter change the track height changes: realign the scroll position */
  useEffect(() => {
    if (firstFilter.current) {
      firstFilter.current = false;
      return;
    }
    if (isDesktop) scrollToIndex(0, N);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  /* warm the neighbours so the reveal never waits on a decode */
  useEffect(() => {
    [safeActive - 1, safeActive + 1].forEach((i) => {
      const p = list[i];
      if (p) new Image().src = p.image;
    });
  }, [safeActive, list]);

  const goPrev = () => select((safeActive - 1 + N) % N);
  const goNext = () => select((safeActive + 1) % N);

  const counter = `${pad(safeActive + 1)} / ${pad(N)}`;

  /* ---------- shared pieces ---------- */
  const topBar = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease }}
      className="flex flex-wrap items-center gap-x-6 gap-y-4"
    >
      <span className="text-[10px] font-medium tabular-nums tracking-[0.24em] text-[#f5e9df]/60">
        {counter}
      </span>
      <ProgressBar index={safeActive} total={N} />
      <FilterChips filter={filter} onChange={changeFilter} />
    </motion.div>
  );

  const showcase = (
    <div className="relative">
      <BigNumber n={safeActive + 1} reduce={reduce} />
      <div className="relative z-10">
        <ProjectFrame
          p={current}
          index={safeActive}
          total={N}
          dir={dir}
          reduce={reduce}
          viewportClass="h-[clamp(200px,32vw,320px)] lg:h-[clamp(220px,calc(100vh-430px),470px)]"
        />
        <div id="proj-panel" role="tabpanel" aria-labelledby={`proj-tab-${current.id}`} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              variants={reduce ? undefined : infoVariants}
              initial={reduce ? false : "enter"}
              animate={reduce ? undefined : "center"}
              exit={reduce ? undefined : "exit"}
            >
              <ProjectInfo p={current} index={safeActive} total={N} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  const consoleEl = (
    <div>
      {topBar}
      <div className="mt-6 grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,230px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <ProjectList list={list} active={safeActive} onSelect={select} mode={mode} />
          </motion.div>
        </motion.div>
        {showcase}
      </div>
      <div className="mt-6 hidden md:block">
        <ProjectStrip list={list} active={safeActive} onSelect={select} scrollable={false} />
      </div>
    </div>
  );

  /* ---------- mobile: swipeable case study ---------- */
  const mobileEl = (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium tabular-nums tracking-[0.24em] text-[#f5e9df]/70">
          {counter}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous project"
            className="grid h-9 w-9 place-items-center border border-[#71352d]/55 text-[#f5e9df]/70 transition-colors hover:border-[#e56b3f] hover:text-[#e56b3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e56b3f]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="grid h-9 w-9 place-items-center border border-[#71352d]/55 text-[#f5e9df]/70 transition-colors hover:border-[#e56b3f] hover:text-[#e56b3f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e56b3f]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <ProjectStrip list={list} active={safeActive} onSelect={select} scrollable />
      </div>

      <div className="mt-4">
        <FilterChips filter={filter} onChange={changeFilter} />
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (info.offset.x < -60 || info.velocity.x < -450) goNext();
          else if (info.offset.x > 60 || info.velocity.x > 450) goPrev();
        }}
        className="mt-6"
      >
        <ProjectFrame
          p={current}
          index={safeActive}
          total={N}
          dir={dir}
          reduce={reduce}
          viewportClass="aspect-[16/10]"
        />
        <p className="mt-2 text-center text-[9px] uppercase tracking-[0.24em] text-[#f5e9df]/30">
          Swipe to browse
        </p>
        <div id="proj-panel" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              variants={reduce ? undefined : infoVariants}
              initial={reduce ? false : "enter"}
              animate={reduce ? undefined : "center"}
              exit={reduce ? undefined : "exit"}
            >
              <ProjectInfo p={current} index={safeActive} total={N} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      id="projects"
      className="relative w-full overflow-x-clip bg-[#0c0705] px-4 py-20 text-[#f5e9df] sm:px-6 sm:py-24 md:px-8 lg:px-14 lg:py-28"
    >
      {/* ---------------- background: grid + coordinates ---------------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_85%_6%,rgba(229,107,63,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,233,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {[
          { l: 2, t: 3, label: "X 104 / Y 156" },
          { l: 17, t: 2, label: "X 884 / Y 104" },
          { l: 22, t: 7, label: "X 1144 / Y 364" },
        ].map((m) => (
          <span
            key={m.label}
            className="absolute hidden lg:block"
            style={{ left: `${m.l * 52}px`, top: `${m.t * 52}px` }}
          >
            <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-[#e56b3f]/45" />
            <span className="absolute left-2 top-1 whitespace-nowrap text-[8px] tracking-[0.2em] text-[#f5e9df]/[0.18]">
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
          variants={stagger(0.15)}
          className="mb-12 flex flex-col gap-10 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-10 bg-[#e56b3f]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#f5e9dfaa] sm:text-xs">
                05 / Selected work
              </span>
            </motion.div>

            <div className="overflow-hidden py-[2px]">
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(30px,5.4vw,54px)] font-bold uppercase leading-[1.05] tracking-tight"
              >
                Built for
              </motion.h2>
            </div>
            <div className="overflow-hidden py-[2px]">
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(30px,5.4vw,54px)] font-bold uppercase leading-[1.05] tracking-tight"
              >
                <span className="heading-font font-normal italic text-[#e56b3f]">
                  The real world.
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[460px] text-sm leading-relaxed text-[#f5e9dfb3] sm:text-[15px]"
            >
              A selection of digital products, websites and software solutions built around real
              business requirements.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="hidden w-[210px] shrink-0 -rotate-1 border border-[#71352d]/30 px-3 py-2.5 opacity-70 md:block"
            aria-hidden="true"
          >
            <div className="flex justify-between text-[8px] tracking-[0.15em] text-[#f5e9df]/55">
              <span>SELECTED WORK / {pad(PROJECTS.length)}</span>
              <span className="text-[#e56b3f]/70">LIVE</span>
            </div>
            <div className="my-2 h-px w-full bg-[#71352d]/40" />
            <div className="space-y-1 text-[8px] tracking-[0.12em] text-[#f5e9df]/40">
              <div>DIGITAL PRODUCTS</div>
              <div>WEB / SYSTEMS / PLATFORMS</div>
              <div>BUILD / DESIGN / DEVELOP</div>
            </div>
            <div className="relative mt-2.5 h-px w-full bg-[#71352d]/40">
              <span className="absolute left-[54%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#e56b3f]/60" />
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- case-study archive ----------------
            The tracking wrapper always renders so useScroll has a target in every mode. */}
        <div
          ref={trackRef}
          style={isDesktop ? { height: `${100 + N * SEGMENT_VH}vh` } : undefined}
        >
          {mode === "mobile" ? (
            mobileEl
          ) : isDesktop ? (
            <div className="sticky top-0 flex h-screen items-center">
              <div className="w-full">{consoleEl}</div>
            </div>
          ) : (
            consoleEl
          )}
        </div>

        {/* ---------------- closing statement ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger(0.15)}
          className="mt-16 flex flex-col gap-6 border-t border-[#71352d]/40 pt-10 sm:mt-20 md:flex-row md:items-end md:justify-between lg:mt-24"
        >
          <div>
            <div className="overflow-hidden py-[2px]">
              <motion.h3
                variants={fadeUp}
                className="text-[clamp(26px,4vw,44px)] font-bold uppercase leading-[1.05] tracking-tight"
              >
                From ideas
              </motion.h3>
            </div>
            <div className="overflow-hidden py-[2px]">
              <motion.h3
                variants={fadeUp}
                className="text-[clamp(26px,4vw,44px)] font-bold uppercase leading-[1.05] tracking-tight"
              >
                <span className="heading-font font-normal italic text-[#e56b3f]">
                  To digital products.
                </span>
              </motion.h3>
            </div>
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-[280px] text-[13px] leading-relaxed text-[#f5e9df]/55 md:text-right"
          >
            Websites, platforms and business systems, shaped around how each client actually works.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
