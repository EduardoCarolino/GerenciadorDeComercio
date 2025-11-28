import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { CadastroProdutos } from './CadastroProdutos';
import { ListaProdutos } from './ListaProdutos';
import { RelatoriosProdutos } from './RelatoriosProdutos';
import { buscarTodosProdutos } from '../../actions/actionProdutos';

export interface Produto {
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
  // precoCompra: string;
  precoVenda: number;
  estoque: number;
  estoqueMinimo: number;
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
    // precoCompra: '',
    precoVenda: 0,
    estoque: 0,
    estoqueMinimo: 0,
    unidade: '',
    fornecedor: ''
  });

  // Dados mockados para a lista
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    carregarDados();
  }, []);

  // Função auxiliar para buscar e atualizar
  async function carregarDados() {
    // setIsLoading(true);
    try {
      // Chamada ao Server Action
      const dados = await buscarTodosProdutos(); 
      console.log(dados)
      setProdutos(dados); // 2. ATUALIZA O ESTADO
    } catch (err) {
      console.error(err);
    } 
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <div className="w-full h-full pt-5 px-8 pb-8 overflow-y-auto">
      <div className="mb-4 flex-shrink-0">
        <div className="mb-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Produtos</h1>
          <p className="text-gray-600 text-base">Gerencie seus produtos.</p>
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
            onClick={() => {
              setViewMode('lista');
              carregarDados();
            }}
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

