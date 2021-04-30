const perfButton = document.querySelector('#perf-button');
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

function recursiveAlgorithmCompute(algo, seqMap, perfMap, i, iMax) {
    if (typeof algo === "function") {
        i++;
        const progression = document.querySelector('#progression');
        const timeElapsed = performance.now() - totalStart;
        progression.innerHTML += `Temps écoulé : ${timeElapsed}ms.`
            + ` Pourcentage du calcul effectué : ${100*timeElapsed/80000}%.<br>`;
    
        for (const sequence of seqMap.entries()) {
            const length = sequence[0];
            const seq = sequence[1];
            
            if (perfMap.get(length) == undefined) {
                perfMap.set(length, 0);
            }
            
            const start = performance.now();
            algo(seq);
            const end = performance.now();
            const time = end - start;
            
            perfMap.set(length, perfMap.get(length) + time);
        }
        if (i < iMax) {
            setTimeout(() => {
                recursiveAlgorithmCompute(algo, seqMap, perfMap, i, iMax);
            }, 100);
        } else {
            for (const length of seqMap.keys()) {
                perfMap.set(length, perfMap.get(length) / iMax);
            }
            if (perfMap === perfMapNaive) {
                makeResultsTable(seqMap);
            }
        }
    }
}

function makeResultsTable(seqMap) {
    totalEnd = performance.now();
    console.log(`total time : ${totalEnd - totalStart}`);
    const tabResults = document.querySelector('#table-results');
    for (const length of seqMap.keys()) {
        tabResults.innerHTML += `<tr><td>${length}</td><td>${perfMapKMR.get(length)}</td>`
        + `<td>${perfMapNaive.get(length)}</td></tr>`;
    }
}

function getPerformances(seqMap) {
    for (const sequence of seqMap.entries()) {
        const seq = sequence[1];
        new KMR(seq);
        longestRepeatedPattern(seq);
    }

    perfMapKMR = new Map();
    perfMapNaive = new Map();
    let nbIter = 5.0;

    console.log("Begining of iterations");
    
    totalStart = performance.now();
    recursiveAlgorithmCompute(KMR.compute, seqMap, perfMapKMR, 0, nbIter);
    recursiveAlgorithmCompute(longestRepeatedPattern, seqMap, perfMapNaive, 0, nbIter);
    
    // for (let i = 0; i < nbIter; ++i) {
    //     // console.log("=======  CALCUL NUMERO " + i);
    //     for (const sequence of seqMap.entries()) {
    //         const length = sequence[0];
    //         const seq = sequence[1];
            
    //         if (perfMapNaive.get(length) == undefined) {
    //             perfMapNaive.set(length, 0);
    //         }
            
    //         const startNaive = performance.now();
    //         let naif = longestRepeatedPattern(seq);
    //         const endNaive = performance.now();
    //         const NaiveTime = endNaive - startNaive;
            
    //         perfMapNaive.set(length, perfMapNaive.get(length) + NaiveTime);
    //     }
        // let calcul = document.createElement('p');
        // calcul.innerText = `Calcul numero ${i} Naive.`;
        // algoResults.append(calcul);
    // }
    // const totalEnd = performance.now();
    // console.log(`total time : ${totalEnd - totalStart}`);
    
    // for (const length of seqMap.keys()) {
    //     perfMapNaive.set(length, perfMapNaive.get(length) / nbIter);
    //     perfMapKMR.set(length, perfMapKMR.get(length) / nbIter);
    //     tabResults.innerHTML += `<tr><td>${length}</td><td>${perfMapKMR.get(length)}</td>`
    //         + `<td>${perfMapNaive.get(length)}</td></tr>`;
    // }
}

function drawGraphics(json) {
    // JSON : {n: _, t: _}

}