
from django.urls import path, include
from .views import issues, IssueView
from rest_framework import routers

# Create your URLConf here.

router = routers.DefaultRouter()
router.register('', IssueView, 'issues-api')

urlpatterns = [
	# this is the /issues url
    path('s', issues),
    path('/api/issues/', include(router.urls))
]
