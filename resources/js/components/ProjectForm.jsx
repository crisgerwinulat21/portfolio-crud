import { Link } from '@inertiajs/react';
import FormField, { inputClass } from './FormField';

export default function ProjectForm({ form, onSubmit, submitLabel, currentImage }) {
    const { data, setData, errors, processing } = form;

    // Props shared by every text-like input
    const field = (name) => ({
        id: name,
        name,
        value: data[name],
        onChange: (e) => setData(name, e.target.value),
        'aria-invalid': Boolean(errors[name]),
        'aria-describedby': errors[name] ? `${name}-error` : undefined,
        className: inputClass(errors[name]),
    });

    return (
        <form onSubmit={onSubmit} noValidate className="max-w-2xl space-y-5">
            <FormField label="Title" name="title" error={errors.title}>
                <input type="text" {...field('title')} />
            </FormField>

            <FormField label="Category" name="category" error={errors.category}>
                <select {...field('category')}>
                    <option value="">Choose a category</option>
                    <option value="mobile">Mobile</option>
                    <option value="web">Web</option>
                    <option value="design">Design</option>
                </select>
            </FormField>

            <FormField label="Description" name="description" error={errors.description}>
                <textarea rows="5" {...field('description')} />
            </FormField>

            <FormField label="Tech stack" name="tech_stack" error={errors.tech_stack} hint="Separate each tool with a comma, e.g. Flutter, Dart, Figma.">
                <input type="text" {...field('tech_stack')} />
            </FormField>

            <FormField label="Date completed" name="date_completed" error={errors.date_completed}>
                <input type="date" {...field('date_completed')} />
            </FormField>

            <FormField
                label="Image"
                name="image"
                error={errors.image}
                hint={currentImage ? 'Leave empty to keep the current image.' : 'JPG, PNG, or WEBP, up to 2 MB.'}
            >
                {currentImage && (
                    <img src={`/storage/${currentImage}`} alt="Current project screenshot" className="mb-3 h-32 rounded-lg border border-line object-cover" />
                )}
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('image', e.target.files[0])}
                    aria-invalid={Boolean(errors.image)}
                    aria-describedby={errors.image ? 'image-error' : undefined}
                    className={inputClass(errors.image)}
                />
            </FormField>

            <div className="flex items-center gap-3">
                <button type="submit" disabled={processing} className="rounded-lg bg-brand px-6 py-3 font-semibold text-brand-ink hover:bg-ink hover:text-paper disabled:opacity-60">
                    {processing ? 'Saving...' : submitLabel}
                </button>
                <Link href={route('projects.index')} className="rounded-lg border border-line px-6 py-3 font-semibold hover:bg-wash">
                    Cancel
                </Link>
            </div>
        </form>
    );
}