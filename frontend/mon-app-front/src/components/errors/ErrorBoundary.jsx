export default function ErrorBoundary({ error }) {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
            Erreur
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Une erreur est survenue
              </h1>
              <p className="mt-1 text-base text-gray-500">
                {error?.message || 'Une erreur inattendue s\'est produite.'}
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Si le problème persiste, veuillez :</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Rafraîchir la page</li>
                <li>Vérifier votre connexion internet</li>
                <li>Contacter le support technique</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}