import { useState, useEffect } from 'react';
import { Plus, List, FileText, Settings, Search, Filter, Download, Edit, Trash2, Save, RotateCcw, X, BarChart3, Mail } from 'lucide-react';

// Interface for Supplier
interface Fornecedor {
    id: number;
    codigo: string;
    nome: string;
    email: string;
    telefone: string;
    celular: string;
    telefoneFixo: string;
    cnpj: string;
    rg: string;
    cep: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    ramoAtividade: string;
    status: string;
}

export function Fornecedores() {
    const [activeTab, setActiveTab] = useState('lista');
    const [searchTerm, setSearchTerm] = useState('');

    // Form State
    const initialFormState: Fornecedor = {
        id: 0,
        codigo: '',
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        telefoneFixo: '',
        cnpj: '',
        rg: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        ramoAtividade: '',
        status: 'ativo'
    };
    const [formData, setFormData] = useState<Fornecedor>(initialFormState);
    const [isEditing, setIsEditing] = useState(false);

    // Mock Data
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
        {
            id: 1,
            codigo: "FOR0001",
            nome: "Empresa ABC Ltda",
            email: "contato@empresaabc.com",
            telefone: "(11) 3333-4444",
            celular: "(11) 99999-8888",
            telefoneFixo: "(11) 3333-4444",
            cnpj: "12.345.678/0001-90",
            rg: "",
            cep: "01234-567",
            endereco: "Rua das Flores",
            numero: "123",
            complemento: "Sala 1",
            bairro: "Centro",
            cidade: "São Paulo",
            uf: "SP",
            ramoAtividade: "Alimentício",
            status: "ativo"
        },
        {
            id: 2,
            codigo: "FOR0002",
            nome: "Tech Solutions SA",
            email: "vendas@techsolutions.com",
            telefone: "(11) 3333-5555",
            celular: "(11) 98888-7777",
            telefoneFixo: "(11) 3333-5555",
            cnpj: "98.765.432/0001-10",
            rg: "",
            cep: "13000-000",
            endereco: "Av. Tecnologia",
            numero: "1000",
            complemento: "",
            bairro: "Tecnopolo",
            cidade: "Campinas",
            uf: "SP",
            ramoAtividade: "Tecnologia",
            status: "ativo"
        }
    ]);

    // Filtered Suppliers
    const filteredFornecedores = fornecedores.filter(f =>
        f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            setFornecedores(prev => prev.map(f => f.id === formData.id ? formData : f));
            alert("Fornecedor atualizado com sucesso!");
        } else {
            const newId = Math.max(...fornecedores.map(f => f.id), 0) + 1;
            const newCode = `FOR${String(newId).padStart(4, '0')}`;
            const newFornecedor = { ...formData, id: newId, codigo: newCode };
            setFornecedores(prev => [...prev, newFornecedor]);
            alert("Fornecedor cadastrado com sucesso!");
        }

        resetForm();
        setActiveTab('lista');
    };

    const handleEdit = (fornecedor: Fornecedor) => {
        setFormData(fornecedor);
        setIsEditing(true);
        setActiveTab('cadastro');
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
            setFornecedores(prev => prev.filter(f => f.id !== id));
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setIsEditing(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'lista':
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
                                        <th className="text-left py-4 px-6 text-sm font-semibold">Código</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold">Nome</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold">Email</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold">Ramo</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold">Cidade/UF</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold">Status</th>
                                        <th className="text-center py-4 px-6 text-sm font-semibold">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFornecedores.length > 0 ? (
                                        filteredFornecedores.map((fornecedor, index) => (
                                            <tr 
                                                key={fornecedor.id} 
                                                className={`border-b border-gray-100 transition-colors ${
                                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                } hover:bg-[#E0F7F7]`}
                                            >
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{fornecedor.codigo}</td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900">{fornecedor.nome}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{fornecedor.email}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{fornecedor.ramoAtividade || '-'}</td>
                                                <td className="py-4 px-6 text-sm text-gray-600">{fornecedor.cidade}/{fornecedor.uf}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${fornecedor.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {fornecedor.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button 
                                                            onClick={() => handleEdit(fornecedor)}
                                                            className="p-2 text-[#008080] hover:bg-[#008080] hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(fornecedor.id)}
                                                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="py-8 px-6 text-center text-gray-500">
                                                Nenhum fornecedor encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                );

            case 'cadastro':
                return (
                    <>
                        <div className="mb-3 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {isEditing ? `Editar Fornecedor - ${formData.codigo}` : 'Cadastro de Fornecedores'}
                            </h2>
                            <p className="text-gray-600">
                                {isEditing ? 'Atualize os dados do fornecedor' : 'Insira os dados abaixo para registrar um novo fornecedor'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Coluna Esquerda */}
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Código</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={formData.codigo || 'Automático'}
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome *</label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Digite o nome do fornecedor"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="exemplo@email.com"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CNPJ *</label>
                                        <input
                                            type="text"
                                            name="cnpj"
                                            value={formData.cnpj}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="00.000.000/0000-00"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">RG</label>
                                        <input
                                            type="text"
                                            name="rg"
                                            value={formData.rg}
                                            onChange={handleInputChange}
                                            placeholder="Digite o RG"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Ramo de Atividade</label>
                                        <input
                                            type="text"
                                            name="ramoAtividade"
                                            value={formData.ramoAtividade}
                                            onChange={handleInputChange}
                                            placeholder="Digite o ramo de atividade"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Coluna Direita */}
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Celular</label>
                                            <input
                                                type="text"
                                                name="celular"
                                                value={formData.celular}
                                                onChange={handleInputChange}
                                                placeholder="(00) 00000-0000"
                                                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone Fixo</label>
                                            <input
                                                type="text"
                                                name="telefoneFixo"
                                                value={formData.telefoneFixo}
                                                onChange={handleInputChange}
                                                placeholder="(00) 0000-0000"
                                                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CEP</label>
                                        <input
                                            type="text"
                                            name="cep"
                                            value={formData.cep}
                                            onChange={handleInputChange}
                                            placeholder="00000-000"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Endereço</label>
                                        <input
                                            type="text"
                                            name="endereco"
                                            value={formData.endereco}
                                            onChange={handleInputChange}
                                            placeholder="Digite o endereço"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Número</label>
                                            <input
                                                type="text"
                                                name="numero"
                                                value={formData.numero}
                                                onChange={handleInputChange}
                                                placeholder="Número"
                                                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Complemento</label>
                                            <input
                                                type="text"
                                                name="complemento"
                                                value={formData.complemento}
                                                onChange={handleInputChange}
                                                placeholder="Complemento"
                                                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Bairro</label>
                                        <input
                                            type="text"
                                            name="bairro"
                                            value={formData.bairro}
                                            onChange={handleInputChange}
                                            placeholder="Digite o bairro"
                                            className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cidade</label>
                                            <input
                                                type="text"
                                                name="cidade"
                                                value={formData.cidade}
                                                onChange={handleInputChange}
                                                placeholder="Digite a cidade"
                                                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">UF</label>
                                            <input
                                                type="text"
                                                name="uf"
                                                value={formData.uf}
                                                onChange={handleInputChange}
                                                placeholder="UF"
                                                maxLength={2}
                                                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => { resetForm(); setActiveTab('lista'); }}
                                    className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]"
                                >
                                    {isEditing ? 'Atualizar Fornecedor' : 'Salvar Fornecedor'}
                                </button>
                            </div>
                        </form>
                    </>
                );

            case 'relatorios':
                return (
                    <>
                        <div className="mb-3 text-center">
                            <div className="flex items-center justify-center gap-3 mb-2">
                                <FileText className="w-7 h-7 text-gray-700" />
                                <h2 className="text-2xl font-bold text-gray-900">Relatórios de Fornecedores</h2>
                            </div>
                            <p className="text-sm text-gray-600">Gere relatórios e análises dos seus fornecedores</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: 'Fornecedores por Ramo', desc: 'Distribuição por ramo de atividade', icon: BarChart3 },
                                { title: 'Fornecedores por Estado', desc: 'Distribuição geográfica', icon: BarChart3 },
                                { title: 'Status dos Fornecedores', desc: 'Ativos vs Inativos', icon: FileText },
                                { title: 'Lista de Contatos', desc: 'Exportar contatos para email', icon: Mail }
                            ].map((rel, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col items-center text-center mb-3">
                                        <div className="w-14 h-14 bg-[#008080] rounded-full flex items-center justify-center mb-3">
                                            <rel.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{rel.title}</h3>
                                        <p className="text-xs text-gray-600">{rel.desc}</p>
                                    </div>
                                    <button className="w-full bg-[#008080] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#006666] transition-colors font-medium text-sm">
                                        <Download className="w-4 h-4" />
                                        Gerar Relatório
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                );

            case 'configuracoes':
                return (
                    <div className="bg-white rounded-lg p-6 h-full">
                        <h2 className="text-xl font-bold text-[#008080] mb-6">Configurações</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-[#008080]" /> Numeração
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Prefixo do Código</label>
                                            <input type="text" defaultValue="FOR" className="w-full p-2 border rounded" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Próximo Número</label>
                                            <input type="number" defaultValue="3" className="w-full p-2 border rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 border rounded-lg">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <CheckSquare className="w-5 h-5 text-[#008080]" /> Validações
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="rounded text-[#008080]" />
                                            <span className="text-sm">CNPJ Obrigatório</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="rounded text-[#008080]" />
                                            <span className="text-sm">Busca de CEP Automática</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]">
                                <Save className="w-4 h-4" /> Salvar Configurações
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-50">
                                <RotateCcw className="w-4 h-4" /> Restaurar Padrões
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full pt-5 px-8 pb-8 overflow-y-auto">
            <div className="mb-4 flex-shrink-0">
                <div className="mb-4">
                    <h1 className="text-5xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600 text-base">Visão geral do seu negócio.</p>
                </div>
                <div className="bg-white rounded-lg py-1 px-4 flex gap-3">
                    {[
                        { id: 'cadastro', label: 'Fornecedores', icon: Plus },
                        { id: 'lista', label: 'Lista', icon: List },
                        { id: 'relatorios', label: 'Relatórios', icon: FileText },
                        { id: 'configuracoes', label: 'Configurações', icon: Settings }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-normal text-sm ${
                                activeTab === tab.id
                                    ? 'bg-[#008080] text-white hover:bg-[#006666]'
                                    : 'bg-[#80C0C0] text-white hover:bg-[#66A6A6]'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl py-3 px-8">
                {renderContent()}
            </div>
        </div>
    );
}

// Helper component for icons if needed, but lucide-react is used directly
function CheckSquare({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
    )
}
