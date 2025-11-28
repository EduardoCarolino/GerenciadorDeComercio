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
  console.log(email)
    const responseGet = await fetch(`http://127.0.0.1:8000/clientes?email=${email}`);

    const data: Cliente[] = await responseGet.json() 
    console.log('esse é o data:', data)

    const url = `http://127.0.0.1:8000/clientes/${data[0].id}/`
    console.log(url)

    const response = await fetch(url, {
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