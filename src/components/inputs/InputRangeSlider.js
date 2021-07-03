import React, { useEffect, useState, useRef } from 'react';
import './inputRangeSlider.sass';
const InputRangeSlider = ({
  rangeMin = 0,
  rangeMax = 1000,
  step = 1,
  handleChangeVaule,
  value = 0,
  id,
  name,
}) => {
  const rangeInput = useRef();
  const [rangeValue, setRangeValue] = useState(value);
  const [percent, setPercent] = useState(0);

  const handleMouseMove = (e) => {
    const salaryValue = rangeInput.current.value;
    let percent = (salaryValue / rangeMax) * 100;
    const color = `linear-gradient(90deg,#db4590 ${percent}%, #ccc ${percent}%)`;
    rangeInput.current.style.background = color;

    setRangeValue(parseInt(salaryValue, 10));
    setPercent(percent);
    handleChangeVaule(e, id);
  };

  useEffect(() => {
    if (!value) return;
    let percent = (value / rangeMax) * 100;
    const color = `linear-gradient(90deg,#db4590 ${percent}%, #ccc ${percent}%)`;
    rangeInput.current.style.background = color;
    setPercent(percent);
  }, [value, rangeMax]);
  return (
    <div className="rangeWrap" data-value={rangeValue.toLocaleString()}>
      <input
        ref={rangeInput}
        type="range"
        name={name}
        min={rangeMin}
        max={rangeMax}
        onChange={handleMouseMove}
        step={step}
        value={rangeValue}
        className={!rangeValue && !percent ? 'zero' : ''}
      ></input>
    </div>
  );
};

export default InputRangeSlider;
