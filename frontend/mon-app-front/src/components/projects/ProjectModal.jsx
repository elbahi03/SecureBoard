import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../common/FormField';

const projectSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .required('Le nom est requis'),
  description: Yup.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .required('La description est requise'),
});

export default function ProjectModal({ isOpen, onClose, onSave, project }) {
  const initialValues = {
    name: project?.name || '',
    description: project?.description || '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSave(values);
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
                  {project ? 'Modifier le projet' : 'Créer un projet'}
                </Dialog.Title>

                <Formik
                  initialValues={initialValues}
                  validationSchema={projectSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <FormField
                        name="name"
                        label="Nom du projet"
                        type="text"
                      />

                      <FormField
                        name="description"
                        label="Description"
                        type="text"
                      />

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