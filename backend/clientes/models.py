from django.db import models
from uuid import uuid4

class Cliente(models.Model):
    # ID continua sendo UUID para segurança
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    
    # Dados Pessoais
    # Convertendo "nomeCompleto" para snake_case
    nome_completo = models.CharField(max_length=250)
    email = models.EmailField(max_length=250, unique=True)
    
    # Contato
    celular = models.CharField(max_length=20)
    # telefoneFixo -> telefone_fixo (opcional, pois nem todos têm)
    telefone_fixo = models.CharField(max_length=20, blank=True, null=True)
    
    # Endereço
    # Aqui guardarás "Av. Principal, 456" tudo junto
    endereco = models.CharField(max_length=250) 
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    uf = models.CharField(max_length=2) # Estado (Sigla, ex: RJ, SP)

    # Campos de Controle (Sempre recomendo manter estes dois, mesmo que não apareçam na tela)
    data_criacao = models.DateTimeField(auto_now_add=True)
    