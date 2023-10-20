import React, { useState } from "react";
import { Button } from "react-bootstrap";

type Holiday =
    | "DRAGON_BOAT"
    | "HALLOWEEN"
    | "DIWALI"
    | "CHRISTMAS"
    | "NEW_YEAR";

const holidayEmojis: Record<Holiday, string> = {
    DRAGON_BOAT: "🎏",
    HALLOWEEN: "🎃",
    DIWALI: "🪔",
    CHRISTMAS: "🎄",
    NEW_YEAR: "🎉"
};

const alphabetOrder: Holiday[] = [
    "DIWALI",
    "DRAGON_BOAT",
    "HALLOWEEN",
    "CHRISTMAS",
    "NEW_YEAR"
];
const yearOrder: Holiday[] = [
    "NEW_YEAR",
    "DRAGON_BOAT",
    "DIWALI",
    "HALLOWEEN",
    "CHRISTMAS"
];

export function CycleHoliday(): JSX.Element {
    const [currentHoliday, setCurrentHoliday] = useState<Holiday>("NEW_YEAR");

    const getNextHoliday = (current: Holiday, order: Holiday[]): Holiday => {
        const currentIndex = order.indexOf(current);
        return order[(currentIndex + 1) % order.length];
    };

    return (
        <div>
            Holiday: {holidayEmojis[currentHoliday]}
            <br />
            <Button
                onClick={() =>
                    setCurrentHoliday((prev) =>
                        getNextHoliday(prev, alphabetOrder)
                    )
                }
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() =>
                    setCurrentHoliday((prev) => getNextHoliday(prev, yearOrder))
                }
            >
                Advance by Year
            </Button>
        </div>
    );
}
