import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Inventory() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/inventory", {
      method: "GET",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((data) =>
        setItems(
          data.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.amount}</td>
              <td>{x.unit}</td>
              <td>
                <Link to={`/inventory/update/${x.id}`} className="btn btn-sm btn-warning">
                  Update
                </Link>
              </td>
            </tr>
          ))
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="">
      <div className="container">
        <h2>Inventory</h2>
        <Link to="/inventory/create" className="btn btn-sm btn-warning my-2">Add Item</Link>
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    </section>
  );
}
