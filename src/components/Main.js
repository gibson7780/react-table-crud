import React, { useState, useEffect, useContext } from 'react';
import Context from './useContext/Context';
import Button from './buttons/Button';
import TableSalary from './tables/TableSalary';
import { fetchData, postData } from '../lib/helper';
import './main.sass';

// const fakeDataFormat = [{ Address: '', DateOfBirth: '', Name: '', Salary: 0 }]

//table default row
const defaultValue = { Address: '', DateOfBirth: '', Name: '', Salary: 0 };

const Main = () => {
  const myContext = useContext(Context);
  const { openDialog } = myContext;
  const [saveTrigger, setSaveTrigger] = useState(false);
  const [recordData, setRecordData] = useState();
  const [errors, setErrors] = useState({});

  // 獲得資料
  const getRecords = () => {
    setRecordData(null);
    fetchData('/api/Record/GetRecords').then((res) => {
      const newData = res?.Data.map((row, index) => ({
        ...row,
        ID: 'row' + index,
      }));
      setRecordData(newData);
    });
  };
  // 增加新欄位
  const addTableRow = () => {
    if (recordData) {
      setRecordData((prev) => [
        { ...defaultValue, ID: 'row' + prev.length },
        ...prev,
      ]);
    } else {
      setRecordData([{ ...defaultValue, ID: 'row0' }]);
    }
  };
  // 儲存
  const saveRecords = () => {
    if (!recordData) {
      openDialog({ text: '目前無任何資料可儲存!' });
      return;
    }
    if (Object.keys(errors).length) {
      setSaveTrigger(true);
      openDialog({ text: '請檢查必填欄位(*)是否填寫' });
      return;
    }
    postData('/api/Record/SaveRecords', recordData).then((res) => {
      if (res.Success) {
        openDialog({ text: '儲存成功!' });
        setRecordData(null);
        getRecords();
      } else {
        openDialog({ text: '儲存失敗!' });
      }
    });
  };

  useEffect(() => {
    if (!recordData) return;

    // 驗證
    const inputValidation = () => {
      let newErrors = {};
      recordData.forEach((row, index) => {
        Object.keys(row).forEach((key) => {
          // 想驗證的欄位
          if (!recordData[index]?.Name) {
            if (!newErrors[index]) {
              newErrors[index] = { Name: true };
            } else {
              newErrors[index].Name = true;
            }
          }
          if (!recordData[index]?.DateOfBirth) {
            if (!newErrors[index]) {
              newErrors[index] = { DateOfBirth: true };
            } else {
              newErrors[index].DateOfBirth = true;
            }
          }
          // if (!recordData[index][key]) {
          //   if (!newErrors[index]) {
          //     newErrors[index] = { [key]: true };
          //   } else {
          //     newErrors[index][key] = true;
          //   }

          // }
        });
      });
      // console.log('newErrors', newErrors);
      setErrors(newErrors);
    };

    inputValidation();
  }, [recordData]);

  return (
    <div className="main">
      <div className="ButtonWrap">
        <Button text={'新紀錄'} bgClass="blue" callback={addTableRow} />
        <Button text={'保存'} bgClass="red" callback={saveRecords} />
        <Button text={'更新'} bgClass="pink" callback={getRecords} />
      </div>
      <TableSalary
        tableData={recordData}
        setRecordData={setRecordData}
        errors={errors}
        saveTrigger={saveTrigger}
      />
    </div>
  );
};

export default Main;
