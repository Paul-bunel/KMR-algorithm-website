const perfButton = document.querySelector('.perf-button');
// const algoResults = document.querySelector('#algo-results');
// Map : {n -> seq}

perfButton.onclick = getSequences;

function getSequences() {
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
            getPerformances(seqMap)
        }
    };
    xmlRequest.open('GET', 'dnaData.php?get=seqs');
    xmlRequest.send();
}

function getPerformances(seqMap) {
    const algoResults = document.createElement('div');
    const tabResults = document.createElement('table');
    tabResults.innerHTML = "<tr><th>Length</th><th>Time</th></tr>";

    perfMapKMR = new Map();
    perfMapNaive = new Map();
    let nbIter = 5.0;
    let iter = 0;

    const totalStart = performance.now();
    for (let i = 0; i < nbIter; ++i) {
        // console.log("=======  CALCUL NUMERO " + i);
        for (const sequence of seqMap.entries()) {
            if (window.Worker) {
                const myWorker = new Worker("perfTest.js");
                myWorker.postMessage([sequence[0], sequence[1], iter++]);

                myWorker.onmessage = function(e) {
                    const length = e.data.length;
                    if (perfMapKMR.get(length) == undefined) {
                        perfMapKMR.set(length, 0);
                    }
                    if (perfMapNaive.get(length) == undefined) {
                        perfMapNaive.set(length, 0);
                    }
                    perfMapKMR.set(length, perfMapKMR.get(length) + e.data.kmr);
                    perfMapNaive.set(length, perfMapNaive.get(length) + e.data.naive);

                    if (e.data.iter == (nbIter * 10) - 1) {
                        const totalEnd = performance.now();
                        console.log(`total time : ${totalEnd - totalStart}`);
                    
                        for (const length of seqMap.keys()) {
                            perfMapNaive.set(length, perfMapNaive.get(length) / nbIter);
                            tabResults.innerHTML += `<tr><td>${length}</td><td>${perfMapNaive.get(length)}</td></tr>`;
                        }
                    
                        algoResults.append(tabResults);
                    }
                }
            }
        }
    }
}

function drawGraphics(json) {
    // JSON : {n: _, t: _}

}