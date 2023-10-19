import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): JSX.Element {
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const handleReveal = () => {
        setIsAnswerVisible((prevVisible) => !prevVisible);
    };
    return (
        <div>
            <Button aria-label="Reveal Answer" onClick={handleReveal}>
                Reveal Anwser
            </Button>
            {isAnswerVisible && <div>42</div>}
        </div>
    );
}
