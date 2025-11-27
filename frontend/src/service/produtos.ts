import { Produto } from "../pages/produtos/index"

async function getAllProdutos(){
    const data = await fetch('http://127.0.0.1:8000/produtos/')

    if(!data.ok){
        throw new Error('Requisição dos produtos não realizadas')
    }

    return await data.json() as Produto[]
}

async function createProduto(bodyProduto: Produto) {
    const response = await fetch('http://127.0.0.1:8000/produtos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyProduto)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json()
}

async function updateProduto(bodyProduto: Produto) {
    const response = await fetch('http://127.0.0.1:8000/produtos/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyProduto)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

async function deleteProduto(nome: string) {
    // Alterei de email para nome, pois produtos geralmente são buscados por nome ou código
    const responseGet = await fetch(`http://127.0.0.1:8000/produtos?nome=${nome}`);

    const data: Produto = await responseGet.json() 

    const response = await fetch(`http://127.0.0.1:8000/produtos/${data.id}`, {
        method: 'DELETE'
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

export const ServiceProduto = {
    getAllProdutos,
    createProduto,
    updateProduto,
    deleteProduto,
}