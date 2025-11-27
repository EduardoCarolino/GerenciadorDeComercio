from rest_framework import serializers
from fornecedores import models

class FornecedoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Fornecedor
        fields = '__all__'
        