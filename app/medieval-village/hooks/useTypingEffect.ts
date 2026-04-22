import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (fullText: string, speed: number = 30) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const indexRef = useRef(0);

    useEffect(() => {
        setDisplayText('');
        setIsTyping(true);
        indexRef.current = 0;

        const interval = setInterval(() => {
            if (indexRef.current <= fullText.length) {
                setDisplayText(fullText.substring(0, indexRef.current));
                indexRef.current++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [fullText, speed]);

    return { displayText, isTyping };
};