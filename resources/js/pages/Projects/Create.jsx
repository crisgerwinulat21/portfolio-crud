import { useForm } from '@inertiajs/react';
import ManageLayout from '../../components/ManageLayout';
import ProjectForm from '../../components/ProjectForm';

export default function Create() {
    const form = useForm({
        title: '',
        category: '',
        description: '',
        tech_stack: '',
        date_completed: '',
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        form.post(route('projects.store'));
    }

    return (
        <ManageLayout title="Add project">
            <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">Add project</h1>
            <ProjectForm form={form} onSubmit={submit} submitLabel="Save project" />
        </ManageLayout>
    );
}