from django.db import models
from uuid import uuid4

# Create your models here.

class Cliente(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=250)
    email = models.CharField(max_length=300)
    senha = models.CharField(max_length=300)
    celular = models.CharField(max_length=11)
    telefone_fixo = models.CharField(max_length=11)
    status = models.BooleanField()
    data_alteracao = models.DateTimeField()