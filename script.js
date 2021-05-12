
// partie calculatrice

// Obtenir les touches du documents
var touches = document.querySelectorAll('#calculette span');

// Initialisation d'un tableau d'opérateurs.
var operateurs = ['/', 'x', '-', '+'];

// Flag : Une décimale a été ajoutée?
var decimaleAjoute = false;

/* 
 * Ajout dynamique d'une fonction sur les touches : 
 * - Un évênement on click sur toutes les touches qui permettra d'éfféctuer les opérations. 
 */
for(var i = 0; i < touches.length; i++) {
	touches[i].onclick = function(e) {
	
		// 1) Obtenir les valeurs des boutons et de l'écran.
		var ecran = document.querySelector('.ecran');
		var valeurEcran = ecran.innerHTML;
		var valeurBouton = this.innerHTML;
    
		// 2) Traitement des différents boutons et évaluation finale.
		
		// Touche "reset".
		if(valeurBouton == 'C') {
			
			// Reset écran et reset flag decimale.
			ecran.innerHTML = '';
			decimaleAjoute = false;
		
		// Touche "=".
		} else	if(valeurBouton == '=') {
      			
			// Initialisation de la variable de calcul par rapport
			// à l'affichage à l'écran.
			var calcul = valeurEcran;
			
			// Obtention du dernier caractère.
			var dernierCaractere = valeurEcran[valeurEcran.length - 1];
			
			// Dans notre variable de calcul : Remplacement de "x" par "*".
			calcul = calcul.replace(/x/g, '*');
			
			// Si le calcul se termine par un "." ou un opérateur, on enlève 
			// cet opérateur.
			if(operateurs.indexOf(dernierCaractere) > -1 
			|| dernierCaractere == '.') {
				calcul = calcul.replace(/.$/, '');
			}
			// Si il y a un calcul : utilisation de Eval pour que l'écran 
			// change de valeur.
      
			if(calcul) {
				ecran.innerHTML = eval(calcul);
			}
			decimaleAjoute = false;

		} else if (operateurs.indexOf(valeurBouton) > -1) {		 
			
						 
			// Obtention du dernier caractère de l'écran.
			var dernierCaractere = valeurEcran[valeurEcran.length - 1];
			
			// Ajout de l'opérateur seulement si l'écran n'a pas d'opérateur
			// comme dernier caractère.
			
			// Reset l'écran si l'écran vaut "-" et qu'on presse "+".
			if (valeurEcran == '-' 
			&& valeurBouton == '+') {
				ecran.innerHTML = '';
			} 
			// Ajout "-" si l'écran est vide et qu'on presse "-".
			else if (valeurEcran == ''
			&& valeurBouton == '-') {				
				ecran.innerHTML = valeurBouton;
			} 
			// Si il y a quelque chose dans l'écran et que ce n'est pas -
			else if (valeurEcran != '' 
			&& operateurs.indexOf(dernierCaractere) == -1) {
				ecran.innerHTML += valeurBouton;
			}
			
			// Si un opérateur existait déja à la fin, alors on le remplace
			// par le nouveau.
			if (operateurs.indexOf(dernierCaractere) > -1 
			&& valeurEcran.length > 1) {
			
				// Ici, '.$' signifie la fin de  la chaine de caractère,
				// donc n'importe quel caractère (qui sera un opérateur)
				// a la fin de l'écran vas être remplacé par le nouveau 
				// opérateur.
				ecran.innerHTML = valeurEcran.replace(/.$/, valeurBouton);
			}
			
			decimaleAjoute =false;
		
		} else if (valeurBouton == '.') {
		
			// maintenant, seulement le problème de décimale est restant. Nous
			// le resolvons en utilisant un flag quand la décimale est déja 
			// ajouté. Il sera reset quand un "=" or reset sera préssé.
			if(!decimaleAjoute) {
				ecran.innerHTML += valeurBouton;
				decimaleAjoute = true;
			}
		} else {
      
			// Si c'est une autre touche que égal, ajout à la suite de l'écran.		
			ecran.innerHTML += valeurBouton;
		}
		
		// Prevent page jumps
		e.preventDefault();
	} 
}





// Météo

var input = document.querySelector(".js-location");
var main = document.querySelector(".ville");
var temp = document.querySelector(".weather__temperature");
var desc = document.querySelector(".weather__description");
var button = document.querySelector(".btngo");
var time = document.querySelector(".location__time");

// ajout de l'heure sur le widget météo
var d = new Date (); 
var hours = d.getHours() + ":" + d.getMinutes();

time.innerHTML = hours;


input.addEventListener("keyup", function (event) {
if (event.keyCode === 13) {
event.preventDefault();
button.click();
}
});

// API météo
button.addEventListener("click", function () {
async function getMeteo() {
let response = await fetch(
"https://api.openweathermap.org/data/2.5/weather?q="+input.value+"&appid=cc212b34587e58bcefe64595e8fc8e88");
let data = await response.json();
return data;
}

getMeteo().then((data) => {
var tempValue = data["main"]["temp"];
var nameValue = data["name"];
var descValue = data["weather"][0]["description"];


main.innerHTML = nameValue;
desc.innerHTML = descValue;
temp.innerHTML = `Température: ${(tempValue - 273.15).toFixed(2)}°C`;
input.value = "";
time.innerHTML = timeValue;
input.classList.remove("error");
})

.catch((err) => input.classList.add("error"));
});


// partie convertisseur

var inputOptions = document.getElementById("units");
var input_num = document.getElementById("valeur");
var userInputChoice;
var outputOption = document.getElementById("units-result");
var userOutputChoice;
var grams;

function Convertor() {
            //transform to grams
            userInputChoice = inputOptions.options[inputOptions.selectedIndex].dataset.value;
            userOutputChoice = outputOption.options[outputOption.selectedIndex].dataset.value;
            grams = input_num.value * userInputChoice;
            //transform to wanted mesure
            document.getElementsByClassName("output")[0].textContent = (grams * userOutputChoice).toFixed(3);
            if(input_num.value.length <= 0){
                document.getElementsByClassName("output")[0].textContent = '';
            }
        }


        input_num.addEventListener('input', function () {
            Convertor();
        });
        inputOptions.addEventListener('change', function () {
            Convertor();
        })
        outputOption.addEventListener('change', function () {
            Convertor();
        })

 

