// const perfButton = document.querySelector('.perf-button');
// // const algoResults = document.querySelector('#algo-results');
// // Map : {n -> seq}

// perfButton.onclick = getSequences;

// function getSequences() {
//     const progression = document.querySelector('.progression');
//     progression.value = 0;

//     xmlRequest = new XMLHttpRequest();
//     xmlRequest.onreadystatechange = function() {
//         if (
//             this.readyState === XMLHttpRequest.DONE
//             && this.status === 200
//             ) {
//             let seqMap = new Map();
//             const xml = this.responseXML;
//             seqs = xml.querySelector('seqs');
//             const subseqs = seqs.querySelectorAll('subseq');
//             for (const subseq of subseqs) {
//                 seqMap.set(parseInt(subseq.getAttribute('length')), subseq.innerHTML);
//             }
//             if (window.Worker) {
//                 var myWorker = new Worker('js/worker.js');
//                 myWorker.postMessage(seqMap);
//             }
//             // getPerformances(seqMap);
//         }
//     };
//     xmlRequest.open('GET', 'dnaData.php?get=seqs');
//     xmlRequest.send();
// }

// function recursiveAlgorithmCompute(algo, seqMap, perfMap, i, iMax) {
//     if (typeof algo === "function") {
//         i++;
//         for (const sequence of seqMap.entries()) {
//             const length = sequence[0];
//             const seq = sequence[1];
            
//             if (perfMap.get(length) == undefined) {
//                 perfMap.set(length, 0);
//             }
            
//             const start = performance.now();
//             algo(seq);
//             const end = performance.now();
//             const time = end - start;
            
//             perfMap.set(length, perfMap.get(length) + time);
//         }
//         if (perfMap === perfMapNaive) {            
//             const progression = document.querySelector('.progression');
//             progression.value = i * 100 / iMax;
//         }
//         if (i < iMax) {
//             setTimeout(() => {
//                 recursiveAlgorithmCompute(algo, seqMap, perfMap, i, iMax);
//             }, 100);
//         } else {
//             for (const length of seqMap.keys()) {
//                 perfMap.set(length, perfMap.get(length) / iMax);
//             }
//             if (perfMap === perfMapNaive) {
//                 displayResults(seqMap);
//             }
//         }
//     }
// }

// function displayResults(seqMap) {
//     totalEnd = performance.now();
//     console.log(`total time : ${totalEnd - totalStart}`);
//     const tabResults = document.querySelector('.table-results');
//     tabResults.innerHTML = "";

//     for (const length of seqMap.keys()) {
//         tabResults.innerHTML += `<tr><td>${length}</td><td>${perfMapKMR.get(length)}</td>`
//         + `<td>${perfMapNaive.get(length)}</td></tr>`;
//     }

//     dataStorage = [[...perfMapKMR.values()], [...perfMapNaive.values()]];
//     let dataChart = new Array();
//     for (let i = 0; i < dataStorage.length; ++i) {
//       dataChart[i] = [...dataStorage[i]];
//     }
  
//     ChangeData(chartPerf, dataChart);
// }

// function getPerformances(seqMap) {
//     for (const sequence of seqMap.entries()) {
//         const seq = sequence[1];
//         new KMR(seq);
//         longestRepeatedPattern(seq);
//     }

//     perfMapKMR = new Map();
//     perfMapNaive = new Map();
//     let nbIter = 5.0;

//     totalStart = performance.now();
//     recursiveAlgorithmCompute(KMR.compute, seqMap, perfMapKMR, 0, nbIter);
//     recursiveAlgorithmCompute(longestRepeatedPattern, seqMap, perfMapNaive, 0, nbIter);
// }