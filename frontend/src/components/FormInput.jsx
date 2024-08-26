import React from 'react';
import { FormGroup } from './FormGroup';
import { InputBox } from './InputBox';

export const FormInput = ({ label, type = 'text', placeholder, register, name, error }) => (
  <FormGroup label={label} error={error}>
    <InputBox
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
  </FormGroup>
);
