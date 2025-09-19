import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="animate-fade-in">
          <MagnifyingGlassIcon className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Vérifiez l'URL ou retournez à l'accueil.
          </p>
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="btn-primary w-full"
            >
              Retour au tableau de bord
            </Link>
            <Link
              to="/"
              className="btn-secondary w-full"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}