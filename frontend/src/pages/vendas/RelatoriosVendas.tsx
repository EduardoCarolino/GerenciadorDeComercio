import { BarChart3, Calendar, User, Box, TrendingUp, Download } from 'lucide-react';

export function RelatoriosVendas() {
  return (
    <>
      <div className="mb-3 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BarChart3 className="w-7 h-7 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">Relatórios de Vendas</h2>
        </div>
        <p className="text-sm text-gray-600">Gere relatórios e análises das suas vendas</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Vendas por Período */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Vendas por Período</h3>
            <p className="text-xs text-gray-600">Relatório de vendas por data</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>

        {/* Card 2: Vendas por Cliente */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <User className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Vendas por Cliente</h3>
            <p className="text-xs text-gray-600">Ranking de clientes por valor</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>

        {/* Card 3: Produtos Mais Vendidos */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <Box className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Produtos Mais Vendidos</h3>
            <p className="text-xs text-gray-600">Ranking de produtos por quantidade</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>

        {/* Card 4: Faturamento Mensal */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Faturamento Mensal</h3>
            <p className="text-xs text-gray-600">Análise de faturamento por mês</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>
      </div>
    </>
  );
}

