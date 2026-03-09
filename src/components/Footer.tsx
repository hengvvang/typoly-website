export default function Footer() {
    return (
        <footer className="bg-[#1e1b4b] py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white">
                <p>&copy; {new Date().getFullYear()} Typoly.</p>
                <div className="flex font-medium">
                    <a href="https://github.com/hengvvang/typoly" target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-200 transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
