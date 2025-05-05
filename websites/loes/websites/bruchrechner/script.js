function addFractions() {
    const [num1, den1, num2, den2] = getInputValues();
    const numerator = (num1 * den2) + (num2 * den1);
    const denominator = den1 * den2;
    displayResult(numerator, denominator);
}

function subtractFractions() {
    const [num1, den1, num2, den2] = getInputValues();
    const numerator = (num1 * den2) - (num2 * den1);
    const denominator = den1 * den2;
    displayResult(numerator, denominator);
}

function multiplyFractions() {
    const [num1, den1, num2, den2] = getInputValues();
    const numerator = num1 * num2;
    const denominator = den1 * den2;
    displayResult(numerator, denominator);
}

function divideFractions() {
    const [num1, den1, num2, den2] = getInputValues();
    const numerator = num1 * den2;
    const denominator = den1 * num2;
    displayResult(numerator, denominator);
}

function getInputValues() {
    const num1 = parseInt(document.getElementById('numerator1').value);
    const den1 = parseInt(document.getElementById('denominator1').value);
    const num2 = parseInt(document.getElementById('numerator2').value);
    const den2 = parseInt(document.getElementById('denominator2').value);
    return [num1, den1, num2, den2];
}

function displayResult(numerator, denominator) {
    const resultDisplay = document.getElementById('result-display');
    if (denominator === 0) {
        resultDisplay.textContent = "Fehler: Division durch Null";
        return;
    }
    const gcd = getGCD(numerator, denominator);
    numerator /= gcd;
    denominator /= gcd;
    resultDisplay.textContent = `Ergebnis: ${numerator} / ${denominator}`;
}

function getGCD(a, b) {
    return b ? getGCD(b, a % b) : Math.abs(a);
}
