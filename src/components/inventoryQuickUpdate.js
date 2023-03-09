import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InventoryDelete() {
  const [item, setItem] = useState(null);
  const amountRef = useRef(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const incoming = () => {
    doUpdate( Number(amountRef.current.value))
  }
  const outgoing = () => {
    doUpdate(Number(amountRef.current.value) * (-1)) 
  }

  const doUpdate = useCallback(
    (changeAmount) => {
      fetch(`http://localhost:3002/inventory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          amount: Number(item.amount) + changeAmount,
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
    [id, navigate, item]
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

  return (
    <section>
      <div className="container">
        <h2>Inventory - Quick Update</h2>
        <div className="col-md-6">
          <table className="table table-sm col-md-6">
            <thead className="bg-warning">
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.amount}</td>
                <td>{item?.unit}</td>
              </tr>
            </tbody>
          </table>
            <div className="form-group mb-3">
              <label htmlFor="">Amount (to be added or subtracted) </label>
              <input type="number" defaultValue="0" min="0" step="0.001" className="form-control" ref={amountRef}/>
            </div>
            <button type="button" className="btn btn-sm btn-success me-2" onClick={incoming}>
              Incoming
            </button>
            <button type="button" className="btn btn-sm btn-warning me-2" onClick={outgoing}>
              Outgoing
            </button>
        </div>
      </div>
    </section>
  );
}
