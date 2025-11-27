import React, { useState } from 'react';
import { Search, Download, Edit, Trash2, ChevronDown } from 'lucide-react';

interface Funcionario {
  id: number;
  codigo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  cargo: string;
  salario: number;
  dataAdmissao: string;
  status: string;
  rg: string;
  cpf: string;
  dataNascimento: string;
  nivelAcesso: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface ListaFuncionariosProps {
  funcionarios: Funcionario[];
}

export function ListaFuncionarios({ funcionarios }: ListaFuncionariosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterCargo, setFilterCargo] = useState('todos');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lista de Funcionários</h2>
        <p className="text-gray-600">Visualize todos os funcionários cadastrados</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar funcionários..."
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
            <option value="todos">Todos os status</option>
            <option value="Ativo">Ativos</option>
            <option value="Inativo">Inativos</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterCargo}
            onChange={(e) => setFilterCargo(e.target.value)}
            className="h-12 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer min-w-[180px]"
          >
            <option value="todos">Todos os cargos</option>
            <option value="Gerente">Gerente</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Atendente">Atendente</option>
            <option value="Caixa">Caixa</option>
            <option value="Estoquista">Estoquista</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Auxiliar">Auxiliar</option>
            <option value="Assistente">Assistente</option>
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
              <th className="text-left py-4 px-6 text-sm font-semibold">Email</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Telefone</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Cargo</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Salário</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Data Admissão</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Status</th>
              <th className="text-center py-4 px-6 text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios
              .filter((funcionario) => {
                const matchesSearch = searchTerm === '' || 
                  funcionario.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  funcionario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  funcionario.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase());
                
                const matchesStatus = filterStatus === 'todos' || funcionario.status === filterStatus;
                const matchesCargo = filterCargo === 'todos' || funcionario.cargo === filterCargo;
                
                return matchesSearch && matchesStatus && matchesCargo;
              })
              .map((funcionario, index) => (
              <tr 
                key={funcionario.id} 
                className={`border-b border-gray-100 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-[#E0F7F7]`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{funcionario.codigo}</td>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{funcionario.nomeCompleto}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{funcionario.email}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{funcionario.telefone}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{funcionario.cargo}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{formatCurrency(funcionario.salario)}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{formatDate(funcionario.dataAdmissao)}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    funcionario.status === 'Ativo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {funcionario.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-3">
                    <button className="p-2 text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
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

