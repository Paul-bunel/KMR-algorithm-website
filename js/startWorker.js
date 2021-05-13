const perfButton = document.querySelector('.perf-button');
// const algoResults = document.querySelector('#algo-results');
// Map : {n -> seq}

perfButton.onclick = getSequences;
myWorker = new Worker('js/worker.js');

function getSequences() {
    const progression = document.querySelector('.progression');
    progression.value = 0;

    xmlRequest = new XMLHttpRequest();
    xmlRequest.onreadystatechange = function() {
        if (
            this.readyState === XMLHttpRequest.DONE
            && this.status === 200
            ) {
            let seqMap = new Map();
            const xml = this.responseXML;
            seqs = xml.querySelector('seqs');
            const subseqs = seqs.querySelectorAll('subseq');
            for (const subseq of subseqs) {
                seqMap.set(parseInt(subseq.getAttribute('length')), subseq.innerHTML);
            }
                myWorker.postMessage(seqMap);
            // getPerformances(seqMap);
        }
    };
    xmlRequest.open('GET', 'dnaData.php?get=seqs');
    xmlRequest.send();
}

function displayResults(seqMap, perfMapKMR, perfMapNaive) {
    const tabResults = document.querySelector('.table-results');
    tabResults.innerHTML = "<tr><th>Length</th><th>KMR Time</th><th>Naive Time</th></tr>";

    for (const length of seqMap.keys()) {
        const kmrValue = 
            Math.round((perfMapKMR.get(length) + Number.EPSILON) * 10000) / 10000;
        const naiveValue = 
            Math.round((perfMapNaive.get(length) + Number.EPSILON) * 10000) / 10000;

        tabResults.innerHTML += `<tr><td>${length}</td><td>${kmrValue}</td>`
        + `<td>${naiveValue}</td></tr>`;
    }

    dataStorage = [[...perfMapKMR.values()], [...perfMapNaive.values()]];
    let dataChart = new Array();
    for (let i = 0; i < dataStorage.length; ++i) {
      dataChart[i] = [...dataStorage[i]];
    }
  
    ChangeData(chartPerf, dataChart);
}

myWorker.onmessage = function(e) {
    if (typeof e.data === "number") {
        const progression = document.querySelector('.progression');
        progression.value = e.data;
    } else {
        const [seqMap, seqMapKMR, seqMapNaive] = e.data;
        
        displayResults(seqMap, seqMapKMR, seqMapNaive);
    }
}