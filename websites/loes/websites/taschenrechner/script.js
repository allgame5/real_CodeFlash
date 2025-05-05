function addToInput(value) {
    document.getElementById('result').value += value;
}

function calculate() {
    try {
        var result = eval(document.getElementById('result').value);
        document.getElementById('result').value = result;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function clearInput() {
    document.getElementById('result').value = '';
}

function backspace() {
    var result = document.getElementById('result').value;
    document.getElementById('result').value = result.slice(0, -1);
}
