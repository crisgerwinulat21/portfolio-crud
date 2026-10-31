export default function ProjectCard({ project }) {
    // tech_stack is saved as "Flutter, Dart" so we split it into separate badges
    const tools = project.tech_stack.split(',').map((tool) => tool.trim()).filter(Boolean);
    const linkClass = 'font-semibold text-brand underline underline-offset-4 hover:text-ink';
    const completed = new Date(`${project.date_completed}T00:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface">
            <img
                src={`/storage/${project.image}`}
                alt={`Screenshot of ${project.title}`}
                width="640"
                height="400"
                className="aspect-[8/5] w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold">{project.title}</h3>
                <time dateTime={project.date_completed} className="mt-1 text-sm text-subtle">
                    Completed {completed}
                </time>
                <p className="mt-2 text-subtle">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2 text-sm text-subtle" aria-label="Tools used">
                    {tools.map((tool) => (
                        <li key={tool} className="rounded bg-wash px-2 py-0.5">{tool}</li>
                    ))}
                </ul>
                {(project.project_url || project.repository_url) && (
                    <div className="mt-auto flex gap-4 pt-5">
                        {project.project_url && (
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                View project<span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                        {project.repository_url && (
                            <a href={project.repository_url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                Repository<span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}