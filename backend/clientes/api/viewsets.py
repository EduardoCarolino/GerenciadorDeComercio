from rest_framework import viewsets
from clientes.api import seralizers
from clientes import models
from django_filters.rest_framework import DjangoFilterBackend

class ClientesViewSet(viewsets.ModelViewSet):
    serializer_class = seralizers.ClientesSerializer
    queryset = models.Cliente.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email']