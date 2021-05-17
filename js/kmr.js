class KMR {
    constructor(sequence) {
        this.sequence = sequence;
        this.a = 1;
        this.b = 1;
        this.n = sequence.length;
        this.e = 0;
        this.v_a = [];

        // Complexité en temps : O(n² log(n))
        this.init(); // Boucle n fois
        if (this.e) {
            let i = 0;
            do { // Boucle log(n) fois dans le pire des cas
                console.log(`i = ${i++}`);
                this.b = this.a;
            } while (this.next_iter());
            console.log("switch");
            while (this.b > 1) { // Boucle log(n) fois dans le pire des cas
                console.log(`i = ${i++}`);
                this.b >>= 1;
                this.next_iter();
            }
        } else {
            this.a = this.b = 0;
        }
    }

    static compute(sequence) {
        return new KMR(sequence);
    }

    init() {
        var alphabet = new Map();
        this.n = this.sequence.length;
        this.a = this.b = 1;

        for (let i = 0; i < this.n; ++i) {
            if (!alphabet.has(this.sequence[i])) {
                this.v_a[i] = alphabet.size;
                alphabet.set(this.sequence[i], alphabet.size);
            } else {
                this.v_a[i] = alphabet.get(this.sequence[i]);
            }
        }
        this.e = (alphabet.size < this.n ? alphabet.size : 0);
    }

    next_iter() {
        var P = [];
        var Q = [];
        var has_motif = false;

        console.log(`Nouvelle iteration avec a = ${this.a}, b = ${this.b} et`,
                    `e = ${this.e}`);

        for (let p = 0; p < this.n; ++p) { // O(n)
            if (this.v_a[p] != -1) {
                let i = this.v_a[p];
                if (!(P[i] instanceof Array)) {
                    P[i] = [];
                }
                P[i].push(p);
            }
        }

        for (let i = 0; i < this.e; ++i) { // Boucle n fois dans le pire des cas
            while (P[i].length > 0) { // Boucle n fois dans le pire des cas
                let p = P[i].pop();
                if ((p + this.b < this.n) && (this.v_a[p + this.b] != -1)) {
                    if (!(Q[this.v_a[p + this.b]] instanceof Array)) {
                        Q[this.v_a[p + this.b]] = [];
                    }
                    Q[this.v_a[p + this.b]].push(p);
                }
            }
            for (let j = 0; j < this.e; ++j) { // Boucle n fois dans le pire des cas
                if ((Q[j] instanceof Array) && Q[j].length > 0) {
                    let x = Q[j][Q[j].length - 1];
                    if (x != -1) {
                        Q[j].pop();
                        if (Q[j].length > 0) {
                            let y = Q[j][Q[j].length - 1];
                            if (y != -1) {
                                Q[j].push(x);
                                Q[j].push(-1);
                                has_motif = true;
                            }
                        }
                    }
                }
            }
        }

        if (has_motif) {
            console.log("Motif répété !");
            this.v_a.fill(-1);
            let e_tmp = -1;
            for (let i = 0; i < this.e; ++i) { // Boucle n fois dans le pire des cas
                while ((Q[i] instanceof Array) && Q[i].length > 0) {
                    let x = Q[i].pop();
                    if (x == -1) {
                        ++e_tmp;
                    } else {
                        this.v_a[x] = e_tmp;
                    }
                }
            }
            this.e = ++e_tmp;
            this.a += this.b;
            this.n -= this.b;
        }
        return has_motif
    }

    getRepeatedMotifPositions(motif) {
        var positions = [];
        for (let p = 0; p < this.n; ++p) {
            if (this.v_a[p] == motif) {
                positions.push(p);
            }
        }
        return positions;
    }

    print() {
        if (!this.e) {
            console.log(`Il n'y a pas de motif répété dans la séquence\
                        ${this.sequence}.`);
        } else {
            console.log(`La taille maximale de motif répété est ${this.a}.`);
            console.log(`Il y a ${this.e} motifs répété(s).`);
            for (let m = 0; m < this.e; ++m) {
                let pos = this.getRepeatedMotifPositions(m);
                console.log(`Le motif ${m+1} correspondant à '`,
                    this.sequence.substring(pos[0], pos[0] + this.a),
                    "' apparaît aux positions : ",pos);
            }
        }
    }

    toHTML() {
        let html = "<p>";
        if (!this.e) {
            html += `Il n'y a pas de motif répété dans la séquence ` + this.sequence;
        } else {
            html += `La taille maximale de motif répété est ${this.a}. <br>`;
            html += `Il y a ${this.e} motifs répété(s).<br>`;
            for (let m = 0; m < this.e; ++m) {
                let pos = this.getRepeatedMotifPositions(m);
                html += `Le motif ${m+1} correspondant à '` +
                    this.sequence.substring(pos[0], pos[0] + this.a) +
                    "' apparaît aux positions : " + pos + "<br>";
            }
        }
        html += "</p>";
        return html;
    }

} 
