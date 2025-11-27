import React, { useState, useEffect } from 'react';
import { Box, List, BarChart3, Search, Download, Edit2, Trash2 } from 'lucide-react';

interface Produto {
    id: number;
    codigo: string;
    nome: string;
    categoria: string;
    preco: number;
    custo?: number;
    estoque: number;
    estoqueMinimo: number;
    estoqueMaximo?: number;
    unidade: string;
    status: string;
    codigoBarras?: string;
    marca?: string;
    modelo?: string;
    peso?: number;
    dimensoes?: string;
    fornecedor?: string;
    descricao?: string;
}

export function Produtos() {
    const [activeSection, setActiveSection] = useState<'cadastro' | 'lista' | 'relatorios'>('cadastro');
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategoria, setFilterCategoria] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Formulário
    const getNextCode = () => {
        return produtos.length > 0 
            ? `PRO${String(produtos.length + 1).padStart(4, '0')}`
            : 'PRO0001';
    };

    const [formData, setFormData] = useState<Partial<Produto>>({
        codigo: 'PRO0001',
        unidade: 'UN',
        status: 'ativo'
    });

    // Atualizar código quando produtos carregarem
    useEffect(() => {
        if (produtos.length > 0 && !formData.id) {
            setFormData(prev => ({
                ...prev,
                codigo: getNextCode()
            }));
        }
    }, [produtos.length]);

    // Carregar produtos do localStorage
    useEffect(() => {
        const saved = localStorage.getItem('produtos');
        if (saved) {
            setProdutos(JSON.parse(saved));
        }
    }, []);

    // Salvar produtos no localStorage sempre que houver mudanças
    useEffect(() => {
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }, [produtos]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'preco' || name === 'custo' || name === 'estoque' || name === 'estoqueMinimo' || name === 'estoqueMaximo' || name === 'peso'
                ? parseFloat(value) || 0
                : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.id) {
            // Atualizar produto existente
            setProdutos(prev => prev.map(p => 
                p.id === formData.id 
                    ? {
                        ...p,
                        nome: formData.nome || '',
                        categoria: formData.categoria || '',
                        preco: formData.preco || 0,
                        custo: formData.custo,
                        estoque: formData.estoque || 0,
                        estoqueMinimo: formData.estoqueMinimo || 0,
                        estoqueMaximo: formData.estoqueMaximo,
                        unidade: formData.unidade || 'UN',
                        status: formData.status || 'ativo',
                        codigoBarras: formData.codigoBarras,
                        marca: formData.marca,
                        modelo: formData.modelo,
                        peso: formData.peso,
                        dimensoes: formData.dimensoes,
                        fornecedor: formData.fornecedor,
                        descricao: formData.descricao
                    }
                    : p
            ));
            alert('Produto atualizado com sucesso!');
        } else {
            // Criar novo produto
            const newProduto: Produto = {
                id: produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1,
                codigo: formData.codigo || `PRO${String(produtos.length + 1).padStart(4, '0')}`,
                nome: formData.nome || '',
                categoria: formData.categoria || '',
                preco: formData.preco || 0,
                custo: formData.custo,
                estoque: formData.estoque || 0,
                estoqueMinimo: formData.estoqueMinimo || 0,
                estoqueMaximo: formData.estoqueMaximo,
                unidade: formData.unidade || 'UN',
                status: formData.status || 'ativo',
                codigoBarras: formData.codigoBarras,
                marca: formData.marca,
                modelo: formData.modelo,
                peso: formData.peso,
                dimensoes: formData.dimensoes,
                fornecedor: formData.fornecedor,
                descricao: formData.descricao
            };

            setProdutos(prev => [...prev, newProduto]);
            alert('Produto cadastrado com sucesso!');
        }
        
        setFormData({
            codigo: getNextCode(),
            unidade: 'UN',
            status: 'ativo'
        });
    };

    const handleEdit = (id: number) => {
        const produto = produtos.find(p => p.id === id);
        if (produto) {
            setFormData(produto);
            setActiveSection('cadastro');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            setProdutos(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleNew = () => {
        setFormData({
            codigo: getNextCode(),
            unidade: 'UN',
            status: 'ativo'
        });
    };

    // Filtros
    const filteredProdutos = produtos.filter(produto => {
        const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            produto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
            produto.codigo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !filterCategoria || produto.categoria === filterCategoria;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProdutos = filteredProdutos.slice(startIndex, startIndex + itemsPerPage);

    const getEstoqueClass = (estoque: number, estoqueMinimo: number) => {
        if (estoque <= 0) return 'text-red-600 font-bold';
        if (estoque <= estoqueMinimo) return 'text-orange-600 font-semibold';
        return '';
    };

    const exportToCSV = () => {
        const headers = ['Código', 'Nome', 'Categoria', 'Preço', 'Custo', 'Estoque', 'Estoque Mínimo', 'Unidade', 'Status'];
        const rows = filteredProdutos.map(p => [
            p.codigo,
            p.nome,
            p.categoria,
            p.preco.toFixed(2),
            (p.custo || 0).toFixed(2),
            p.estoque,
            p.estoqueMinimo,
            p.unidade,
            p.status
        ]);

        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'produtos.csv';
        a.click();
    };

    const categorias = ['Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros', 'Beleza', 'Alimentação', 'Automotivo', 'Ferramentas', 'Saúde', 'Outros'];

    return (
        <div className="py-5 h-full w-full pl-5 flex flex-col gap-5">
            {/* Header */}
            <div>
                <p className="text-[40px] font-medium">Produtos</p>
                <p className="text-[25px]">Gerencie seus produtos</p>
            </div>

            {/* Navegação por seções */}
            <div className="flex gap-2 mb-6 px-1 pb-0 border-b-2 border-gray-200 bg-white rounded-t-xl shadow-sm">
                <button
                    onClick={() => setActiveSection('cadastro')}
                    className={`flex items-center gap-2 px-5 py-4 rounded-t-lg transition-all relative ${
                        activeSection === 'cadastro' 
                            ? 'bg-[#008080] text-white shadow-lg border-b-3 border-[#008080]' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                    style={activeSection === 'cadastro' ? { borderBottom: '3px solid #008080' } : {}}
                >
                    <Box className="w-4 h-4" />
                    <span className="font-medium text-sm">Cadastro</span>
                </button>
                <button
                    onClick={() => setActiveSection('lista')}
                    className={`flex items-center gap-2 px-5 py-4 rounded-t-lg transition-all relative ${
                        activeSection === 'lista' 
                            ? 'bg-[#008080] text-white shadow-lg border-b-3 border-[#008080]' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                    style={activeSection === 'lista' ? { borderBottom: '3px solid #008080' } : {}}
                >
                    <List className="w-4 h-4" />
                    <span className="font-medium text-sm">Lista</span>
                </button>
                <button
                    onClick={() => setActiveSection('relatorios')}
                    className={`flex items-center gap-2 px-5 py-4 rounded-t-lg transition-all relative ${
                        activeSection === 'relatorios' 
                            ? 'bg-[#008080] text-white shadow-lg border-b-3 border-[#008080]' 
                            : 'bg-transparent text-gray-600 hover:bg-gray-100'
                    }`}
                    style={activeSection === 'relatorios' ? { borderBottom: '3px solid #008080' } : {}}
                >
                    <BarChart3 className="w-4 h-4" />
                    <span className="font-medium text-sm">Relatórios</span>
                </button>
            </div>

            {/* Seção de Cadastro */}
            {activeSection === 'cadastro' && (
                <div className="flex-1 overflow-y-auto">
                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold mb-2">Cadastro de Produtos</h2>
                            <p className="text-sm text-gray-600">Preencha os dados abaixo para registrar um novo produto.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            {/* Dados Básicos */}
                            <div>
                                <div className="mb-5 pb-3 border-b border-gray-200">
                                    <h3 className="text-base font-semibold text-[#008080]">Dados Básicos</h3>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <label className="block mb-2 font-semibold">Código</label>
                                        <input
                                            type="text"
                                            name="codigo"
                                            value={formData.codigo || ''}
                                            disabled
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2 bg-gray-100"
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <label className="block mb-2 font-semibold">Nome do Produto <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome || ''}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="Digite o nome do produto"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Categoria <span className="text-red-500">*</span></label>
                                        <select
                                            name="categoria"
                                            value={formData.categoria || ''}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                        >
                                            <option value="">Selecione a categoria</option>
                                            {categorias.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Preço <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="preco"
                                            value={formData.preco || ''}
                                            onChange={handleInputChange}
                                            step="0.01"
                                            min="0"
                                            required
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Custo</label>
                                        <input
                                            type="number"
                                            name="custo"
                                            value={formData.custo || ''}
                                            onChange={handleInputChange}
                                            step="0.01"
                                            min="0"
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Controle de Estoque */}
                            <div>
                                <div className="mb-5 pb-3 border-b border-gray-200">
                                    <h3 className="text-base font-semibold text-[#008080]">Controle de Estoque</h3>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Estoque Atual <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="estoque"
                                            value={formData.estoque || ''}
                                            onChange={handleInputChange}
                                            min="0"
                                            required
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Estoque Mínimo <span className="text-red-500">*</span></label>
                                        <input
                                            type="number"
                                            name="estoqueMinimo"
                                            value={formData.estoqueMinimo || ''}
                                            onChange={handleInputChange}
                                            min="0"
                                            required
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Estoque Máximo</label>
                                        <input
                                            type="number"
                                            name="estoqueMaximo"
                                            value={formData.estoqueMaximo || ''}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Unidade</label>
                                        <select
                                            name="unidade"
                                            value={formData.unidade || 'UN'}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                        >
                                            <option value="UN">Unidade (UN)</option>
                                            <option value="KG">Quilograma (KG)</option>
                                            <option value="G">Grama (G)</option>
                                            <option value="L">Litro (L)</option>
                                            <option value="ML">Mililitro (ML)</option>
                                            <option value="M">Metro (M)</option>
                                            <option value="CM">Centímetro (CM)</option>
                                            <option value="CX">Caixa (CX)</option>
                                            <option value="PC">Peça (PC)</option>
                                            <option value="DZ">Dúzia (DZ)</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Status</label>
                                        <select
                                            name="status"
                                            value={formData.status || 'ativo'}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                        >
                                            <option value="ativo">Ativo</option>
                                            <option value="inativo">Inativo</option>
                                            <option value="descontinuado">Descontinuado</option>
                                            <option value="semestoque">Sem Estoque</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Informações Adicionais */}
                            <div>
                                <div className="mb-5 pb-3 border-b border-gray-200">
                                    <h3 className="text-base font-semibold text-[#008080]">Informações Adicionais</h3>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Código de Barras</label>
                                        <input
                                            type="text"
                                            name="codigoBarras"
                                            value={formData.codigoBarras || ''}
                                            onChange={handleInputChange}
                                            maxLength={13}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="Código EAN/UPC"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Marca</label>
                                        <input
                                            type="text"
                                            name="marca"
                                            value={formData.marca || ''}
                                            onChange={handleInputChange}
                                            maxLength={50}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="Nome da marca"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Modelo</label>
                                        <input
                                            type="text"
                                            name="modelo"
                                            value={formData.modelo || ''}
                                            onChange={handleInputChange}
                                            maxLength={50}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="Modelo do produto"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Peso (kg)</label>
                                        <input
                                            type="number"
                                            name="peso"
                                            value={formData.peso || ''}
                                            onChange={handleInputChange}
                                            step="0.001"
                                            min="0"
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="0,000"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Dimensões (cm)</label>
                                        <input
                                            type="text"
                                            name="dimensoes"
                                            value={formData.dimensoes || ''}
                                            onChange={handleInputChange}
                                            maxLength={20}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                            placeholder="L x A x P"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block mb-2 font-semibold">Fornecedor</label>
                                        <select
                                            name="fornecedor"
                                            value={formData.fornecedor || ''}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 h-[40px] rounded-lg p-2"
                                        >
                                            <option value="">Selecione o fornecedor</option>
                                            <option value="Fornecedor A">Fornecedor A</option>
                                            <option value="Fornecedor B">Fornecedor B</option>
                                            <option value="Fornecedor C">Fornecedor C</option>
                                        </select>
                                    </div>
                                    <div className="col-span-4">
                                        <label className="block mb-2 font-semibold">Descrição</label>
                                        <textarea
                                            name="descricao"
                                            value={formData.descricao || ''}
                                            onChange={handleInputChange}
                                            rows={3}
                                            maxLength={500}
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                            placeholder="Descrição detalhada do produto"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Botões */}
                            <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-200">
                                {formData.id && (
                                    <button
                                        type="button"
                                        onClick={() => formData.id && handleDelete(formData.id)}
                                        className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 font-medium transition-all"
                                    >
                                        Excluir
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleNew}
                                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all"
                                >
                                    Novo
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#008080] text-white rounded-lg hover:bg-[#006666] font-medium transition-all shadow-sm"
                                >
                                    {formData.id ? 'Atualizar' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Seção de Lista */}
            {activeSection === 'lista' && (
                <div className="flex-1 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Header com gradiente */}
                        <div className="bg-gradient-to-r from-[#008080] to-[#006666] p-5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Box className="w-6 h-6 text-white" />
                                <h2 className="text-xl font-semibold text-white">Lista de Produtos</h2>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/80 z-10" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Buscar produtos..."
                                        className="pl-10 border border-white/30 bg-white/10 backdrop-blur-sm text-white h-[40px] rounded-full px-4 w-[250px] focus:bg-white/20 focus:border-white/50 transition-all placeholder:text-white/70"
                                    />
                                </div>
                                <select
                                    value={filterCategoria}
                                    onChange={(e) => setFilterCategoria(e.target.value)}
                                    className="border border-white/30 bg-white/10 backdrop-blur-sm text-white h-[40px] rounded-lg px-3 focus:bg-white/20 focus:border-white/50 transition-all"
                                >
                                    <option value="" style={{ background: '#008080', color: 'white' }}>Todas as categorias</option>
                                    {categorias.map(cat => (
                                        <option key={cat} value={cat} style={{ background: '#008080', color: 'white' }}>{cat}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all"
                                >
                                    <Download className="w-4 h-4" />
                                    Exportar
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-gray-600 mb-4">{filteredProdutos.length} produto(s) encontrado(s)</p>

                            {paginatedProdutos.length === 0 ? (
                                <div className="text-center py-20">
                                    <Box className="w-16 h-16 mx-auto text-gray-400 mb-4 opacity-50" />
                                    <h4 className="text-lg font-semibold mb-2 text-gray-700">Nenhum produto encontrado</h4>
                                    <p className="text-sm text-gray-600">Tente ajustar os filtros de busca.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-100 border-b-2 border-gray-200">
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Código</th>
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Nome</th>
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Categoria</th>
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Preço</th>
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Estoque</th>
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Status</th>
                                                    <th className="text-left p-4 font-semibold text-sm text-gray-600">Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedProdutos.map(produto => (
                                                    <tr key={produto.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 font-semibold text-sm">{produto.codigo}</td>
                                                        <td className="p-4 text-sm">{produto.nome}</td>
                                                        <td className="p-4 text-sm">{produto.categoria}</td>
                                                        <td className="p-4 text-sm">R$ {produto.preco.toFixed(2).replace('.', ',')}</td>
                                                        <td className={`p-4 text-sm ${getEstoqueClass(produto.estoque, produto.estoqueMinimo)}`}>
                                                            {produto.estoque} {produto.unidade}
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                produto.status === 'ativo' 
                                                                    ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200' 
                                                                    : produto.status === 'inativo'
                                                                    ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200'
                                                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                                            }`}>
                                                                {produto.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleEdit(produto.id)}
                                                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm"
                                                                    title="Editar"
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(produto.id)}
                                                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm"
                                                                    title="Excluir"
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

                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-medium"
                                            >
                                                Anterior
                                            </button>
                                            <span className="text-sm text-gray-600">
                                                Página {currentPage} de {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all font-medium"
                                            >
                                                Próximo
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Seção de Relatórios */}
            {activeSection === 'relatorios' && (
                <div className="flex-1 overflow-y-auto">
                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-semibold mb-2">Relatórios de Produtos</h2>
                            <p className="text-sm text-gray-600">Gere relatórios e análises dos seus produtos.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#008080] to-[#006666] rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                                    <Box className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Produtos por Categoria</h3>
                                <p className="text-sm text-gray-600 mb-5">Distribuição por categoria de produtos</p>
                                <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg hover:bg-[#006666] transition-all font-medium shadow-sm">
                                    Gerar Relatório
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Estoque Baixo</h3>
                                <p className="text-sm text-gray-600 mb-5">Produtos com estoque abaixo do mínimo</p>
                                <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg hover:bg-[#006666] transition-all font-medium shadow-sm">
                                    Gerar Relatório
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Valor do Estoque</h3>
                                <p className="text-sm text-gray-600 mb-5">Valor total do estoque por categoria</p>
                                <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg hover:bg-[#006666] transition-all font-medium shadow-sm">
                                    Gerar Relatório
                                </button>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">Margem de Lucro</h3>
                                <p className="text-sm text-gray-600 mb-5">Análise de margem de lucro dos produtos</p>
                                <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg hover:bg-[#006666] transition-all font-medium shadow-sm">
                                    Gerar Relatório
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

