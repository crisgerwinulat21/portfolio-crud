import { useForm } from '@inertiajs/react';
import ManageLayout from '../../components/ManageLayout';
import ProjectForm from '../../components/ProjectForm';

export default function Edit({ project }) {
    const form = useForm({
        _method: 'put', // files can't be sent with a real PUT, so we POST and tell Laravel it is a PUT
        title: project.title,
        category: project.category,
        description: project.description,
        tech_stack: project.tech_stack,
        date_completed: project.date_completed,
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('projects.update', project.id));
    }

    return (
        <ManageLayout title="Edit project">
            <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Edit project</h1>
            <ProjectForm form={form} onSubmit={submit} submitLabel="Update project" currentImage={project.image} />
        </ManageLayout>
    );
}