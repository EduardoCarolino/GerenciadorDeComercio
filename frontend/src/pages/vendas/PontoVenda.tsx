import { useEffect, useState } from 'react';
import { User, Box, ShoppingBag, TrendingUp, Plus, X, Check, CreditCard, Wallet, FileText } from 'lucide-react';
import { criarUmaVenda } from '../../actions/actionsVendas';
import { Produto } from '../produtos';
import { buscarTodosProdutos } from '../../actions/actionProdutos';

interface ItemCarrinho {
  codigo: string;
  produto: string;
  quantidade: number;
  preco: number;
  subtotal: number;
}

export function PontoVenda() {
  const [clienteData, setClienteData] = useState({
    cpf: '',
    nome: '',
    telefone: ''
  });

  const [produtoData, setProdutoData] = useState({
    codigo: '',
    produto: '',
    preco: '0,00',
    quantidade: '1'
  });

  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [showPagamento, setShowPagamento] = useState(false);
  const [usarCartao, setUsarCartao] = useState(false);
  const [pagamentoData, setPagamentoData] = useState({
    dinheiro: '0',
    cartao: '0,00',
    cheque: '0',
    observacoes: ''
  });
  const [cartaoData, setCartaoData] = useState({
    tipo: 'debito',
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
    parcelas: '1'
  });

  const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClienteData(prev => ({ ...prev, [name]: value }));
  };

  const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProdutoData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdicionarItem = () => {
    if (produtoData.produto && produtoData.preco) {
      const novoItem: ItemCarrinho = {
        codigo: produtoData.codigo || `PROD-${Date.now()}`,
        produto: produtoData.produto,
        quantidade: parseInt(produtoData.quantidade) || 1,
        preco: parseFloat(produtoData.preco.replace(',', '.')) || 0,
        subtotal: (parseInt(produtoData.quantidade) || 1) * (parseFloat(produtoData.preco.replace(',', '.')) || 0)
      };
      setCarrinho([...carrinho, novoItem]);
      setProdutoData({ codigo: '', produto: '', preco: '0,00', quantidade: '1' });
    }
  };

  const handleRemoverItem = (index: number) => {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  };

  const totalVenda = carrinho.reduce((sum, item) => sum + item.subtotal, 0);

  const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPagamentoData(prev => ({ ...prev, [name]: value }));
  };

  const handleCartaoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCartaoData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalizarVenda = () => {
    if (carrinho.length === 0) return;
    setShowPagamento(true);
  };

  const handleConfirmarPagamento = () => {
    const dinheiro = parseFloat(pagamentoData.dinheiro.replace(',', '.')) || 0;
    const cartao = parseFloat(pagamentoData.cartao.replace(',', '.')) || 0;
    const cheque = parseFloat(pagamentoData.cheque.replace(',', '.')) || 0;
    const totalPago = dinheiro + cartao + cheque;

    if (totalPago >= totalVenda) {
      // Validar dados do cartão se estiver usando
      if (usarCartao && cartao > 0) {
        if (!cartaoData.numero || !cartaoData.nome || !cartaoData.validade || !cartaoData.cvv) {
          alert('Preencha todos os dados do cartão!');
          return;
        }
      }

      console.log('Venda finalizada:', {
        cliente: clienteData,
        itens: carrinho,
        pagamento: pagamentoData,
        cartao: usarCartao ? cartaoData : null,
        total: totalVenda
      });
  // id: number;
  // data: string;
  // cliente: string;
  // total: number;
  // status: string;
      criarUmaVenda({id: 0, data: '27/11/25', cliente: clienteData.nome, total: totalVenda, status: 'CONCLUIDA'})
      // Limpar dados e fechar modal
      setCarrinho([]);
      setClienteData({ cpf: '', nome: '', telefone: '' });
      setPagamentoData({ dinheiro: '0', cartao: '0,00', cheque: '0', observacoes: '' });
      setCartaoData({ tipo: 'debito', numero: '', nome: '', validade: '', cvv: '', parcelas: '1' });
      setUsarCartao(false);
      setShowPagamento(false);
    } else {
      alert('O valor pago é menor que o total da venda!');
    }
  };

  const [produtos, setProdutos] = useState<Produto[]>([])

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

  const calcularTroco = () => {
    const dinheiro = parseFloat(pagamentoData.dinheiro.replace(',', '.')) || 0;
    const cartao = parseFloat(pagamentoData.cartao.replace(',', '.')) || 0;
    const cheque = parseFloat(pagamentoData.cheque.replace(',', '.')) || 0;
    const troco = dinheiro - (totalVenda - cartao - cheque);
    return troco > 0 ? troco : 0;
  };

  const totalPago = () => {
    const dinheiro = parseFloat(pagamentoData.dinheiro.replace(',', '.')) || 0;
    const cartao = parseFloat(pagamentoData.cartao.replace(',', '.')) || 0;
    const cheque = parseFloat(pagamentoData.cheque.replace(',', '.')) || 0;
    return dinheiro + cartao + cheque;
  };

  if (showPagamento) {
    return (
      <>
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CreditCard className="w-7 h-7 text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Pagamentos</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Coluna Esquerda - Métodos de Pagamento */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-[#008080]" />
                <h3 className="text-lg font-bold text-gray-900">Métodos de Pagamento</h3>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">DINHEIRO:</label>
                  <input
                    type="text"
                    name="dinheiro"
                    value={pagamentoData.dinheiro}
                    onChange={handlePagamentoChange}
                    placeholder="0"
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={usarCartao}
                      onChange={(e) => {
                        setUsarCartao(e.target.checked);
                        if (!e.target.checked) {
                          setPagamentoData(prev => ({ ...prev, cartao: '0,00' }));
                        }
                      }}
                      className="w-4 h-4 text-[#008080] border-gray-300 rounded focus:ring-[#008080]"
                    />
                    <label className="text-sm font-medium text-gray-700">CARTÃO:</label>
                  </div>
                  {usarCartao ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          name="tipo"
                          value={cartaoData.tipo}
                          onChange={handleCartaoChange}
                          className="h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                        >
                          <option value="debito">Débito</option>
                          <option value="credito">Crédito</option>
                        </select>
                        <input
                          type="text"
                          name="cartao"
                          value={pagamentoData.cartao}
                          onChange={handlePagamentoChange}
                          placeholder="Valor"
                          className="h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                        />
                      </div>
                      <input
                        type="text"
                        name="numero"
                        value={cartaoData.numero}
                        onChange={handleCartaoChange}
                        placeholder="Número do cartão"
                        maxLength={19}
                        className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="nome"
                        value={cartaoData.nome}
                        onChange={handleCartaoChange}
                        placeholder="Nome no cartão"
                        className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          name="validade"
                          value={cartaoData.validade}
                          onChange={handleCartaoChange}
                          placeholder="MM/AA"
                          maxLength={5}
                          className="h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                        />
                        <input
                          type="text"
                          name="cvv"
                          value={cartaoData.cvv}
                          onChange={handleCartaoChange}
                          placeholder="CVV"
                          maxLength={4}
                          className="h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                        />
                        {cartaoData.tipo === 'credito' && (
                          <select
                            name="parcelas"
                            value={cartaoData.parcelas}
                            onChange={handleCartaoChange}
                            className="h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                          >
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="3">3x</option>
                            <option value="4">4x</option>
                            <option value="5">5x</option>
                            <option value="6">6x</option>
                          </select>
                        )}
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value="0,00"
                      readOnly
                      className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-gray-400"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CHEQUE:</label>
                  <input
                    type="text"
                    name="cheque"
                    value={pagamentoData.cheque}
                    onChange={handlePagamentoChange}
                    placeholder="0"
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">TROCO:</label>
                  <input
                    type="text"
                    value={calcularTroco().toFixed(2).replace('.', ',')}
                    readOnly
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-50 text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">TOTAL:</label>
                  <input
                    type="text"
                    value={totalVenda.toFixed(2).replace('.', ',')}
                    readOnly
                    className="w-full h-12 border-2 border-[#008080] rounded-lg px-4 bg-gray-50 text-gray-900 font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Observações */}
          <div className="flex flex-col">
            <div className="bg-white rounded-xl p-5 border border-gray-200 h-full">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#008080]" />
                <h3 className="text-lg font-bold text-gray-900">Observações</h3>
              </div>
              <textarea
                name="observacoes"
                value={pagamentoData.observacoes}
                onChange={handlePagamentoChange}
                placeholder="Observações..."
                rows={12}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={handleConfirmarPagamento}
            disabled={totalPago() < totalVenda}
            className="bg-[#008080] text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            Finalizar Venda
          </button>
          <button
            onClick={() => setShowPagamento(false)}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors font-medium text-sm"
          >
            <X className="w-5 h-5" />
            Voltar
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <ShoppingBag className="w-7 h-7 text-gray-700" />
          <h2 className="text-2xl font-bold text-gray-900">Ponto de Venda (PDV)</h2>
        </div>
        <p className="text-sm text-gray-600">Sistema completo para processamento de vendas</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Coluna Esquerda - Formulários */}
        <div className="flex flex-col gap-4">
          {/* Dados do Cliente */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#008080]" />
              <h3 className="text-lg font-bold text-gray-900">Dados do Cliente</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  value={clienteData.cpf}
                  onChange={handleClienteChange}
                  placeholder="000.000.000-00"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={clienteData.nome}
                  onChange={handleClienteChange}
                  placeholder="Nome do cliente"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  value={clienteData.telefone}
                  onChange={handleClienteChange}
                  placeholder="(00) 00000-0000"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Dados do Produto */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-5 h-5 text-[#008080]" />
              <h3 className="text-lg font-bold text-gray-900">Dados do Produto</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Código</label>
                <input
                  type="text"
                  name="codigo"
                  value={produtoData.codigo}
                  onChange={handleProdutoChange}
                  placeholder="Código do produto"
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Produto</label>
                <select
                  name="produto"
                  value={produtoData.produto}
                  onChange={handleProdutoChange}
                  className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  <option value="">Selecione o produto</option>
                  {produtos.map((item) => {
                    return (
                      <option value="Produto 1">{item.nome}</option>
                    )
                  })}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preço</label>
                  <input
                    type="text"
                    name="preco"
                    value={produtoData.preco}
                    onChange={handleProdutoChange}
                    placeholder="0,00"
                    className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantidade</label>
                  <input
                    type="text"
                    name="quantidade"
                    value={produtoData.quantidade}
                    onChange={handleProdutoChange}
                    className="w-full h-12 border-2 border-[#008080] rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleAdicionarItem}
                className="w-full bg-[#008080] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm"
              >
                <Plus className="w-5 h-5" />
                Adicionar Item
              </button>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Carrinho e Total */}
        <div className="flex flex-col gap-4">
          {/* Carrinho de Compras */}
          <div className="bg-white rounded-xl p-5 border border-gray-200 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#008080]" />
              <h3 className="text-lg font-bold text-gray-900">Carrinho de Compras</h3>
            </div>
            {carrinho.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-56 text-gray-400 flex-shrink-0">
                <ShoppingBag className="w-12 h-12 mb-2" />
                <p className="text-sm">Carrinho vazio</p>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1 min-h-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Código</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Produto</th>
                      <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Qtd</th>
                      <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Preço</th>
                      <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Subtotal</th>
                      <th className="text-center py-2 px-3 text-sm font-medium text-gray-700">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrinho.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-3 text-sm text-gray-900">{item.codigo}</td>
                        <td className="py-2 px-3 text-sm text-gray-900">{item.produto}</td>
                        <td className="py-2 px-3 text-sm text-center text-gray-900">{item.quantidade}</td>
                        <td className="py-2 px-3 text-sm text-right text-gray-900">R$ {item.preco.toFixed(2).replace('.', ',')}</td>
                        <td className="py-2 px-3 text-sm text-right text-gray-900">R$ {item.subtotal.toFixed(2).replace('.', ',')}</td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleRemoverItem(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Total da Venda */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#008080]" />
              <h3 className="text-lg font-bold text-gray-900">Total da Venda</h3>
            </div>
            <div className="text-4xl font-bold mb-4 text-gray-900">
              R$ {totalVenda.toFixed(2).replace('.', ',')}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleFinalizarVenda}
                disabled={carrinho.length === 0}
                className="flex-1 bg-[#008080] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Check className="w-5 h-5" />
                Finalizar Venda
              </button>
              <button 
                onClick={() => {
                  setCarrinho([]);
                  setClienteData({ cpf: '', nome: '', telefone: '' });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors font-medium text-sm"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

