import React from 'react';
import './inputs.sass';

const inputDate = ({
  placeholder = '請輸入內容',
  value,
  id,
  name,
  handleChangeVaule,
  error,
  saveTrigger,
}) => {
  const formatValue = value.split('T')[0];
  return (
    <input
      className={`${saveTrigger && error ? 'error' : ''}`}
      type="date"
      name={name}
      value={formatValue}
      placeholder={placeholder}
      onChange={(e) => handleChangeVaule(e, id)}
    />
  );
};

export default inputDate;
