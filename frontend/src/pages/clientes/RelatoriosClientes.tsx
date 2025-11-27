import { BarChart3, Calendar, Mail, Phone, Download } from 'lucide-react';

export function RelatoriosClientes() {
  return (
    <>
      <div className="mb-3 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <BarChart3 className="w-7 h-7 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">Relatórios de Clientes</h2>
        </div>
        <p className="text-sm text-gray-600">Gere relatórios e análises dos seus clientes</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Clientes por Estado */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Clientes por Estado</h3>
            <p className="text-xs text-gray-600">Distribuição geográfica dos clientes</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>

        {/* Card 2: Novos Clientes */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Novos Clientes</h3>
            <p className="text-xs text-gray-600">Clientes cadastrados por período</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Gerar Relatório
          </button>
        </div>

        {/* Card 3: Lista de E-mails */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Lista de E-mails</h3>
            <p className="text-xs text-gray-600">Exportar lista de e-mails para marketing</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Exportar E-mails
          </button>
        </div>

        {/* Card 4: Lista de Telefones */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex flex-col items-center text-center mb-3">
            <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Lista de Telefones</h3>
            <p className="text-xs text-gray-600">Exportar contatos telefônicos</p>
          </div>
          <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
            <Download className="w-4 h-4" />
            Exportar Telefones
          </button>
        </div>
      </div>
    </>
  );
}

