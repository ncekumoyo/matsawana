import { useState } from "react";

export default function DynamicInputs({ name, sum, setSum }) {
  const [weights, setWeights] = useState([0]);

  const add = () => {
    const values = [...weights];
    values.push(0);
    setWeights([...values]);
  };

  const handleChange = (index, e) => {
    const values = [...weights];
    values[index] = e.target.value;
    setWeights([...values]);
    setSum(() => {
      let total = 0;
      for (let i = 0; i < values.length; i++) {
        total += Number(values[i]);
      }
      return total;
    });
  };

  const handleFocus = (e) => {
    if (e.target.value === "0") {
      e.target.value = "";
    }
  };

  return (
    <div className="form-group mb-3">
      <label className="fw-bold">
        {name} {sum} kg
      </label>
      <div className="d-flex">
        {weights.map((x, index) => (
          <input
            type="number"
            min="0"
            step="0.001"
            className="form-control form-control-sm me-2 diw "
            onChange={(e) => handleChange(index, e)}
            onFocus={handleFocus}
            key={index}
            value={x}
          />
        ))}
        <button type="button" className="btn btn-sm btn-primary" onClick={add}>
          Add
        </button>
      </div>
    </div>
  );
}
