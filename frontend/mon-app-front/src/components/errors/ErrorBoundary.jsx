import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log l'erreur pour le debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <div className="animate-fade-in">
              <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500 mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Oups ! Une erreur s'est produite
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Une erreur inattendue s'est produite. Veuillez rafraîchir la page ou contacter le support si le problème persiste.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <details className="text-left mb-6 p-4 bg-gray-100 rounded-lg">
                  <summary className="cursor-pointer font-medium text-gray-900 mb-2">
                    Détails de l'erreur (développement)
                  </summary>
                  <pre className="text-xs text-red-600 overflow-auto">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
              
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary w-full"
                >
                  Rafraîchir la page
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="btn-secondary w-full"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;