import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
    { id: 1, name: 'Typoly Desktop', category: 'EDITOR', details: 'CORE' },
    { id: 2, name: 'Typoly Cloud', category: 'SYNC', details: 'PRO' },
    { id: 3, name: 'Typoly Web', category: 'PLATFORM', details: 'BETA' },
    { id: 4, name: 'Typoly Mobile', category: 'APP', details: 'SOON' },
    { id: 5, name: 'Extensions', category: 'PLUGINS', details: 'COMMUNITY' },
];

export default function Showcase() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-32 bg-[#f8fafc] overflow-hidden border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
                    Horizontal Gallery Framework
                </h2>
                <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
                    A responsive, snap-scrolling carousel that highlights the centered item, similar to Jords.co.uk.
                </p>
            </div>

            {/* Horizontal scroll container with snap */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-16 pt-8 px-[10vw] md:px-[25vw] lg:px-[30vw] gap-8 md:gap-12"
            >
                {items.map((item) => (
                    <ShowcaseCard key={item.id} item={item} containerRef={scrollRef} />
                ))}
            </div>
        </section>
    );
}

function ShowcaseCard({ item, containerRef }: { item: typeof items[0], containerRef: React.RefObject<HTMLDivElement | null> }) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Track the card's position relative to the horizontal scrolling container
    // "center end" means when the center of the card intersects with the end (right side) of the container
    // "center start" means when the center of the card intersects with the start (left side) of the container
    const { scrollXProgress } = useScroll({
        container: containerRef,
        target: cardRef,
        offset: ["center end", "center start"]
    });

    // When the card is exactly in the center of the container, scrollXProgress is ~0.5. Scale it up to 1.
    // When it approaches the edges (0 or 1), scale it down to 0.85 and drop opacity.
    const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
    const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

    return (
        <motion.div
            ref={cardRef}
            style={{ scale, opacity }}
            className="snap-center shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] aspect-[4/3] sm:aspect-[16/10] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 flex flex-col p-4 md:p-6 cursor-grab active:cursor-grabbing hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-shadow"
        >
            <div className="flex-1 w-full rounded-[1.5rem] bg-[#e0efff] border border-[#bfdbfe] flex flex-col items-center justify-center mb-6 overflow-hidden">
                <span className="inline-block px-4 py-2 rounded-full bg-white text-slate-500 text-sm font-semibold tracking-widest uppercase shadow-sm border border-slate-100 mb-4 z-10 relative">
                    Image Framework
                </span>
                <p className="text-slate-600 font-medium z-10 relative">Card internal content</p>
                {/* Subtle gradient background for the placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
            </div>

            <div className="flex items-end justify-between px-2 pb-2 mt-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{item.name}</h3>
                <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <span>{item.category}</span>
                    <span>{item.details}</span>
                </div>
            </div>
        </motion.div>
    );
}
