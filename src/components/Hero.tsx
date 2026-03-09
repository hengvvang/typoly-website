import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-slate-900 mb-10 leading-[1.15]">
                            A WYSIWYG plain text editor <br className="hidden md:block" />
                            built on the CommonMark spec.
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center justify-center mt-14 text-xl text-slate-500 font-medium"
                    >
                        <a
                            href="https://github.com/hengvvang/typoly"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2.5 pb-1.5 border-b border-slate-300 hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                            </svg>
                            <span>Download for Windows</span>
                        </a>

                        <a
                            href="https://github.com/hengvvang/typoly"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-8 pb-1.5 border-b border-slate-300 hover:border-slate-900 hover:text-slate-900 transition-all duration-300 flex items-center gap-2"
                        >
                            <span>or</span>
                            <span>other platform</span>
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Subtle minimalist background element */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-brand-50/50 to-transparent -z-10" />
        </section>
    );
}
