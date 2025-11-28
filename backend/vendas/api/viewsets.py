from rest_framework import viewsets
from vendas.api import seralizers
from vendas import models

class VendasViewSet(viewsets.ModelViewSet):
    serializer_class = seralizers.VendasSerializer
    queryset = models.Venda.objects.all()