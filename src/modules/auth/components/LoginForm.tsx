import React from 'react';
import { ILoginParams } from '../../../models/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
  onLogin(values: ILoginParams): void;
  isLoading: boolean;
  errorMessage: string;
}

export default function LoginForm(props: Props) {
  const { onLogin, isLoading, errorMessage } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Địa chỉ Email không hợp lệ').required('Vui lòng nhập địa chỉ email!'),
      password: Yup.string().min(4, 'Mật khẩu tối thiểu 4 ký tự').required('Vui lòng nhập mật khẩu!'),
    }),
    onSubmit: (values: ILoginParams) => {
      onLogin(values);
    },
  });
  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      className="row g-3 needs-validation"
      onSubmit={formik.handleSubmit}
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <div className="col-md-12">
        <label htmlFor="email" className="form-label">
          Địa chỉ Email
        </label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email && <p className="text-danger">{formik.errors.email}</p>}
      </div>

      <div className="col-md-12">
        <label htmlFor="password" className="form-label">
          Mật khẩu
        </label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password && <p className="text-danger">{formik.errors.password}</p>}
      </div>

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            onChange={formik.handleChange}
            // checked={formValues.rememberMe}
            // onChange={() => setFormValues({ ...formValues, rememberMe: !formValues.rememberMe })}
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            Lưu thông tin đăng nhập
          </label>
        </div>
      </div>

      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={isLoading}
          >
            {isLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            Đăng nhập
          </button>
        </div>
      </div>
    </form>
  );
}
