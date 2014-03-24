function conversion(taux)   // declaration de la fonction avec un argument
{
	var valeur = prompt("Entrez la valeur à convertir");
	if(isNaN(valeur))
		alert('Vous devez entrez un nombre')
		
	else
		var resultat = valeur * taux;   // on calcule le resultat, en utilisant l'argument
   		alert('Valeur  : '+valeur + '\nRésultat : '+resultat);
 
}
function count()
{
	var i;
	for(i=0; i<100; i++)
	{
		if(i*2 > 40)
			break;
		alert(2*i);
	}
}
function mklist()
{
	var data = '';
	var saisie = '';
	var texte = '<liste>\n';
	do
	{
		data += texte;
		saisie = prompt("Contenue de la liste");
		data += "<puce>" + saisie +"</puce>\n";
	}while(saisie)
	if (data == '<liste>\n')
		data = '';
	else
		data += "</liste>";
	
	alert(data);
	}
	
var operation = new Array();
operation["add"] = function(x,y){ return x+y; };
operation["soustr"] = function(x,y){ return x-y; };
operation["mult"] = function(x,y){ return x*y; };
operation["div"] = function(x,y){ return x/y; };
operation["moy"] = function(x,y){ return (x+y)/2; };
