import React from 'react';
import { ChevronDown } from 'lucide-react';
import { criarUmProduto } from '../../actions/actionProdutos';
import { Produto } from '.';

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

interface CadastroProdutosProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

const categorias = [
  'Eletrônicos',
  'Roupas',
  'Alimentos',
  'Bebidas',
  'Casa e Decoração',
  'Esportes',
  'Livros',
  'Outros'
];

const unidades = [
  'UN',
  'KG',
  'L',
  'M',
  'CX',
  'PC'
];

export function CadastroProdutos({ formData, onFormDataChange }: CadastroProdutosProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do produto:', formData);
    // criarUmProduto(formData)
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
  };

  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastro de Produtos</h2>
        <p className="text-gray-600">Insira os dados abaixo para registrar um novo produto</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-6">
          {/* Coluna Esquerda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Código do Produto
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                placeholder="Digite o código do produto"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nome do Produto
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome do produto"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva o produto"
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Categoria
              </label>
              <div className="relative">
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecione a categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Fornecedor
              </label>
              <input
                type="text"
                name="fornecedor"
                value={formData.fornecedor}
                onChange={handleChange}
                placeholder="Digite o nome do fornecedor"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Preço de Compra
              </label>
              <input
                type="text"
                name="precoCompra"
                value={formData.precoCompra}
                onChange={handleChange}
                placeholder="0,00"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Preço de Venda
              </label>
              <input
                type="text"
                name="precoVenda"
                value={formData.precoVenda}
                onChange={handleChange}
                placeholder="0,00"
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Estoque Atual
                </label>
                <input
                  type="text"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Estoque Mínimo
                </label>
                <input
                  type="text"
                  name="estoqueMinimo"
                  value={formData.estoqueMinimo}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Unidade de Medida
              </label>
              <div className="relative w-32">
                <select
                  name="unidade"
                  value={formData.unidade}
                  onChange={handleChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="">Unidade</option>
                  {unidades.map(unidade => (
                    <option key={unidade} value={unidade}>
                      {unidade}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 mt-6">
          <button
            type="button"
            onClick={() => {
              onFormDataChange({
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
            }}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
          >
            Salvar Produto
          </button>
        </div>
      </form>
    </>
  );
}

