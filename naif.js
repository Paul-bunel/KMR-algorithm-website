function getOverlap(seq) {
    let lg = seq.length;
    let overlap = [];
    overlap[0] = -1;
    for (let i = 0; i < lg; ++i) {
        overlap[i + 1] = overlap[i] + 1;
        while (overlap[i + 1] > 0 &&
               seq[i] != seq[overlap[i + 1] - 1]) {
            overlap[i + 1] = overlap[overlap[i + 1] - 1] + 1;
        }
    }
    return overlap;
}

function extract(seq, k) {
    let i, j, l, lg = seq.length;
    let result = false;

    for (i = 0; i < lg - k; ++i) {
        let motif = seq.substring(i, i + k);
        let overlap = getOverlap(motif);
        // console.log(`overlap du motif '${motif}' = ${overlap}`);
        let msg = "";
        j = i + 1;
        while (j <= lg - k) {
            let ok = true;
            for (l = 0; ok && (l < k); ++l) {
                ok = (seq[j + l] == motif[l]);
            }
            if (ok) {
                if (msg.length == 0) {
                    msg = "le motif '" + motif + "' apparait aux position " + i;
                }
                msg += ", " + j;
                --l;
            }
            j += l - overlap[l + 1] + 1;
        }
        if (msg.length > 0) {
            console.log(msg);
            result = true;
        }
    }

    return result;
}

function longestRepeatedPattern(seq) {
    const start = performance.now();
    let LRP = 0;
    for (let k = seq.length - 1; k > 0; --k) {
        if (extract(seq, k)) {
            LRP = k;
            break;
        }
    }
    const end = performance.now();
    console.log((end-start)+ " ms d'execution javascript");

    return LRP;
}
