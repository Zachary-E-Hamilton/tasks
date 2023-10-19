import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attemptNumber, setAttempts] = useState(3);
    const [inProgress, setInProgress] = useState(false);

    const handleStart = () => {
        if (attemptNumber > 0) {
            setAttempts((prevAttempt) => attemptNumber - 1);
            setInProgress(true);
        }
    };

    const handleStop = () => {
        setInProgress(false);
    };

    const handleMulligan = () => {
        setAttempts((prevAttempts) => attemptNumber + 1);
    };
    return (
        <div>
            <Button
                onClick={handleStart}
                disabled={inProgress || attemptNumber === 0}
            >
                Start Quiz
            </Button>
            <Button onClick={handleStop} disabled={!inProgress}>
                Stop Quiz
            </Button>
            <Button onClick={handleMulligan} disabled={inProgress}>
                Mulligan
            </Button>
            <div>Attempts Left: {attemptNumber}</div>
        </div>
    );
}
