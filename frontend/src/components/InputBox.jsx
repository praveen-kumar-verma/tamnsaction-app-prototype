// src/components/InputBox.jsx
import React from 'react';
import PropTypes from 'prop-types';

export const InputBox = React.forwardRef(({ type = 'text', placeholder, ...props }, ref) => (
  <input
    type={type}
    placeholder={placeholder}
    ref={ref}
    {...props}
    className="w-full p-2 border border-gray-300 rounded"
  />
));

InputBox.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

InputBox.defaultProps = {
  type: 'text',
};
