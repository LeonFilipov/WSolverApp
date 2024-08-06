import { createRoot } from 'react-dom/client';
import React from 'react';
import '../public/main.css';
import { WordleSolver } from "./components/WordleSolver";

export const App = () => {
    return (
        <>
        <article className="wordle column">
            <header>
                <h1 className="title">Wordle Solver</h1>
            </header>
            <WordleSolver/>
            <div className="word-display">
                <div className="column" id="col-1"></div>
                <div className="column" id="col-2"></div>
            </div>
        </article>
        </>
    )
}

createRoot(document.getElementById('app') as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
)