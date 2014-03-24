//javascript{startTime=new Date().getTime(); startTime;}

// generation nbr a trouver
function nbrAleatoire(min, max)
{
	var nb = min + (max-min+1)*Math.random();
	alert("(max-min+1) = " + (max-min+1))
	alert("Math.random() = " + Math.random())
	alert("max = " + max)
	alert(nb);
	return Math.floor(nb);
}

function find(nbr, min, max)
{
	var tmp = 0;
	var result;
	//startTime=new Date().getTime(); 
	//startTime;

	while(tmp != nbr )
	{
		alert("[nbr, min, max] = " +"[" + nbr +", "+ min +", "+ max + "]")

		tmp = Math.floor(min+((max-min)/2));
		if(nbr < tmp)
		{
			alert(nbr + "< " + tmp);
			min = min;
			max = tmp;
		}
		else if(nbr > tmp)
		{
			alert(nbr + " > " + tmp);
			min = tmp;
			max = max;
		}


	}
	 return result;
	// tmp = min+((max-min)/2)
	// si plus petit on min = min et max = tmp


}

function start()
{
	var min = prompt("entrer le nbr min");
	var max = prompt("entrer le nbr max");

	
	startTime=new Date().getTime(); 
	startTime;
	
	var nbToFind = nbrAleatoire(min,max);
	alert("nbr aleatoire : " + nbToFind);
	var tmp;
	tmp = find(nbToFind,min,max);

	stopTime=new Date().getTime();
	
	var result = (stopTime-startTime);
	alert("time: " + result);
}