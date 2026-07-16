import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder = '', required = false, id }) => {
  return (
    <div style={{ marginBottom: '1.25rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
