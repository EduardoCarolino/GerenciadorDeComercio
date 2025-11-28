from django.db import models
from uuid import uuid4

class Produto(models.Model):
    # Identificador único
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    
    # Campos com a nomenclatura exata da tua massa de dados
    codigo = models.CharField(max_length=50, unique=True)
    nome = models.CharField(max_length=250)
    descricao = models.TextField(blank=True, null=True)
    categoria = models.CharField(max_length=100)
    
    # Nomenclatura camelCase mantida conforme solicitado
    precoVenda = models.DecimalField(max_digits=10, decimal_places=2)
    estoque = models.PositiveIntegerField()
    estoqueMinimo = models.PositiveIntegerField(default=0)
    unidade = models.CharField(max_length=10)
    
    # Relacionamento: Aqui o Django espera receber o ID (string UUID) do fornecedor
    fornecedor = models.CharField(max_length=100)

    # Campos de controle internos (opcionais, mas recomendados)
    status = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)