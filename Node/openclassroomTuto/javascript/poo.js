

function verifemail(f)
{
	var str = document.getElementById(f).elements["email"].value
	var patt = new RegExp("[a-zA-Z0-9_]+@[a-zA-Z]+.com|org|net");
	var res = patt.test(str);
	var error = !res;
	surligne('email', error);
	return error

}

function verifpseudolength(f)
{
	//todo
	var error;
	var str = document.getElementById(f).elements["pseudo"].value;
	
	if(str.length < 2 || str.length > 25)
	{
		error = true;
	}
	else
	{
		error = false;
	}
	surligne('pseudo', error);
	return error

}
function verifage(f)
{
	//todo
	var error;
	var str = document.getElementById(f).elements["age"].value;

	if(str < 5 || str > 111)
	{
		error = true;
	}
	else
	{
		error = false;
	}
	surligne('age', error);
	return error

}
function verif(f)
{
	var email = verifemail(f);
	var pseudo = verifpseudolength(f);
	var age = verifage(f);
	if(email && pseudo && age)
		return true
	else
		return false


}

function voirSelection(liste)
{
     var numero = liste.selectedIndex;
     var valeur = liste.options[numero].value;
     alert("Vous avez choisi : " + valeur);
}
function getPseudo(entry)
{
	
	var champPseudo = entry.elements["pseudo"].value

	alert(champPseudo);
}
function getEmail(entry)
{
	
	var champEmail = entry.elements["email"].value
	surligne(champEmail,true);
	alert(champEmail);
}
function getAge()
{
	var monForm = document.getElementById("monform").elements["age"].value;
	//var champPseudo = entry.elements["pseudo"].value
	return monForm
	alert(monForm);
}

function surligne(elem, error)
{
	document.getElementById("test").innerHTML=elem + error;
	if(error)
		document.getElementById("monform").elements[elem].style.backgroundColor = "rgb(200,0,0)"
     else
     	document.getElementById("monform").elements[elem].style.backgroundColor = "rgb(0,200,0)";
}