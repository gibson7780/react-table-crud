import React from 'react';
import './buttons.sass';
const Button = ({ text, bgClass, callback }) => {
  return (
    <button className={bgClass} onClick={callback}>
      {text}
    </button>
  );
};

export default Button;
