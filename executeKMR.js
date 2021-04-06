const validationButton = document.body.querySelector('#validation-button');
const sequenceInput = document.body.querySelector('#sequence');
const printSequence = document.body.querySelector('#print-sequence');
const algoResults = document.body.querySelector('#algo-results');

validationButton.onclick = applyKMR;

function applyKMR(event) {
    let sequence = sequenceInput.value;
    kmr = new KMR(sequence);
    printSequence.innerText = `La sequence que vous avez choisi : ${sequence}`;
    algoResults.innerHTML = kmr.toHTML();
}