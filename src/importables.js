import React, { Component } from 'react';

export function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

export const Field = ({name, children}) =>
  <form>
    <input
      id={name}
      type="text"
      placeholder = {children}
      />
  </form>

export const Table = ({ list, pattern, onDismiss}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '30%' }}>{item.genericName}</span>
          <span style={{ width: '30%' }}>{item.brandName}</span>
          <span style={{ width: '10%' }}>{item.dosage}</span>
          
          <span style={{ width: '10%' }}>
          <Button 
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
          </span>
        </div>
      )}
    </div>

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