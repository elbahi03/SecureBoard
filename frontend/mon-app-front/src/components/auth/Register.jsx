import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormField from '../common/FormField';
import { useAuthActions } from '../../hooks/useAuthActions';

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Le nom est requis'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required('L\'email est requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .required('Le mot de passe est requis'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('La confirmation du mot de passe est requise'),
});

export default function Register() {
  const navigate = useNavigate();
  const { register, error, loading } = useAuthActions();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créez votre compte
          </h2>
        </div>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={registerSchema}
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
                name="name"
                label="Nom complet"
                className="mb-4"
              />

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

              <FormField
                name="password_confirmation"
                type="password"
                label="Confirmer le mot de passe"
                className="mb-4"
              />

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="btn-primary w-full"
              >
                {loading ? 'Inscription...' : 'S\'inscrire'}
              </button>

              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Déjà un compte ? Se connecter
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}