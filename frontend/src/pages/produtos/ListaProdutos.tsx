import React, { useState } from 'react';
import { Search, Download, Edit, Trash2, ChevronDown } from 'lucide-react';
import { deletarUmCliente } from '../../actions/actionClientes';

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

interface ListaProdutosProps {
  produtos: Produto[];
}

  async function deletarDados(nome: string) {
    // setIsLoading(true);
    try {
      // Chamada ao Server Action
      const dados = await deletarUmCliente(nome); 
    } catch (err) {
      console.error(err);
    } 
    // finally {
    //   setIsLoading(false);
    // }
  }

export function ListaProdutos({ produtos }: ListaProdutosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('todas');

  const categorias = ['todas', 'Eletrônicos', 'Roupas', 'Alimentos', 'Bebidas', 'Casa e Decoração', 'Esportes', 'Livros', 'Outros'];

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lista de Produtos</h2>
        <p className="text-gray-600">Visualize todos os produtos cadastrados</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="h-12 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer min-w-[180px]"
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria === 'todas' ? 'Todas as categorias' : categoria}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        <button className="bg-[#008080] text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-[#006666] transition-colors font-normal text-sm">
          <Download className="w-5 h-5" />
          Exportar
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="bg-[#008080] text-white">
              <th className="text-left py-4 px-6 text-sm font-semibold">Código</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Nome</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Categoria</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Preço de Venda</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Estoque</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Unidade</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Fornecedor</th>
              <th className="text-center py-4 px-6 text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos
              .filter((produto) => {
                const matchesSearch = searchTerm === '' || 
                  produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  produto.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategoria = filterCategoria === 'todas' || produto.categoria === filterCategoria;
                return matchesSearch && matchesCategoria;
              })
              .map((produto, index) => (
              <tr 
                key={produto.id} 
                className={`border-b border-gray-100 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-[#E0F7F7]`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{produto.codigo}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{produto.nome}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{produto.categoria}</td>
                <td className="py-4 px-6 text-sm text-gray-600">R$ {produto.precoVenda}</td>
                <td className={`py-4 px-6 text-sm font-medium ${
                  produto.estoque <= produto.estoqueMinimo ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {produto.estoque} {produto.unidade}
                  {produto.estoque <= produto.estoqueMinimo && (
                    <span className="ml-2 text-xs text-red-500">(Estoque baixo)</span>
                  )}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">{produto.unidade}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{produto.fornecedor}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
                      <Trash2 className="w-4 h-4"  
                        onClick={() => {deletarDados(produto.nome)}}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

