import { Venda } from "../pages/vendas/HistoricoVendas" // Supondo que você renomeou o arquivo/tipo também

async function getAllVendas(){
    const data = await fetch('http://127.0.0.1:8000/vendas/')

    if(!data.ok){
        throw new Error('Requisição das vendas não realizadas')
    }

    return await data.json() as Venda[]
}

async function createVenda(bodyVenda: Venda) {
    const response = await fetch('http://127.0.0.1:8000/vendas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyVenda)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json()
}

async function updateVenda(bodyVenda: Venda) {
    // Mantive a lógica original de enviar PUT para a raiz (/vendas/)
    // Certifique-se que seu backend aceita o ID dentro do body para fazer o update
    const response = await fetch('http://127.0.0.1:8000/vendas/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyVenda)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

async function deleteVenda(id: number | string) {
    // Alterado: Vendas geralmente são deletadas direto pelo ID. 
    // Buscar por "email" não faria sentido aqui.
    const response = await fetch(`http://127.0.0.1:8000/vendas/${id}`, {
        method: 'DELETE'
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

export const ServiceVenda = {
    getAllVendas,
    createVenda,
    updateVenda,
    deleteVenda,
}