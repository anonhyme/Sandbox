from blog.forms import ContactForm, ArticleForm
#-*- coding: utf-8 -*-

from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.shortcuts import redirect, render

from blog.models import Article

def home(request):
    """ Afficher tous les articles de notre blog """
    articles = Article.objects.all() # Nous sélectionnons tous nos articles
    return render(request, 'blog/homebootstrap.html', {'derniers_articles':articles})

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



def contact(request):
    if request.method == 'POST':  # S'il s'agit d'une requete POST
        form = ContactForm(request.POST)  # Nous reprenons les donnees

        if form.is_valid(): # Nous verifions que les donnees envoyees sont valides

            # Ici nous pouvons traiter les donnees du formulaire
            Sujet = form.cleaned_data['Sujet']
            message = form.cleaned_data['message']
            envoyeur = form.cleaned_data['envoyeur']
            renvoi = form.cleaned_data['renvoi']

            # Nous pourrions ici envoyer l'e-mail grace aux donnees que nous venons de recuperer

            envoi = True

    else: # Si ce n'est pas du POST, c'est probablement une requete GET
        form = ContactForm()  # Nous creons un formulaire vide

    return render(request, 'blog/contact.html', locals())
def articleform(request):
    if request.method == 'POST':  # S'il s'agit d'une requete POST
        form = ArticleForm(request.POST)  # Nous reprenons les donnees

        if form.is_valid(): # Nous verifions que les donnees envoyees sont valides

            # Ici nous pouvons traiter les donnees du formulaire
            #titre       = form.cleaned_data['titre']
            #slug        = form.cleaned_data['slug']
            #auteur      = form.cleaned_data['auteur']
            #contenu     = form.cleaned_data['contenu']
            #date        = form.cleaned_data['date']
            #categorie   = form.cleaned_data['categorie']
            #Sujet = form.cleaned_data['Sujet']
            #message = form.cleaned_data['message']
            #envoyeur = form.cleaned_data['envoyeur']
            #renvoi = form.cleaned_data['renvoi']

            # Nous pourrions ici envoyer l'e-mail grace aux donnees que nous venons de recuperer

            envoi = True
            form.save()

    else: # Si ce n'est pas du POST, c'est probablement une requete GET
        form = ArticleForm()  # Nous creons un formulaire vide
    
    return render(request, 'blog/articleform.html', locals())