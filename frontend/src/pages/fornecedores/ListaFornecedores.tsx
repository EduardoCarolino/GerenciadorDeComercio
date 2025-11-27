import React, { useState } from "react";
import { Search, Download, Edit, Trash2 } from "lucide-react";

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  celular?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade: string;
  estado: string;
}

interface ListaFornecedoresProps {
  fornecedores: Fornecedor[];
}

export function ListaFornecedores({ fornecedores }: ListaFornecedoresProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lista de Fornecedores</h2>
        <p className="text-gray-600">Visualize todos os fornecedores cadastrados</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
          />
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
              <th className="text-left py-4 px-6 text-sm font-semibold">CNPJ</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Email</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Telefone</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Cidade/UF</th>
              <th className="text-center py-4 px-6 text-sm font-semibold">Ações</th>
            </tr>
          </thead>

          <tbody>
            {fornecedores
              .filter(f =>
                searchTerm === "" ||
                f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                f.cnpj.includes(searchTerm) ||
                f.cidade.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((f, index) => (
              <tr key={f.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#E0F7F7]`}>
                <td className="py-4 px-6 text-sm font-medium text-gray-900">{f.nome}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{f.cnpj}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{f.email}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{f.telefone}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{f.cidade}/{f.estado}</td>
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
