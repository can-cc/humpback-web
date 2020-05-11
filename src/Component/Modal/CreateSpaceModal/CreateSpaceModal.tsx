import React from 'react';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '../Modal';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Input } from '../../Form/Input';
import { Button } from '../../Button/Button';
import { FormField } from '../../Form/FormField';
import { FormErrorMessage } from '../../Form/FormErrorMessage';
import { useDispatch } from 'react-redux';
import { CreateSpaceRequest } from '../../../redux/action/space-action';

interface FormValues {
  name: string;
}

const validationSchema = Yup.object({
  name: Yup.string().max(15, '不能超过15个字符').required('请填写空间名称'),
});

export function CreateSpaceModal(props: { isOpen: boolean; onClose: () => void }) {
  const dispatch: Function = useDispatch();
  const createSpace = (values: FormValues): Promise<void> => {
    return dispatch(CreateSpaceRequest(values));
  };

  return (
    <Modal
      className="CreateSpaceModal"
      isOpen={props.isOpen}
      style={{
        content: {
          width: 480,
        },
      }}
      onRequestClose={props.onClose}
    >
      <ModalHeader title="创建一个空间" />

      <Formik<FormValues>
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          createSpace(values)
            .then(() => {
              setSubmitting(false);
              props.onClose();
            })
            .catch(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, isValid, touched }) => (
          <Form>
            <ModalContent
              style={{
                minHeight: 120,
              }}
            >
              <FormField name="空间名称">
                <Field type="text" as={Input} name="name" autoFocus />
                <ErrorMessage name="name" component={FormErrorMessage} />
              </FormField>
            </ModalContent>

            <ModalFooter>
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button type="primary" htmlType="submit" disabled={isSubmitting || !isValid}>
                  创建
                </Button>
                <Button type="link" onClick={props.onClose}>
                  取消
                </Button>
              </div>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
