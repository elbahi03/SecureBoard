import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  UserGroupIcon, 
  FolderIcon, 
  ChartBarIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

export default function DashboardHome() {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Projets totaux',
      value: '12',
      icon: FolderIcon,
      change: '+2.1%',
      changeType: 'positive',
    },
    {
      name: 'Utilisateurs actifs',
      value: '8',
      icon: UserGroupIcon,
      change: '+5.4%',
      changeType: 'positive',
    },
    {
      name: 'Tâches complétées',
      value: '24',
      icon: ChartBarIcon,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Temps moyen',
      value: '2.4h',
      icon: ClockIcon,
      change: '-1.2%',
      changeType: 'negative',
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* En-tête de bienvenue */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenue, {user?.name} !
        </h1>
        <p className="mt-2 text-gray-600">
          Voici un aperçu de votre tableau de bord SecureBoard.
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="card-body">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <span
                    className={`font-medium ${
                      stat.changeType === 'positive'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="ml-2 text-gray-500">par rapport au mois dernier</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sections principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Projets récents */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Projets récents</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Projet Alpha</h4>
                  <p className="text-sm text-gray-500">Mis à jour il y a 2 heures</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  En cours
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Projet Beta</h4>
                  <p className="text-sm text-gray-500">Mis à jour il y a 1 jour</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  En attente
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Projet Gamma</h4>
                  <p className="text-sm text-gray-500">Mis à jour il y a 3 jours</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Terminé
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activité récente */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Activité récente</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 bg-green-400 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Projet Alpha</span> a été mis à jour
                  </p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 bg-blue-400 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Nouvel utilisateur</span> ajouté
                  </p>
                  <p className="text-xs text-gray-500">Il y a 4 heures</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-2 w-2 bg-yellow-400 rounded-full mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Projet Beta</span> en attente de validation
                  </p>
                  <p className="text-xs text-gray-500">Il y a 1 jour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Actions rapides</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="btn-primary flex items-center justify-center space-x-2 py-3">
                <FolderIcon className="h-5 w-5" />
                <span>Nouveau projet</span>
              </button>
              {user?.roles?.includes('admin') && (
                <button className="btn-secondary flex items-center justify-center space-x-2 py-3">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>Gérer les utilisateurs</span>
                </button>
              )}
              <button className="btn-secondary flex items-center justify-center space-x-2 py-3">
                <ChartBarIcon className="h-5 w-5" />
                <span>Voir les rapports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
