import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/* ---------------------------------------------
   Static content
--------------------------------------------- */

const values = [
    {
        num: "01",
        title: "THINK BUSINESS-FIRST",
        desc: "We understand the problem before defining the solution.",
    },
    {
        num: "02",
        title: "BUILD WITH CLARITY",
        desc: "Simple interfaces and maintainable systems.",
    },
    {
        num: "03",
        title: "DESIGN FOR SCALE",
        desc: "Products designed to evolve with the business.",
    },
    {
        num: "04",
        title: "DELIVER WITH PURPOSE",
        desc: "Technology that solves a real problem.",
    },
];

const floatingLabels = [
    { label: "IDEA", className: "top-[6%] left-[2%] sm:left-[6%]" },
    { label: "DESIGN", className: "top-[2%] right-[4%]" },
    { label: "CODE", className: "bottom-[10%] left-0 sm:left-[2%]" },
    { label: "USERS", className: "bottom-[4%] right-[6%]" },
];

/* ---------------------------------------------
   Animation variants
--------------------------------------------- */

const easePremium = [0.16, 1, 0.3, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, ease: easePremium },
    },
};

const staggerParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
};

const valuesParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const valueRow = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easePremium } },
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

const Aboutus = () => {
    const prefersReducedMotion = useReducedMotion();
    const visualRef = useRef(null);
    const [enableParallax, setEnableParallax] = useState(false);

    useEffect(() => {
        if (prefersReducedMotion) return;
        setEnableParallax(window.matchMedia("(pointer: fine)").matches);
    }, [prefersReducedMotion]);

    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const springX = useSpring(mvX, { stiffness: 55, damping: 18, mass: 0.6 });
    const springY = useSpring(mvY, { stiffness: 55, damping: 18, mass: 0.6 });

    const gridXY = {
        x: useTransform(springX, (v) => v * 2),
        y: useTransform(springY, (v) => v * 2),
    };
    const frameXY = {
        x: useTransform(springX, (v) => v * 4),
        y: useTransform(springY, (v) => v * 4),
    };
    const panelXY = {
        x: useTransform(springX, (v) => v * 7),
        y: useTransform(springY, (v) => v * 7),
    };
    const labelXY = {
        x: useTransform(springX, (v) => v * 10),
        y: useTransform(springY, (v) => v * 10),
    };

    const handleMouseMove = (e) => {
        if (!enableParallax || !visualRef.current) return;
        const rect = visualRef.current.getBoundingClientRect();
        mvX.set((e.clientX - rect.left) / rect.width - 0.5);
        mvY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mvX.set(0);
        mvY.set(0);
    };

    const scrollToServices = () => {
        document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section
            id="about-us"
            className="relative w-full overflow-hidden bg-[#0f0906] text-[#f5e9df] px-4 sm:px-6 md:px-8 lg:px-14 py-20 sm:py-24 lg:py-32"
        >
            {/* ---------------- background texture (matches Hero language) ---------------- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_0%,rgba(229,107,63,0.12),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_100%,rgba(113,53,45,0.22),transparent_60%)]" />
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(245,233,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.6) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-16 lg:gap-10 items-start">
                {/* ============================ LEFT: CONTENT (~58%) ============================ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={staggerParent}
                    className="order-1"
                >
                    {/* editorial label */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-7">
                        <span className="h-[1px] w-10 bg-[#e56b3f]" />
                        <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#f5e9dfaa] font-medium">
                            01 / About Us
                        </span>
                    </motion.div>

                    {/* heading — line by line */}
                    <div>
                        <div className="overflow-hidden py-[2px]">
                            <motion.h2
                                variants={fadeUp}
                                className="text-[clamp(32px,5.6vw,58px)] font-bold uppercase leading-[1.05] tracking-tight"
                            >
                                We Build
                            </motion.h2>
                        </div>
                        <div className="overflow-hidden py-[2px]">
                            <motion.h2
                                variants={fadeUp}
                                className="text-[clamp(32px,5.6vw,58px)] font-bold uppercase leading-[1.05] tracking-tight"
                            >
                                With{" "}
                                <span className="heading-font italic font-normal text-[#e56b3f]">
                                    Purpose.
                                </span>
                            </motion.h2>
                        </div>
                    </div>

                    {/* supporting copy */}
                    <motion.p
                        variants={fadeUp}
                        className="mt-6 max-w-[520px] text-sm sm:text-[15px] leading-relaxed text-[#f5e9dfcc]"
                    >
                        We are a team of designers and developers focused on turning
                        business ideas into reliable digital products. From websites and
                        SaaS platforms to custom business applications, we combine
                        thoughtful design, modern technology and practical
                        problem-solving to build solutions that create real value.
                    </motion.p>

                    {/* philosophy line */}
                    <motion.p
                        variants={fadeUp}
                        className="mt-4 max-w-[460px] text-sm leading-relaxed text-[#f5e9df80]"
                    >
                        We don't build technology for the sake of technology. We first
                        understand the problem, then design and develop the right
                        solution around the people, processes and goals behind it.
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={fadeUp} className="mt-9">
                        <button
                            onClick={scrollToServices}
                            className="group inline-flex items-center gap-2 border border-[#f5e9df]/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f5e9df] transition-colors duration-300 hover:border-[#e56b3f] hover:text-[#e56b3f]"
                        >
                            <span>Our Approach</span>
                            <ArrowUpRight
                                size={15}
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </button>
                    </motion.div>

                    {/* values — editorial rows, not cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={valuesParent}
                        className="mt-14 border-t border-[#71352d]/40 grid grid-cols-1 sm:grid-cols-2"
                    >
                        {values.map((v) => (
                            <motion.div
                                key={v.num}
                                variants={valueRow}
                                className="group relative border-b border-[#71352d]/40 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-[#71352d]/40 py-6 px-1 sm:px-5 sm:first:pl-0"
                            >
                                {/* hover accent line */}
                                <span className="absolute left-0 sm:left-0 top-0 h-[1.5px] w-0 bg-[#e56b3f] transition-all duration-300 group-hover:w-8" />

                                <div className="flex items-baseline gap-3">
                                    <span className="text-[11px] text-[#e56b3f] tracking-widest transition-transform duration-300 group-hover:translate-x-1">
                                        {v.num}
                                    </span>
                                    <h3 className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em]">
                                        {v.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-[13px] leading-relaxed text-[#f5e9df66] transition-colors duration-300 group-hover:text-[#f5e9dfb3]">
                                    {v.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ============================ RIGHT: ABSTRACT VISUAL (~42%) ============================ */}
                <motion.div
                    ref={visualRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={staggerParent}
                    className="order-2 relative w-full h-[340px] sm:h-[400px] lg:h-[480px] flex items-center justify-center lg:justify-end mt-4 lg:mt-0"
                >
                    {/* background grid layer */}
                    <motion.div
                        variants={fadeUp}
                        style={enableParallax ? gridXY : undefined}
                        className="absolute inset-0 opacity-40 pointer-events-none"
                    >
                        <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 h-[90%] w-[90%] sm:w-[75%]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(245,233,223,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(245,233,223,0.35) 1px, transparent 1px)",
                                backgroundSize: "32px 32px",
                                maskImage:
                                    "radial-gradient(ellipse 70% 70% at 55% 50%, black 35%, transparent 90%)",
                                WebkitMaskImage:
                                    "radial-gradient(ellipse 70% 70% at 55% 50%, black 35%, transparent 90%)",
                            }}
                        />
                    </motion.div>

                    {/* connecting lines + accent points */}
                    <motion.svg
                        variants={fadeUp}
                        style={enableParallax ? panelXY : undefined}
                        viewBox="0 0 400 400"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        fill="none"
                    >
                        <motion.line
                            x1="55" y1="55" x2="150" y2="110"
                            stroke="#e56b3f" strokeWidth="1" strokeOpacity="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.55 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.9, ease: easePremium }}
                        />
                        <motion.line
                            x1="330" y1="45" x2="255" y2="105"
                            stroke="#e56b3f" strokeWidth="1" strokeOpacity="0.35"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.4 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 1.05, ease: easePremium }}
                        />
                        <motion.line
                            x1="60" y1="330" x2="140" y2="280"
                            stroke="#e56b3f" strokeWidth="1" strokeOpacity="0.3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.35 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 1.2, ease: easePremium }}
                        />
                        <motion.circle
                            cx="150" cy="110" r="3" fill="#e56b3f"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2.4, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="255" cy="105" r="3" fill="#f5e9df"
                            animate={{ opacity: [0.3, 0.85, 0.3] }}
                            transition={{ duration: 2.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut", delay: 0.5 }}
                        />
                    </motion.svg>

                    {/* central frame — the "digital product" */}
                    <motion.div
                        variants={fadeUp}
                        style={enableParallax ? frameXY : undefined}
                        className="relative w-[250px] sm:w-[290px] lg:w-[310px] rounded-sm border border-[#71352d] bg-[#150c09]/70 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                    >
                        <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#71352d]/60">
                            <span className="text-[8px] tracking-[0.22em] text-[#f5e9df]/50">
                                DIGITAL PRODUCT
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#e56b3f]/70" />
                        </div>

                        {/* product UI skeleton */}
                        <div className="px-4 pt-4 pb-3">
                            <span className="block text-[8px] tracking-[0.2em] text-[#f5e9df]/40 mb-2">
                                PRODUCT UI
                            </span>
                            <div className="space-y-1.5">
                                <div className="h-1.5 w-3/4 bg-[#f5e9df]/15" />
                                <div className="h-1.5 w-full bg-[#f5e9df]/10" />
                                <div className="h-1.5 w-1/2 bg-[#f5e9df]/10" />
                            </div>

                            <div className="mt-4 grid grid-cols-2 border-t border-[#71352d]/50">
                                <div className="border-r border-[#71352d]/50 py-2.5">
                                    <p className="text-[7px] tracking-[0.14em] text-[#f5e9df]/40">DATA</p>
                                </div>
                                <div className="py-2.5 pl-3">
                                    <p className="text-[7px] tracking-[0.14em] text-[#f5e9df]/40">WORKFLOW</p>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-[#e56b3f]"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.4, duration: 1, ease: easePremium }}
                        />
                    </motion.div>

                    {/* floating labels around the frame */}
                    {floatingLabels.map((item) => (
                        <motion.div
                            key={item.label}
                            variants={fadeUp}
                            style={enableParallax ? labelXY : undefined}
                            className={`absolute ${item.className} flex items-center gap-1.5 border border-[#71352d]/60 bg-black/30 backdrop-blur-sm px-2.5 py-1.5`}
                        >
                            <span className="h-1 w-1 rounded-full bg-[#e56b3f]" />
                            <span className="text-[8px] tracking-[0.18em] text-[#f5e9df]/70">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Aboutus;
