
from django.urls import path, include
from .views import issues, IssueView, issue_list_by_epic
from rest_framework import routers

# Create your URLConf here.

router = routers.DefaultRouter()
router.register('', IssueView, 'issues-api')
# router.register('', IssueView, 'issues-api-')

urlpatterns = [
	# this is the /issues url
    path('s', issues),
    path('/api/issues/', include(router.urls)),
    path('/api/issues/epic/<int:epic>', issue_list_by_epic)
]
