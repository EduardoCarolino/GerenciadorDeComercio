// Sistema de Gerenciamento - JavaScript Principal
class SistemaGerenciamento {
    constructor() {
        this.currentUser = null;
        this.clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        this.funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        this.fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];
        this.produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        this.vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboardData();
        this.initializeFeatherIcons();
    }

    setupEventListeners() {
        // Navegação da sidebar - agora usa links diretos para as páginas
        // Não precisa mais interceptar cliques na sidebar

        // Formulários
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('client-form')) {
                e.preventDefault();
                this.saveCliente(e.target);
            }
            if (e.target.classList.contains('employee-form')) {
                e.preventDefault();
                this.saveFuncionario(e.target);
            }
            if (e.target.classList.contains('supplier-form')) {
                e.preventDefault();
                this.saveFornecedor(e.target);
            }
            if (e.target.classList.contains('product-form')) {
                e.preventDefault();
                this.saveProduto(e.target);
            }
            if (e.target.classList.contains('sale-form')) {
                e.preventDefault();
                this.saveVenda(e.target);
            }
        });

        // Botões de ação
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-novo')) {
                this.clearForm(e.target.closest('form'));
            }
            if (e.target.classList.contains('btn-excluir')) {
                this.deleteRecord(e.target);
            }
            if (e.target.classList.contains('btn-editar')) {
                this.editRecord(e.target);
            }
        });

        // Login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login(e.target);
            });
        }
    }

    // Métodos de navegação dinâmica removidos - agora usa páginas separadas

    // Métodos de geração de conteúdo removidos - cada página tem seu próprio HTML

    // Métodos de geração de conteúdo removidos - cada página tem seu próprio HTML



    // === FUNÇÕES DE LOGIN ===
    login(form) {
        const email = form.email.value;
        const password = form.password.value;

        // Simulação de login (em produção, fazer validação real)
        if (email && password) {
            this.currentUser = { email, name: 'Administrador' };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            window.location.href = 'pages/dashboard.html';
        } else {
            this.showAlert('Por favor, preencha todos os campos', 'error');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    // === FUNÇÕES DE CLIENTES ===
    saveCliente(form) {
        const formData = new FormData(form);
        const cliente = {
            id: Date.now(),
            codigo: formData.get('codigo') || this.generateCode('CLI'),
            nome: formData.get('nome'),
            email: formData.get('email'),
            celular: formData.get('celular'),
            telefone: formData.get('telefone'),
            cep: formData.get('cep'),
            endereco: formData.get('endereco'),
            numero: formData.get('numero'),
            bairro: formData.get('bairro'),
            cidade: formData.get('cidade'),
            uf: formData.get('uf'),
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        };

        this.clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(this.clientes));
        this.showAlert('Cliente salvo com sucesso!', 'success');
        this.clearForm(form);
        this.loadClientesTable();
    }

    loadClientesTable() {
        const tbody = document.querySelector('#clientesTable tbody');
        if (!tbody) return;

        if (this.clientes.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="empty-state">
                        <i data-feather="users"></i>
                        <h4>Nenhum cliente cadastrado</h4>
                        <p>Comece cadastrando seu primeiro cliente usando o formulário acima.</p>
                    </td>
                </tr>
            `;
            feather.replace();
            return;
        }

        tbody.innerHTML = this.clientes.map(cliente => `
            <tr class="fade-in-up">
                <td><strong>${cliente.codigo}</strong></td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.celular || '-'}</td>
                <td>${cliente.cidade || '-'}</td>
                <td>${cliente.uf || '-'}</td>
                <td>${cliente.dataCadastro || '-'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-editar" data-id="${cliente.id}" 
                                data-tooltip="Editar cliente">
                            <i data-feather="edit-2"></i>
                        </button>
                        <button class="btn btn-sm btn-excluir" data-id="${cliente.id}" 
                                data-tooltip="Excluir cliente">
                            <i data-feather="trash-2"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        feather.replace();
    }

    // === FUNÇÕES DE FUNCIONÁRIOS ===
    saveFuncionario(form) {
        const formData = new FormData(form);
        const funcionario = {
            id: Date.now(),
            codigo: formData.get('codigo') || this.generateCode('FUN'),
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            cargo: formData.get('cargo'),
            salario: formData.get('salario'),
            dataAdmissao: formData.get('dataAdmissao'),
            status: formData.get('status') || 'ativo'
        };

        this.funcionarios.push(funcionario);
        localStorage.setItem('funcionarios', JSON.stringify(this.funcionarios));
        this.showAlert('Funcionário salvo com sucesso!', 'success');
        this.clearForm(form);
        this.loadFuncionariosTable();
    }

    loadFuncionariosTable() {
        const tbody = document.querySelector('#funcionariosTable tbody');
        if (!tbody) return;

        tbody.innerHTML = this.funcionarios.map(funcionario => `
            <tr>
                <td>${funcionario.codigo}</td>
                <td>${funcionario.nome}</td>
                <td>${funcionario.email}</td>
                <td>${funcionario.cargo}</td>
                <td>R$ ${parseFloat(funcionario.salario).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td><span class="status-${funcionario.status}">${funcionario.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm btn-editar" data-id="${funcionario.id}">Editar</button>
                    <button class="btn btn-secondary btn-sm btn-excluir" data-id="${funcionario.id}">Excluir</button>
                </td>
            </tr>
        `).join('');
    }

    // === FUNÇÕES DE FORNECEDORES ===
    saveFornecedor(form) {
        const formData = new FormData(form);
        const fornecedor = {
            id: Date.now(),
            codigo: formData.get('codigo') || this.generateCode('FOR'),
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            cnpj: formData.get('cnpj'),
            endereco: formData.get('endereco'),
            cidade: formData.get('cidade'),
            uf: formData.get('uf'),
            status: formData.get('status') || 'ativo'
        };

        this.fornecedores.push(fornecedor);
        localStorage.setItem('fornecedores', JSON.stringify(this.fornecedores));
        this.showAlert('Fornecedor salvo com sucesso!', 'success');
        this.clearForm(form);
        this.loadFornecedoresTable();
    }

    loadFornecedoresTable() {
        const tbody = document.querySelector('#fornecedoresTable tbody');
        if (!tbody) return;

        tbody.innerHTML = this.fornecedores.map(fornecedor => `
            <tr>
                <td>${fornecedor.codigo}</td>
                <td>${fornecedor.nome}</td>
                <td>${fornecedor.email}</td>
                <td>${fornecedor.cnpj}</td>
                <td>${fornecedor.cidade}</td>
                <td>${fornecedor.uf}</td>
                <td><span class="status-${fornecedor.status}">${fornecedor.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm btn-editar" data-id="${fornecedor.id}">Editar</button>
                    <button class="btn btn-secondary btn-sm btn-excluir" data-id="${fornecedor.id}">Excluir</button>
                </td>
            </tr>
        `).join('');
    }

    // === FUNÇÕES DE PRODUTOS ===
    saveProduto(form) {
        const formData = new FormData(form);
        const produto = {
            id: Date.now(),
            codigo: formData.get('codigo') || this.generateCode('PRO'),
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            categoria: formData.get('categoria'),
            preco: formData.get('preco'),
            estoque: formData.get('estoque'),
            estoqueMinimo: formData.get('estoqueMinimo'),
            status: formData.get('status') || 'ativo'
        };

        this.produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(this.produtos));
        this.showAlert('Produto salvo com sucesso!', 'success');
        this.clearForm(form);
        this.loadProdutosTable();
    }

    loadProdutosTable() {
        const tbody = document.querySelector('#produtosTable tbody');
        if (!tbody) return;

        tbody.innerHTML = this.produtos.map(produto => `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${parseFloat(produto.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td>${produto.estoque}</td>
                <td><span class="status-${produto.status}">${produto.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm btn-editar" data-id="${produto.id}">Editar</button>
                    <button class="btn btn-secondary btn-sm btn-excluir" data-id="${produto.id}">Excluir</button>
                </td>
            </tr>
        `).join('');
    }

    // === FUNÇÕES DE VENDAS ===
    saveVenda(form) {
        const formData = new FormData(form);
        const venda = {
            id: Date.now(),
            codigo: formData.get('codigo') || this.generateCode('VEN'),
            cliente: formData.get('cliente'),
            produto: formData.get('produto'),
            quantidade: formData.get('quantidade'),
            valorUnitario: formData.get('valorUnitario'),
            valorTotal: formData.get('valorTotal'),
            dataVenda: formData.get('dataVenda'),
            status: formData.get('status') || 'pendente'
        };

        this.vendas.push(venda);
        localStorage.setItem('vendas', JSON.stringify(this.vendas));
        this.showAlert('Venda registrada com sucesso!', 'success');
        this.clearForm(form);
        this.loadVendasTable();
    }

    loadVendasTable() {
        const tbody = document.querySelector('#vendasTable tbody');
        if (!tbody) return;

        tbody.innerHTML = this.vendas.map(venda => `
            <tr>
                <td>${venda.codigo}</td>
                <td>${venda.cliente}</td>
                <td>${venda.produto}</td>
                <td>${venda.quantidade}</td>
                <td>R$ ${parseFloat(venda.valorTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td>${venda.dataVenda}</td>
                <td><span class="status-${venda.status}">${venda.status}</span></td>
                <td>
                    <button class="btn btn-outline btn-sm btn-editar" data-id="${venda.id}">Editar</button>
                    <button class="btn btn-secondary btn-sm btn-excluir" data-id="${venda.id}">Excluir</button>
                </td>
            </tr>
        `).join('');
    }

    // === DASHBOARD ===
    loadDashboardData() {
        // Atualiza os cards do dashboard
        const vendasHoje = this.vendas.filter(v => v.dataVenda === new Date().toLocaleDateString('pt-BR')).length;
        const novosClientes = this.clientes.filter(c => c.dataCadastro === new Date().toLocaleDateString('pt-BR')).length;
        const pedidosPendentes = this.vendas.filter(v => v.status === 'pendente').length;
        const estoqueBaixo = this.produtos.filter(p => parseInt(p.estoque) <= parseInt(p.estoqueMinimo)).length;

        document.querySelector('.card:nth-child(1) .card-info p')?.textContent = `R$ ${(vendasHoje * 150).toLocaleString('pt-BR')}`;
        document.querySelector('.card:nth-child(2) .card-info p')?.textContent = novosClientes;
        document.querySelector('.card:nth-child(3) .card-info p')?.textContent = pedidosPendentes;
        document.querySelector('.card:nth-child(4) .card-info p')?.textContent = `${estoqueBaixo} produtos`;

        // Atualiza a tabela de atividades recentes
        this.loadRecentActivities();
    }

    loadRecentActivities() {
        const tbody = document.querySelector('#recentActivities tbody');
        if (!tbody) return;

        const recentVendas = this.vendas.slice(-4).reverse();
        tbody.innerHTML = recentVendas.map(venda => `
            <tr>
                <td>${venda.codigo}</td>
                <td>${venda.cliente}</td>
                <td>R$ ${parseFloat(venda.valorTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td><span class="status-${venda.status}">${venda.status}</span></td>
            </tr>
        `).join('');
    }

    // === FUNÇÕES UTILITÁRIAS ===
    generateCode(prefix) {
        const timestamp = Date.now().toString().slice(-4);
        return `${prefix}${timestamp}`;
    }

    clearForm(form) {
        form.reset();
        // Gera novo código
        const codigoInput = form.querySelector('input[name="codigo"]');
        if (codigoInput) {
            const prefix = codigoInput.value.substring(0, 3);
            codigoInput.value = this.generateCode(prefix);
        }
    }

    deleteRecord(button) {
        const id = parseInt(button.dataset.id);
        const table = button.closest('table');
        
        if (confirm('Tem certeza que deseja excluir este registro?')) {
            if (table.id === 'clientesTable') {
                this.clientes = this.clientes.filter(c => c.id !== id);
                localStorage.setItem('clientes', JSON.stringify(this.clientes));
                this.loadClientesTable();
            } else if (table.id === 'funcionariosTable') {
                this.funcionarios = this.funcionarios.filter(f => f.id !== id);
                localStorage.setItem('funcionarios', JSON.stringify(this.funcionarios));
                this.loadFuncionariosTable();
            } else if (table.id === 'fornecedoresTable') {
                this.fornecedores = this.fornecedores.filter(f => f.id !== id);
                localStorage.setItem('fornecedores', JSON.stringify(this.fornecedores));
                this.loadFornecedoresTable();
            } else if (table.id === 'produtosTable') {
                this.produtos = this.produtos.filter(p => p.id !== id);
                localStorage.setItem('produtos', JSON.stringify(this.produtos));
                this.loadProdutosTable();
            } else if (table.id === 'vendasTable') {
                this.vendas = this.vendas.filter(v => v.id !== id);
                localStorage.setItem('vendas', JSON.stringify(this.vendas));
                this.loadVendasTable();
            }
            this.showAlert('Registro excluído com sucesso!', 'success');
        }
    }

    editRecord(button) {
        const id = parseInt(button.dataset.id);
        // Implementar edição (preencher formulário com dados existentes)
        this.showAlert('Funcionalidade de edição será implementada em breve', 'info');
    }

    showAlert(message, type = 'info') {
        // Criar elemento de alerta
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        // Cores baseadas no tipo
        const colors = {
            success: '#16a34a',
            error: '#dc2626',
            warning: '#d97706',
            info: '#0ea5e9'
        };
        alert.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(alert);

        // Remover após 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    initializeFeatherIcons() {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    // === MÉTODOS AUXILIARES PARA VENDAS ===
    loadClientesSelect() {
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const select = document.getElementById('cliente');
        if (!select) return;
        
        select.innerHTML = '<option value="">Selecione o cliente</option>';
        clientes.forEach(cliente => {
            select.innerHTML += `<option value="${cliente.nome}">${cliente.nome}</option>`;
        });
    }

    loadProdutosSelect() {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const select = document.getElementById('produto');
        if (!select) return;
        
        select.innerHTML = '<option value="">Selecione o produto</option>';
        produtos.forEach(produto => {
            select.innerHTML += `<option value="${produto.nome}" data-preco="${produto.preco}">${produto.nome} - R$ ${parseFloat(produto.preco).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</option>`;
        });
    }

    setupVendaCalculations() {
        const produtoSelect = document.getElementById('produto');
        const quantidadeInput = document.getElementById('quantidade');
        const valorUnitarioInput = document.getElementById('valorUnitario');
        const valorTotalInput = document.getElementById('valorTotal');

        if (!produtoSelect || !quantidadeInput || !valorUnitarioInput || !valorTotalInput) return;

        produtoSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const preco = selectedOption.dataset.preco || 0;
            valorUnitarioInput.value = preco;
            calculateTotal();
        });

        quantidadeInput.addEventListener('input', calculateTotal);

        function calculateTotal() {
            const quantidade = parseFloat(quantidadeInput.value) || 0;
            const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
            const total = quantidade * valorUnitario;
            valorTotalInput.value = total.toFixed(2);
        }
    }
}

// Inicializar o sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.sistema = new SistemaGerenciamento();
});

// Função para logout
function logout() {
    if (window.sistema) {
        window.sistema.logout();
    }
}
