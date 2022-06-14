import React from 'react';
import { ILoginParams } from '../../../models/auth';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../../common/components/errorMessage/errorMessage';

interface Props {
  onLogin(values: ILoginParams): void;
  isLoading: boolean;
  errorMessage: string;
}

export default function LoginForm(props: Props) {
  const { onLogin, isLoading, errorMessage } = props;

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={Yup.object({
        email: Yup.string().email('Địa chỉ Email không hợp lệ').required('Vui lòng nhập địa chỉ email!'),
        password: Yup.string().min(4, 'Mật khẩu tối thiểu 4 ký tự').required('Vui lòng nhập mật khẩu!'),
      })}
      onSubmit={(values) => {
        onLogin(values);
      }}
    >
      <Form style={{ maxWidth: '560px', width: '100%' }} className="row g-3 needs-validation">
        {!!errorMessage && (
          <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
            {errorMessage}
          </div>
        )}

        <div className="col-md-12">
          <label htmlFor="email" className="form-label">
            Địa chỉ email
          </label>
          <Field className="form-control" name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
        <div className="col-md-12">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <Field className="form-control" name="password" type="password" />
          <ErrorMessage name="password" />
        </div>

        <div className="col-12">
          <div className="form-check">
            <Field className="form-check-input" type="checkbox" name="rememberMe" />
            <label className="form-check-label">Lưu thông tin đăng nhập</label>
          </div>
        </div>
        <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
          <div className="col-md-auto">
            <button
              className="btn btn-primary"
              style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
              Đăng nhập
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
