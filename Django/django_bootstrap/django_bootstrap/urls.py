from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_bootstrap.views.home', name='home'),
    url(r'^miseEnForme/', include('miseEnForme.urls')),
    url(r'^admin/', include(admin.site.urls)),
)


