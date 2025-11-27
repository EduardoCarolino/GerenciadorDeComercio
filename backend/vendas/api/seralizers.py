from rest_framework import serializers
from vendas import models

class VendasSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Venda
        fields = '__all__'
        