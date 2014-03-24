from django.db import models

class Categorie(models.Model):
	nom = models.CharField(max_length=30)
	def __unicode__(self):
		return self.nom

class Article(models.Model):
	titre	= models.CharField(max_length=100)
	slug = models.SlugField(max_length = 100)
	auteur	= models.CharField(max_length=42)
	contenu	= models.TextField(null=True)
	date	= models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Date de sortie")
	categorie = models.ForeignKey('Categorie')
	def __unicode__(self):
		"""
    	Cette methode que nous definirons dans tous les modeles
    	nous permettra de reconnaitre facilement les differents objets que nous
    	traiterons plus tard et dans l'administration
        """
        	return self.titre
