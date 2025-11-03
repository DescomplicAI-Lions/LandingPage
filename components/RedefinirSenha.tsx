import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const RedefinirSenha: React.FC = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [searchParams] = useSearchParams()

    const token = searchParams.get('token')

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
                <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100 text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h1>
                    <p className="text-gray-600 mb-6">Link de recuperação inválido ou não fornecido. Por favor, solicite um novo link.</p>
                    <Link
                        to="/recuperar-senha"
                        className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition"
                    >
                        Solicitar Novo Link
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Senha Alterada`);

        setError("");
        setSuccess("");
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setError("As senhas não coincidem. Por favor, tente novamente.");
            return;
        }

        try {
            await axios.post('/api/reset-password', {
                password: newPassword,
                token: token
            });

            setSuccess("Senha alterada com Sucesso.");
            setNewPassword("");
            setConfirmPassword("");

        } catch (apiError) {
            const errorMessage = (apiError as any).response?.data?.message
                || "Não foi possível conectar ao servidor ou token inválido.";

            setError(errorMessage);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="absolute top-6 left-6">
                <Link
                    to="/login"
                    className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-hover transition"
                >
                    Voltar
                </Link>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
                <h1 className="text-3xl font-bold text-center text-primary mb-8">
                    Alterar Senha
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="new-password" className="block text-dark-text mb-2 font-medium">
                            Nova Senha:
                        </label>
                        <input
                            type="password"
                            id='new-password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Digite a nova Senha"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-dark-text mb-2 font-medium">
                            Confirme a nova Senha:
                        </label>
                        <input
                            type='password'
                            id='confirm-password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Digite a nova Senha"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-hover transition"
                    >
                        Enviar link de recuperação
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RedefinirSenha;
