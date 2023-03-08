import { useCallback, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InventoryCreate() {
  const [item, setItem] = useState(null);
  const nameRef = useRef("");
  const unitRef = useRef("");
  const amountRef = useRef(0);
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setItem({
      name: nameRef.current.value,
      unit: unitRef.current.value,
      amount: amountRef.current.value,
    });
  }, []);

  useEffect(() => {
    if (item) {
      fetch("http://localhost:3002/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [item, navigate]);

  return (
    <section className="">
      <div className="container">
        <h2>Inventory - Create New Item</h2>
        <form onSubmit={handleSubmit} className="col-md-6">
          <div className="form-group mb-3">
            <label htmlFor="">Name</label>
            <input type="text" className="form-control" ref={nameRef} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Unit</label>
            <input type="text" className="form-control" ref={unitRef} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Amount</label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              step="0.001"
              className="form-control"
              ref={amountRef}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-small btn-warning">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
