import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InventoryUpdate() {
  const [item, setItem] = useState(null);
  const nameRef = useRef("");
  const unitRef = useRef("");
  const amountRef = useRef(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      fetch(`http://localhost:3002/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          name: nameRef.current.value,
          unit: unitRef.current.value,
          amount: amountRef.current.value,
        }),
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
    },
    [id, navigate]
  );

  useEffect(() => {
    fetch(`http://localhost:3002/inventory/${id}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (item) {
      nameRef.current.value = item.name;
      unitRef.current.value = item.unit;
      amountRef.current.value = item.amount;
    }
  }, [item]);

  return (
    <section>
      <div className="container">
        <h2>Inventory - Update Item</h2>
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
            <input type="number" min="0" step="0.001" className="form-control" ref={amountRef} required />
          </div>
          <div className="form-group mb-3">
            <button type="submit" className="btn btn-sm btn-warning">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
