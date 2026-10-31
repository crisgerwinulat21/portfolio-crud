import { Head } from '@inertiajs/react';
import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import TypingText from '../components/TypingText';

// Defined outside the component so the same array is reused on every render
const roles = ['UI/UX & Web Developer'];

const skillGroups = [
    { title: 'Technical', items: ['HTML', 'CSS', 'Flutter', 'Tailwind CSS', 'JavaScript', 'SQL basics'] },
    { title: 'Tools', items: ['Git & GitHub', 'VS Code', 'Photoshop', 'Figma', 'Canva'] },
    { title: 'Soft skills', items: ['Problem solving', 'Communication', 'Teamwork', 'Time management', 'Fast learner'] },
];



const filters = [
    { value: 'all', label: 'All' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'web', label: 'Web' },
    { value: 'design', label: 'Design' },
];

const education = [
    { years: '2024 to present', title: 'BS in Information Technology', school: 'Urdaneta City University', place: 'San Vicente West, Urdaneta City, Pangasinan' },
    { years: '2022 to 2024', title: 'Senior High School, STEM', school: 'Urdaneta City National High School', place: 'San Vicente West, Urdaneta City, Pangasinan' },
    { years: '2018 to 2022', title: 'Junior High School', school: 'Anonas National High School', place: 'Anonas West, Urdaneta City, Pangasinan' },
    { years: '2011 to 2018', title: 'Elementary', school: 'Anonas Elementary School', place: 'Anonas West, Urdaneta City, Pangasinan' },
];

const linkClass = 'font-semibold text-brand underline underline-offset-4 hover:text-ink';
const filterClass = (active) =>
    `rounded-full border px-4 py-2 text-sm font-medium ${active ? 'border-ink bg-ink text-paper' : 'border-line hover:bg-wash'}`;

export default function Portfolio({ projects }) {
    const [filter, setFilter] = useState('all');
    const visibleProjects = projects.filter((p) => filter === 'all' || p.category === filter);

    return (
        <div className="portfolio min-h-screen bg-paper font-sans text-ink antialiased">
            <Head title="Cris Gerwin Ulat | Portfolio" />
            <Navbar />

            <main id="main">
                {/* ===== HOME ===== */}
                <section id="home" className="mx-auto max-w-5xl px-6 pt-16 pb-20 md:pt-28 md:pb-28">
                    <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl md:text-7xl">
                        Hi, I'm Cris Gerwin Ulat
                    </h1>

                    <p className="mt-6 text-xl text-subtle md:text-2xl">
                        <span className="sr-only">I'm an aspiring UI/UX and web developer.</span>
                        <span aria-hidden="true">
                            I'm an aspiring <TypingText words={roles} />
                        </span>
                    </p>

                    <p className="mt-6 max-w-xl text-lg text-subtle">
                        I'm a 3rd-year BSIT student interested in UI/UX design and web development. I enjoy creating clean, modern, and user-friendly interfaces while continuously improving my skills through academic projects and hands-on experience.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <a href="#projects" className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 font-semibold text-brand-ink hover:bg-ink hover:text-paper">See my projects</a>
                        <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-ink px-6 py-3 font-semibold hover:bg-ink hover:text-paper">Get in touch</a>
                    </div>

                    <dl className="mt-16 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                        <div><dt className="text-sm text-subtle">Learning</dt><dd className="mt-1 font-medium">Continuously improving my skills in UI/UX and web development.</dd></div>
                        <div><dt className="text-sm text-subtle">Building</dt><dd className="mt-1 font-medium">Creating web/mob and application projects through academic activities.</dd></div>
                        <div><dt className="text-sm text-subtle">Open to</dt><dd className="mt-1 font-medium">To grow as a UI/UX and web developer and gain real-world experience.</dd></div>
                    </dl>
                </section>

                {/* ===== ABOUT ===== */}
                <section id="about" className="scroll-mt-16 border-t border-line">
                    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                        <SectionTitle>About me</SectionTitle>

                        <div className="mt-10 grid items-start gap-10 md:grid-cols-3 md:gap-14">
                            <img src="/images/Nyakk.jpg" alt="Portrait of Cris Gerwin Ulat" width="400" height="400"
                                className="aspect-square w-48 rounded-2xl bg-wash object-cover md:w-full" />

                            <div className="max-w-prose space-y-5 text-lg text-subtle md:col-span-2">
                                <p>
                                    I am a 3rd-year Bachelor of Science in Information Technology student at Urdaneta City University, passionate about building modern and user-centered digital solutions. I am currently focusing on Web Development, Mobile Application Development, and UI/UX Design. I enjoy solving real-world problems through technology, whether by developing systems that improve daily processes or by creating innovative ideas and turning them into functional applications. I am continuously learning, exploring new tools, and enhancing my skills to grow into a professional developer.
                                </p>
                                <h3 className="pt-4 font-display text-xl font-bold text-ink">My Goals</h3>
                                <ul className="list-disc space-y-2 pl-5">
                                    <li>Improve my skills in UI/UX design and web development.</li>
                                    <li>Gain practical experience through internships and real-world projects.</li>
                                    <li>Build useful, user-friendly, and responsive digital solutions.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== SKILLS ===== */}
                <section id="skills" className="scroll-mt-16 border-t border-line">
                    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                        <SectionTitle subtitle="What I work with, grouped by how I use it. I list what I can do today, not a percentage.">
                            Skills
                        </SectionTitle>

                        <div className="mt-12 grid gap-10 md:grid-cols-3">
                            {skillGroups.map((group) => (
                                <div key={group.title} className="border-t-2 border-ink pt-5">
                                    <h3 className="font-display text-xl font-bold">{group.title}</h3>
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <li key={item} className="rounded-full bg-wash px-3 py-1 text-sm font-medium">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== PROJECTS ===== */}
                <section id="projects" className="scroll-mt-16 border-t border-line">
                    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                        <SectionTitle subtitle="School activities and personal builds. Filter by type.">Projects</SectionTitle>

                        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
                            {filters.map((f) => (
                                <button key={f.value} type="button" aria-pressed={filter === f.value}
                                    onClick={() => setFilter(f.value)} className={filterClass(filter === f.value)}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                        <p className="sr-only" aria-live="polite">
                            Showing {visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}.
                        </p>

                           {visibleProjects.length === 0 ? (
       <p className="mt-8 text-subtle">No projects to show yet.</p>
   ) : (
       <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {visibleProjects.map((project) => (
               <ProjectCard key={project.id} project={project} />
           ))}
       </div>
   )}
                    </div>
                </section>

                {/* ===== EDUCATION ===== */}
                <section id="education" className="scroll-mt-16 border-t border-line">
                    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                        <SectionTitle>Education</SectionTitle>

                        <ol className="mt-12 ml-2 max-w-2xl border-l border-line">
                            {education.map((item) => (
                                <li key={item.title} className="relative pb-10 pl-8">
                                    <span className="absolute top-2 -left-[6px] size-2.5 rounded-full bg-brand" aria-hidden="true" />
                                    <p className="text-sm text-subtle">{item.years}</p>
                                    <h3 className="mt-1 font-display text-xl font-bold">{item.title}</h3>
                                    <p className="text-subtle">{item.school}</p>
                                    <p className="text-subtle">{item.place}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ===== CONTACT ===== */}
                <section id="contact" className="scroll-mt-16 border-t border-line">
                    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                        <SectionTitle subtitle="Looking for an intern or have a question about my work? Send a message or use a link below.">
                            Contact
                        </SectionTitle>

                        <div className="mt-12 grid gap-12 md:grid-cols-2">
                            <ul className="space-y-4 text-lg">
                                <li><span className="block text-sm text-subtle">Email</span>
                                    <a className={linkClass} href="mailto:Crisgerwinulat21@gmail.com">Crisgerwinulat21@gmail.com</a></li>
                                <li><span className="block text-sm text-subtle">GitHub</span>
                                    <a className={linkClass} href="https://github.com/crisgerwinulat21" target="_blank" rel="noopener noreferrer">
                                        github.com/crisgerwinulat21<span className="sr-only"> (opens in a new tab)</span></a></li>
                                <li><span className="block text-sm text-subtle">LinkedIn</span>
                                    <a className={linkClass} href="https://www.linkedin.com/in/crisgerwin21" target="_blank" rel="noopener noreferrer">
                                        linkedin.com/in/crisgerwin21<span className="sr-only"> (opens in a new tab)</span></a></li>
                            </ul>

                            <ContactForm />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}