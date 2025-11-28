import React, { useState } from 'react';
import { Search, Download, Edit, Trash2, ChevronDown } from 'lucide-react';
import { deletarUmCliente } from '../../actions/actionClientes';
// import { Cliente } from './indexCliente';

interface Cliente {
  id: number;
  nomeCompleto: string;
  email: string;
  celular: string;
  telefoneFixo: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface ListaClientesProps {
  clientes: Cliente[];
}

  async function deletarDados(email: string) {
    // setIsLoading(true);
    try {
      // Chamada ao Server Action
      const dados = await deletarUmCliente(email); 
    } catch (err) {
      console.error(err);
    } 
    // finally {
    //   setIsLoading(false);
    // }
  }

export function ListaClientes({ clientes }: ListaClientesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lista de Clientes</h2>
        <p className="text-gray-600">Visualize todos os clientes cadastrados</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-12 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer min-w-[180px]"
          >
            <option value="todos">Todos os clientes</option>
            <option value="ativos">Clientes ativos</option>
            <option value="inativos">Clientes inativos</option>
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
              <th className="text-left py-4 px-6 text-sm font-semibold">Nome</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Email</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Celular</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Telefone Fixo</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Endereço</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Cidade/UF</th>
              <th className="text-center py-4 px-6 text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes
              .filter((cliente) => {
                const matchesSearch = searchTerm === '' || 
                  cliente.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  cliente.celular.includes(searchTerm) ||
                  cliente.cidade.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesSearch;
              })
              .map((cliente, index) => (
              <tr 
                key={cliente.id} 
                className={`border-b border-gray-100 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-[#E0F7F7]`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{cliente.nomeCompleto}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{cliente.email}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{cliente.celular}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{cliente.telefoneFixo}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{cliente.endereco}, {cliente.bairro}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{cliente.cidade}/{cliente.uf}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                      onClick={() => {deletarDados(cliente.email)}}
                    >
                      <Trash2 className="w-4 h-4" />
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

