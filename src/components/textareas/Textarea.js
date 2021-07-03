import React from 'react';
import './textareas.sass';
const Textarea = ({
  placeholder = '請輸入內容',
  name,
  value,
  handleChangeVaule,
  id,
}) => {
  return (
    <div className="textareaWrap">
      <textarea
        value={value}
        name={name}
        placeholder={placeholder}
        rows="1"
        cols="100"
        onChange={(e) => handleChangeVaule(e, id)}
      ></textarea>
    </div>
  );
};

export default Textarea;
