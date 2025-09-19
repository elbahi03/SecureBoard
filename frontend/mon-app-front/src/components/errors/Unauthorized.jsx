import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="animate-fade-in">
          <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500 mb-6" />
          <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            Veuillez contacter votre administrateur si vous pensez qu'il s'agit d'une erreur.
          </p>
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="btn-primary w-full"
            >
              Retour au tableau de bord
            </Link>
            <Link
              to="/login"
              className="btn-secondary w-full"
            >
              Se reconnecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}