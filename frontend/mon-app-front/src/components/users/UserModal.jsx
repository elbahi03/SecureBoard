import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormField from '../common/FormField';

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .required('Le nom est requis'),
  email: Yup.string()
    .email('Adresse email invalide')
    .required('L\'email est requis'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .when('$isEditing', {
      is: false,
      then: (schema) => schema.required('Le mot de passe est requis'),
    }),
  roles: Yup.array()
    .min(1, 'Au moins un rôle doit être sélectionné')
    .required('Les rôles sont requis'),
});

export default function UserModal({ isOpen, onClose, onSave, user, roles }) {
  const initialValues = {
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    roles: user?.roles?.map((r) => r.id) || [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const dataToSend = {
        ...values,
        ...(user && !values.password && { password: undefined }),
      };
      await onSave(dataToSend);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900 mb-5"
                >
                  {user ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
                </Dialog.Title>

                <Formik
                  initialValues={initialValues}
                  validationSchema={userSchema}
                  onSubmit={handleSubmit}
                  validateOnChange={false}
                  validateOnBlur={false}
                  context={{ isEditing: !!user }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <FormField
                        name="name"
                        label="Nom"
                        type="text"
                      />

                      <FormField
                        name="email"
                        label="Email"
                        type="email"
                      />

                      <FormField
                        name="password"
                        label={user ? 'Mot de passe (laisser vide pour ne pas modifier)' : 'Mot de passe'}
                        type="password"
                      />

                      <div>
                        <label className="form-label">Rôles</label>
                        <div className="mt-2 space-y-2">
                          {roles.map((role) => (
                            <div key={role.id} className="flex items-center">
                              <Field
                                type="checkbox"
                                name="roles"
                                value={role.id.toString()}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                              />
                              <label className="ml-2 text-sm text-gray-700">
                                {role.display_name || role.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full"
                        >
                          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <button
                          type="button"
                          className="btn-secondary w-full"
                          onClick={onClose}
                        >
                          Annuler
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}