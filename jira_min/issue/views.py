from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import IssueSerializer
from .models import Issue

# Create your views here.

def issues(request):
    issue_list = Issue.objects.all()
    context = {'issues': issue_list}
    return render(request, 'issue/issues.ejs', context)

# api views here.

class IssueView(viewsets.ModelViewSet):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()

@api_view()
def issue_list_by_epic(request, epic):
    """
    List all issues under a certain epic
    """
    issues = Issue.objects.filter(epic=epic)
    serializer = IssueSerializer(issues, many=True)
    return Response(serializer.data)
