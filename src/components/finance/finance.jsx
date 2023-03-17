import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function Finance() {
  const { data, loading, error, doFetch } = useFetch("http://localhost:3002/finance");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <section className="">
      <div className="container">
        <h2>Finance</h2>
        <Link to="/finance/create" className="btn btn-sm btn-success my-2">
          Add Item
        </Link>
        <table className="table table-sm table-striped text-end">
          <thead className="bg-success text-light">
            <tr>
              <th className="text-start">Date</th>
              <th>Sales</th>
              <th>Card Sales</th>
              <th>To-Pay Sales</th>
              <th>Expenses</th>
              <th>Cash In Hand</th>
              <th>Deficit</th>
              <th></th>
            </tr>
          </thead>
          {data && (
            <tbody>
              {data.map((x) => (
                <tr key={x.id}>
                  <td className="text-start">{x.date}</td>
                  <td>{x.sales}</td>
                  <td>{x.cardsales}</td>
                  <td>{x.topay}</td>
                  <td>{x.expenses}</td>
                  <td>{x.cash}</td>
                  <td>{x?.deficit && <span className="text-danger fw-bold">R{x?.deficit}</span>}</td>
                  <td className="text-center">
                    <Link to={`/finance/update/${x.id}`} className="btn btn-sm btn-warning me-2">
                      Update
                    </Link>
                    <Link to={`/finance/delete/${x.id}`} className="btn btn-sm btn-danger me-2">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {loading && <p className="display-6 text-danger text-center p-3">...loading</p>}
        {error && <p className="lead text-danger text-center fw-bold p-3">Something went wrong!!!</p>}
      </div>
    </section>
  );
}
