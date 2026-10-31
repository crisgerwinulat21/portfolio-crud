import { useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
    name: (value) => (value.trim().length < 2 ? 'Enter your name (at least 2 characters).' : ''),
    email: (value) => (!emailPattern.test(value.trim()) ? 'Enter a valid email, like name@example.com.' : ''),
    message: (value) => (value.trim().length < 10 ? 'Write a message of at least 10 characters.' : ''),
};

const empty = { name: '', email: '', message: '' };

export default function ContactForm() {
    const [values, setValues] = useState(empty);
    const [errors, setErrors] = useState(empty);
    const [status, setStatus] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        // re-check a field as the user fixes it
        if (errors[name]) setErrors({ ...errors, [name]: rules[name](value) });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setStatus('');

        const newErrors = {};
        Object.keys(rules).forEach((field) => {
            newErrors[field] = rules[field](values[field]);
        });
        setErrors(newErrors);

        if (Object.values(newErrors).some((message) => message !== '')) return;

        setStatus('Thanks! Your message passed every check. This form is front-end only, so nothing was sent.');
        setValues(empty);
    }

    const inputClass = (field) =>
        `w-full rounded-lg border bg-surface px-4 py-3 ${errors[field] ? 'border-danger' : 'border-line'}`;

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
                <label htmlFor="name" className="mb-1 block font-medium">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange}
                    aria-invalid={errors.name !== ''} aria-describedby="name-error" className={inputClass('name')} />
                <p id="name-error" className="mt-1 text-sm text-danger">{errors.name}</p>
            </div>
            <div>
                <label htmlFor="email" className="mb-1 block font-medium">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange}
                    aria-invalid={errors.email !== ''} aria-describedby="email-error" className={inputClass('email')} />
                <p id="email-error" className="mt-1 text-sm text-danger">{errors.email}</p>
            </div>
            <div>
                <label htmlFor="message" className="mb-1 block font-medium">Message</label>
                <textarea id="message" name="message" rows="5" value={values.message} onChange={handleChange}
                    aria-invalid={errors.message !== ''} aria-describedby="message-error" className={inputClass('message')} />
                <p id="message-error" className="mt-1 text-sm text-danger">{errors.message}</p>
            </div>
            <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 font-semibold text-brand-ink hover:bg-ink hover:text-paper">
                Send message
            </button>
            <p role="status" className="font-medium text-brand">{status}</p>
        </form>
    );
}