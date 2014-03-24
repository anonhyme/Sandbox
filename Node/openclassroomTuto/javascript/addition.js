function addition()
{
	var nb = addition.arguments;
	var somme = 0;
	for(var i = 0; i< nb.length; i++)
		somme += nb[i];
	return somme
};


	alert( addition(1,2,3,4,5,6) );
	alert( addition(10,10,10,10,10) );


// exemple 
