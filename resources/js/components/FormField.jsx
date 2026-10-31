export const inputClass = (error) =>
    `w-full rounded-lg border bg-surface px-4 py-3 ${error ? 'border-danger' : 'border-line'}`;

export default function FormField({ label, name, error, hint, children }) {
    return (
        <div>
            <label htmlFor={name} className="mb-1 block font-medium">
                {label}
            </label>
            {children}
            {hint && <p className="mt-1 text-sm text-subtle">{hint}</p>}
            {error && (
                <p id={`${name}-error`} className="mt-1 text-sm text-danger">
                    {error}
                </p>
            )}
        </div>
    );
}
