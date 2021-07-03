import React from 'react';

const InputText = ({
  name,
  value,
  placeholder = '請輸入內容',
  handleChangeVaule,
  id,
  error,
  saveTrigger,
}) => {
  return (
    <input
      className={`${saveTrigger && error ? 'error' : ''}`}
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleChangeVaule(e, id)}
    />
  );
};

export default InputText;
