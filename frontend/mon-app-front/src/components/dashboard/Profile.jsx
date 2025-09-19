import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implémenter la mise à jour du profil
    console.log('Mise à jour du profil:', formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gérez vos informations personnelles et vos préférences de compte.
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Informations personnelles
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" />
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="h-20 w-20 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user?.roles?.join(', ') || 'Utilisateur'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom complet
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adresse email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rôle
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.roles?.join(', ') || 'Utilisateur'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Membre depuis
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Section Sécurité */}
      <div className="mt-8 bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Sécurité</h2>
        </div>
        <div className="px-6 py-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Mot de passe
              </h3>
              <p className="text-sm text-gray-500">
                Dernière modification il y a plus de 90 jours
              </p>
              <button className="mt-2 btn-secondary">
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}