import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalContent
} from '../../../Component/Modal/Modal';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input } from '../../../Component/Form/Input';
import { Button } from '../../../Component/Button/Button';
import { FormField } from '../../../Component/Form/FormField';

interface FormValues {
  name: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, '不能超过15个字符')
    .required('请填写空间名称')
});

export function CreateSpaceModal(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      className="CreateSpaceModal"
      isOpen={props.isOpen}
      style={{
        content: {
          width: 480
        }
      }}
      onRequestClose={props.onClose}
    >
      <ModalHeader title="创建一个空间" />

      <Formik<FormValues>
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <ModalContent
              style={{
                minHeight: 120
              }}
            >
              <FormField name="空间名称">
                <Field type="text" as={Input} name="name" />
                <ErrorMessage name="name" component="div" />
              </FormField>
            </ModalContent>

            <ModalFooter>
              <div
                style={{
                  textAlign: 'right'
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
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
