import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion } from "./objects";
import { duplicateQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const publishedQuestions = questions.filter(
        (question) => question.published
    );
    return publishedQuestions;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmptyQuestions: Question[] = [];

    for (const question of questions) {
        if (
            question.body.trim() !== "" ||
            question.expected.trim() !== "" ||
            (question.options && question.options.length > 0)
        ) {
            nonEmptyQuestions.push(question);
        }
    }

    return nonEmptyQuestions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const foundQuestion = questions.find((question) => question.id === id);
    return foundQuestion || null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const remainingQuestions = questions.filter(
        (question) => question.id !== id
    );
    return remainingQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const names = questions.map((question) => question.name);
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const sumOfPoints = questions.reduce((total, current) => {
        return total + current.points;
    }, 0);
    return sumOfPoints;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const publishedQuestions = questions.filter(
        (question) => question.published
    );
    const sumOfPoints = publishedQuestions.reduce((total, current) => {
        return total + current.points;
    }, 0);
    return sumOfPoints;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const headers = ["id", "name", "options", "points", "published"];
    const rows: string[] = [];
    rows.push(headers.join(","));
    for (const question of questions) {
        const id = question.id;
        const name = question.name;
        const optionsCount = question.options ? question.options.length : 0;
        const points = question.points;
        const published = question.published;
        const row = [id, name, optionsCount, points, published].join(",");
        rows.push(row);
    }
    const csvString = rows.join("\n");

    return csvString;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const answers = questions.map((question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false
    }));
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const published = questions.map((question) => ({
        ...question,
        published: true
    }));
    return published;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }
    const questionType = questions[0].type;
    return questions.every((question) => question.type === questionType);
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */

export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newQuestion = makeBlankQuestion(id, name, type);
    const updatedQuestions = questions.concat(newQuestion);
    return updatedQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const renamedQuestions = questions.map((question) => {
        if (question.id === targetId) {
            return {
                ...question,
                name: newName
            };
        } else {
            return question;
        }
    });
    return renamedQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const changedQuestions = questions.map((question) => {
        if (question.id === targetId) {
            const changedQuestion: Question = {
                ...question,
                type: newQuestionType,
                options:
                    newQuestionType === "multiple_choice_question"
                        ? question.options
                        : []
            };
            return changedQuestion;
        } else {
            return question;
        }
    });
    return changedQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    function editOptionsHelper(
        options: string[],
        index: number,
        newValue: string
    ): string[] {
        if (index === -1) {
            return [...options, newValue];
        } else if (index >= 0 && index < options.length) {
            const newOptions = [...options];
            newOptions[index] = newValue;
            return newOptions;
        } else {
            return options;
        }
    }
    const updatedQuestions = questions.map((question) => {
        if (question.id === targetId) {
            return {
                ...question,
                options: editOptionsHelper(
                    question.options,
                    targetOptionIndex,
                    newOption
                )
            };
        } else {
            return question;
        }
    });
    return updatedQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const updatedQuestions = questions
        .map((question) => {
            if (question.id === targetId) {
                const duplicate = duplicateQuestion(newId, question);
                return [question, duplicate];
            } else {
                return question;
            }
        })
        .flat();
    return updatedQuestions;
}
