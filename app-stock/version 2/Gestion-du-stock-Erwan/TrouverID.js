//Id grace a la recherche du nom
document.getElementById("champ-fruit").addEventListener("input", function () {
    const storedNames = JSON.parse(localStorage.getItem('fruit'));
    const fruitTrouver = storedNames.find(f => f.nom === this.value);
    if (fruitTrouver) {
        document.getElementById("champ-id").value = fruitTrouver.id;
    }
});