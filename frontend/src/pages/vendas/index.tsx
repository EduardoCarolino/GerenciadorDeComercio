import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PontoVenda } from './PontoVenda';
import { HistoricoVendas } from './HistoricoVendas';
import { RelatoriosVendas } from './RelatoriosVendas';

export function Vendas() {
  const [viewMode, setViewMode] = useState<'venda' | 'historico' | 'relatorios'>('venda');

  return (
    <div className="w-full h-full pt-5 px-8 pb-8 overflow-y-auto">
      <div className="mb-4 flex-shrink-0">
        <div className="mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Vendas</h1>
          <p className="text-gray-600 text-base">Gerencie suas vendas.</p>
        </div>
        <div className="bg-white rounded-lg py-1 px-4 flex gap-3">
          <button 
            onClick={() => setViewMode('venda')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'venda' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Venda
          </button>
          <button 
            onClick={() => setViewMode('historico')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
              viewMode === 'historico' 
                ? 'bg-[#008080] text-white hover:bg-[#006666]' 
                : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
            }`}
          >
            <Plus className="w-5 h-5" />
            Histórico
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

      <div className="bg-white rounded-2xl py-6 px-8">
        {viewMode === 'venda' ? (
          <PontoVenda />
        ) : viewMode === 'historico' ? (
          <HistoricoVendas />
        ) : (
          <RelatoriosVendas />
        )}
      </div>
    </div>
  );
}

