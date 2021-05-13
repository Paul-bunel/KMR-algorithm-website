importScripts('kmr.js', 'naive.js')

function getPerformances(seqMap) {
    for (const sequence of seqMap.entries()) {
        const seq = sequence[1];
        new KMR(seq);
        longestRepeatedPattern(seq);
    }

    perfMapKMR = new Map();
    perfMapNaive = new Map();
    let nbIter = 5.0;

    // const totalStart = performance.now();
    for (let i = 0; i < nbIter; ++i) {
        // console.log("=======  CALCUL NUMERO " + i);
        for (const sequence of seqMap.entries()) {
            const length = sequence[0];
            const seq = sequence[1];
            
            if (perfMapKMR.get(length) == undefined) {
                perfMapKMR.set(length, 0);
            }
            const startKmr = performance.now();
            new KMR(seq);
            const endKmr = performance.now();
            const timeKmr = endKmr - startKmr;
            perfMapKMR.set(length, perfMapKMR.get(length) + timeKmr);
            
            if (perfMapNaive.get(length) == undefined) {
                perfMapNaive.set(length, 0);
            }
            const startNaive = performance.now();
            longestRepeatedPattern(seq);
            const endNaive = performance.now();
            const timeNaive = endNaive - startNaive;
            perfMapNaive.set(length, perfMapNaive.get(length) + timeNaive);
        }
        postMessage((i+1) * 100 / nbIter);
    }

    for (const length of seqMap.keys()) {
        perfMapKMR.set(length, (perfMapKMR.get(length) / nbIter));
        perfMapNaive.set(length, (perfMapNaive.get(length) / nbIter));
    }

    return [perfMapKMR, perfMapNaive];
}

onmessage = function(e) {
    let seqMap = e.data;
    const [perfMapKMR, perfMapNaive] = getPerformances(seqMap);
    postMessage([e.data, perfMapKMR, perfMapNaive]);
}