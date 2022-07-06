import React from 'react';

const Consumption = () => {
  const options = [
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Snacks', value: 'snacks' },
  ];

  const [value, setValue] = React.useState('fruit');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
        <h1> Profile page</h1>
      <label>
        What have we eaten?
        <select value={value} onChange={handleChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <p>We have eaten {value}</p>
      <h3>That should be some calories gained.</h3>
      <br></br>
    </div>
  );
};

export default Consumption;