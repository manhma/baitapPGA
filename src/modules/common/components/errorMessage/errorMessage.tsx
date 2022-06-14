import { ErrorMessage as Mess } from 'formik';
import React from 'react';

type Props = {
  name: string;
};

function ErrorMessage({ name }: Props) {
  return <Mess name={name}>{(msg) => <div style={{ color: 'red' }}>{msg}</div>}</Mess>;
}

export default ErrorMessage;
