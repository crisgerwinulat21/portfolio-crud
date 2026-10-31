export default function SectionTitle({ children, subtitle }) {
    return (
        <>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{children}</h2>
            {subtitle && <p className="mt-4 max-w-prose text-lg text-subtle">{subtitle}</p>}
        </>
    );
}