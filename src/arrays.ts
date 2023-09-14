/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    const len = numbers.length;
    if (len === 0) {
        return [];
    }
    if (len === 1) {
        return [numbers[0], numbers[0]];
    } else {
        return [numbers[0], numbers[len - 1]];
    }
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const finalNumbers = numbers.map((num) => num * 3);
    return finalNumbers;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const integers = numbers.map((str) => {
        const parsedInt = parseInt(str, 10);
        return isNaN(parsedInt) ? 0 : parsedInt;
    });
    return integers;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const amount = amounts.map((str) => {
        const removedDollars = parseInt(str.replace(/^\$/, ""));
        return isNaN(removedDollars) ? 0 : removedDollars;
    });
    return amount;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const shoutMessages = messages
        .map((message) => {
            if (message.endsWith("?")) {
                return "";
            } else if (message.endsWith("!")) {
                return message.toUpperCase();
            } else {
                return message;
            }
        })
        .filter((message) => message !== ""); // Remove empty strings

    return shoutMessages;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    const shortWords = words.filter((word) => word.length < 4);
    return shortWords.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length > 0) {
        const RGBColors = ["red", "blue", "green"];
        return colors.every((color) => RGBColors.includes(color));
    }
    return true;
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    const sum = addends.reduce((current, total) => current + total, 0);
    if (addends.length === 0) {
        const addendsString = "0";
        return `${sum}=${addendsString}`;
    } else {
        const addendsString = addends.join("+");
        return `${sum}=${addendsString}`;
    }
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    let sum = 0;
    let insertion = false;
    const result: number[] = [];
    for (const value of values) {
        if (value < 0 && !insertion) {
            result.push(value);
            result.push(sum);
            insertion = true;
        } else {
            sum += value;
            result.push(value);
        }
    }
    if (!insertion) {
        result.push(sum);
    }
    return result;
}
