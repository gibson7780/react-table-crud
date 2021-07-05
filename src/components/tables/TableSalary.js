import React from 'react';
// import TransitionGroup from 'react-transition-group/TransitionGroup';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './tables.sass';
import InputText from '../inputs/InputText';
import InputDate from '../inputs/InputDate';
import Textarea from '../textareas/Textarea';
import InputRangeSlider from '../inputs/InputRangeSlider';

const FadeTransition = (props) => (
  <CSSTransition {...props} timeout={{ enter: 500, exit: 0 }} />
);

const TableSalary = ({ tableData, setRecordData, errors, saveTrigger }) => {
  // 修改input值
  const handleChangeVaule = (e, id) => {
    const type = e.target.type;
    const value =
      type === 'range' ? parseInt(e.target.value, 10) : e.target.value;
    const key = e.target.name;
    setRecordData((prev) => {
      const newData = [...prev];
      const target = newData.find((row) => row.ID === id);
      target[key] = value;

      return newData;
    });
  };

  const items = tableData?.map((row, index) => (
    <FadeTransition key={row.ID} classNames="tableAnimation">
      <tr
        className={
          saveTrigger && (errors[index]?.Name || errors[index]?.DateOfBirth)
            ? 'error'
            : ''
        }
      >
        <td>
          <InputText
            name="Name"
            placeholder="請輸入名字"
            value={row.Name}
            id={row.ID}
            handleChangeVaule={handleChangeVaule}
            error={errors[index]?.Name}
            saveTrigger={saveTrigger}
          />
        </td>
        <td>
          <InputDate
            placeholder="請輸入出生日期"
            value={row.DateOfBirth}
            name="DateOfBirth"
            id={row.ID}
            handleChangeVaule={handleChangeVaule}
            error={errors[index]?.DateOfBirth}
            saveTrigger={saveTrigger}
          />
        </td>
        <td>
          <InputRangeSlider
            name="Salary"
            rangeMin={0}
            rangeMax={100000}
            step={1000}
            value={row.Salary}
            handleChangeVaule={handleChangeVaule}
            id={row.ID}
          />
        </td>
        <td>
          <Textarea
            name="Address"
            placeholder="請輸入住址"
            value={row.Address}
            handleChangeVaule={handleChangeVaule}
            id={row.ID}
          />
        </td>
      </tr>
    </FadeTransition>
  ));

  return (
    <form>
      <table className="tableSalary">
        <thead>
          <tr>
            <th>*名字</th>
            <th>*出生日期</th>
            <th>工資</th>
            <th>住址</th>
          </tr>
        </thead>
        <TransitionGroup component="tbody">{items}</TransitionGroup>
      </table>
      {/* <CSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
      >
        <h1>Fading at Initial Mount</h1>
      </CSSTransitionGroup> */}
    </form>
  );
};

export default TableSalary;
