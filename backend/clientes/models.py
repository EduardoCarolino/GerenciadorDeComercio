from django.db import models
from uuid import uuid4

class Cliente(models.Model):
    # Identificação única (substitui o ID numérico padrão)
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    
    # Campo "Código" da imagem (caso tenhas um código interno legível além do UUID)
    codigo = models.CharField(max_length=50, blank=True, null=True)
    
    # Dados Pessoais
    nome = models.CharField(max_length=250)
    email = models.EmailField(max_length=250, unique=True)
    rg = models.CharField(max_length=20, blank=True, null=True)
    cpf = models.CharField(max_length=14, unique=True) # 14 para comportar formatação xxx.xxx.xxx-xx
    
    # Contato
    celular = models.CharField(max_length=20)
    telefone_fixo = models.CharField(max_length=20, blank=True, null=True)
    
    # Endereço
    cep = models.CharField(max_length=9) # 9 para comportar formatação xxxxx-xxx
    endereco = models.CharField(max_length=250) # Rua/Avenida
    numero = models.CharField(max_length=10) # CharField pois pode ser "10A", "S/N"
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    complemento = models.CharField(max_length=250, blank=True, null=True)
    uf = models.CharField(max_length=2) # Estado (Sigla)

    # Campos de Controle (baseado no teu exemplo)
    status = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True) # Data em que foi criado
    data_alteracao = models.DateTimeField(auto_now=True)   # Data da última edição