import React from "react"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
    return(
        <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
            <h1 className="txext-6x1 font-bold text-primary mb-4">404</h1>
            <p className= "text-lg text-light-text mb-6">
            Ops! Esta Página não existe.
            </p>
            <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rouded-xl hover:bg-primary-hover transition"
            >
                Voltar para a página inicial
              </Link>
            </div>
    )
}

export default NotFound