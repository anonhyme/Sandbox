#-*- coding: utf-8 -*-
from datetime import datetime
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.shortcuts import redirect, render


from blog.models import Article

def home(request):
    """ Afficher tous les articles de notre blog """
    articles = Article.objects.all() # Nous sélectionnons tous nos articles
    return render(request, 'blog/home.html', {'derniers_articles':articles})

def lire(request, id):
    """ Afficher un article complet """
    # methode longue
    article = "article"
    try:
        article = Article.objects.get(id=id)
    except Article.DoesNOtExist:
        raise Http404

    return render(request, 'blog/lire.html', locals())


def view_article(request, id_article):
	if int(id_article) > 100:
		#raise Http404
		return redirect(view_redirect)
	else:
		text = "Vous avez demandé l'article n°{0} !".format(id_article)
		return HttpResponse(text)


def list_articles(request, month, year):
    """ Liste des articles d'un mois précis. """

    text = "Vous avez demandé les articles de {0} {1}.".format(month, year)
    return HttpResponse(text)

# Redirection
def view_redirect(request):
	return HttpResponse(u"You've been redirected !")

def tpl(request):
	return render(request, 'blog/example.html', {'current_date': datetime.now()})

def addition(request, nbr1, nbr2):
	total = int(nbr1) + int(nbr2)
	return render(request, 'blog/addition.html', locals())

def tpl2(request):
    sexe = "Monsieur"
    html   = "Bonjour "
    if sexe == "Femme":
        html += "Madame"
    if sexe == "Monsieur":
    	html += "Monsieur"

    html += " !"
    return HttpResponse(html)

def for_loop(request):
    couleurs = ['rouge', 'orange', 'jaune', 'vert', 'bleu', 'indigo','violet']
    return render(request, 'blog/example.html', locals())

def for_loop2var(request):
    current_date = "10h10"
    return render(request, 'blog/extends_base.html', locals())