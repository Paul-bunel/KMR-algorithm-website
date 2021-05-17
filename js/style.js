const navLinks = document.querySelectorAll('nav div a');

for (const link of navLinks) {
    link.onclick = function() {
        for (const l of navLinks) {
            l.style.backgroundColor = "#194a8dc4";
        }
        this.style.backgroundColor = "#194a8d"
    }
}