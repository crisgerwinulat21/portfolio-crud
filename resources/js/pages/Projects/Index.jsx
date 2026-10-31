import { Link, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import ManageLayout from '../../components/ManageLayout';

export default function Index({ projects }) {
    const dialogRef = useRef(null);
    const [target, setTarget] = useState(null);

    function askDelete(project) {
        setTarget(project);
        dialogRef.current.showModal();
    }

    function confirmDelete() {
        router.delete(route('projects.destroy', target.id), {
            preserveScroll: true,
            onFinish: () => dialogRef.current.close(),
        });
    }

    return (
        <ManageLayout title="Manage projects">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="font-display text-3xl font-bold tracking-tight">Projects</h1>
                <Link href={route('projects.create')} className="rounded-lg bg-brand px-5 py-3 font-semibold text-brand-ink hover:bg-ink hover:text-paper">
                    Add project
                </Link>
            </div>

            {projects.length === 0 ? (
                <p className="mt-10 text-subtle">No projects yet. Click "Add project" to create your first one.</p>
            ) : (
                <div className="mt-8 overflow-x-auto rounded-xl border border-line">
                    <table className="w-full text-left">
                        <thead className="bg-wash text-sm">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Image</th>
                                <th className="px-4 py-3 font-semibold">Title</th>
                                <th className="px-4 py-3 font-semibold">Category</th>
                                <th className="px-4 py-3 font-semibold">Completed</th>
                                <th className="px-4 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className="border-t border-line">
                                    <td className="px-4 py-3">
                                        <img src={`/storage/${project.image}`} alt="" className="h-12 w-20 rounded object-cover" />
                                    </td>
                                    <td className="px-4 py-3 font-medium">{project.title}</td>
                                    <td className="px-4 py-3 capitalize">{project.category}</td>
                                    <td className="px-4 py-3">{project.date_completed}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-4">
                                            <Link href={route('projects.edit', project.id)} className="font-semibold text-brand underline underline-offset-4">
                                                Edit<span className="sr-only"> {project.title}</span>
                                            </Link>
                                            <button type="button" onClick={() => askDelete(project)} className="font-semibold text-danger underline underline-offset-4">
                                                Delete<span className="sr-only"> {project.title}</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete confirmation */}
            <dialog
                ref={dialogRef}
                aria-labelledby="delete-title"
                className="m-auto w-full max-w-md rounded-xl border border-line bg-surface p-6 text-ink backdrop:bg-black/50"
            >
                <h2 id="delete-title" className="font-display text-xl font-bold">Delete this project?</h2>
                <p className="mt-2 text-subtle">
                    {target ? `"${target.title}" and its image will be permanently deleted.` : ''}
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => dialogRef.current.close()} className="rounded-lg border border-line px-4 py-2 font-semibold hover:bg-wash">
                        Cancel
                    </button>
                    <button type="button" onClick={confirmDelete} className="rounded-lg bg-danger px-4 py-2 font-semibold text-paper">
                        Delete
                    </button>
                </div>
            </dialog>
        </ManageLayout>
    );
}