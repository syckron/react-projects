// counter/src/App.jsx
import styles from './App.module.css';
import Counter from './components/Counter';
import { useTheme } from './context/ThemeContext';

export default function App() {
    const { isDark } = useTheme();

    return (
        // Aplica a classe 'container' e, se isDark for true, a classe 'dark' do App.module.css
        <main className={`${styles.container} ${isDark ? styles.dark : ''}`}>
            <Counter />
        </main>
    );
}
