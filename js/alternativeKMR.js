class alternativeKMR {
    constructor(sequence) {
        this.sequence = sequence;
        this.a = [];
        this.b = [];
        this.n = sequence.length;
        this.e = [];
        this.v_a = [];
        this.lastIndexWithPattern = 0;

        this.init();
        let iter = -1;
        if (this.e[0]) {
            do {
                ++iter;
                this.b[iter] = this.a[iter];
            } while (this.next_iter(iter));
            while (this.b[this.b.length - 1] > 1) {
                ++iter;
                this.b[iter] = this.b[iter-1] >> 1;
                this.next_iter(iter);
            }
        } else {
            this.a.fill(0);
            this.b.fill(0);
        }
        console.log(`a = ${this.a}, b = ${this.b}, e = ${this.e}`);
        console.log("v_a = ");
        for (let i = 0; i < this.v_a.length; ++i) {
            console.log(` v_a[${i}] = ${this.v_a[i]}`);
        }

    }

    init() {
        var alphabet = new Map();
        this.n = this.sequence.length;
        this.a[0] = this.b[0] = 1;
        this.v_a[0] = [];

        for (let i = 0; i < this.n; ++i) {
            if (!alphabet.has(this.sequence[i])) {
                this.v_a[0][i] = alphabet.size;
                alphabet.set(this.sequence[i], alphabet.size);
            } else {
                this.v_a[0][i] = alphabet.get(this.sequence[i]);
            }
        }
        this.e[0] = (alphabet.size < this.n ? alphabet.size : 0);
    }

    next_iter(iter) {
        var P = [];
        var Q = [];
        var has_motif = false;
        if (iter > 0) {
            this.v_a[iter] = [...this.v_a[this.lastIndexWithPattern]];
            this.e[iter] = this.e[this.lastIndexWithPattern];
        }

        console.log(`Nouvelle iteration avec a = ${this.a[iter]}, b = `,
                    this.b[iter], ` et e = ${this.e[iter]}`);
        // console.log("deb v_a = ");
        // for (let i = 0; i < this.v_a.length; ++i) {
        //     console.log(` v_a[${i}] = ${this.v_a[i]}`);
        // }

        for (let i = 0; i < this.e[iter]; ++i) {
            P[i] = [];
            Q[i] = [];
        }

        for (let p = 0; p < this.n; ++p) {
            if (this.v_a[iter][p] != -1) {
                let i = this.v_a[iter][p];
                P[i].push(p);
            }
        }

        for (let i = 0; i < this.e[iter]; ++i) {
            while (P[i].length > 0) {
                let p = P[i].pop();
                if ((p + this.b[iter] < this.n) &&
                    (this.v_a[iter][p + this.b[iter]] != -1)
                ) {
                    Q[this.v_a[iter][p + this.b[iter]]].push(p);
                }
            }
            for (let j = 0; j < this.e[iter]; ++j) {
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
            this.v_a[iter].fill(-1);
    
            let e_tmp = -1;
            for (let i = 0; i < this.e[iter]; ++i) {
                while ((Q[i] instanceof Array) && Q[i].length > 0) {
                    let x = Q[i].pop();
                    if (x == -1) {
                        ++e_tmp;
                    } else {
                        this.v_a[iter][x] = e_tmp;
                    }
                }
            }
            this.e[iter] = ++e_tmp;
            this.a[iter+1] = this.a[iter] + this.b[iter];
            this.n -= this.b[iter];
            this.lastIndexWithPattern = iter;
        } else {
            this.a[iter+1] = this.a[iter];
            this.v_a[iter].fill(-1);
            this.e[iter] = 0;
        }

        return has_motif
    }

    getRepeatedMotifPositions(index, motif) {
        var positions = [];
        for (let p = 0; p < this.sequence.length; ++p) {
            if (this.v_a[index][p] == motif) {
                positions.push(p);
            }
        }
        return positions;
    }

    print() {
        if (this.e.length == 0) {
            console.log(`Il n'y a pas de motif répété dans la séquence\
                        ${this.sequence}.`);
        } else {
            console.log(`La taille maximale de motif répété est ${this.a[this.a.length - 1]}.`);
            for (let iter = 0; iter < this.v_a.length; ++iter) {
                if (this.e[iter] == 0) {
                    continue;
                }
                console.log(`Il y a ${this.e[iter]} motifs répété(s) de taille`,
                    this.a[iter] + this.b[iter], '.');
                for (let m = 0; m < this.e[iter]; ++m) {
                    let pos = this.getRepeatedMotifPositions(iter, m);
                    console.log(`Le motif ${m+1} correspondant à '`,
                    this.sequence.substring(pos[0], pos[0] + this.a[iter] + this.b[iter]),
                    "' apparaît aux positions : ",pos);
                }
            }
        }
    }

    toHTML() {
        let html = "<p>";
        if (this.e.length == 0) {
            html += `Il n'y a pas de motif répété dans la séquence ` + this.sequence;
        } else {
            html += `La taille maximale de motif répété est ${this.a[this.a.length - 1]}. <br>`;
            for (let iter = 0; iter < this.v_a.length; ++iter) {
                if (this.e[iter] == 0) {
                    continue;
                }
                html += `Il y a ${this.e[iter]} motifs répété(s) de taille ` +
                    (this.a[iter] + this.b[iter]) + ". <br>";
                for (let m = 0; m < this.e[iter]; ++m) {
                    let pos = this.getRepeatedMotifPositions(iter, m);
                    html += `Le motif ${m+1} correspondant à '` +
                        this.sequence.substring(pos[0], pos[0] + this.a[iter] + this.b[iter]) +
                        "' apparaît aux positions : " + pos + "<br>";
                }
            }
        }
        html += "</p>";
        return html;
    }
}
