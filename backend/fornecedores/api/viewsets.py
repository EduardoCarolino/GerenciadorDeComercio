from rest_framework import viewsets
from fornecedores.api import seralizers
from fornecedores import models

class FornecedoresViewSet(viewsets.ModelViewSet):
    serializer_class = seralizers.FornecedoresSerializer
    queryset = models.Fornecedor.objects.all()