<?php
header("Content-type: text/xml");
echo '<?xml version="1.0" encoding="utf-8"?>';

if (isset($_GET["get"]) && $_GET["get"] == "seqs") {
    $str = file_get_contents("dataBase.fna", false, null, 0, 100000);
    echo "<seqs>";
    for ($i = 1; $i <= 10; ++$i) {
        $length = $i * 100;
        echo "<subseq length=\"{$length}\">" . substr($str, 0, $length) . "</subseq>";
    }
    echo "</seqs>";
}
?>
