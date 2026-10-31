import { useEffect, useState } from 'react';

export default function TypingText({ words }) {
    const [text, setText] = useState('');

    useEffect(() => {
        // Visitors who prefer reduced motion just see the first word
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setText(words[0]);
            return;
        }

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timer;

        function tick() {
            const word = words[wordIndex];
            charIndex += deleting ? -1 : 1;
            setText(word.slice(0, charIndex));

            let delay = deleting ? 40 : 80;
            if (!deleting && charIndex === word.length) {
                deleting = true;
                delay = 1600; // pause on the finished word
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 400;
            }
            timer = setTimeout(tick, delay);
        }

        tick();
        return () => clearTimeout(timer); // stop the timer when the component is removed
    }, [words]);

    return (
        <>
            <span className="font-medium text-brand">{text}</span>
            <span className="caret text-brand" />
        </>
    );
}