import { useState } from "react";

export default function DynamicInputs(props) {
  const [weights, setWeights] = useState([0]);
  const [sum, setSum] = useState(0);

  const add = () => {
    const values = [...weights];
    values.push(0);
    setWeights([...values]);
  };

  const handleChange = (index, e) => {
    const values = [...weights];
    values[index] = e.target.value;
    setWeights([...values]);
    setSum((prev) => {
      let total = 0;
      weights.map((x) => (total += Number(x)));
      return total;
    });
  };

  return (
    <div className="form-group mb-3">
      <label className="fw-bold">
        {props?.name} {sum} kg
      </label>
      <div className="d-flex">
        {weights.map((x, index) => (
          <input
            type="number"
            min="0"
            step="0.001"
            className="form-control form-control-sm me-2 diw "
            onChange={(e) => handleChange(index, e)}
            key={index}
            value={x}
          />
        ))}
        <button className="btn btn-sm btn-primary" onClick={add}>
          Add
        </button>
      </div>
    </div>
  );
}
