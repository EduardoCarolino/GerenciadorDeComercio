
export function Login() {

    return (
        <div className="h-screen w-screen max-w-[1400px] flex justify-center items-center m-auto">
            <div className="h-[65%] w-[40%] max-h-[600px] max-w-[600px]  rounded-2xl bg-white">
                <div className="flex flex-col justify-center items-center gap-3 h-[50%] w-full">
                    <p className="text-[35px] font-medium">
                        Seja bem vindo!
                    </p>
                    <p className="w-[80%] text-center text-[18px]">
                        Acesse sua conta para acompanhar seus resultados, gerenciar clientes e impulsionar suas vendas.
                    </p>
                </div>
                <div className="w-full h-[50%] flex justify-center">
                    <form action="" className="w-[75%] h-full flex flex-col gap-4">
                        <input type="text" className="border border-black h-[40px] rounded-lg p-2" placeholder="E-mail" />
                        <input type="text" className="border border-black h-[40px] rounded-lg p-2" placeholder="Senha" />
                        <input type="button" value="Entrar" className="bg-[#008080] text-white h-[40px] rounded-lg p-2 cursor-pointer" />
                        <button className="cursor-pointer">Esqueci minha senha</button>
                    </form>
                </div>
            </div>
        </div>
    )
}