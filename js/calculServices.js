// ensemble des services

// variable du jeu

// nombres disponible pour tirage aléatoire
// var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
// Nombres à tirer aléatoirement

var game = function(operationsNumber, operatorsLevel)
{
	var numbersList = [];
	var valeurCourante = 0;
	var operationsList = [];
	for (var i=0; i<=operationsNumber; i++)
	{
		// numbersList.push(Math.ceil(Math.random() * 10));
		function randomValeur() 
		{
			return Math.ceil(Math.random() * 10);
		}	
		function figureOp(number){
			var opepes=["+","-","*","/"];
			return opepes[number];
		}

		function presenterSolution(){
			var k=0;
			var resultat=operationsList[0];
			var varGauche;
			for (var i = 0; i < operationsNumber; i++) {
				varGauche=resultat;
				switch (operationsList[i]) {
					case 0:
					
					resultat += numbersList[i+1];
					break;
				case 1:
					
					
					resultat -= numbersList[i+1];
					break;
				case 2:
					
					resultat *= numbersList[i+1];
					break;
				case 3:

					resultat /= numbersList[i+1];
					break;
				}
				console.log(varGauche+figureOp(operationsList[i])+numbersList[i+1]+" = "+resultat);
			}
			

		}

		valeurCourante=randomValeur();

		if (i === 0)
		{
			numbersList.push(valeurCourante);
			var result = valeurCourante;
		}
		else
		{
			// randomOperation - retourne le choix de l'opérateur
			randomOperation = Math.floor(Math.random() * operatorsLevel);
			operationsList.push(randomOperation);

			switch(randomOperation)
			{
				case 0:
					
					result += valeurCourante;
					break;
				case 1:
					while ((result - valeurCourante) <= 0)
					{
						valeurCourante = randomValeur();
					}
					
					result -= valeurCourante;
					break;
				case 2:
					
					result *= valeurCourante;
					break;
				case 3:
					
					while (result%valeurCourante !=0)
					{
						valeurCourante = randomValeur();
					}
					
					result /= valeurCourante;
					break;
			}
			numbersList.push(valeurCourante);
		}
		
		
	}
	presenterSolution();

	return {
		numbersList: numbersList,
		operationsList: operationsList,
		result: result
	}
}	

 console.log(game(4,4));

// Structure
// Le construceur initialise la partie
// operatorsLevel:
// 1: +
// 2: +, -
// 3: +, -, *
// 4: +, -, *, /
// operationsNumber
// nombre d'opération totale
/* var game = function(operationsNumber, operatorsLevel)
{
	var numbersList = [];
	var operationsList = [];
	for (var i=0; i<operationsNumber; i++)
	{
		numbersList.push(Math.ceil(Math.random() * 10));


		if (i === 0)
		{
			var result = numbersList[i];
		}
		else
		{
			// randomOperation - retourne le choix de l'opérateur
			randomOperation = Math.floor(Math.random() * operatorsLevel);
			operationsList.push(randomOperation);

			switch(randomOperation)
			{
				case 0:
					result += numbersList[i];
					break;
				case 1:
					while ((result - numbersList[i]) <= 0)
					{
						numbersList.push(Math.ceil(Math.random() * 10));
					}
					result -= numbersList[i];
					break;
				case 2:
					result *= numbersList[i];
					break;
				case 3:
					
					while ((result / numbersList[i];) < 2)
					{
						numberList.push(Math.ceil(Math.random() * 10))
					}
					result /= numbersList[i];
					break;
			}
		}
	}

	return {
		numbersList: numbersList,
		operationsList: operationsList,
		result: result
	}
*/

// mettre dans une function l'ensemble des nombre aléatoire