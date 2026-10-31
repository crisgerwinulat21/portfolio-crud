import { useEffect, useState } from 'react';

const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState('');

    // Read the real theme after the page loads (the starter's initializeTheme() already applied it)
    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    // Close the mobile menu with the Escape key
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    // Highlight the nav link of the section in the middle of the screen
    useEffect(() => {
        const sections = document.querySelectorAll('main section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    function toggleTheme() {
        const next = !document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark', next);
        try {
            // same key the starter's initializeTheme() reads on startup
            localStorage.setItem('appearance', next ? 'dark' : 'light');
        } catch (error) {
            // storage blocked: the toggle still works for this visit
        }
        setIsDark(next);
    }

    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink"
            >
                Skip to content
            </a>

            <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                    <a href="#home" className="font-display text-xl font-bold tracking-tight">
                        cgv.u
                    </a>

                    <div className="flex items-center gap-2">
                        <nav aria-label="Primary">
                            <ul
                                id="nav-menu"
                                className={`${menuOpen ? '' : 'hidden'} absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-3 md:static md:flex md:gap-1 md:border-0 md:bg-transparent md:p-0`}
                            >
                                {links.map((link) => (
                                    <li key={link.id}>
                                        <a
                                            href={`#${link.id}`}
                                            onClick={() => setMenuOpen(false)}
                                            aria-current={active === link.id ? 'page' : undefined}
                                            className="block rounded-md px-3 py-2 text-subtle hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-brand"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Dark mode"
                            aria-pressed={isDark}
                            className="grid size-10 place-items-center rounded-lg border border-line text-ink hover:bg-wash"
                        >
                            {/* Moon (shown in light mode) */}
                            <svg className="size-5 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                            </svg>
                            {/* Sun (shown in dark mode) */}
                            <svg className="hidden size-5 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menu"
                            aria-expanded={menuOpen}
                            aria-controls="nav-menu"
                            className="grid size-10 place-items-center rounded-lg border border-line text-ink hover:bg-wash md:hidden"
                        >
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}