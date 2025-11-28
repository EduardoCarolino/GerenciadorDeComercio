from rest_framework import viewsets
from produtos.api import seralizers
from produtos import models

class ProdutosViewSet(viewsets.ModelViewSet):
    serializer_class = seralizers.ProdutoSerializer
    queryset = models.Produto.objects.all()