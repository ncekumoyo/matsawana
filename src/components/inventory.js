import { useEffect, useState } from "react";

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
              <td>{x.unit}</td>
              <td>{x.amount}</td>
              <td>
                <a href={`http://localhost:3002/inventory/${x.id}`} className="btn btn-small btn-warning">
                  Detail
                </a>
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
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    </section>
  );
}
