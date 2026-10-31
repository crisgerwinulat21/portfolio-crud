import { Head, Link, usePage } from '@inertiajs/react';

export default function ManageLayout({ title, children }) {
    const { flash } = usePage().props;

    return (
        <div className="portfolio min-h-screen bg-paper font-sans text-ink antialiased">
            <Head title={title} />

            <header className="border-b border-line">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
                    <Link href={route('projects.index')} className="font-display text-xl font-bold">
                        Manage projects
                    </Link>
                    <nav className="flex items-center gap-4 text-sm">
                        <Link href="/" className="text-subtle hover:text-ink">View portfolio</Link>
                        <Link href={route('logout')} method="post" as="button" className="text-subtle hover:text-ink">Log out</Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                {flash?.success && (
                    <p role="status" className="mb-6 rounded-lg border border-brand bg-wash px-4 py-3 font-medium text-brand">
                        {flash.success}
                    </p>
                )}
                {children}
            </main>
        </div>
    );
}