
var nb_a_tirer = 6; // combien de nombres à tirer aléatoirement
var cible = 2; // valeur cible
var nbres_dispos = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 75, 100); // nombres dispos pour tirage aléatoire
var operations_encours = new Array();
var best_operations = new Array();
var best_distance;
var best_nb_op;
var nbres_aleas = new Array(6,3,50,50,50,500); // tableau des nombres tirés pour calcul
var operateurs = new Array('+','*','-','/');
var compteur = 0;
var resultat = '';

// tirage d'un nombre cible aléatoirement
function nombre_cible_aleatoire() {
 cible = 100 + Math.floor(900*Math.random());
 document.forme.nbcible.value = cible;
}
// tirage des nombres pour le calcul
function nombres_aleatoires() {
 var texte = '';
 for(i=0;i<nb_a_tirer;i++)
 {
 b = 1 + Math.floor((nbres_dispos.length)*Math.random());
 texte = texte + '   ' + nbres_dispos[b-1];
 nbres_aleas[i] = nbres_dispos[b-1];
 }
 document.forme.nbalea.value = texte;
}
// calcule de 2 nombres n1 et n2 avec 1 des 4 opérateurs
function calcule(n1, n2, op){
 compteur = compteur + 1;
 var res;
 if(op == '+'){
  res = n1 + n2;
  operations_encours.push(n1+ op + n2 + '=' + res);
  return res;
 }
 if(op == '-') {
  if(n1 > n2)
  {
   res = n1 - n2;
   operations_encours.push(n1 + op + n2 + '=' + res);
   return res;
  }
  else
  {
   res = n2 - n1;
   operations_encours.push(n2 + op + n1 + '=' + res);
   return res;
  }
 }
 if(op == '*')
 {
  res = n1 * n2;
  operations_encours.push(n1 + op + n2 + '=' + res);
  return res;
 }
 if(op == '/')
 {
  if(n1 >= n2){
   res = Math.floor(n1 / n2);
   if(res * n2 != n1) res = 0;
   operations_encours.push(n1 + op + n2 + '=' + res);
   return res;
  }
  else
  {
   res = Math.floor(n2 / n1);
   if(res * n1 != n2) res = 0;
   operations_encours.push(n2 + op + n1 + '=' + res);
   return res;
  }
 }
}
function go(){
 // réinitialisation des variables
 compteur = 0;
 best_distance = cible;
 best_nb_op = nb_a_tirer;
 operations_encours = new Array();
 best_operations = new Array();
 resultat = '';
 recherche_arbre(nbres_aleas);  // recherche récursive
 if(best_distance ==0) resultat = resultat + "Le compte est bon ! \n";
 else resultat = resultat + "Le compte n est pas bon ! \n";
 affiche(compteur,best_operations);
 document.forme.go.value = resultat;
}
function recherche_arbre(tab){
 var nb_nombres = tab.length;
 var i,j,p;
 //if(nb_nombres<=best_nb_op){
 for(i=0;i<nb_nombres-1;i++) {
  for(j=i+1;j<nb_nombres;j++){
   for(p=0;p<4;p++){
    res = calcule(tab[i],tab[j],operateurs[p]); // on calcule et on empile
    if(res!=0){
    compare(res);
    var tab2 = new Array();
    tab2.push(res);
    for(k=0;k<nb_nombres;k++) if(k!=i && k!=j) tab2.push(tab[k]);
    if(tab2.length>1 && operations_encours.length<best_nb_op-1) recherche_arbre(tab2);
    }
    operations_encours.pop(); // on dépile
   }
  }
 }
}

function compare(n){
 if(n==cible && operations_encours.length<best_nb_op){
  best_distance = 0;
  best_nb_op = operations_encours.length;
  copie_vers_best_operations();
  //resultat = 'Le compte est bon ! \n';
  //affiche(compteur,operations_encours);
  //break;
 }
 else{
  if(best_distance !=0){
   var distance = Math.abs(n-cible);
   if(distance < best_distance){
    best_distance = distance;
    copie_vers_best_operations();
   }
  }
 }
}
function copie_vers_best_operations(){
 for(i=0;i<operations_encours.length;i++) best_operations[i] = operations_encours[i];
 for(i=operations_encours.length;i<nb_a_tirer-1;i++) best_operations[i] = '';
}
function affiche(nb_operations, tab_operations){
 resultat = resultat + 'Profondeur de recherche : ' + nb_operations + '\n';
 var i;
 for(i=0;i<tab_operations.length;i++){
  resultat = resultat + tab_operations[i] + '\n';
 }
 document.forme.go.value = resultat;;
}
