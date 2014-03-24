from django.conf.urls import patterns, include, url



urlpatterns = patterns('miseEnForme.views',
    # Examples:
    # url(r'^$', 'django_bootstrap.views.home', name='home'),
    url(r'^$', 'home'),
    #url(r'^login/$', 'login')
)