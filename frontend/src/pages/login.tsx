import { useState } from "react"
import { useNavigate } from "react-router-dom" // Import para navegação suave

export function Login() {
    // 1. Criamos estados para armazenar os valores
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    
    const navigate = useNavigate() // Hook de navegação

    function autenticacao(e: React.FormEvent){
        e.preventDefault() // Evita que o formulário recarregue a página

        console.log(email)
        console.log(senha)

        if(email ==='admin' && senha === '123*456'){
             navigate('/app') // Navegação SPA (sem refresh)
        } else {
            setMensagem('Erro ao realizar login')
        }
    }

    return (
        <div className="h-screen w-screen max-w-[1400px] flex justify-center items-center m-auto">
            <div className="h-[65%] w-[40%] max-h-[600px] max-w-[600px]  rounded-2xl bg-white">
                <div className="flex flex-col justify-center items-center gap-3 h-[50%] w-full">
                    <p className="text-[35px] font-medium">Seja bem vindo!</p>
                    <p className="w-[80%] text-center text-[18px]">
                        Acesse sua conta para acompanhar seus resultados.
                    </p>
                </div>
                <div className="w-full h-[50%] flex justify-center">
                    <form className="w-[75%] h-full flex flex-col gap-4">
                        {/* 2. O input é controlado pelo value e onChange */}
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text" 
                            className="border border-black h-[40px] rounded-lg p-2" 
                            placeholder="E-mail" 
                        />
                        <input 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type="password" 
                            className="border border-black h-[40px] rounded-lg p-2" 
                            placeholder="Senha" 
                        />
                        
                        {/* Exibir mensagem de erro se houver */}
                        {mensagem && <span className="text-red-500 text-sm">{mensagem}</span>}

                        <input 
                            type="button" 
                            value="Entrar" 
                            className="bg-[#008080] text-white h-[40px] rounded-lg p-2 cursor-pointer" 
                            onClick={autenticacao} // Passando a função
                        />
                        <button type="button" className="cursor-pointer">Esqueci minha senha</button>
                    </form>
                </div>
            </div>
        </div>
    )
}