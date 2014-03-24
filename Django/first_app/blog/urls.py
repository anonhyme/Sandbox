from django.conf.urls import patterns, url


urlpatterns = patterns('blog.views',

    url(r'^$', 'home'),
    url(r'^article/(?P<id>\d+)$', 'lire'),
    url(r'^contact/$', 'contact'),
    url(r'^articleform/$', 'articleform')

)



#   url(r'^$', 'tpl'),
#   url(r'^bonjour/$', 'tpl2'),
#   url(r'^addition/(?P<nbr1>\d+)/(?P<nbr2>\d+)/$', 'addition'),
#   url(r'^article/(\d+)/$', 'view_article'), # Vue d'un article
#   url(r'^articles/(\d{4})/(\d{2})/$', 'list_articles'), # articles/<year>/<month>
#   url(r'^redirection/$', 'view_redirect'),
#   url(r'^forloops/$', 'for_loop'),
#   url(r'^forloops2vars/$', 'for_loop2var'),