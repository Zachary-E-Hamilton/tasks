import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

function getTwoDifferentDice(): [number, number] {
    const die1 = d6();
    let die2 = d6();

    while (die1 === die2) {
        die2 = d6();
    }

    return [die1, die2];
}

export function TwoDice(): JSX.Element {
    const [initialDice1, initialDice2] = getTwoDifferentDice();
    const [leftDie, setLeftDie] = useState<number>(initialDice1);
    const [rightDie, setRightDie] = useState<number>(initialDice2);

    const handleLeftRoll = () => {
        setLeftDie(d6());
    };

    const handleRightRoll = () => {
        setRightDie(d6());
    };

    const getMessage = () => {
        if (leftDie === 1 && rightDie === 1) return "Lose";
        if (leftDie === rightDie) return "Win";
        return "";
    };

    return (
        <div>
            <span data-testid="left-die">{leftDie}</span>
            <span data-testid="right-die">{rightDie}</span>
            <Button onClick={handleLeftRoll}>Roll Left</Button>
            <Button onClick={handleRightRoll}>Roll Right</Button>
            <div>{getMessage()}</div>
        </div>
    );
}
