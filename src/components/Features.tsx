import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const steps = [
    {
        id: 1,
        title: 'True WYSIWYG Experience',
        description: 'Type naturally. No split panes, just perfectly formatted text ready to edit.',
        images: ['WYSIWYG Editing Interface', 'Live Markdown Rendering', 'Instant Document Preview']
    },
    {
        id: 2,
        title: 'Native Vim Keybindings',
        description: 'Navigate and manipulate text at the speed of thought with full Vim support.',
        images: ['Vim Mode Command Bar', 'Visual Block Selection', 'Macro Recording']
    },
    {
        id: 3,
        title: 'Distraction-Free Workspace',
        description: 'A pure, minimalist environment that gets out of your way.',
        images: ['Focus Mode Active', 'Typography Settings', 'Export Options Menu']
    },
];

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the entire section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Smooth the scroll progress for the vertical line
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

    return (
        <section ref={containerRef} className="py-24 md:py-32 bg-[#f4f8fc] relative overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative">

                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Overview
                    </h2>
                </div>

                <div className="relative max-w-7xl mx-auto">

                    {/* Static Background Vertical Line */}
                    <div className="absolute left-[24px] md:left-[39px] top-8 bottom-8 w-[2px] bg-[#dbeafe] rounded-full" />

                    {/* Animated Active Vertical Line */}
                    <motion.div
                        className="absolute left-[24px] md:left-[39px] top-8 bottom-8 w-[2px] bg-[#3b82f6] origin-top rounded-full z-10"
                        style={{ scaleY: smoothProgress }}
                    />

                    <div className="space-y-40">
                        {steps.map((step) => (
                            <FeatureRow key={step.id} step={step} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureRow({ step }: { step: typeof steps[0] }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevActiveIndex, setPrevActiveIndex] = useState(0);

    const handleUpdateIndex = (newIndex: number) => {
        setPrevActiveIndex(activeIndex);
        setActiveIndex(newIndex);
    };

    // Track this specific row's position relative to the viewport
    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start center", "end center"]
    });

    // Animate dot color and size based on scroll position reaching this row
    const dotBg = useTransform(scrollYProgress, [0, 0.4], ["#ffffff", "#3b82f6"]);
    const dotBorder = useTransform(scrollYProgress, [0, 0.4], ["#bfdbfe", "#3b82f6"]);
    const dotScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);

    // Text fades in exactly when it's centered, fades out when it leaves center
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.25, 1, 1, 0.25]);

    return (
        <div ref={rowRef} className="relative flex flex-col items-center pb-24 lg:pb-32">

            {/* Timeline Dot (Left side, matching the vertical line) */}
            <motion.div
                className="absolute left-[20px] md:left-[35px] top-[14px] w-[10px] h-[10px] rounded-full z-20 border-[2px]"
                style={{
                    backgroundColor: dotBg,
                    borderColor: dotBorder,
                    scale: dotScale,
                    boxShadow: "0 0 0 8px #f4f8fc"
                }}
            />

            {/* Top Text Content */}
            <motion.div
                className="w-full max-w-3xl text-center mb-12 px-4 flex-shrink-0"
                style={{ opacity: textOpacity }}
            >
                <h3 className="text-[34px] md:text-[40px] font-semibold text-[#0f172a] mb-4 leading-tight tracking-tight">
                    {step.title}
                </h3>
                <p className="text-[#334155] text-[18px] md:text-[20px] max-w-2xl mx-auto leading-[1.6]">
                    {step.description}
                </p>
            </motion.div>

            {/* Bottom Carousel Container */}
            <div className="w-full flex-shrink-0 min-w-0 relative">
                <div className="relative w-full sm:max-w-[1200px] mx-auto overflow-hidden h-[300px] sm:h-[580px] flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {step.images.map((imageLabel, index) => {
                            const N = step.images.length;
                            // Calculate cyclic offset
                            let offset = (index - activeIndex) % N;
                            // Ensure offset wraps around symmetrically (e.g., -1, 0, 1 for 3 items)
                            if (offset > Math.floor(N / 2)) offset -= N;
                            if (offset < -Math.floor(N / 2)) offset += N;

                            let prevOffset = (index - prevActiveIndex) % N;
                            if (prevOffset > Math.floor(N / 2)) prevOffset -= N;
                            if (prevOffset < -Math.floor(N / 2)) prevOffset += N;

                            const isWrapping = Math.abs(offset - prevOffset) > 1;

                            const isActive = offset === 0;

                            // Positioning math to show active in center and neighbors peaking in from sides
                            const translateX = offset === 0 ? "0px" : `calc(${offset * 100}% + ${offset * 24}px)`;
                            const scale = isActive ? 1 : 0.85;
                            const opacity = isActive ? 1 : 0.4;
                            const zIndex = isActive ? 10 : 0;

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute w-[80vw] sm:w-[860px] max-w-full aspect-[16/10] rounded-[24px] bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer group"
                                    animate={{
                                        x: translateX,
                                        scale: scale,
                                        opacity: Math.abs(offset) > 1 ? 0 : opacity,
                                    }}
                                    initial={false}
                                    transition={{ type: "tween", ease: "easeInOut", duration: isWrapping ? 0 : 0.5 }}
                                    style={{ zIndex }}
                                    onClick={() => handleUpdateIndex(index)}
                                >
                                    <div className="text-center px-6 transition-transform duration-500 group-hover:scale-105">
                                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium tracking-widest uppercase mb-4 border transition-colors ${isActive ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                            IMAGE {index + 1} OF {step.images.length}
                                        </span>
                                        <p className={`font-medium text-2xl transition-colors ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                                            {imageLabel}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Left Navigation Arrow (Permanent) */}
                <button
                    onClick={() => handleUpdateIndex((activeIndex - 1 + step.images.length) % step.images.length)}
                    className="absolute left-[50%] -translate-x-[45vw] sm:-translate-x-[530px] top-1/2 -translate-y-1/2 z-20 
                                w-[50px] h-[36px] sm:w-[64px] sm:h-[40px] border border-slate-200 
                                   flex items-center justify-center bg-white
                                   text-slate-500 hover:text-slate-900 transition-colors"
                    aria-label="Previous image"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>

                {/* Right Navigation Arrow (Permanent) */}
                <button
                    onClick={() => handleUpdateIndex((activeIndex + 1) % step.images.length)}
                    className="absolute left-[50%] translate-x-[calc(45vw-50px)] sm:translate-x-[466px] top-1/2 -translate-y-1/2 z-20 
                                w-[50px] h-[36px] sm:w-[64px] sm:h-[40px] border border-slate-200 
                                   flex items-center justify-center bg-white
                                   text-slate-500 hover:text-slate-900 transition-colors"
                    aria-label="Next image"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>

        </div>
    );
}
