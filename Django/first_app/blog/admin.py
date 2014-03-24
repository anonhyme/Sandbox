from django.contrib import admin
from blog.models import Categorie, Article
from blog.forms import ContactForm
class ArticleAdmin(admin.ModelAdmin):
   list_display   = ('titre', 'auteur', 'date', 'apercu_contenu',)
   list_filter    = ('auteur','categorie',)
   fieldsets = (
   	('General', {
   		'classes':['collapse', 'extrapretty' ],
   		'fields': ('titre', 'slug', 'auteur', 'categorie')
   		}),
   	('Contenu de l\'article', {
   		'description': u'Le formulaire accepte les balises HTML. Utilisez-les a bon escient !',
   		'fields': ('contenu', )
   		}),
   	)
   prepopulated_fields = {'slug': ('titre', ), }
   ordering       = ('date', )
   search_fields  = ('titre', 'contenu')

   def apercu_contenu(self, article):
   	"""
   	retourne les 40 premiers caractere du contenu de l;article. S'il y
   	a plus de 40 caracteres, il faut ajouter des point de suspension.
   	"""
   	text = article.contenu[0:40]
   	if len(article.contenu) > 40: 
   		return '%s...' % text
   	else:
   		return text
   	apercu_contenu.short_description = u"apercu du contenu"


admin.site.register(Categorie)
admin.site.register(Article, ArticleAdmin)
