import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const steps = [
    {
        id: 1,
        title: 'True WYSIWYG Experience',
        images: [
            { label: 'WYSIWYG Editing Interface', description: 'Type naturally. No split panes, just perfectly formatted text ready to edit.' },
            { label: 'Live Markdown Rendering', description: 'See your markdown syntax instantly converted into rich text as you type.' },
            { label: 'Instant Document Preview', description: 'What you see is exactly what you get when exporting to PDF or web.' }
        ]
    },
    {
        id: 2,
        title: 'Block-Based Editing',
        images: [
            { label: 'Drag and Drop Blocks', description: 'Effortlessly rearrange, structure, and organize your thoughts with an intuitive block-based model.' },
            { label: 'Slash Command Menu', description: 'Quickly insert headings, lists, tables, and media without ever leaving your keyboard.' },
            { label: 'Structured Outline View', description: 'Navigate complex documents easily with an auto-generated table of contents.' }
        ]
    },
    {
        id: 3,
        title: 'Native Vim Keybindings',
        images: [
            { label: 'Vim Mode Command Bar', description: 'Navigate and manipulate text at the speed of thought with full Vim support.' },
            { label: 'Visual Block Selection', description: 'Perform complex edits across multiple lines seamlessly with visual block mode.' },
            { label: 'Macro Recording', description: 'Automate repetitive editing tasks by recording and replaying Vim macros.' }
        ]
    },
    {
        id: 4,
        title: 'Distraction-Free Workspace',
        images: [
            { label: 'Focus Mode Active', description: 'A pure, minimalist environment that gets out of your way.' },
            { label: 'Typography Settings', description: 'Customize font sizes, line heights, and themes to match your personal reading comfort.' },
            { label: 'Export Options Menu', description: 'Seamlessly convert your focused writing into polished PDFs, HTML, or sterile Markdown.' }
        ]
    },
];

export default function Features() {
    return (
        <section className="bg-[#363636] relative overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative pt-12 md:pt-16">

                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Overview
                    </h2>
                </div>

                <div className="relative w-full">
                    <div className="flex flex-col">
                        {steps.map((step, index) => (
                            <FeatureRow key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

type ImageItem = {
    label: string;
    description: string;
};

type Step = {
    id: number;
    title: string;
    images: ImageItem[];
};

function FeatureRow({ step, index }: { step: Step, index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevActiveIndex, setPrevActiveIndex] = useState(0);

    const isDark = index % 2 === 0;

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
    const dotBg = useTransform(scrollYProgress, [0, 0.4], [isDark ? "#525252" : "#e2e8f0", isDark ? "#ffffff" : "#0f172a"]);
    const dotBorder = useTransform(scrollYProgress, [0, 0.4], [isDark ? "#525252" : "#cbd5e1", isDark ? "#ffffff" : "#0f172a"]);
    const dotScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);

    // Text fades in exactly when it's centered, fades out when it leaves center
    const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.25, 1, 1, 0.25]);

    return (
        <div ref={rowRef} className="relative w-[100vw] left-[50%] -translate-x-1/2">
            {/* Full-bleed Alternate Bg */}
            <div className={`absolute inset-0 -z-10 ${isDark ? 'bg-[#363636]' : 'bg-white'}`} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Segment Vertical Lines */}
                <div className={`absolute left-[24px] md:left-[39px] top-0 bottom-0 w-[2px] ${isDark ? 'bg-[#525252]' : 'bg-slate-200'} z-0`} />
                <motion.div
                    className={`absolute left-[24px] md:left-[39px] top-0 bottom-0 w-[2px] ${isDark ? 'bg-white' : 'bg-[#363636]'} origin-top z-10`}
                    style={{ scaleY: scrollYProgress }}
                />

                {/* Timeline Dot */}
                <motion.div
                    className="absolute left-[20px] md:left-[35px] top-[46px] lg:top-[62px] w-[10px] h-[10px] rounded-full z-20 border-[2px]"
                    style={{
                        backgroundColor: dotBg,
                        borderColor: dotBorder,
                        scale: dotScale,
                        boxShadow: `0 0 0 8px ${isDark ? '#363636' : '#ffffff'}`
                    }}
                />

                <div className="relative flex flex-col items-center py-8 lg:py-12 w-full">

                    {/* Top Text Content */}
                    <motion.div
                        className="w-full max-w-3xl text-center mb-10 px-4 flex-shrink-0"
                        style={{ opacity: textOpacity }}
                    >
                        <h3 className={`text-[34px] md:text-[40px] font-semibold mb-4 leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
                            {step.title}
                        </h3>
                        <p className={`text-[18px] md:text-[20px] max-w-2xl mx-auto leading-[1.6] transition-colors duration-300 min-h-[60px] md:min-h-[64px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            {step.images[activeIndex]?.description || ''}
                        </p>
                    </motion.div>

                    {/* Bottom Carousel Container */}
                    <div className="w-full flex-shrink-0 min-w-0 relative">
                        <div className="relative w-full sm:max-w-[1000px] mx-auto overflow-hidden h-[250px] sm:h-[480px] flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {step.images.map((imageData, i) => {
                                    const N = step.images.length;
                                    // Calculate cyclic offset
                                    let offset = (i - activeIndex) % N;
                                    // Ensure offset wraps around symmetrically (e.g., -1, 0, 1 for 3 items)
                                    if (offset > Math.floor(N / 2)) offset -= N;
                                    if (offset < -Math.floor(N / 2)) offset += N;

                                    let prevOffset = (i - prevActiveIndex) % N;
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
                                            key={i}
                                            className="absolute w-[80vw] sm:w-[720px] max-w-full aspect-[16/10] rounded-[24px] border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer group bg-white"
                                            animate={{
                                                x: translateX,
                                                scale: scale,
                                                opacity: Math.abs(offset) > 1 ? 0 : opacity,
                                            }}
                                            initial={false}
                                            transition={{ type: "tween", ease: "easeInOut", duration: isWrapping ? 0 : 0.5 }}
                                            style={{ zIndex }}
                                            onClick={() => handleUpdateIndex(i)}
                                        >
                                            <div className="text-center px-6 transition-transform duration-500 group-hover:scale-105">
                                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium tracking-widest uppercase mb-4 border transition-colors ${isActive
                                                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-sm'
                                                    : 'bg-slate-50 text-slate-500 border-slate-200'
                                                    }`}>
                                                    IMAGE {i + 1} OF {step.images.length}
                                                </span>
                                                <p className={`font-medium text-2xl transition-colors ${isActive
                                                    ? 'text-slate-900'
                                                    : 'text-slate-400'
                                                    }`}>
                                                    {imageData.label}
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
                            className={`absolute left-[50%] -translate-x-[45vw] sm:-translate-x-[530px] top-1/2 -translate-y-1/2 z-20 w-[50px] h-[36px] sm:w-[64px] sm:h-[40px] border flex items-center justify-center transition-all duration-300 ${isDark
                                ? 'border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/15 hover:border-white/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                : 'border-black/5 bg-black/5 text-slate-500 hover:text-slate-900 hover:bg-black/10 hover:border-black/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.03)]'
                                }`}
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
                            className={`absolute left-[50%] translate-x-[calc(45vw-50px)] sm:translate-x-[466px] top-1/2 -translate-y-1/2 z-20 w-[50px] h-[36px] sm:w-[64px] sm:h-[40px] border flex items-center justify-center transition-all duration-300 ${isDark
                                ? 'border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/15 hover:border-white/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                : 'border-black/5 bg-black/5 text-slate-500 hover:text-slate-900 hover:bg-black/10 hover:border-black/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.03)]'
                                }`}
                            aria-label="Next image"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
