import React from 'react';
import {EditModal} from './EditModal';
import {DismissModal} from './DismissModal';

export function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

export const MedicinesTable = ({ list, pattern}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item._id} className="table-row">
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

export default MedicinesTable;