import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaSave, FaSpinner, FaArrowLeft, FaCamera } from 'react-icons/fa';
import { useAuth } from './useAuth'; 

const Perfil: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Preencher formulário com dados do usuário local
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nome: user.nome || '', // Ajuste para o campo 'nome' do seu banco
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      const userId = user?.id; // Certifique-se que seu useAuth retorna o ID do banco
      if (!userId) throw new Error("Usuário não identificado.");

      // 1. ATUALIZAR DADOS BÁSICOS (Nome e Email)
      const updateDataResponse = await fetch(`http://localhost:2000/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          // telefone: user.telefone // você pode adicionar campos extras aqui
        })
      });

      if (!updateDataResponse.ok) throw new Error("Erro ao atualizar dados básicos.");

      // 2. ATUALIZAR SENHA (Se os campos de senha estiverem preenchidos)
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("As novas senhas não coincidem.");
        }

        const updatePasswordResponse = await fetch(`http://localhost:2000/auth/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            senha: formData.newPassword
          })
        });

        if (!updatePasswordResponse.ok) throw new Error("Erro ao atualizar senha.");
      }

      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso no banco local!' });
      
      // Limpar campos de senha
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      setMessage({ type: 'error', text: error.message || 'Erro ao atualizar perfil.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    const response = await fetch(`http://localhost:2000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: formData.nome,
        email: formData.email
      })
    });
  
    if (response.ok) {
      await refreshUser(); // Atualiza o useAuth e o LocalStorage automaticamente
      alert("Perfil atualizado!");
    }
  };

  // ... (Mantenha o restante do JSX igual, apenas troque 'displayName' por 'nome' nos inputs)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* ... cabeçalho ... */}
      <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="nome" // Mudado de displayName para nome
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {/* ... outros campos ... */}
      </form>
    </div>
  );
};