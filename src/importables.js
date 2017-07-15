import React from 'react';
import * as bootstrap from 'react-bootstrap';

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

export const Field = ({name, value, onChange, type, children}) =>
  <form>
    <input
      id={name}
      type={type}
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

export function FieldGroup({ id, label, help, ...props }) {
  return (
    <bootstrap.FormGroup controlId={id}>
      <bootstrap.ControlLabel>{label}</bootstrap.ControlLabel>
      <bootstrap.FormControl {...props} />
      {help && <bootstrap.HelpBlock>{help}</bootstrap.HelpBlock>}
    </bootstrap.FormGroup>
  );
}