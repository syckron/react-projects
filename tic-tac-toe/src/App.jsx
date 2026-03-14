import styles from './App.module.css';
import Game from './components/Game.jsx';

export default function App() {
    return (
        <main className={styles.container}>
            <Game />
        </main>
    )
}