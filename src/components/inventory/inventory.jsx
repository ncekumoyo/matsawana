import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function Inventory() {
  const { data, loading, error, doFetch } = useFetch("http://localhost:3002/inventory");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <section className="">
      <div className="container">
        <h2>Inventory </h2>
        <Link to="/inventory/create" className="btn btn-sm btn-warning my-2">
          Add Item
        </Link>
        <table className="table table-sm table-striped text-end">
          <thead className="bg-warning">
            <tr>
              <th className="text-start">Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th></th>
            </tr>
          </thead>
          {data && (
            <tbody>
              {data?.map((x) => (
                <tr key={x.id}>
                  <td className="text-start">{x.name}</td>
                  <td>{x.amount}</td>
                  <td>{x.unit}</td>
                  <td className="text-center">
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
