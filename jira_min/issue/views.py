from django.shortcuts import render
from rest_framework import viewsets

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
