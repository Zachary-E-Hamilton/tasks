import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [currentType, setCurrentType] = useState<QuestionType>(
        "short_answer_question"
    );

    const handleChange = () => {
        if (currentType === "short_answer_question") {
            setCurrentType("multiple_choice_question");
        } else {
            setCurrentType("short_answer_question");
        }
    };
    return (
        <div>
            <Button onClick={handleChange}>Change Type</Button>

            {currentType === "short_answer_question" && <div>Short Answer</div>}
            {currentType === "multiple_choice_question" && (
                <div>Multiple Choice</div>
            )}
        </div>
    );
}
