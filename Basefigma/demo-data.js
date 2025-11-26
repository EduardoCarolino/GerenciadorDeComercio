// Dados de demonstração para o sistema
// Execute este script no console do navegador para popular o sistema com dados de exemplo

const demoData = {
    clientes: [
        {
            id: 1,
            codigo: "CLI0001",
            nome: "Ana Silva",
            email: "ana.silva@email.com",
            celular: "(11) 99999-9999",
            telefone: "(11) 3333-3333",
            cep: "01234-567",
            endereco: "Rua das Flores, 123",
            numero: "123",
            bairro: "Centro",
            cidade: "São Paulo",
            uf: "SP",
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        },
        {
            id: 2,
            codigo: "CLI0002",
            nome: "Carlos Souza",
            email: "carlos.souza@email.com",
            celular: "(11) 88888-8888",
            telefone: "",
            cep: "04567-890",
            endereco: "Av. Paulista, 1000",
            numero: "1000",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            uf: "SP",
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        }
    ],
    funcionarios: [
        {
            id: 1,
            codigo: "FUN0001",
            nome: "João Santos",
            email: "joao.santos@empresa.com",
            telefone: "(11) 77777-7777",
            cargo: "Gerente",
            salario: "5000.00",
            dataAdmissao: "2023-01-15",
            status: "ativo"
        },
        {
            id: 2,
            codigo: "FUN0002",
            nome: "Maria Oliveira",
            email: "maria.oliveira@empresa.com",
            telefone: "(11) 66666-6666",
            cargo: "Vendedora",
            salario: "3000.00",
            dataAdmissao: "2023-03-20",
            status: "ativo"
        }
    ],
    fornecedores: [
        {
            id: 1,
            codigo: "FOR0001",
            nome: "Fornecedor ABC Ltda",
            email: "contato@fornecedorabc.com",
            telefone: "(11) 55555-5555",
            cnpj: "12.345.678/0001-90",
            endereco: "Rua Industrial, 500",
            cidade: "São Paulo",
            uf: "SP",
            status: "ativo"
        }
    ],
    produtos: [
        {
            id: 1,
            codigo: "PRO0001",
            nome: "Smartphone Samsung Galaxy",
            descricao: "Smartphone com 128GB de armazenamento",
            categoria: "Eletrônicos",
            preco: "1200.00",
            estoque: "50",
            estoqueMinimo: "10",
            status: "ativo"
        },
        {
            id: 2,
            codigo: "PRO0002",
            nome: "Notebook Dell Inspiron",
            descricao: "Notebook com 8GB RAM e SSD 256GB",
            categoria: "Eletrônicos",
            preco: "2500.00",
            estoque: "25",
            estoqueMinimo: "5",
            status: "ativo"
        },
        {
            id: 3,
            codigo: "PRO0003",
            nome: "Camiseta Polo",
            descricao: "Camiseta polo masculina tamanho M",
            categoria: "Roupas",
            preco: "89.90",
            estoque: "100",
            estoqueMinimo: "20",
            status: "ativo"
        }
    ],
    vendas: [
        {
            id: 1,
            codigo: "VEN0001",
            cliente: "Ana Silva",
            produto: "Smartphone Samsung Galaxy",
            quantidade: "1",
            valorUnitario: "1200.00",
            valorTotal: "1200.00",
            dataVenda: new Date().toLocaleDateString('pt-BR'),
            status: "pago"
        },
        {
            id: 2,
            codigo: "VEN0002",
            cliente: "Carlos Souza",
            produto: "Notebook Dell Inspiron",
            quantidade: "1",
            valorUnitario: "2500.00",
            valorTotal: "2500.00",
            dataVenda: new Date().toLocaleDateString('pt-BR'),
            status: "pendente"
        }
    ]
};

// Função para carregar dados de demonstração
function loadDemoData() {
    localStorage.setItem('clientes', JSON.stringify(demoData.clientes));
    localStorage.setItem('funcionarios', JSON.stringify(demoData.funcionarios));
    localStorage.setItem('fornecedores', JSON.stringify(demoData.fornecedores));
    localStorage.setItem('produtos', JSON.stringify(demoData.produtos));
    localStorage.setItem('vendas', JSON.stringify(demoData.vendas));
    
    console.log('✅ Dados de demonstração carregados com sucesso!');
    console.log('📊 Resumo dos dados:');
    console.log(`👥 Clientes: ${demoData.clientes.length}`);
    console.log(`👨‍💼 Funcionários: ${demoData.funcionarios.length}`);
    console.log(`🚚 Fornecedores: ${demoData.fornecedores.length}`);
    console.log(`📦 Produtos: ${demoData.produtos.length}`);
    console.log(`💰 Vendas: ${demoData.vendas.length}`);
    
    alert('Dados de demonstração carregados! Recarregue a página para ver os dados.');
}

// Função para limpar todos os dados
function clearAllData() {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
        localStorage.clear();
        console.log('🗑️ Todos os dados foram removidos!');
        alert('Todos os dados foram removidos!');
    }
}

// Instruções de uso
console.log('🚀 Sistema de Gerenciamento - Dados de Demonstração');
console.log('');
console.log('Para carregar dados de exemplo, execute:');
console.log('loadDemoData()');
console.log('');
console.log('Para limpar todos os dados, execute:');
console.log('clearAllData()');
console.log('');
console.log('Os dados incluem:');
console.log('- 2 clientes de exemplo');
console.log('- 2 funcionários de exemplo');
console.log('- 1 fornecedor de exemplo');
console.log('- 3 produtos de exemplo');
console.log('- 2 vendas de exemplo');

