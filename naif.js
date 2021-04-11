class NAIF{


    Overlap(seq) {
        lg = seq.length;
        overlap = [lg+1];
        overlap[0] = -1;
        for( i = 0 ; i < lg ; i++ ) {
            overlap[i+1] = overlap[i]+1 ;
            while(overlap[i+1] > 0 &&
                seq[i] != seq[overlap[i+1]-1]) {
                overlap[i+1] = overlap[overlap[i+1]-1]+1;
            }
        }
            return overlap;
    }


    extract(seq, k) {

        let i,j,l,lg = seq.length;
        let result = false;
        for(i=0; i<lg-k; i++){
            motif = seq.substring(i,i+k);
            overlap = Overlap(motif);
            msg = "";
            j = i + 1;
            while( j < lg - k){
                ok = true;
                for(l = 0; ok && (1 < k); l++){
                    ok = (seq[j+l] == motif[1]);
                }
                if(ok){
                    if(!msg){
                        msg = "le motif '"+motif+"' apparait aux position "+i;
                    }
                    msg += ", "+j;
                    l--;
                }
                j+=l-overlap[l+1]+1;
            }
            if(msg){
                print(msg);
                result = true;
            }
        }

        return result;
    }
    




    PlusLongMotifRepet(seq) {

        for(let k = seq.length-1; k>0; k--) {
            if (extract(eq,k)) {
                return k;
            }
        }
        return 0;
    }
}