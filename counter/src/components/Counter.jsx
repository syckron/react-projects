// counter/src/components/Counter.jsx
import { useState } from 'react';
import styles from './Counter.module.css';
import { useTheme } from '../context/ThemeContext';

export default function Counter() {
    const { isDark, toggle } = useTheme();
    const [count, setCount] = useState(0);
    
    const updateCounter = (value) => setCount(prev => Math.max(0, prev + value));

    const getStyle = (baseClass) => {
        return isDark ? `${baseClass} ${styles.dark}` : baseClass;
    };

    return (
        <section className={getStyle(styles.box)}>
            <h1>Count: {count}</h1>
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
