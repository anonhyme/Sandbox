var conversion = function(taux)   // declaration de la fonction avec un argument
{
	var valeur = 23;
	
	if(isNaN(valeur))
		console.log('Vous devez entrez un nombre')
		
	else
		var resultat = valeur * taux;   // on calcule le resultat, en utilisant l'argument
   		console.log('Valeur  : '+valeur + '\nRésultat : '+resultat);
 return resultat
}
var count = function()
{
	var i;
	for(i=0; i<100; i++)
	{
		if(i*2 > 40)
			break;
		console.log(2*i);
	}
}
var mklist = function()
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
	
	console.log(data);
	}

exports.conversion = conversion;
exports.count = count; 
//exports.mklist = mklist;