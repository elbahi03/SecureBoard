import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-primary-600 sm:text-5xl">
            403
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Accès non autorisé
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/"
                className="btn-primary"
              >
                Retour à l'accueil
              </Link>
              <Link
                to="/support"
                className="btn-secondary"
              >
                Contacter le support
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}