function ligne(premier,operateur,deuxieme){
	this.premier=premier;
	this.operateur=operateur;
	this.deuxieme=deuxieme;
	this.resultat;
	this.calcule= function()
	{
		
		// operateurs + - * /
		switch (this.operateur){

			case '+': this.resultat=this.premier+this.deuxieme; break;
			case '-': this.resultat=this.premier-this.deuxieme; break;
			case '*': this.resultat=this.premier*this.deuxieme; break;
			case '/': this.resultat=this.premier/this.deuxieme; break;
			default: this.resultat=-1;

		}
		return this.resultat;
	}
	this.correct=function()
	{
		if ($.inArray(this.operateur,['+','-','*','/'])!=-1   // test opérateur est correct
			&& this.deuxieme!=0 ) 
		{
			if (this.operateur=='+' || this.operateur=="*" 
				|| (this.operateur=="-"&&(this.premier>this.deuxieme))  // interdit un résultat négatif
				|| (this.operateur=="/"&&(this.premier%this.deuxieme==0))  // le reste de la division doit etre nul
				)
				return true;
			else return false;
		} 
		else return false; 
	}

}

var jeu=new Array(); // le jeu à trouver
var maSolution=new Array(); // solution du joueur
var plaques=[1,2,3,4,5,6,7,8,9,10];
var jeuPlaques=[]; // tableau des plaques
var nbErreurs=0; // nombre d'erreurs du joueur

// vérifie que la valeur n'existe pas dans le tableau
function checkClone(tableau,valeur){
	var constat=false;
	var k=0;
	
	if (tableau.length > 0) {
		while (k<tableau.length && !constat)
		{
			
			if (valeur == tableau[k]) constat=true;
			k++;
		}
	}
	return constat;
}


// génère un nombre de plaques aléatoires 
function randomPlaques(number)
{ 

	var tabPlaques=[];
	var plaque,testOne;
	for (var i=0;i<number;i++)
	{
		testOne=false;
		while (!testOne)
		{
		plaque=plaques[Math.floor(Math.random()*10)];
		testOne=!checkClone(tabPlaques,plaque);
		}
		tabPlaques.push(plaque);
		

	}
return tabPlaques;
}

// affiche le jeu sur la page HTML et prépare le tableau du joueur
function afficherJeu(level)
{
	console.log("jeu généré de niveau"+level);
	for (var i=0;i<jeu.length;i++)
	{
		console.log(jeu[i].premier+' '+jeu[i].operateur+' '+jeu[i].deuxieme+" = "+jeu[i].resultat);
	}
	console.log('la solution');
	for (var i=0;i<jeu.length;i++) {
		maSolution.push(new ligne(jeu[i].premier,jeu[i].operateur,0));
		maSolution[i].resultat=jeu[i].resultat;
		console.log(maSolution[i].premier+' '+maSolution[i].operateur+' '+maSolution[i].deuxieme+" = "+maSolution[i].resultat);
	}

	// remplacer les valeurs html
	for (var j = 1; j <5 ; j++) {
		
		$("#firstN"+j).html(maSolution[j-1].premier);

		$("#operateur"+j).html(maSolution[j-1].operateur);
		if (j>1) $("#second"+j).html(""); else $("second1").html(maSolution[0].deuxieme);
		$("#result"+j).html(maSolution[j-1].resultat);

	};
	
	for (var i = 1; i < jeuPlaques.length; i++) {
		$('#Pickaxe'+(i+1)).text(jeuPlaques[i]);
	};

}

// génère un opérateur aléatoire en fonction de la difficulté
function randomOper(difficulte)
{
	var operators=['+','-','*','/'];
	var indexAlea=Math.floor(Math.random()*difficulte);
	return operators[indexAlea];
}

// vérifie que les chiffres associés à l'opérateur aboutissent à une opération correcte
function choixOper(chif1,chif2,niveau){
	var ok=false;
	var opera;
	while (!ok)
	{
		opera=randomOper(niveau);
		if (opera=="+" || opera=="*" || chif1>chif2 || chif1%chif2==0) ok=true;
	}
	return opera;
}


// génération du jeu
function genererJeu(level){
	var opers;
	var soluce;
	jeuPlaques=randomPlaques(5);
	jeu=[];
	opers=choixOper(jeuPlaques[0],jeuPlaques[1],level);
	jeu.push(new ligne(jeuPlaques[0],opers,jeuPlaques[1]));
	jeu[0].calcule();
	for (var i=0;i<(jeuPlaques.length-2);i++)
	{
		soluce=jeu[i].resultat;
		opers=choixOper(soluce,jeuPlaques[i+2],level);

		
		//console.log(soluce+opers+jeuPlaques[i+2]+" = ");
		jeu.push(new ligne(soluce,opers,jeuPlaques[i+2]));
		jeu[i+1].calcule();
		
	}

	console.log(jeuPlaques);
	afficherJeu(1);

}

// teste que le jeu est terminé
function testFin(){
	var erreurs=0;
	

	for (var i = 0; i <jeu.length; i++) {
		
		if (!(maSolution[i].deuxieme==jeu[i].deuxieme 
			&& maSolution[i].correct() 
			&& maSolution[i].resultat==jeu[i].resultat
			)) 
		
			erreurs++;
		
	};
	if (erreurs==0) alert("vous avez gagné avec "+nbErreurs+" coups ratés!"); else console.log(erreurs+' manques');

}


//genererJeu(1);
genererJeu(3);
$('.mobile').draggable({
	revert: 'invalid'  // revient à la position de départ si on a n'a pas droppé dans la bonne case
});

$('.enigme').droppable({
	accept:'.mobile',
	drop: function(event,ui)
	{
		//console.log("drop réussi");
		var idBoiteDrop=$(this).attr('id');
		
				
		// console.log($(this).attr('id'));
		var largue=ui.draggable.attr('id'); // id de la plaque apposée
		var nolig=idBoiteDrop.charAt(idBoiteDrop.length-1)-1; // N° de ligne du jeu
		console.log('numéro de ligne '+nolig);
		var monChoix=$("#"+largue).text(); // valeur de la plaque
		maSolution[nolig].deuxieme=parseInt(monChoix);
		if (monChoix==jeu[nolig].deuxieme) 
		{
			$("#"+largue).hide();  // cacher la plaque droppée
			$("#"+idBoiteDrop).text(monChoix); // afficher le nombre dans la div associée
			maSolution[nolig].calcule(); 
			
			console.log(maSolution);
			testFin();
		}
		else
		{
			alert("mauvaise saisie recommence !");
			$('#'+largue).draggable("option","revert",true);
			nbErreurs++;
		}	

		console.log(monChoix);
		


	}
});
// activer ou non les opérateurs 
$('.operateur').draggable({
	revert: 'invalid'
});
$('.operator').droppable(
{
	accept:".operateur",
	drop: function(event,ui)
	{
		console.log('opérateur droppé');
	}
}
	);