// counter/src/components/Counter.jsx
import { useState, useRef } from 'react';
import styles from './Counter.module.css';
import { useTheme } from '../context/ThemeContext';

export default function Counter() {
    const { isDark, toggle } = useTheme();
    const [dragging, setDragging] = useState(false);
    const [count, setCount] = useState(0);
    const [position, setPosition] = useState({
        x: window.innerWidth / 2 - 170,
        y: window.innerHeight / 2 - 80
    });
    
    const offset = useRef({ x: 0, y: 0 });

    const animate = () => {
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;
        
        setPosition(pos => ({
            x: pos.x + velocity.current.x,
            y: pos.y + velocity.current.y
        }));

        if (Math.abs(velocity.current.x) > 0.1 || Math.abs(velocity.current.y) > 0.1) {
            requestAnimationFrame(animate);
        }
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        
        const rect = e.currentTarget.getBoundingClientRect();
        
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
    };
    
    const handlePointerMove = (e) => {
        if (!dragging) return;
        
        const boxWidth = e.currentTarget.offsetWidth;
        const boxHeight = e.currentTarget.offsetHeight;
        
        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;
        
        const maxX = window.innerWidth - boxWidth;
        const maxY = window.innerHeight - boxHeight;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        setPosition({
            x: newX,
            y: newY
        });
    };
        
    const handlePointerUp = (e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDragging(false);
    };
    
    const updateCounter = (value) => setCount(prev => Math.max(0, prev + value));

    const getStyle = (baseClass) => {
        return isDark ? `${baseClass} ${styles.dark}` : baseClass;
    };

    return (
        <section
            className={getStyle(styles.box)}
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                cursor: dragging ? "grabbing" : "grab"
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            >
            <h1 key={count}>Count: {count}</h1>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.min}`} onClick={() => updateCounter(-1)}>
                    Min
                </button>
                
                <button className={`${styles.button} ${styles.reset}`} onClick={() => setCount(0)}>
                    Reset
                </button>
                
                <button className={`${styles.button} ${styles.max}`} onClick={() => updateCounter(+1)}>
                    Max
                </button>
            </div>
            <button className={`${styles.button} ${styles.theme}`} onClick={toggle}>{isDark ? "Light" : "Dark"}</button>
        </section>
    );
}
