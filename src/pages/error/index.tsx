import { Link } from "react-router";


export function Error(){
    return (
        <div className=" flex flex-col w-screen h-screen justify-center items-center ">
            <h1 className="text-white font-bold text-6xl mb-4 "> 404 </h1>
            <h3 className="text-white text-3xl mb-4">pagina não encontrada</h3>
            <p className="text-white italic">Você caiu em uma pagina que não exite</p>

            <Link className="bg-gray-600 min-w-xs h-9 flex items-center justify-center rounded-md text-white font-medium mt-6 " to="/"> Voltar para home</Link>
        </div>
    )
}