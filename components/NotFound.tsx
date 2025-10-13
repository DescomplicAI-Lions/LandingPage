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
            className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
            >
                Voltar para a página inicial
              </Link>
            </div>
    )
}

export default NotFound