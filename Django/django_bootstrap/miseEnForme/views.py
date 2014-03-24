from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404

def home(request):
	""" Afficher la page d'acceuil """
	return render(request, 'miseEnForme/home.html')