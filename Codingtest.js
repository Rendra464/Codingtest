const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const dictionary = {
    A: 0, B: 1, C: 1, D: 1, E: 2, F: 3, G: 3, H: 3,
    I: 4, J: 5, K: 5, L: 5, M: 5, N: 5, O: 6, P: 7,
    Q: 7, R: 7, S: 7, T: 7, U: 8, V: 9, W: 9, X: 9,
    Y: 9, Z: 9, " ": 0,
    a: 9, b: 8, c: 8, d: 8, e: 7, f: 6, g: 6, h: 6,
    i: 5, j: 4, k: 4, l: 4, m: 4, n: 4, o: 3, p: 2,
    q: 2, r: 2, s: 2, t: 2, u: 1, v: 0, w: 0, x: 0,
    y: 0, z: 0
};

function convertToNumbers(input) {
    return input.split("").map(char => dictionary[char] ?? 0);
}

function convert(numbers) {
    let total = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
        if (i % 2 !== 0) {
            total += numbers[i];
        } 
        else {
            total -= numbers[i];
        }
    }
    
    return total;
}


function alphabet(numbers){
    let sequence = [];
    let sum = 0;
    let i = 0;

    const mapping = {
        0: "A", 1: "B", 2: "E", 3: "F", 4: "I",
        5: "J", 6: "O", 7: "P", 8: "U", 9: "V"
    };
    
    if(numbers < 0){
        numbers = numbers * -1;
    }

    while (sum < numbers) {
        if (sum + i > numbers) {
            i = 0;
        }
        sequence.push(i);
        sum += i;
        i++;
    }
    
    const digits = sequence.flatMap(num => num.toString().split("").map(Number));
    const result = digits.map(digit => mapping[digit]).join(" ");

    return result;
}

function processAlphabetSequence(input) {
    const mapping = {
        "A": 0, "B": 1, "E": 2, "F": 3, "I": 4,
        "J": 5, "O": 6, "P": 7, "U": 8, "V": 9
    };
    
    const reverseMapping = Object.fromEntries(Object.entries(mapping).map(([k, v]) => [v, k]));
    
    let numbers = input.split(" ").map(char => mapping[char]);
    
    numbers.splice(-2, 2, numbers[numbers.length - 2] + 1, numbers[numbers.length - 1] + 1);
    
    let result = numbers.map(num => reverseMapping[num]).join(" ");
    
    return result;
}

function transformAlphabetToNumbers(input) {
    const mapping = {
        "A": 0, "B": 1, "E": 2, "F": 3, "I": 4,
        "J": 5, "O": 6, "P": 7, "U": 8, "V": 9
    };

    let numbers = input.split(" ").map(char => mapping[char]);

    let transformedNumbers = numbers.map(num => (num % 2 === 0 ? num + 1 : num));

    return transformedNumbers.join(" ");
}

rl.question("Input Text: ", (input) => {
    const numberArray = convertToNumbers(input);
    console.log("soal no 1:", numberArray.join(" "));

    const result = convert(numberArray);
    console.log("soal no 2:", result);
    
    const alphabetResult = alphabet(result);
    console.log("soal no 3:", alphabetResult);

    const alphabetsequence = processAlphabetSequence(alphabetResult);
    console.log("soal no 4: ", alphabetsequence);

    const alphabethnumber = transformAlphabetToNumbers(alphabetsequence);
    console.log("soal no 5: ", alphabethnumber);


    rl.close();
});
