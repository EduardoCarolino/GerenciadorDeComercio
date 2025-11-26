// Funcionalidades específicas para a página de vendas
class VendaManager {
    constructor() {
        this.vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.filteredVendas = [...this.vendas];
        this.currentSection = 'pdv';
        this.cart = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSectionNavigation();
        this.loadVendasTable();
        this.loadProdutosSelect();
        this.setupMasks();
        this.loadConfiguracoes();
    }

    setupEventListeners() {
        // Busca em tempo real
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterVendas(e.target.value);
            });
        }

        // Filtro por status
        const filterSelect = document.getElementById('filterSelect');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.filterByStatus(e.target.value);
            });
        }

        // Botão de exportar
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportVendas();
            });
        }

        // Paginação
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());

        // PDV Events
        const adicionarItemBtn = document.getElementById('adicionarItem');
        if (adicionarItemBtn) {
            adicionarItemBtn.addEventListener('click', () => {
                this.adicionarItemCarrinho();
            });
        }

        const finalizarVendaBtn = document.getElementById('finalizarVenda');
        if (finalizarVendaBtn) {
            finalizarVendaBtn.addEventListener('click', () => {
                this.finalizarVenda();
            });
        }

        const cancelarVendaBtn = document.getElementById('cancelarVenda');
        if (cancelarVendaBtn) {
            cancelarVendaBtn.addEventListener('click', () => {
                this.cancelarVenda();
            });
        }

        // Produto select change
        const produtoSelect = document.getElementById('produtoNome');
        if (produtoSelect) {
            produtoSelect.addEventListener('change', (e) => {
                this.updateProdutoPreco(e.target.value);
            });
        }
    }

    setupSectionNavigation() {
        const sectionBtns = document.querySelectorAll('.section-btn');
        sectionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });
    }

    showSection(sectionName) {
        // Remove classe ativa de todos os botões e seções
        document.querySelectorAll('.section-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.section-content').forEach(content => {
            content.classList.remove('active');
        });

        // Adiciona classe ativa ao botão e seção selecionados
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        document.getElementById(`${sectionName}-section`).classList.add('active');

        this.currentSection = sectionName;

        // Carrega dados específicos da seção se necessário
        if (sectionName === 'historico') {
            this.loadVendasTable();
        } else if (sectionName === 'relatorios') {
            this.loadRelatorios();
        } else if (sectionName === 'configuracoes') {
            this.loadConfiguracoes();
        }
    }

    setupMasks() {
        // Máscara para CPF
        const cpfInput = document.getElementById('clienteCpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                e.target.value = this.formatCPF(e.target.value);
            });
        }

        // Máscara para telefone
        const telefoneInput = document.getElementById('clienteTelefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', (e) => {
                e.target.value = this.formatPhone(e.target.value);
            });
        }
    }

    formatCPF(value) {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    formatPhone(value) {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    loadProdutosSelect() {
        const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        const select = document.getElementById('produtoNome');
        if (select) {
            select.innerHTML = '<option value="">Selecione o produto</option>';
            produtos.forEach(produto => {
                select.innerHTML += `<option value="${produto.nome}" data-preco="${produto.preco}" data-codigo="${produto.codigo}">${produto.nome} - R$ ${parseFloat(produto.preco || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</option>`;
            });
        }
    }

    updateProdutoPreco(produtoNome) {
        const select = document.getElementById('produtoNome');
        const precoInput = document.getElementById('produtoPreco');
        const codigoInput = document.getElementById('produtoCodigo');
        
        if (select && precoInput && codigoInput) {
            const selectedOption = select.options[select.selectedIndex];
            const preco = selectedOption.dataset.preco || 0;
            const codigo = selectedOption.dataset.codigo || '';
            
            precoInput.value = preco;
            codigoInput.value = codigo;
        }
    }

    adicionarItemCarrinho() {
        const produtoSelect = document.getElementById('produtoNome');
        const quantidadeInput = document.getElementById('produtoQuantidade');
        const precoInput = document.getElementById('produtoPreco');
        const codigoInput = document.getElementById('produtoCodigo');

        if (!produtoSelect.value) {
            this.showAlert('Selecione um produto', 'warning');
            return;
        }

        const quantidade = parseInt(quantidadeInput.value) || 1;
        const preco = parseFloat(precoInput.value) || 0;
        const produto = produtoSelect.options[produtoSelect.selectedIndex].text.split(' - ')[0];

        const item = {
            codigo: codigoInput.value,
            produto: produto,
            quantidade: quantidade,
            preco: preco,
            subtotal: quantidade * preco
        };

        this.cart.push(item);
        this.updateCarrinho();
        this.clearProdutoForm();
        
        // Animação de sucesso
        const addButton = document.getElementById('adicionarItem');
        addButton.classList.add('success-animation');
        setTimeout(() => {
            addButton.classList.remove('success-animation');
        }, 600);
    }

    updateCarrinho() {
        const cartItems = document.getElementById('cartItems');
        const totalVenda = document.getElementById('totalVenda');

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-light);">
                    <i data-feather="shopping-cart"></i>
                    <p>Carrinho vazio</p>
                </div>
            `;
            totalVenda.textContent = 'R$ 0,00';
        } else {
            cartItems.innerHTML = this.cart.map((item, index) => `
                <div class="cart-item">
                    <div>${item.codigo}</div>
                    <div>${item.produto}</div>
                    <div>${item.quantidade}</div>
                    <div>R$ ${item.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <div>R$ ${item.subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <button class="remove-btn" onclick="vendaManager.removerItemCarrinho(${index})">
                        <i data-feather="trash-2"></i>
                    </button>
                </div>
            `).join('');

            const total = this.cart.reduce((sum, item) => sum + item.subtotal, 0);
            totalVenda.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
        }

        feather.replace();
    }

    removerItemCarrinho(index) {
        this.cart.splice(index, 1);
        this.updateCarrinho();
    }

    clearProdutoForm() {
        document.getElementById('produtoNome').value = '';
        document.getElementById('produtoPreco').value = '';
        document.getElementById('produtoCodigo').value = '';
        document.getElementById('produtoQuantidade').value = '1';
    }

    finalizarVenda() {
        if (this.cart.length === 0) {
            this.showAlert('Adicione pelo menos um item ao carrinho', 'warning');
            return;
        }

        const clienteNome = document.getElementById('clienteNome').value;
        const clienteCpf = document.getElementById('clienteCpf').value;
        const clienteTelefone = document.getElementById('clienteTelefone').value;

        const venda = {
            id: Date.now(),
            codigo: this.generateCodigoVenda(),
            cliente: {
                nome: clienteNome || 'Cliente Avulso',
                cpf: clienteCpf,
                telefone: clienteTelefone
            },
            itens: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + item.subtotal, 0),
            data: new Date().toISOString().split('T')[0],
            status: 'pago'
        };

        this.vendas.push(venda);
        localStorage.setItem('vendas', JSON.stringify(this.vendas));
        
        this.showAlert('Venda finalizada com sucesso!', 'success');
        this.cancelarVenda();
        this.loadVendasTable();
    }

    cancelarVenda() {
        this.cart = [];
        this.updateCarrinho();
        document.getElementById('clienteNome').value = '';
        document.getElementById('clienteCpf').value = '';
        document.getElementById('clienteTelefone').value = '';
        this.clearProdutoForm();
    }

    generateCodigoVenda() {
        const configs = JSON.parse(localStorage.getItem('vendaConfigs')) || { proximoNumero: 1, prefixoCodigo: 'VEN' };
        const codigo = `${configs.prefixoCodigo}${configs.proximoNumero.toString().padStart(4, '0')}`;
        configs.proximoNumero++;
        localStorage.setItem('vendaConfigs', JSON.stringify(configs));
        return codigo;
    }

    filterVendas(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredVendas = this.vendas.filter(venda => 
            venda.codigo.toLowerCase().includes(term) ||
            venda.cliente.nome.toLowerCase().includes(term) ||
            venda.itens.some(item => item.produto.toLowerCase().includes(term))
        );
        this.currentPage = 1;
        this.loadVendasTable();
    }

    filterByStatus(status) {
        if (status === '') {
            this.filteredVendas = [...this.vendas];
        } else {
            this.filteredVendas = this.vendas.filter(venda => venda.status === status);
        }
        this.currentPage = 1;
        this.loadVendasTable();
    }

    loadVendasTable() {
        const tbody = document.querySelector('#vendasTable tbody');
        const pagination = document.getElementById('pagination');
        const recordCount = document.getElementById('recordCount');
        
        if (!tbody) return;

        if (this.filteredVendas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="empty-state">
                        <i data-feather="search"></i>
                        <h4>Nenhuma venda encontrada</h4>
                        <p>Tente ajustar os filtros de busca.</p>
                    </td>
                </tr>
            `;
            pagination.style.display = 'none';
            recordCount.textContent = '0 registros';
            feather.replace();
            return;
        }

        // Paginação
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageVendas = this.filteredVendas.slice(startIndex, endIndex);

        tbody.innerHTML = pageVendas.map(venda => `
            <tr class="fade-in-up">
                <td><strong>${venda.codigo}</strong></td>
                <td>${venda.cliente.nome}</td>
                <td>${venda.itens.length} item(s)</td>
                <td>${venda.itens.reduce((sum, item) => sum + item.quantidade, 0)}</td>
                <td>R$ ${venda.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td>${new Date(venda.data).toLocaleDateString('pt-BR')}</td>
                <td><span class="status-${venda.status}">${venda.status}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-editar" onclick="vendaManager.viewVenda(${venda.id})" 
                                data-tooltip="Ver detalhes">
                            <i data-feather="eye"></i>
                        </button>
                        <button class="btn btn-sm btn-excluir" onclick="vendaManager.deleteVenda(${venda.id})" 
                                data-tooltip="Excluir venda">
                            <i data-feather="trash-2"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Atualizar paginação
        this.updatePagination();
        
        // Atualizar contador
        recordCount.textContent = `${this.filteredVendas.length} registro${this.filteredVendas.length !== 1 ? 's' : ''}`;
        
        // Mostrar paginação se necessário
        pagination.style.display = this.filteredVendas.length > this.itemsPerPage ? 'flex' : 'none';
        
        feather.replace();
    }

    updatePagination() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const totalPages = Math.ceil(this.filteredVendas.length / this.itemsPerPage);

        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === totalPages;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadVendasTable();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredVendas.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.loadVendasTable();
        }
    }

    viewVenda(id) {
        const venda = this.vendas.find(v => v.id === id);
        if (venda) {
            let detalhes = `Venda: ${venda.codigo}\n`;
            detalhes += `Cliente: ${venda.cliente.nome}\n`;
            detalhes += `Data: ${new Date(venda.data).toLocaleDateString('pt-BR')}\n`;
            detalhes += `Status: ${venda.status}\n\n`;
            detalhes += `Itens:\n`;
            venda.itens.forEach(item => {
                detalhes += `- ${item.produto} (${item.quantidade}x) - R$ ${item.subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}\n`;
            });
            detalhes += `\nTotal: R$ ${venda.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
            
            alert(detalhes);
        }
    }

    deleteVenda(id) {
        if (confirm('Tem certeza que deseja excluir esta venda?')) {
            this.vendas = this.vendas.filter(v => v.id !== id);
            localStorage.setItem('vendas', JSON.stringify(this.vendas));
            this.filteredVendas = this.filteredVendas.filter(v => v.id !== id);
            this.loadVendasTable();
            this.showAlert('Venda excluída com sucesso!', 'success');
        }
    }

    exportVendas() {
        const data = this.filteredVendas.map(venda => ({
            'Código': venda.codigo,
            'Cliente': venda.cliente.nome,
            'CPF': venda.cliente.cpf || '',
            'Data': new Date(venda.data).toLocaleDateString('pt-BR'),
            'Total': venda.total,
            'Status': venda.status,
            'Itens': venda.itens.length
        }));

        const csv = this.convertToCSV(data);
        this.downloadCSV(csv, 'vendas.csv');
        this.showAlert('Dados exportados com sucesso!', 'success');
    }

    convertToCSV(data) {
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
        ].join('\n');
        return csvContent;
    }

    downloadCSV(csv, filename) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    showAlert(message, type = 'info') {
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

        const colors = {
            success: '#16a34a',
            error: '#dc2626',
            warning: '#d97706',
            info: '#0ea5e9'
        };
        alert.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // === MÉTODOS PARA RELATÓRIOS ===
    loadRelatorios() {
        console.log('Carregando relatórios...');
    }

    gerarRelatorioPeriodo() {
        const vendasPorData = this.vendas.reduce((acc, venda) => {
            const data = venda.data;
            acc[data] = (acc[data] || 0) + venda.total;
            return acc;
        }, {});

        const csv = Object.entries(vendasPorData)
            .map(([data, total]) => `${data},${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`)
            .join('\n');
        
        const csvContent = 'Data,Total de Vendas\n' + csv;
        this.downloadCSV(csvContent, 'vendas_por_periodo.csv');
        this.showAlert('Relatório de vendas por período gerado!', 'success');
    }

    gerarRelatorioCliente() {
        const vendasPorCliente = this.vendas.reduce((acc, venda) => {
            const cliente = venda.cliente.nome;
            acc[cliente] = (acc[cliente] || 0) + venda.total;
            return acc;
        }, {});

        const csv = Object.entries(vendasPorCliente)
            .sort(([,a], [,b]) => b - a)
            .map(([cliente, total]) => `${cliente},${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`)
            .join('\n');
        
        const csvContent = 'Cliente,Total de Compras\n' + csv;
        this.downloadCSV(csvContent, 'vendas_por_cliente.csv');
        this.showAlert('Relatório de vendas por cliente gerado!', 'success');
    }

    gerarRelatorioProdutos() {
        const produtosVendidos = {};
        this.vendas.forEach(venda => {
            venda.itens.forEach(item => {
                produtosVendidos[item.produto] = (produtosVendidos[item.produto] || 0) + item.quantidade;
            });
        });

        const csv = Object.entries(produtosVendidos)
            .sort(([,a], [,b]) => b - a)
            .map(([produto, quantidade]) => `${produto},${quantidade}`)
            .join('\n');
        
        const csvContent = 'Produto,Quantidade Vendida\n' + csv;
        this.downloadCSV(csvContent, 'produtos_mais_vendidos.csv');
        this.showAlert('Relatório de produtos mais vendidos gerado!', 'success');
    }

    gerarRelatorioFaturamento() {
        const faturamentoMensal = this.vendas.reduce((acc, venda) => {
            const mes = new Date(venda.data).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
            acc[mes] = (acc[mes] || 0) + venda.total;
            return acc;
        }, {});

        const csv = Object.entries(faturamentoMensal)
            .map(([mes, total]) => `${mes},${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`)
            .join('\n');
        
        const csvContent = 'Mês,Faturamento\n' + csv;
        this.downloadCSV(csvContent, 'faturamento_mensal.csv');
        this.showAlert('Relatório de faturamento mensal gerado!', 'success');
    }

    // === MÉTODOS PARA CONFIGURAÇÕES ===
    loadConfiguracoes() {
        const configs = JSON.parse(localStorage.getItem('vendaConfigs')) || {
            prefixoCodigo: 'VEN',
            proximoNumero: 1,
            clienteObrigatorio: true,
            descontoPermitido: true,
            pagamentoMultiplo: true,
            trocoAutomatico: true,
            imprimirAutomatico: false,
            emailAutomatico: false
        };

        // Aplica as configurações nos campos
        Object.keys(configs).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = configs[key];
                } else {
                    element.value = configs[key];
                }
            }
        });
    }

    salvarConfiguracoes() {
        const configs = {
            prefixoCodigo: document.getElementById('prefixo-codigo').value,
            proximoNumero: parseInt(document.getElementById('proximo-numero').value),
            clienteObrigatorio: document.getElementById('cliente-obrigatorio').checked,
            descontoPermitido: document.getElementById('desconto-permitido').checked,
            pagamentoMultiplo: document.getElementById('pagamento-multiplo').checked,
            trocoAutomatico: document.getElementById('troco-automatico').checked,
            imprimirAutomatico: document.getElementById('imprimir-automatico').checked,
            emailAutomatico: document.getElementById('email-automatico').checked
        };

        localStorage.setItem('vendaConfigs', JSON.stringify(configs));
        this.showAlert('Configurações salvas com sucesso!', 'success');
    }

    resetarConfiguracoes() {
        if (confirm('Tem certeza que deseja resetar as configurações para os valores padrão?')) {
            localStorage.removeItem('vendaConfigs');
            this.loadConfiguracoes();
            this.showAlert('Configurações resetadas!', 'info');
        }
    }
}

// Inicializar o gerenciador de vendas
let vendaManager;
document.addEventListener('DOMContentLoaded', () => {
    vendaManager = new VendaManager();
});
