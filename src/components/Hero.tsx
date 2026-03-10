import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [osName, setOsName] = useState('Windows');

    useEffect(() => {
        const platform = window.navigator.platform.toLowerCase();
        const userAgent = window.navigator.userAgent.toLowerCase();

        if (platform.includes('mac') || userAgent.includes('mac')) {
            setOsName('macOS');
        } else if (platform.includes('win') || userAgent.includes('win')) {
            setOsName('Windows');
        } else if (platform.includes('linux') || userAgent.includes('linux')) {
            setOsName('Linux');
        }
    }, []);

    const renderOsIcon = () => {
        if (osName === 'macOS') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.04c-1.33 0-2.48.91-2.92 2.14a3.17 3.17 0 0 0 1.94 3.96c.15-1.32.91-2.46 1.97-3.04a2.95 2.95 0 0 0-.99-3.06zm-5.4 7.23c-2.3 0-4.04 1.84-4.22 4.14-.37 4.93 3.32 9.5 7.15 9.5 1.57 0 2.27-.92 4.1-.92 1.82 0 2.58.92 4.14.92 2.13 0 4.1-2.18 5.2-4.1-1.33-.5-2.07-1.84-2.07-3.2 0-2.12 1.63-3.07 1.83-3.17-1.07-1.63-2.96-1.87-3.64-1.87-1.6 0-3.05 1.05-3.9 1.05-.86 0-2.16-1.05-3.67-1.05-1.52 0-3.07.72-4.92 2.7z" />
                </svg>
            );
        } else if (osName === 'Linux') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 2c-3.86 0-7 3.14-7 7 0 2.68 1.5 5 3.73 6.22-1.05.74-2.73 2.1-2.73 4.78h2c0-1.6 1.1-2.67 2.06-3.34 1.25.68 2.67 1.06 4.19 1.06 4.96 0 9-4.04 9-9s-4.04-9-9-9zm-1.5 5.5A1.5 1.5 0 1 1 9.5 6a1.5 1.5 0 0 1 0 3zm5 0A1.5 1.5 0 1 1 14.5 6a1.5 1.5 0 0 1 0 3zm-6.2 3.82c.4 1.2 1.54 2.18 2.9 2.18 1.35 0 2.5-.98 2.9-2.18z" />
                </svg>
            );
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
            );
        }
    };

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
                            href="https://github.com/hengvvang/typoly/releases/latest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2.5 pb-1.5 border-b border-slate-300 hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
                        >
                            {renderOsIcon()}
                            <span>Download for {osName}</span>
                        </a>

                        <a
                            href="https://github.com/hengvvang/typoly/releases"
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
