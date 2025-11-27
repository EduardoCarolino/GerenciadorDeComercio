import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CadastroProdutos } from './CadastroProdutos';
import { ListaProdutos } from './ListaProdutos';
import { RelatoriosProdutos } from './RelatoriosProdutos';

interface Produto {
  id: number;
  codigo: string;
  nome: string;
  categoria: string;
  precoVenda: number;
  estoque: number;
  estoqueMinimo: number;
  unidade: string;
  fornecedor: string;
}

interface FormData {
  codigo: string;
  nome: string;
  descricao: string;
  categoria: string;
  precoCompra: string;
  precoVenda: string;
  estoque: string;
  estoqueMinimo: string;
  unidade: string;
  fornecedor: string;
}

export function Produtos() {
  const [viewMode, setViewMode] = useState<'cadastro' | 'lista' | 'relatorios'>('cadastro');
  const [formData, setFormData] = useState<FormData>({
    codigo: '',
    nome: '',
    descricao: '',
    categoria: '',
    precoCompra: '',
    precoVenda: '',
    estoque: '',
    estoqueMinimo: '',
    unidade: '',
    fornecedor: ''
  });

  // Dados mockados para a lista
  const [produtos] = useState<Produto[]>([
    {
      id: 1,
      codigo: 'PROD-001',
      nome: 'Notebook Dell Inspiron',
      categoria: 'Eletrônicos',
      precoVenda: 3299.99,
      estoque: 15,
      estoqueMinimo: 5,
      unidade: 'UN',
      fornecedor: 'Tech Solutions'
    },
    {
      id: 2,
      codigo: 'PROD-002',
      nome: 'Camiseta Básica Branca',
      categoria: 'Roupas',
      precoVenda: 29.90,
      estoque: 50,
      estoqueMinimo: 20,
      unidade: 'UN',
      fornecedor: 'Moda Fashion'
    },
    {
      id: 3,
      codigo: 'PROD-003',
      nome: 'Arroz 5kg',
      categoria: 'Alimentos',
      precoVenda: 18.50,
      estoque: 3,
      estoqueMinimo: 10,
      unidade: 'UN',
      fornecedor: 'Distribuidora Alimentos'
    },
    {
      id: 4,
      codigo: 'PROD-004',
      nome: 'Refrigerante Coca-Cola 2L',
      categoria: 'Bebidas',
      precoVenda: 7.99,
      estoque: 120,
      estoqueMinimo: 30,
      unidade: 'UN',
      fornecedor: 'Bebidas Brasil'
    },
    {
      id: 5,
      codigo: 'PROD-005',
      nome: 'Sofá Retrátil 3 Lugares',
      categoria: 'Casa e Decoração',
      precoVenda: 1899.00,
      estoque: 2,
      estoqueMinimo: 3,
      unidade: 'UN',
      fornecedor: 'Móveis Premium'
    }
  ]);

  return (
    <div className="w-full h-full pt-5 px-8 pb-8 overflow-y-auto">
      <div className="mb-4 flex-shrink-0">
        <div className="mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-base">Visão geral do seu negócio.</p>
        </div>
        <div className="bg-white rounded-lg py-1 px-4 flex gap-3">
          <button 
            onClick={() => setViewMode('cadastro')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'cadastro' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Produtos
          </button>
          <button 
            onClick={() => setViewMode('lista')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'lista' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Lista
          </button>
          <button 
            onClick={() => setViewMode('relatorios')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'relatorios' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Relatórios
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl py-3 px-8">
        {viewMode === 'cadastro' ? (
          <CadastroProdutos formData={formData} onFormDataChange={setFormData} />
        ) : viewMode === 'lista' ? (
          <ListaProdutos produtos={produtos} />
        ) : (
          <RelatoriosProdutos />
        )}
      </div>
    </div>
  );
}

