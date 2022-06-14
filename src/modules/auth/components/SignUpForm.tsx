import { Field, Form, Formik } from 'formik';
import React, { useState, useRef } from 'react';
import './styleForm.scss';
import * as Yup from 'yup';
import { IGenderParams, ILocationParams, ISignUpParams } from '../../../models/auth';
import ErrorMessage from '../../common/components/errorMessage/errorMessage';

interface Props {
  locations: any;
  cities: any;
  setPid: any;
  onSignUp: any;
}

const validationSignUp = Yup.object({
  email: Yup.string().email('Địa chỉ Email không hợp lệ').required('Vui lòng nhập địa chỉ email!'),
  password: Yup.string().min(4, 'Mật khẩu tối thiểu 4 ký tự').required('Vui lòng nhập mật khẩu!'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu!'),
  name: Yup.string().required('Vui lòng nhập tên!'),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
  region: Yup.string().required('Vui lòng chọn quốc gia'),
  state: Yup.string().required('Vui lòng chọn thành phố'),
});

function SignUpForm(props: Props) {
  const { locations, cities, setPid, onSignUp } = props;

  const refFrom = useRef<any>(null);

  const GENDER = [
    { label: 'Nam', value: 'nam' },
    { label: 'Nữ', value: 'nu' },
  ];

  const initialValuesForm = {
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    gender: '',
    region: '',
    state: '',
  };
  const rederGender = () => {
    const arrGender: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    GENDER.map((g: IGenderParams, index: number) => {
      arrGender.push(
        <option value={g.value} key={index}>
          {g.label}
        </option>,
      );
    });
    return arrGender;
  };

  const renderRegion = () => {
    const arrRegion: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    locations.map((location: ILocationParams, index: number) => {
      arrRegion.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>,
      );
    });
    return arrRegion;
  };

  const renderState = () => {
    const arrState: JSX.Element[] = [
      <option disabled selected value={''} key={''}>
        {' '}
        -- select an option --{' '}
      </option>,
    ];
    cities.map((location: ILocationParams, index: number) => {
      arrState.push(
        <option value={location.id} key={index}>
          {location.name}
        </option>,
      );
    });
    return arrState;
  };
  return (
    <Formik
      innerRef={refFrom}
      initialValues={initialValuesForm}
      validationSchema={validationSignUp}
      onSubmit={(values: any) => {
        onSignUp(values);
      }}
    >
      <Form style={{ maxWidth: '460px', width: '100%' }} className="row g-2 needs-validation">
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

        <div className="col-md-12">
          <label className="form-label">Xác nhận lại mật khẩu</label>
          <Field className="form-control" name="repeatPassword" type="password" />
          <ErrorMessage name="repeatPassword" />
        </div>
        <div className="col-md-12">
          <label className="form-label">Họ và tên</label>
          <Field className="form-control" name="name" type="text" />
          <ErrorMessage name="name" />
        </div>
        <div className="col-md-12">
          <label className="form-label">Giới tính</label>
          <Field className="form-control" name="gender" as="select">
            {rederGender()}
          </Field>
          <ErrorMessage name="gender" />
        </div>
        <div className="col-md-12">
          <label className="form-label">Quốc gia</label>
          <Field as="select" name="region" className="form-control">
            {({ field, form: { touched, errors }, meta }: any) => {
              return (
                <select
                  onChange={(e) => {
                    setPid(e.target.value);
                    refFrom.current.setFieldValue('region', e.target.value);
                    refFrom.current.setFieldValue('state', '');
                  }}
                  className="form-control"
                >
                  {renderRegion()}
                </select>
              );
            }}
          </Field>
          <ErrorMessage name="region" />
        </div>
        <div className="col-md-12">
          <label className="form-label">Thành phố</label>
          <Field className="form-control" name="state" as="select">
            {renderState()}
          </Field>
          <ErrorMessage name="state"></ErrorMessage>
        </div>
        <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
          <div className="col-md-auto">
            <button
              className="btn btn-primary"
              style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              type="submit"
              // disabled={isLoading}
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default SignUpForm;
