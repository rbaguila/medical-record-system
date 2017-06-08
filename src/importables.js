import React, { Component } from 'react';


export function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

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

export const Field = ({name, children}) =>
  <form>
    <input
      id={name}
      type="text"
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

export const Table = ({ list, pattern, onDismiss, editItems}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '10%' }}>{item.genericName}</span>
          <span style={{ width: '10%' }}>{item.brandName}</span>
          <span style={{ width: '5%' }}>{item.dosage}</span>
          
          <span style={{ width: '10%' }}>
            <Button 
              onClick={() => onDismiss(item._id)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>

          <span style={{width: '5%'}}>
            <Button
              onClick={() => editItems(item)}
              className="button-inline"
            >
              Edit
            </Button>
          </span>
        </div>
      )}
    </div>

