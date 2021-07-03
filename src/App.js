import './App.sass';
import React, { useState } from 'react';
import Context from './components/useContext/Context';
import Main from './components/Main';
import AlertDialog from './components/dialogs/AlertDialog';
function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [option, setOption] = useState({});
  const closeDialog = () => {
    setShowDialog(false);
  };
  const openDialog = (props) => {
    setOption(props);
    setShowDialog(true);
  };
  return (
    <Context.Provider value={{ closeDialog, openDialog, option }}>
      <div className="myApp">
        {showDialog && <AlertDialog />}

        <Main />
      </div>
    </Context.Provider>
  );
}

export default App;
