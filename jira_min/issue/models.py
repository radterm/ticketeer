from django.db import models

# Create your models here.

from epic.models import Epic


class Issue(models.Model):
    heading = models.CharField(max_length=200, unique=True)
    desc = models.TextField()
    epic = models.ForeignKey(
        Epic,
        on_delete=models.CASCADE,
        verbose_name="Epic",
    )
    points = models.SmallIntegerField(
    	default=0
    )
