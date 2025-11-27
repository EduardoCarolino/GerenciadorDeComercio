from rest_framework import viewsets
from clientes.api import seralizers
from clientes import models

class ClientesViewSet(viewsets.ModelViewSet):
    serializer_class = seralizers.ClientesSerializer
    queryset = models.Cliente.objects.all()