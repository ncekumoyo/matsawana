import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function InventoryDelete() {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      fetch(`http://localhost:3002/inventory/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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

  return (
    <section>
      <div className="container">
        <h2>Inventory - Delete Item</h2>
        <p className="lead">Are you sure you want to delete this item?</p>
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
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-sm btn-danger me-2">
              Yes, Delete
            </button>
            <Link to="/" className="btn btn-sm btn-warning me-2">
              No, Go Back!
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
