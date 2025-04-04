


    // Au chargement de la page
    document.addEventListener("DOMContentLoaded", () => {
        const boutonAjouter = document.getElementById("bouton-valider");
        const boutonRetirer = document.getElementById("bouton-retrait");
        const boutonVider = document.getElementById("bouton-vider");
        const selecteurFruit = document.getElementById("selecteur-fruit");
        const resultatRecherche = document.getElementById("resultat-recherche");
        const sortieNom = document.getElementById("sortie-Nom");
        const sortieQuantite = document.getElementById("sortie-Qte");

        // Fonction pour récupérer le stock depuis localStorage
        const recupererStock = () => JSON.parse(localStorage.getItem("stock")) || {};

        // Fonction pour sauvegarder le stock dans localStorage
        const sauvegarderStock = (stock) => localStorage.setItem("stock", JSON.stringify(stock));

        // Fonction pour mettre à jour l'affichage du stock
        const mettreAJourAffichageStock = () => {
            const stock = recupererStock();
            selecteurFruit.innerHTML = '<option value="">Rechercher dans le stock ?</option>';
            for (const [fruit, quantite] of Object.entries(stock)) {
                const option = document.createElement("option");
                option.value = fruit;
                option.textContent = `${fruit} (${quantite})`;
                selecteurFruit.appendChild(option);
            }
        };

        // Ajouter un fruit au stock
        boutonAjouter.addEventListener("click", () => {
            // const id = document.getElementById("champ-id").value.trim();
            const fruit = document.getElementById("champ-fruit").value.trim();
            const quantite = parseInt(document.getElementById("champ-quantite").value.trim(), 10);

            if (fruit && quantite > 0) {
                const stock = recupererStock();
                stock[fruit] = (stock[fruit] || 0) + quantite;
                sauvegarderStock(stock);


                sortieNom.textContent = `Fruit : ${fruit}`;
                sortieQuantite.textContent = `Quantité : + ${quantite}`;
                resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]}`;

                mettreAJourAffichageStock();

                // Réinitialise les champs
                document.getElementById("champ-fruit").value = "";
                document.getElementById("champ-quantite").value = "";

                alert("Fruit ajouté au stock !");
            } else {
                alert("Veuillez remplir tous les champs correctement.");
            }
        });

        // Retirer un fruit du stock
        boutonRetirer.addEventListener("click", () => {
            // const id = document.getElementById("champ-id-retrait").value.trim();
            const fruit = document.getElementById("champ-fruit-retrait").value.trim();
            const quantite = parseInt(document.getElementById("champ-quantite-retrait").value.trim(), 10);

            if (fruit && quantite > 0) {
                const stock = recupererStock();
                if (stock[fruit] && stock[fruit] >= quantite) {
                    stock[fruit] -= quantite;
                    if (stock[fruit] === 0) delete stock[fruit];
                    sauvegarderStock(stock);

                    sortieNom.textContent = `Fruit : ${fruit} `;
                    // pour afficher l'icone meme si texContent change
                    const iconNom = document.createElement("i");
                    iconNom.className = "fa-solid fa-apple-whole";
                    sortieNom.appendChild(iconNom);
                    
                    sortieQuantite.textContent = `Quantité : -${quantite} `;
                    // pour afficher l'icone meme si texContent change
                    const iconQuantite = document.createElement("i");
                    iconQuantite.className = "fa-solid fa-basket-shopping";
                    sortieQuantite.appendChild(iconQuantite);
                    
                    resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]} `;
                    // pour afficher l'icone meme si texContent change
                    const iconStock = document.createElement("i");
                    iconStock.className = "fa-solid fa-warehouse";
                    resultatRecherche.appendChild(iconStock);
                    


                    // Réinitialise les champs
                    document.getElementById("champ-fruit-retrait").value = "";
                    document.getElementById("champ-quantite-retrait").value = "";

                    alert("Fruit retiré du stock !");
                    mettreAJourAffichageStock();
                } else {
                    alert("Quantité insuffisante ou fruit non trouvé.");
                }
            } else {
                alert("Veuillez remplir tous les champs correctement.");
            }
        });

        // btn vider le stock
        boutonVider.addEventListener("click", () => {
            if (confirm("Êtes-vous sûr de vouloir vider le stock ?")) {
                localStorage.removeItem("stock");
                mettreAJourAffichageStock();
                alert("Stock vidé !");
            }
        });

        // Afficher le résultat de la selection dans le selecteur
        selecteurFruit.addEventListener("change", () => {
            const fruit = selecteurFruit.value;
            const stock = recupererStock();
            if (fruit) {
                resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]}`;
                document.getElementById("champ-fruit").value = fruit;
                document.getElementById("champ-fruit-retrait").value = fruit;
                
                sortieNom.innerHTML = `<i class="fa-solid fa-apple-whole" ></i>`;
                sortieQuantite.innerHTML = `<i class="fa-solid fa-basket-shopping" ></i>`;

                // pour afficher l'icone meme si texContent change
                const iconStock = document.createElement("i");
                iconStock.className = "fa-solid fa-warehouse";
                resultatRecherche.appendChild(iconStock);
            } else {
                resultatRecherche.textContent = "";
                document.getElementById("champ-fruit").value = "";
                document.getElementById("champ-fruit-retrait").value = "";
                sortieNom.innerHTML = `<i class="fa-solid fa-apple-whole" ></i>`;
                sortieQuantite.innerHTML = `<i class="fa-solid fa-basket-shopping" ></i>`;
                resultatRecherche.innerHTML = `<i class="fa-solid fa-warehouse" ></i>`;
            }
        });

        // Initialiser l'affichage du stock
        mettreAJourAffichageStock();

        ////

        let suggestion = document.getElementById('suggestion')
        suggestion.innerHTML = "";

        let input = document.getElementById('recherche')


        input.addEventListener('input', () => {

            

            let inputValue = input.value.trim().toLowerCase();
            let recup = Object.keys(recupererStock())
            let filtre = recup.filter((e) => e.toLocaleLowerCase().includes(inputValue));

            let suggestionUl = document.createElement("ul")
            suggestion.innerHTML = "";

            filtre.forEach(el => {
                if (inputValue !== "") {
                    let suggestionLi = document.createElement("li");
                    suggestionLi.textContent = el;

                    suggestionUl.appendChild(suggestionLi);
                } else {
                    suggestion.innerHTML = "";
                } 
                
                });
                
                suggestion.appendChild(suggestionUl);
        })

        ///

        let suggestionA = document.getElementById('suggestionA')
        suggestionA.innerHTML = "";

        let inputA = document.getElementById('rechercheA')


        inputA.addEventListener('input', () => {

            

            let inputValue = inputA.value.trim().toLowerCase();
            let recup = Object.keys(recupererStock())
            let filtre = recup.filter((e) => e.toLocaleLowerCase().includes(inputValue));

            let suggestionUl = document.createElement("ul")
            suggestionA.innerHTML = "";

            filtre.forEach(el => {
                if (inputValue !== "") {
                    let suggestionLi = document.createElement("li");
                    suggestionLi.textContent = el;

                    suggestionUl.appendChild(suggestionLi);
                } else {
                    suggestionA.innerHTML = "";
                } 
                
                });
                
                suggestionA.appendChild(suggestionUl);
        })


        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                document.querySelector('.en-tete').classList.add('scroll');
            } else {
                document.querySelector('.en-tete').classList.remove('scroll');
            }
        });

        //Btn BtoT
        const btnRtH = document.querySelector('.back-to-top')
        // Apparition du bouton en fonction du défilement
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
            btnRtH.style.display = "block";
            } else {
            btnRtH.style.display = "none";
            }
        });

        // Remonter en haut au clic
        btnRtH.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        suggestion.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'LI') {
                const clickText = ev.target.textContent;
                document.getElementById("champ-fruit").value = clickText;
                document.getElementById("champ-fruit-retrait").value = clickText;
                suggestion.innerHTML = "";
                input.value = "";

                const stock = recupererStock(); 
                const fruit = clickText;
                resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]}`;
            }
        });

            // Cacher la suggestion au clic sur la page 
            document.addEventListener('click', (eve) => {
                if (!suggestion.contains(eve.target) && eve.target !== input) {
                    suggestion.innerHTML = "";
                }
            });

            ///

            suggestionA.addEventListener('click', (ev) => {
                if (ev.target.tagName === 'LI') {
                    const clickText = ev.target.textContent;
                    document.getElementById("champ-fruit").value = clickText;
                    document.getElementById("champ-fruit-retrait").value = clickText;
                    suggestionA.innerHTML = "";
                    inputA.value = "";
    
                    const stock = recupererStock(); 
                    const fruit = clickText;
                    resultatRecherche.textContent = `Stock total de ${fruit} : ${stock[fruit]}`;
                }
            });
    
                // Cacher la suggestion au clic sur la page 
                document.addEventListener('click', (eve) => {
                    if (!suggestion.contains(eve.target) && eve.target !== input) {
                        suggestion.innerHTML = "";
                    }
                });
                // Cacher la suggestionA au clic sur la page 
                document.addEventListener('click', (eve) => {
                    if (!suggestionA.contains(eve.target) && eve.target !== input) {
                        suggestionA.innerHTML = "";
                    }
                });

        const burgerIcon = document.getElementById('menuBurgerIcon');
        const navMenu = document.getElementById('navMenuBurger');
        
        burgerIcon.addEventListener('click', function() {
            // Bascule la classe active pour l'animation de l'icône
            this.classList.toggle('active');
            
            // Bascule l'ouverture/fermeture du menu
            navMenu.classList.toggle('ouvert');
        });


        
        

});
    

    

