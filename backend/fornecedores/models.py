from django.db import models
from uuid import uuid4

class Fornecedor(models.Model):
    STATUS_CHOICES = [
        ('ATIVO', 'Ativo'),
        ('INATIVO', 'Inativo'),
        ('BLOQUEADO', 'Bloqueado'),
    ]

    # Mantendo o padrão UUID do projeto (mais seguro que ID numérico simples)
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    
    # Identificação
    codigo = models.CharField(max_length=50, unique=True)
    nome = models.CharField(max_length=250)
    ramo_atividade = models.CharField(max_length=100) # Convertido de ramoAtividade
    
    # Documentos
    cnpj = models.CharField(max_length=20, unique=True) # Aceita formatação xx.xxx.xxx/0001-xx
    rg = models.CharField(max_length=20, blank=True, null=True) # Opcional para PJ
    
    # Contatos
    email = models.EmailField(max_length=250, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True) # Telefone geral
    celular = models.CharField(max_length=20)
    telefone_fixo = models.CharField(max_length=20, blank=True, null=True) # Convertido de telefoneFixo
    
    # Endereço
    cep = models.CharField(max_length=10)
    endereco = models.CharField(max_length=250)
    numero = models.CharField(max_length=10)
    complemento = models.CharField(max_length=250, blank=True, null=True)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    uf = models.CharField(max_length=2)

    # Status e Controle
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ATIVO')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_alteracao = models.DateTimeField(auto_now=True)