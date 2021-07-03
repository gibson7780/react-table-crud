import React, { useContext } from 'react';
import Context from '../useContext/Context';
import Button from '../buttons/Button';
import './dialog.sass';
const AlertDialog = () => {
  const myContext = useContext(Context);
  const { closeDialog, option } = myContext;
  const { text = '', title = '提示訊息' } = option;
  return (
    <div className="dialogWrap">
      <div className="dialog">
        <div className="title">{title}</div>
        <div className="content">{text}</div>
        <div className="action">
          <Button text="確定" bgClass="blue" callback={closeDialog} />
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
