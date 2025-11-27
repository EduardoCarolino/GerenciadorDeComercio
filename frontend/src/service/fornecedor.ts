import { Fornecedor } from "../pages/fornecedores"

async function getAllFornecedores(){
    const data = await fetch('http://127.0.0.1:8000/fornecedores/')

    if(!data.ok){
        throw new Error('Requisição dos fornecedores não realizadas')
    }

    return await data.json() as Fornecedor[]
}

async function createFornecedor(bodyFornecedor: Fornecedor) {
    const response = await fetch('http://127.0.0.1:8000/fornecedores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFornecedor)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json()
}

async function updateFornecedor(bodyFornecedor: Fornecedor) {
    const response = await fetch('http://127.0.0.1:8000/fornecedores/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyFornecedor)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

async function deleteFornecedor(email: string) {
    // Mantida a lógica de buscar pelo email para pegar o ID antes de deletar
    const responseGet = await fetch(`http://127.0.0.1:8000/fornecedores?email=${email}`);

    const data: Fornecedor = await responseGet.json() 

    const response = await fetch(`http://127.0.0.1:8000/fornecedores/${data.id}`, {
        method: 'DELETE'
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

export const ServiceFornecedor = {
    getAllFornecedores,
    createFornecedor,
    updateFornecedor,
    deleteFornecedor,
}