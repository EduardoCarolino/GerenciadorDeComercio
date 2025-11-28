from rest_framework import viewsets
from funcionarios.api import seralizers
from funcionarios import models

class FuncionariosViewSet(viewsets.ModelViewSet):
    serializer_class = seralizers.FuncionariosSerializer
    queryset = models.Funcionario.objects.all()