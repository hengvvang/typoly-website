import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const sections = [
    {
        heading: 'Overview',
        steps: [
            {
                id: 1,
                title: 'Overview',
                images: [
                    { label: 'Distraction-Free Editor', src: '/images/overview/ui.png', description: 'A pure, distraction-free writing surface. Just you and your words — no clutter, no noise.' },
                    { label: 'CommonMark WYSIWYG', src: '/images/overview/commonMark.png', description: 'Full CommonMark spec rendered live in a split-pane. Edit source on the left, see rich output on the right.' },
                    { label: 'LaTeX & Mermaid', src: '/images/overview/latex-mermaid.png', description: 'Embed math formulas with KaTeX and flowchart diagrams with Mermaid — all rendered inline.' }
                ]
            },
        ]
    },
    {
        heading: 'Workflow',
        steps: [
            {
                id: 2,
                title: 'Workflow',
                images: [
                    { label: 'Command Palette', src: '/images/workflow/common-palette.png', description: 'Access every action, file, and setting through a powerful command palette — just press ⌘.' },
                    { label: 'Slash Commands', src: '/images/workflow/slash.png', description: 'Type "/" to instantly insert links, code blocks, lists, and more without leaving the keyboard.' },
                    { label: 'mdBook Integration', src: '/images/workflow/mdbook.png', description: 'Scan, build, and preview mdBook projects directly inside Typoly with a dedicated sidebar panel.' },
                    { label: 'Workspace Manager', src: '/images/workflow/workspaces.png', description: 'Organize projects into workspaces. Switch between them instantly and keep your files grouped.' }
                ]
            },
        ]
    },
    {
        heading: 'Customize',
        steps: [
            {
                id: 3,
                title: 'Customize',
                images: [
                    { label: 'Background Wallpaper', src: '/images/customize/background.png', description: 'Set a custom background image with adjustable opacity blending for a personalized workspace.' },
                    { label: 'Theme System', src: '/images/customize/theme.png', description: 'Choose from built-in presets like Rosé Pine, or build your own theme with the visual Theme Builder.' },
                    { label: 'Toolbar Customization', src: '/images/customize/customize-bar.png', description: 'Drag-and-drop to rearrange your Title Bar, Editor Tabs, Breadcrumbs, Toolbar, and Status Bar.' }
                ]
            },
        ]
    },
    {
        heading: 'And more...',
        steps: [
            {
                id: 4,
                title: 'And more...',
                images: [
                    { label: 'Chronos Timer', src: '/images/andmore/chronos.png', description: 'Track writing sessions with a built-in timer. Set priorities, deadlines, and archive completed tasks.' },
                    { label: 'Clipboard History', src: '/images/andmore/clipboard.png', description: 'Never lose a copied snippet again. Search, filter, and pin your clipboard entries by type.' },
                    { label: 'Translate Panel', src: '/images/andmore/translate.png', description: 'Select text and translate it instantly. Results appear in a side panel alongside your document.' }
                ]
            },
        ]
    },
];

export default function Features() {
    return (
        <section className="bg-[#363636] relative overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative pt-12 md:pt-16">
                <div className="relative w-full">
                    <div className="flex flex-col">
                        {sections.flatMap(s => s.steps).map((step, index) => (
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
    src: string;
};

type Step = {
    id: number;
    title: string;
    images: ImageItem[];
};

function FeatureRow({ step, index }: { step: Step, index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const isDark = index % 2 === 0;

    const handleUpdateIndex = (newIndex: number) => {
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
                            {step.images[((activeIndex % step.images.length) + step.images.length) % step.images.length]?.description || ''}
                        </p>
                    </motion.div>

                    {/* Bottom Carousel Container */}
                    <div className="w-full flex-shrink-0 min-w-0 relative">
                        <div className="relative w-full sm:max-w-[1000px] mx-auto overflow-hidden h-[250px] sm:h-[480px] flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {Array.from({ length: 5 }, (_, i) => activeIndex - 2 + i).map((slotIndex) => {
                                    const N = step.images.length;
                                    const imageIndex = ((slotIndex % N) + N) % N;
                                    const imageData = step.images[imageIndex];
                                    const offset = slotIndex - activeIndex;

                                    const isActive = offset === 0;

                                    // Positioning math to show active in center and neighbors peaking in from sides
                                    const translateX = `calc(${offset * 100}% + ${offset * 24}px)`;
                                    const scale = isActive ? 1 : 0.85;
                                    const opacity = isActive ? 1 : 0.4;
                                    const zIndex = isActive ? 10 : (Math.abs(offset) === 1 ? 5 : 0);

                                    return (
                                        <motion.div
                                            key={slotIndex}
                                            className={`absolute w-[80vw] sm:w-[720px] max-w-full aspect-[16/10] rounded-none border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden cursor-pointer group bg-white ${Math.abs(offset) > 1 ? 'pointer-events-none' : ''}`}
                                            animate={{
                                                x: translateX,
                                                scale: scale,
                                                opacity: Math.abs(offset) > 1 ? 0 : opacity,
                                            }}
                                            initial={{
                                                x: translateX,
                                                scale: scale,
                                                opacity: 0,
                                            }}
                                            transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
                                            style={{ zIndex }}
                                            onClick={() => handleUpdateIndex(slotIndex)}
                                        >
                                            <img
                                                src={imageData.src}
                                                alt={imageData.label}
                                                className="w-full h-full object-contain bg-slate-50"
                                                draggable={false}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Left Navigation Arrow (Permanent) */}
                        <button
                            onClick={() => handleUpdateIndex(activeIndex - 1)}
                            className={`absolute left-[50%] -translate-x-[45vw] sm:-translate-x-[530px] top-1/2 -translate-y-1/2 z-20 w-[50px] h-[36px] sm:w-[64px] sm:h-[40px] border flex items-center justify-center transition-all duration-300 ${isDark
                                ? 'border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/15 hover:border-white/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                : 'border-slate-200 bg-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
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
                            onClick={() => handleUpdateIndex(activeIndex + 1)}
                            className={`absolute left-[50%] translate-x-[calc(45vw-50px)] sm:translate-x-[466px] top-1/2 -translate-y-1/2 z-20 w-[50px] h-[36px] sm:w-[64px] sm:h-[40px] border flex items-center justify-center transition-all duration-300 ${isDark
                                ? 'border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/15 hover:border-white/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                : 'border-slate-200 bg-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300'
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
