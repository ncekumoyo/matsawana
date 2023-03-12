import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Finance() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/finance", {
      method: "GET",
      "Content-Type": "application/json",
    })
      .then((response) => response.json())
      .then((data) =>
        setItems(
          data.map((x) => (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.date}</td>
              <td className="text-end">{x.sales}</td>
              <td className="text-end">{x.cardsales}</td>
              <td className="text-end">{x.topaysales.total}</td>
              <td className="text-end">{x.expenses.total}</td>
              <td className="text-end">{x.cashinhand}</td>
              <td>
                <Link to={`/inventory/update/${x.id}`} className="btn btn-sm btn-warning me-2">
                  Update
                </Link>
                <Link to={`/inventory/quick-update/${x.id}`} className="btn btn-sm btn-success me-2">
                  Quick Update
                </Link>
                <Link to={`/inventory/delete/${x.id}`} className="btn btn-sm btn-danger me-2">
                  Delete
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
        <h2>Finance</h2>
        <Link to="/inventory/create" className="btn btn-sm btn-success my-2">
          Add Item
        </Link>
        <table className="table table-sm table-striped table-bordered">
          <thead className="bg-success text-light">
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Sales</th>
              <th>Card Sales</th>
              <th>To-Pay Sales</th>
              <th>Expenses</th>
              <th>Cash In Hand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    </section>
  );
}
