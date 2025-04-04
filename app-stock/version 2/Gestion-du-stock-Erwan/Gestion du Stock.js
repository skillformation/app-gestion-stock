/*API de stockage web nous permet de stocker des données localement côté client.
taille maximale doit être inférieure ou égale à 5Mo
Les données ne sont ni transmises ni renvoyées au serveur à un moment donnée si vous utilisez API de stockage WEB.
Il sera toujours disponible localement dans un fichier. */

class Stock{
  constructor(){
     /*La méthode getItem() avec la clé(fruit),renvoie la valeur de cette clé,ou si la clé n'existe pas,dans l'objet dnné renvoie null */
   let fruit=localStorage.getItem("fruit");
   if(fruit==null){
       //revoie un tableau vide
       this.fruit=[];
   }else{
       /*JSON.parse() analyse une chaine de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaine.*/
       this.fruit=JSON.parse(fruit);
   };
  };

  //Methode savegardeFruit() sauvegarde sur la clé fruit.
  sauvegardeFruit(){
    /*La sérialisation est une opération qui consiste à transformer une variable composite(objet,tableau) en une variable scalaire(chaine de caractère)
    En js, il est possible de sérialiser des objets au format JSON(Methode stringify) */
    /*La méthode setItem() de l'interface Storage permet de passe la clé(fruit)/valeur(enregistrement fruit),les ajoute a l'emplacement de stockage,
    et met à jour la valeur si la clé existe déja.le storage prend uniquement en charge le stockage et la récupération des chaines pour se faire je sérialise la variable composite a l'aide de JSON.stringify(). */
    localStorage.setItem("fruit",JSON.stringify(this.fruit));
  };

  //Methode ajouterFruit ajoute un fruit
  ajouterFruit(produit,qt){
    /*rechFruit par find qui renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passé en argument.Sinon,la valeur undefined est renvoyée. */
    let rechFruit=this.fruit.find(l=>l.id==produit.id)
    if(rechFruit!=undefined){
      rechFruit.quantite=Math.floor(rechFruit.quantite)+Math.floor(qt);
    }else{
      //ajouter fruit dans la clé fruit
      this.fruit.push(produit); 
    };
    /*savegarde sur la clé fruit*/
    this.sauvegardeFruit();
  };

  retireFruit(produit,qt){
    let rechFruit=this.fruit.find(e=>e.id==produit.id);
    if(rechFruit!=undefined){
      rechFruit.quantite=Math.floor(rechFruit.quantite)-Math.floor(qt);
    };
    this.sauvegardeFruit();           
  };

  //Afficher le stock
  AfficherStock(){
    //Vider le select
    const selectElement=document.getElementById("selecteur-fruit")
    selectElement.innerHTML=''

    //Récupérer la liste depuis le localStorage
    var storedNames = JSON.parse(localStorage.getItem('fruit'));

    // Vérifier si des données sont présentes dans le localStorage
    if (storedNames && storedNames.length > 0) {
      // Boucler sur chaque élément de la liste et l'ajouter à option
      storedNames.forEach(function(name){
        var option = document.createElement("option");
        var x = document.getElementById("selecteur-fruit");
        option.text = `nom : ${name.nom}  quantité : ${name.quantite} `;
        x.appendChild(option);
      }); 
    };
  };


  recherche(valeurInput){
    let inputValeur=valeurInput.toLowerCase();
    const rec=this.fruit;
    let a=rec.map(e=>e.nom)
    const result = a.filter((e) => e.includes(`${inputValeur}`));
    result.forEach(function(e){
      let pElement=document.getElementById("a");
      let p=document.createElement("li")
      p.textContent=`${e}`;
      pElement.appendChild(p)
   })
 }
}

$('#v').on("input",function(){
  let valeur=$("#v").val();
  let stock=new Stock()
  let liste=stock.recherche(valeur)
})

//Au chargement de l'application 
$(document).ready(function() {

  let stock=new Stock()
  stock.AfficherStock();
   
   $("#bouton-valider").on("click",function(){
    let id=$("#champ-id").val();
    let nom=$("#champ-fruit").val();
    let qt=$("#champ-quantite").val();
    
    //Ajouter fruit dans le stock
    let fruit=new Stock();
    fruit.ajouterFruit({id:`${id}`,nom:`${nom}`,quantite:`${qt}`},qt)
       
    /*Interface et affichage Output*/

   //id element p 1
    $("#sortie-Nom").text(function() {
        return `Nom : ${nom}`;
    });

   //id element p 2
    $("#sortie-Qte").text(function() {
        return `quantité : ${qt}`;
    });

    //affiche le stock
    let stock=new Stock()
    stock.AfficherStock();
 }); 

/*Attache evenement de changement à la selection qui récupère le texte de chaque option sélectionnée et les écrit dans span (id resultat-recherche).Il déclanche ensuite l'événement pour le texte initial*/
$( "select" ).on("change", function() {
    var str = "";
    $( "select option:selected" ).each( function() {
      str += $(this).text() + " ";
    } );
    $( "#resultat-recherche" ).text( str );
  } )
  .trigger( "change" );

$("#bouton-retrait").on("click",function(){
    let qt_rt=$("#champ-quantite-retrait").val();
    let id=$("#champ-id-retrait").val();
    
    //retirer Quantité fruit
    let fruit=new Stock();
    fruit.retireFruit({id:`${id}`},qt_rt)
    
    //Afficher le stock
    let stock=new Stock()
    stock.AfficherStock();
});
});


       






 

 