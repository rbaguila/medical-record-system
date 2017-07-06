import React from 'react';
import {ConsultPDF} from './ConsultPDF';
import {EditPatient} from './EditPatient';
import {DismissPatient} from './DismissPatient';

export function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.middleName.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

export const PatientsTable = ({ list, pattern}) =>

  <div className="table">
      { list.filter(isSearched(pattern)).map(item =>
        <div key={item._id} className="table-row">
          <span style={{ width: '10%' }}>{item.firstName}</span>
          <span style={{ width: '10%' }}>{item.middleName}</span>
          <span style={{ width: '10%' }}>{item.lastName}</span>

          <span style={{ width: '10%' }}>
            <DismissPatient
              item = {item}
            />
          </span>

          <span style = {{width: '10%'}}>
            <EditPatient
              item = {item}
            />
          </span> 

          <span style={{width: '10%'}}>
            <ConsultPDF 
              item = {item}
            />
          </span>
          
          

          
        </div>
      )}
    </div>

