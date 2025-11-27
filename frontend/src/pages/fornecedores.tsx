import { useState, useEffect } from 'react';
import { Plus, List, FileText, Settings, Search, Filter, Download, Edit, Trash2, Save, RotateCcw, X } from 'lucide-react';

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
                    <div className="bg-white rounded-lg p-6 h-full flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-[#008080]">Lista de Fornecedores</h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar fornecedor..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
                                    />
                                    <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                                    <Filter className="w-5 h-5" /> Filtros
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#008080] text-white rounded-lg hover:bg-[#006666]">
                                    <Download className="w-5 h-5" /> Exportar
                                </button>
                            </div>
                        </div>

                        <div className="overflow-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="p-4 border-b font-semibold text-gray-600">Código</th>
                                        <th className="p-4 border-b font-semibold text-gray-600">Nome</th>
                                        <th className="p-4 border-b font-semibold text-gray-600">Ramo</th>
                                        <th className="p-4 border-b font-semibold text-gray-600">Cidade/UF</th>
                                        <th className="p-4 border-b font-semibold text-gray-600">Status</th>
                                        <th className="p-4 border-b font-semibold text-gray-600">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFornecedores.length > 0 ? (
                                        filteredFornecedores.map((fornecedor) => (
                                            <tr key={fornecedor.id} className="hover:bg-gray-50 border-b">
                                                <td className="p-4">{fornecedor.codigo}</td>
                                                <td className="p-4">
                                                    <div className="font-medium">{fornecedor.nome}</div>
                                                    <div className="text-sm text-gray-500">{fornecedor.email}</div>
                                                </td>
                                                <td className="p-4">{fornecedor.ramoAtividade || '-'}</td>
                                                <td className="p-4">{fornecedor.cidade}/{fornecedor.uf}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${fornecedor.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                        {fornecedor.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEdit(fornecedor)}
                                                            className="p-2 hover:bg-blue-100 rounded-full text-blue-600"
                                                            title="Editar"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(fornecedor.id)}
                                                            className="p-2 hover:bg-red-100 rounded-full text-red-600"
                                                            title="Excluir"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-gray-500">
                                                Nenhum fornecedor encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'cadastro':
                return (
                    <div className="bg-white rounded-lg p-6 h-full overflow-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[#008080]">
                                {isEditing ? `Editar Fornecedor - ${formData.codigo}` : 'Novo Fornecedor'}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={() => { resetForm(); setActiveTab('lista'); }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Dados Básicos */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Dados Básicos</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                                        <input
                                            type="text"
                                            disabled
                                            value={formData.codigo || 'Automático'}
                                            className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ *</label>
                                        <input
                                            type="text"
                                            name="cnpj"
                                            value={formData.cnpj}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            placeholder="00.000.000/0000-00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
                                        <input
                                            type="text"
                                            name="rg"
                                            value={formData.rg}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                                            <input
                                                type="text"
                                                name="celular"
                                                value={formData.celular}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                                placeholder="(00) 00000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone Fixo</label>
                                            <input
                                                type="text"
                                                name="telefoneFixo"
                                                value={formData.telefoneFixo}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                                placeholder="(00) 0000-0000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ramo de Atividade</label>
                                        <input
                                            type="text"
                                            name="ramoAtividade"
                                            value={formData.ramoAtividade}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Endereço */}
                            <section>
                                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Endereço</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                                        <input
                                            type="text"
                                            name="cep"
                                            value={formData.cep}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            placeholder="00000-000"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Endereço (Logradouro)</label>
                                        <input
                                            type="text"
                                            name="endereco"
                                            value={formData.endereco}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                                        <input
                                            type="text"
                                            name="numero"
                                            value={formData.numero}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                                        <input
                                            type="text"
                                            name="complemento"
                                            value={formData.complemento}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                                        <input
                                            type="text"
                                            name="bairro"
                                            value={formData.bairro}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                        <input
                                            type="text"
                                            name="cidade"
                                            value={formData.cidade}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">UF</label>
                                        <input
                                            type="text"
                                            name="uf"
                                            value={formData.uf}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                                            maxLength={2}
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-end gap-4 pt-4">
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
                    </div>
                );

            case 'relatorios':
                return (
                    <div className="bg-white rounded-lg p-6 h-full">
                        <h2 className="text-xl font-bold text-[#008080] mb-6">Relatórios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Fornecedores por Ramo', desc: 'Distribuição por ramo de atividade' },
                                { title: 'Fornecedores por Estado', desc: 'Distribuição geográfica' },
                                { title: 'Status dos Fornecedores', desc: 'Ativos vs Inativos' },
                                { title: 'Lista de Contatos', desc: 'Exportar contatos para email' }
                            ].map((rel, idx) => (
                                <div key={idx} className="border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-teal-50 rounded-lg group-hover:bg-[#008080] group-hover:text-white transition-colors">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <Download className="w-5 h-5 text-gray-400 group-hover:text-[#008080]" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{rel.title}</h3>
                                    <p className="text-gray-500 text-sm">{rel.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
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
        <div className="h-full flex flex-col gap-6 p-6 bg-gray-100">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Fornecedores</h1>
                    <p className="text-gray-500">Gerencie seus parceiros comerciais</p>
                </div>
                <button
                    onClick={() => { resetForm(); setActiveTab('cadastro'); }}
                    className="flex items-center gap-2 bg-[#008080] text-white px-6 py-3 rounded-xl hover:bg-[#006666] transition-colors shadow-lg shadow-teal-900/20"
                >
                    <Plus className="w-5 h-5" /> Novo Fornecedor
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 bg-white p-2 rounded-xl shadow-sm w-fit">
                {[
                    { id: 'lista', label: 'Lista', icon: List },
                    { id: 'cadastro', label: 'Cadastro', icon: Plus },
                    { id: 'relatorios', label: 'Relatórios', icon: FileText },
                    { id: 'configuracoes', label: 'Configurações', icon: Settings }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${activeTab === tab.id
                                ? 'bg-[#008080] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0">
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
