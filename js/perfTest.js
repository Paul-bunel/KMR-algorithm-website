importScripts("naive.js", "kmr.js");
// importScripts("kmr.js");
onmessage = function(e) {
    const sequence = e.data;
    const startKMR = performance.now();
    let kmr = new KMR(sequence[1]);
    const endKMR = performance.now();

    const startNaive = performance.now();
    let naif = longestRepeatedPattern(sequence[1]);
    const endNaive = performance.now();

    // console.log(`worker: length = ${sequence[0]}, kmr = ${endKMR-start}, naive = ${endNaive-start}, iter: ${e.data[2]}`);

    let message = {
        length: sequence[0],
        kmr: endKMR - startKMR,
        naive: endNaive - startNaive,
        iter: e.data[2]
    };
    postMessage(message);
}
