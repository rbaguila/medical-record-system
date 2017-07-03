import React from 'react';
import {EditProcedure} from './EditProcedure';
import {DismissProcedure} from './DismissProcedure';

export function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fee.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

export const ProceduresTable = ({ list, pattern}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item._id} className="table-row">
          <span style={{ width: '10%' }}>{item.name}</span>
          <span style={{ width: '10%' }}>{item.description}</span>
          <span style={{ width: '10%' }}>{item.fee}</span>

          <span style={{ width: '10%' }}>
            <DismissProcedure
              item = {item}
            />
          </span>

          <span style = {{width: '10%'}}>
            <EditProcedure
              item = {item}
            />
          </span> 

          
          

          
        </div>
      )}
    </div>


