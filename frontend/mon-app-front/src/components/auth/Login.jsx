import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormField from '../common/FormField';
import { useAuthActions } from '../../hooks/useAuthActions';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .required('L\'email est requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Le mot de passe est requis'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login, error, loading } = useAuthActions();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connectez-vous à votre compte
          </h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              
              <FormField
                name="email"
                type="email"
                label="Adresse email"
                className="mb-4"
              />

              <FormField
                name="password"
                type="password"
                label="Mot de passe"
                className="mb-4"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="btn-primary w-full"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>

              <div className="text-center mt-4">
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Pas encore de compte ? S'inscrire
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}