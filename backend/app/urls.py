"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from clientes.api import viewsets as clienteviewsets
from produtos.api import viewsets as produtosviewsets
from fornecedores.api import viewsets as fornecedoreviewsets
from vendas.api import viewsets as vendasviewsets

rounte = routers.DefaultRouter()

rounte.register(r'clientes', clienteviewsets.ClientesViewSet, basename='Clientes')
rounte.register(r'produtos', produtosviewsets.ProdutosViewSet, basename='Produtos')
rounte.register(r'fornecedores', fornecedoreviewsets.FornecedoresViewSet, basename='Fornecedores')
rounte.register(r'vendas', vendasviewsets.VendasViewSet, basename='Vendas')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(rounte.urls))
]
