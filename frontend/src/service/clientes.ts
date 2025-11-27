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
      method: 'POST', // 1. Tens de especificar que é um POST
      headers: {
        'Content-Type': 'application/json' // 2. O nome correto do header e o valor
      },
      body: JSON.stringify(bodyCliente) // 3. O corpo precisa ser transformado em texto (string)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
}

export const ServiceCliente = {
    getAllClientes,
    createCliete,
}