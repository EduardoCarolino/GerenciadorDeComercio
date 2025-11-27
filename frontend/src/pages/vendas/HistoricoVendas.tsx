import { useState } from 'react';
import { Search, Download, ChevronDown, Eye } from 'lucide-react';

interface Venda {
  id: number;
  data: string;
  cliente: string;
  total: number;
  status: string;
}

export function HistoricoVendas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  const [vendas] = useState<Venda[]>([
    {
      id: 1,
      data: '15/01/2024 14:30',
      cliente: 'João Silva',
      total: 250.00,
      status: 'Concluída'
    },
    {
      id: 2,
      data: '15/01/2024 10:15',
      cliente: 'Maria Santos',
      total: 180.50,
      status: 'Concluída'
    },
    {
      id: 3,
      data: '14/01/2024 16:45',
      cliente: 'Pedro Oliveira',
      total: 320.75,
      status: 'Concluída'
    }
  ]);

  return (
    <>
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Histórico de Vendas</h2>
        <p className="text-gray-600">Visualize todas as vendas realizadas</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar vendas..."
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
            <option value="todos">Todas as vendas</option>
            <option value="concluidas">Vendas concluídas</option>
            <option value="canceladas">Vendas canceladas</option>
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
              <th className="text-left py-4 px-6 text-sm font-semibold">ID</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Data</th>
              <th className="text-left py-4 px-6 text-sm font-semibold">Cliente</th>
              <th className="text-right py-4 px-6 text-sm font-semibold">Total</th>
              <th className="text-center py-4 px-6 text-sm font-semibold">Status</th>
              <th className="text-center py-4 px-6 text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas
              .filter((venda) => {
                const matchesSearch = searchTerm === '' || 
                  venda.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  venda.id.toString().includes(searchTerm);
                return matchesSearch;
              })
              .map((venda, index) => (
              <tr 
                key={venda.id} 
                className={`border-b border-gray-100 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-[#E0F7F7]`}
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">#{venda.id}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{venda.data}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{venda.cliente}</td>
                <td className="py-4 px-6 text-sm text-right text-gray-900 font-medium">R$ {venda.total.toFixed(2).replace('.', ',')}</td>
                <td className="py-4 px-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {venda.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center">
                    <button className="p-2 text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition-all duration-200 hover:scale-110">
                      <Eye className="w-4 h-4" />
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

