// components/FormGroup.js
import React from 'react';

export const FormGroup = ({ label, error, children }) => (
  <div className="mb-4">
    <label className="block text-left mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
