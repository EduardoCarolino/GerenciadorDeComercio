from django.db import models
from uuid import uuid4

class Produto(models.Model):
    # Identificação única
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    
    # Campo "Código" visual (ex: PROD-001)
    codigo = models.CharField(max_length=50, unique=True)
    
    # Detalhes do Produto
    descricao = models.CharField(max_length=250) # Nome/Descrição do produto
    
    # Valores Monetários - DecimalField é obrigatório para dinheiro
    # max_digits=10 significa até 99.999.999,99
    # decimal_places=2 significa duas casas decimais (centavos)
    preco = models.DecimalField(max_digits=10, decimal_places=2) 
    
    # Estoque - PositiveInteger impede números negativos
    quantidade_estoque = models.PositiveIntegerField()
    
    # Fornecedor
    fornecedor = models.CharField(max_length=250)

    # Campos de Controle
    status = models.BooleanField(default=True) # Ativo/Inativo
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_alteracao = models.DateTimeField(auto_now=True)