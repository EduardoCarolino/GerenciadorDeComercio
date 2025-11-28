from django.db import models
from uuid import uuid4

class Funcionario(models.Model):
    # Opções para Status
    STATUS_CHOICES = [
        ('ATIVO', 'Ativo'),
        ('FERIAS', 'Em Férias'),
        ('AFASTADO', 'Afastado'),
        ('DESLIGADO', 'Desligado'),
    ]

    # Opções para Nível de Acesso
    NIVEL_ACESSO_CHOICES = [
        ('ADMIN', 'Administrador'),
        ('GERENTE', 'Gerente'),
        ('VENDEDOR', 'Vendedor'),
        ('OPERACIONAL', 'Operacional'),
    ]

    # Identificação Única
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    codigo = models.CharField(max_length=50, unique=True)
    
    # Dados Pessoais
    nome_completo = models.CharField(max_length=250)
    email = models.EmailField(max_length=250, unique=True)
    rg = models.CharField(max_length=20, blank=True, null=True)
    cpf = models.CharField(max_length=14, unique=True)
    data_nascimento = models.DateField() # Apenas data, sem hora
    
    # Dados de Contato
    telefone = models.CharField(max_length=20)
    
    # Dados Profissionais
    cargo = models.CharField(max_length=100)
    # DecimalField para dinheiro. max_digits=10 permite salários até 99.999.999,99
    salario = models.DecimalField(max_digits=10, decimal_places=2) 
    data_admissao = models.DateField()
    
    # Nível de Acesso e Status
    nivel_acesso = models.CharField(max_length=50, choices=NIVEL_ACESSO_CHOICES, default='VENDEDOR')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ATIVO')

    # Endereço
    cep = models.CharField(max_length=10)
    endereco = models.CharField(max_length=250)
    numero = models.CharField(max_length=10)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    uf = models.CharField(max_length=2)

    # Controle de sistema
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_alteracao = models.DateTimeField(auto_now=True)