import React, { useEffect, useRef, useState } from "react";
import {
    ArrowUpRight,
    ArrowDown,
    Code2,
    Bot,
    Activity,
    Layers,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/* ---------------------------------------------
   Static content
--------------------------------------------- */

const headlineLines = [
    "WE TURN BUSINESS IDEAS",
    "INTO DIGITAL PRODUCTS.",
];

const capabilityCards = [
    {
        icon: Code2,
        lines: ["WEB / SAAS", "CUSTOM SOFTWARE"],
    },
    {
        icon: Bot,
        lines: ["AI / AUTOMATION", "DIGITAL PRODUCTS"],
    },
];

/* ---------------------------------------------
   Animation variants
--------------------------------------------- */

const easePremium = [0.16, 1, 0.3, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, delay, ease: easePremium },
    }),
};

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18, delayChildren: 1.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: easePremium },
    },
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

const Hero = () => {
    const prefersReducedMotion = useReducedMotion();
    const ecosystemRef = useRef(null);
    const [enableParallax, setEnableParallax] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        setEnableParallax(isFinePointer);
    }, [prefersReducedMotion]);

    // Raw pointer position, normalized to -0.5 .. 0.5
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const springX = useSpring(mvX, { stiffness: 60, damping: 18, mass: 0.6 });
    const springY = useSpring(mvY, { stiffness: 60, damping: 18, mass: 0.6 });

    // Independent depth layers
    const gridX = useTransform(springX, (v) => v * 2);
    const gridY = useTransform(springY, (v) => v * 2);
    const panelX = useTransform(springX, (v) => v * 5);
    const panelY = useTransform(springY, (v) => v * 5);
    const cardsX = useTransform(springX, (v) => v * 8);
    const cardsY = useTransform(springY, (v) => v * 8);
    const decorX = useTransform(springX, (v) => v * 12);
    const decorY = useTransform(springY, (v) => v * 12);

    const handleMouseMove = (e) => {
        if (!enableParallax || !ecosystemRef.current) return;
        const rect = ecosystemRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        mvX.set(relX);
        mvY.set(relY);
    };

    const handleMouseLeave = () => {
        mvX.set(0);
        mvY.set(0);
    };

    const scrollToWork = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="hero-main-container w-full min-h-[100svh] lg:h-[100vh] relative flex flex-col overflow-hidden bg-[#0c0705]">
            {/* ------------------------------------------------------------------ */}
            {/* Cinematic textured background (no personal photo — CSS generated) */}
            {/* ------------------------------------------------------------------ */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_18%_15%,rgba(229,107,63,0.22),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_80%,rgba(113,53,45,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,0,0,0.6),transparent_70%)]" />
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(245,233,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.6) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Content */}
            {/* ------------------------------------------------------------------ */}
            <div className="content-wrapper relative z-10 w-full flex-1 flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center gap-10 lg:gap-6 px-4 sm:px-6 md:px-8 lg:px-14 pt-24 pb-8 lg:py-0">

                {/* ============================ LEFT: MESSAGE ============================ */}
                <div className="order-1 flex flex-col text-[#f5e9df]">
                    {/* Eyebrow */}
                    <motion.div
                        custom={0.05}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-3 mb-5"
                    >
                        <span className="h-[2px] w-8 bg-[#e56b3f]" />
                        <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#f5e9dfcc] font-medium">
                            Digital Product Development Team
                        </span>
                    </motion.div>

                    {/* Headline — line-by-line reveal */}
                    <div>
                        {headlineLines.map((line, i) => (
                            <div key={line} className="overflow-hidden py-[3px]">
                                <motion.h1
                                    initial={{ y: "115%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.35 + i * 0.2, ease: easePremium }}
                                    className="text-[clamp(34px,6.6vw,66px)] font-bold uppercase leading-[1.04] tracking-tight"
                                >
                                    {i === 1 ? (
                                        <>
                                            INTO{" "}
                                            <span className="heading-font italic font-normal text-[#e56b3f]">
                                                Digital
                                            </span>{" "}
                                            PRODUCTS.
                                        </>
                                    ) : (
                                        line
                                    )}
                                </motion.h1>
                            </div>
                        ))}
                    </div>

                    {/* Supporting paragraph */}
                    <motion.p
                        custom={0.85}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-6 max-w-[460px] text-sm sm:text-[15px] leading-relaxed text-[#f5e9dfb3]"
                    >
                        We design and develop websites, SaaS platforms, custom software,
                        business applications and digital experiences built around real
                        business needs.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        custom={1.05}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-9 flex flex-wrap items-center gap-4"
                    >
                        <button
                            onClick={scrollToContact}
                            className="group relative overflow-hidden bg-[#f5e9df] text-[#1a0f0b] px-7 py-3.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]"
                        >
                            <span className="absolute inset-0 -translate-x-full bg-[#e56b3f] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                            <span className="relative">Start a Project</span>
                            <ArrowUpRight
                                size={16}
                                strokeWidth={2}
                                className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </button>

                        <button
                            onClick={scrollToWork}
                            className="group relative flex items-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#f5e9df] border border-[#f5e9df]/25 transition-colors duration-300 hover:border-[#e56b3f] hover:text-[#e56b3f]"
                        >
                            <span>View Our Work</span>
                            <ArrowDown
                                size={16}
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:translate-y-0.5"
                            />
                        </button>
                    </motion.div>
                </div>

                {/* ============================ RIGHT: DIGITAL ECOSYSTEM ============================ */}
                <div
                    ref={ecosystemRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="order-2 relative w-full h-[360px] sm:h-[420px] lg:h-[520px] flex items-center justify-center lg:justify-end"
                >
                    {/* background grid layer */}
                    <motion.div
                        style={enableParallax ? { x: gridX, y: gridY } : undefined}
                        className="absolute inset-0 opacity-40 pointer-events-none"
                    >
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 h-[85%] w-[85%] sm:w-[70%]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(245,233,223,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.35) 1px, transparent 1px)",
                                backgroundSize: "34px 34px",
                                maskImage: "radial-gradient(ellipse 70% 70% at 60% 50%, black 40%, transparent 90%)",
                                WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 60% 50%, black 40%, transparent 90%)",
                            }}
                        />
                    </motion.div>

                    {/* connecting lines + nodes */}
                    <motion.svg
                        style={enableParallax ? { x: panelX, y: panelY } : undefined}
                        viewBox="0 0 400 400"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        fill="none"
                    >
                        <motion.line
                            x1="60" y1="90" x2="230" y2="150"
                            stroke="#e56b3f" strokeWidth="1" strokeOpacity="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 1.4, delay: 1.6, ease: easePremium }}
                        />
                        <motion.line
                            x1="230" y1="150" x2="300" y2="280"
                            stroke="#e56b3f" strokeWidth="1" strokeOpacity="0.35"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.4 }}
                            transition={{ duration: 1.4, delay: 1.8, ease: easePremium }}
                        />
                        <motion.circle
                            cx="60" cy="90" r="3" fill="#e56b3f"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.4, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="300" cy="280" r="3" fill="#f5e9df"
                            animate={{ opacity: [0.3, 0.9, 0.3] }}
                            transition={{ duration: 2.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut", delay: 0.6 }}
                        />
                    </motion.svg>

                    {/* main dashboard / interface panel */}
                    <motion.div
                        style={enableParallax ? { x: panelX, y: panelY } : undefined}
                        initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 1.0, ease: easePremium }}
                        className="relative w-[260px] sm:w-[300px] lg:w-[320px] rounded-sm border border-[#71352d] bg-[#120a08]/70 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                    >
                        {/* window chrome */}
                        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-[#71352d]/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e56b3f]/70" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f5e9df]/30" />
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f5e9df]/30" />
                            <span className="ml-auto text-[8px] tracking-[0.2em] text-[#f5e9df]/40">
                                PRODUCT.APP
                            </span>
                        </div>

                        {/* body: mini chart */}
                        <div className="px-4 pt-4 pb-3">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[9px] tracking-[0.2em] text-[#f5e9df]/50">
                                    GROWTH
                                </span>
                                <span className="flex items-center gap-1 text-[9px] text-[#e56b3f]">
                                    <Activity size={10} strokeWidth={2} />
                                    LIVE
                                </span>
                            </div>

                            <svg viewBox="0 0 220 64" className="w-full h-14">
                                <motion.polyline
                                    points="0,50 30,42 60,46 90,28 120,32 150,14 180,20 220,6"
                                    fill="none"
                                    stroke="#e56b3f"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.6, delay: 1.3, ease: easePremium }}
                                />
                            </svg>

                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {["UPTIME", "DEPLOYS", "USERS"].map((label, i) => (
                                    <div key={label} className="border border-[#71352d]/50 px-2 py-1.5">
                                        <p className="text-[7px] tracking-[0.14em] text-[#f5e9df]/40">{label}</p>
                                        <p className="text-[10px] text-[#f5e9df] font-medium mt-0.5">
                                            {i === 0 ? "99.9%" : i === 1 ? "24/7" : "1.2K"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* animated bottom border */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-[#e56b3f]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.9, duration: 1, ease: easePremium }}
                        />
                    </motion.div>

                    {/* capability cards */}
                    <motion.div
                        style={enableParallax ? { x: cardsX, y: cardsY } : undefined}
                        variants={cardContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute left-0 sm:left-2 lg:-left-6 bottom-2 sm:bottom-6 lg:bottom-10 flex flex-col gap-2 z-20"
                    >
                        {capabilityCards.map(({ icon: Icon, lines }) => (
                            <motion.div
                                key={lines[0]}
                                variants={cardVariants}
                                className="w-[190px] sm:w-[210px] h-[54px] border border-[#71352d] px-3 flex items-center gap-3 bg-black/40 backdrop-blur-sm"
                            >
                                <div className="text-[#e56b3f] pr-3 border-r border-[#71352d]/70">
                                    <Icon size={20} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col leading-none gap-1">
                                    <span className="text-[8.5px] tracking-[0.14em] text-gray-300 font-medium">
                                        {lines[0]}
                                    </span>
                                    <span className="text-[8.5px] tracking-[0.14em] text-gray-300 font-medium">
                                        {lines[1]}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* small floating label */}
                    <motion.div
                        style={enableParallax ? { x: decorX, y: decorY } : undefined}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.1, ease: easePremium }}
                        className="absolute top-2 right-2 sm:top-4 sm:right-6 lg:top-0 lg:right-0 flex items-center gap-2 border border-[#71352d]/60 bg-black/30 backdrop-blur-sm px-2.5 py-1.5"
                    >
                        <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-green-400"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-[8px] sm:text-[9px] tracking-[0.18em] text-[#f5e9df]/70">
                            TEAM AVAILABLE
                        </span>
                        <Layers size={11} strokeWidth={1.5} className="text-[#e56b3f]" />
                    </motion.div>
                </div>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Scroll indicator */}
            {/* ------------------------------------------------------------------ */}
            <motion.button
                onClick={scrollToWork}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.4 }}
                className="order-3 relative z-20 mx-auto mb-6 lg:mb-8 flex flex-col items-center gap-2 text-[#f5e9dfaa] lg:absolute lg:left-14 lg:bottom-8 lg:mx-0"
            >
                <span className="text-[9px] tracking-[0.28em] uppercase [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]">
                    Scroll to Explore
                </span>
                <motion.span
                    animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={14} strokeWidth={1.5} />
                </motion.span>
            </motion.button>

            {/* rotated decorative square (retained from original hero) */}
            <div className="hidden lg:block absolute bottom-3 right-22 z-10 h-16 w-16 rotate-45 border border-orange-500/40" />
        </section>
    );
};

export default Hero;
