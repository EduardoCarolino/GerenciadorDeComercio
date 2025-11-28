from django.db import models
from uuid import uuid4

class Venda(models.Model):
    # Opções para o campo status (Boas práticas para evitar erros de digitação)
    STATUS_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('CONCLUIDA', 'Concluída'),
        ('CANCELADA', 'Cancelada'),
    ]

    # Identificação única
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    
    # Data da venda
    # auto_now_add=True preenche automático no momento da criação
    data = models.DateTimeField(auto_now_add=True)
    
    # Relacionamento com o Cliente (Chave Estrangeira)
    # on_delete=models.PROTECT impede que apagues um cliente se ele tiver vendas registradas
    cliente = models.CharField(max_length=20)
    
    # Valor Total
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Status com opções pré-definidas (default define o padrão inicial)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDENTE')