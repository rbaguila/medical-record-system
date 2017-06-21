import React from 'react';

export const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
    
  >
  {children}
  </button>

export const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

export const Field = ({name, value, onChange, children}) =>
  <form>
    <input
      id={name}
      type="text"
      value={value}
      onChange = {onChange}
      placeholder = {children}
      />
  </form>

export const TextField = ({name, children}) =>
  <form>
    <input 
      type="text"
      id={name}
      placeholder={children}
      disabled="true"
      />
  </form>
