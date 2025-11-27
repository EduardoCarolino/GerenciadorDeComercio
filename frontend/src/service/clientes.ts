import { Cliente } from "../pages/clientes/indexCliente"

async function getAllClientes(){
    const data = await fetch('http://127.0.0.1:8000/clientes/')

    if(!data.ok){
        throw new Error('Requisição dos clientes não realizadas')
    }

    return await data.json() as Cliente[]
}

async function createCliete(bodyCliente: Cliente) {
    const response = await fetch('http://127.0.0.1:8000/clientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyCliente)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json()
}

async function updateCliente(bodyCliente: Cliente) {
    const response = await fetch('http://127.0.0.1:8000/clientes/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyCliente)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

async function deleteCliente(email: string) {
    const responseGet = await fetch(`http://127.0.0.1:8000/clientes?email=${email}`);

    const data: Cliente = await responseGet.json() 

    const response = await fetch(`http://127.0.0.1:8000/clientes/${data.id}`, {
        method: 'DELETE'
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

export const ServiceCliente = {
    getAllClientes,
    createCliete,
    updateCliente,
    deleteCliente,
}