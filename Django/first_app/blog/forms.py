#-*- coding: utf-8 -*-
from django import forms
from models import Article

class ArticleForm(forms.ModelForm):
	class Meta:
		model = Article

class ContactForm(forms.Form):
    Sujet		= forms.CharField(max_length=100)
    message 	= forms.CharField(widget=forms.Textarea)
    envoyeur 	= forms.EmailField(label=u"Votre adresse mail")
    renvoi 		= forms.BooleanField(help_text=u"Cochez si vous souhaitez obtenir une copie du mail envoye.", required=False)
