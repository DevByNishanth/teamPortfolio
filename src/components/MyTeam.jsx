import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ---------------------------------------------
   Animation variants
--------------------------------------------- */

const easePremium = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easePremium },
  },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const blockVariant = {
  hidden: { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: easePremium },
  },
};

const nodePop = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easePremium },
  },
};

const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: easePremium },
  },
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

const MyTeam = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hoverSide, setHoverSide] = useState(null); // 'business' | 'dev' | null

  const businessDim = hoverSide === "dev" ? "opacity-50" : "opacity-100";
  const devDim = hoverSide === "business" ? "opacity-50" : "opacity-100";
  const businessLineOpacity =
    hoverSide === "dev" ? 0.25 : hoverSide === "business" ? 0.9 : 0.55;
  const devLineOpacity =
    hoverSide === "business" ? 0.25 : hoverSide === "dev" ? 0.9 : 0.55;

  return (
    <section
      id="our-team"
      className="relative w-full overflow-hidden bg-[#0f0906] text-[#f5e9df] px-4 sm:px-6 md:px-8 lg:px-14 py-20 sm:py-24 lg:py-28"
    >
      {/* ---------------- background: grid + faint dashboard fragment ---------------- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_85%_10%,rgba(229,107,63,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,233,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        {/* faint dashboard fragment — decorative design layer, not functional */}
        <div className="hidden md:block absolute top-10 right-6 lg:right-14 w-[190px] border border-[#71352d]/20 opacity-40 px-3 py-2.5 -rotate-1">
          <div className="flex items-center justify-between text-[8px] tracking-[0.15em] text-[#f5e9df]/50">
            <span>PROJECT / 026</span>
          </div>
          <div className="h-px w-full bg-[#71352d]/30 my-2" />
          <div className="space-y-1 text-[8px] tracking-[0.1em] text-[#f5e9df]/35">
            <div className="flex justify-between">
              <span>REQUIREMENTS</span>
              <span>08</span>
            </div>
            <div className="flex justify-between">
              <span>MODULES</span>
              <span>14</span>
            </div>
            <div className="flex justify-between">
              <span>STATUS</span>
              <span className="text-[#e56b3f]/60">ACTIVE</span>
            </div>
          </div>
          <div className="relative h-px w-full bg-[#71352d]/30 mt-2.5">
            <span className="absolute left-[62%] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#e56b3f]/50" />
          </div>
        </div>
        <span className="hidden lg:block absolute top-[14%] left-[4%] text-[8px] tracking-[0.2em] text-[#f5e9df]/20">
          TEAM / 2026
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ---------------- header ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerParent}
          className="mb-14 sm:mb-16 lg:mb-20"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-10 bg-[#e56b3f]" />
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#f5e9dfaa] font-medium">
              03 / Our Team
            </span>
          </motion.div>

          <div>
            <div className="overflow-hidden py-[2px]">
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(30px,5.4vw,54px)] font-bold uppercase leading-[1.05] tracking-tight"
              >
                Business
              </motion.h2>
            </div>
            <div className="overflow-hidden py-[2px]">
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(30px,5.4vw,54px)] font-bold uppercase leading-[1.05] tracking-tight"
              >
                Meets{" "}
                <span className="heading-font italic font-normal text-[#e56b3f]">
                  Technology.
                </span>
              </motion.h2>
            </div>
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-[440px] text-sm sm:text-[15px] leading-relaxed text-[#f5e9dfb3]"
          >
            Different perspectives, one direction — understanding the problem,
            building the solution and delivering technology that creates value.
          </motion.p>
        </motion.div>

        {/* ---------------- team system ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerParent}
          className="grid grid-cols-1 lg:grid-cols-[1fr_150px_1fr] items-center gap-10 lg:gap-4"
        >
          {/* ===== BUSINESS BLOCK ===== */}
          <motion.div
            variants={blockVariant}
            onMouseEnter={() => setHoverSide("business")}
            onMouseLeave={() => setHoverSide(null)}
            className={`transition-opacity duration-300 ${businessDim} border-t border-[#71352d]/40 pt-6`}
          >
            <span className="text-[10px] tracking-widest text-[#e56b3f]">
              01
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#f5e9df]/45 mt-1">
              Business Development
            </p>

            <h3 className="mt-4 text-2xl sm:text-3xl font-bold uppercase leading-[1.08] tracking-tight">
              Understand
              <br />
              The{" "}
              <span className="heading-font italic font-normal text-[#e56b3f]">
                Problem.
              </span>
            </h3>

            <p className="mt-4 max-w-[320px] text-[13px] leading-relaxed text-[#f5e9df80]">
              Understanding client goals, discovering requirements and
              translating business needs into a clear direction for the product.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
              {["CLIENT RELATIONS", "DISCOVERY", "COORDINATION"].map((c, i) => (
                <React.Fragment key={c}>
                  {i > 0 && (
                    <span className="text-[#71352d] text-[10px]">·</span>
                  )}
                  <span
                    className={`text-[9px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                      hoverSide === "business"
                        ? "text-[#f5e9df]/75"
                        : "text-[#f5e9df]/40"
                    }`}
                  >
                    {c}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* ===== CENTER CONNECTOR + REQUIREMENT NODE ===== */}
          <motion.div
            variants={staggerParent}
            className="relative flex flex-row lg:flex-col items-center justify-center gap-3 lg:gap-4 py-2 lg:py-0 lg:h-full"
          >
            {/* line: business -> node */}
            <svg
              className="hidden lg:block absolute left-0 top-0 w-full h-1/2"
              viewBox="0 0 150 140"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="10"
                x2="140"
                y2="120"
                stroke="#e56b3f"
                strokeWidth="1"
                variants={drawPath}
                style={{
                  opacity: businessLineOpacity,
                  transition: "opacity 0.3s ease",
                }}
              />
            </svg>
            {/* line: node -> dev */}
            <svg
              className="hidden lg:block absolute left-0 bottom-0 w-full h-1/2"
              viewBox="0 0 150 140"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="10"
                y1="20"
                x2="150"
                y2="130"
                stroke="#e56b3f"
                strokeWidth="1"
                variants={drawPath}
                style={{
                  opacity: devLineOpacity,
                  transition: "opacity 0.3s ease",
                }}
              />
            </svg>

            {/* mobile connector line */}
            <span className="lg:hidden h-8 w-[1px] bg-[#71352d]/50" />

            <motion.div
              variants={nodePop}
              className="relative z-10 border border-[#e56b3f]/50 bg-[#150c09] px-4 py-3 text-center"
            >
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#e56b3f]">
                Requirement
              </p>
              <p className="mt-1 text-[7px] tracking-[0.12em] uppercase text-[#f5e9df]/40 whitespace-nowrap">
                Goals · Users · Scope
              </p>
              <motion.span
                className="absolute -inset-1.5 border border-[#e56b3f]/20 pointer-events-none"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 2.4,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <span className="lg:hidden h-8 w-[1px] bg-[#71352d]/50" />
            <span className="hidden lg:block text-[7px] tracking-[0.2em] text-[#f5e9df]/20 absolute -right-2 top-1/2 -translate-y-1/2 rotate-90">
              SYSTEM / 01
            </span>
          </motion.div>

          {/* ===== DEVELOPMENT BLOCK ===== */}
          <motion.div
            variants={blockVariant}
            onMouseEnter={() => setHoverSide("dev")}
            onMouseLeave={() => setHoverSide(null)}
            className={`transition-opacity duration-300 ${devDim} border-t border-[#71352d]/40 pt-6 lg:text-right`}
          >
            <span className="text-[10px] tracking-widest text-[#e56b3f]">
              02
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#f5e9df]/45 mt-1">
              Full Stack Development
            </p>

            <h3 className="mt-4 text-2xl sm:text-3xl font-bold uppercase leading-[1.08] tracking-tight">
              Build
              <br />
              The{" "}
              <span className="heading-font italic font-normal text-[#e56b3f]">
                Solution.
              </span>
            </h3>

            <p className="mt-4 max-w-[320px] lg:ml-auto text-[13px] leading-relaxed text-[#f5e9df80]">
              Turning defined requirements into reliable digital products
              through frontend, backend, APIs and databases.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 lg:justify-end">
              {["FRONTEND", "BACKEND", "API", "DATABASE"].map((c, i) => (
                <React.Fragment key={c}>
                  {i > 0 && (
                    <span className="text-[#71352d] text-[10px]">·</span>
                  )}
                  <span
                    className={`text-[9px] tracking-[0.14em] uppercase transition-colors duration-300 ${
                      hoverSide === "dev"
                        ? "text-[#f5e9df]/75"
                        : "text-[#f5e9df]/40"
                    }`}
                  >
                    {c}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- product output ---------------- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerParent}
          className="relative flex flex-col items-center mt-10 sm:mt-12 lg:mt-16"
        >
          <motion.span
            variants={fadeUp}
            className="h-8 w-[1px] bg-[#71352d]/50"
          />
          <motion.div
            variants={nodePop}
            className="relative border border-[#e56b3f] bg-[#150c09] px-6 py-3.5 text-center"
          >
            <p className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#f5e9df]">
              Digital Product
            </p>
            <motion.span
              className="absolute bottom-0 left-0 h-[2px] bg-[#e56b3f]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.9, ease: easePremium }}
            />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-[9px] tracking-[0.22em] uppercase text-[#f5e9df]/40"
          >
            Design · Develop · Deploy
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default MyTeam;
