import React, { Component } from 'react';
import {EditModal} from './EditModal';
import {DismissModal} from './DismissModal';

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

export const Table = ({ list, pattern}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '10%' }}>{item.genericName}</span>
          <span style={{ width: '10%' }}>{item.brandName}</span>
          <span style={{ width: '10%' }}>{item.dosage}</span>
          
          <span style={{ width: '10%' }}>
            <DismissModal
              item = {item}
            />
          </span>

          <span style = {{width: '10%'}}>
            <EditModal
              item = {item}
            />
          </span>
        </div>
      )}
    </div>

