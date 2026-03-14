import { useState } from 'react';
import Board from './Board.jsx';
import styles from './Game.module.css';

export default function Game() {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    function handlePlay(nextSquares) {
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    return (
        <div className={styles.game}>
            <Board
                xIsNext={xIsNext}
                squares={squares}
                onPlay={handlePlay}
            />
        </div>
    );
}