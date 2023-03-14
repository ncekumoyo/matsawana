import { useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function InventoryDelete() {
  const { id } = useParams();
  const { data, loading, error, doFetch } = useFetch(`http://localhost:3002/inventory/${id}`);
  const { data: res, doFetch: del } = useFetch(`http://localhost:3002/inventory/${id}`);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      del({
        method: "DELETE",
      });
    },
    [del]
  );

  useEffect(() => {
    if (res) {
      navigate("/");
    }
    if (!data) {
      doFetch();
      return;
    }
  }, [data, navigate, doFetch, res]);

  return (
    <section>
      <div className="container">
        <h2>Inventory - Delete Item</h2>
        <p className="lead">Are you sure you want to delete this item?</p>
        <div className="col-md-6">
          <table className="table table-sm col-md-6 text-end">
            <thead className="bg-warning">
              <tr>
                <th className="text-start">Name</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            {data && (
              <tbody>
                <tr>
                  <td className="text-start">{data?.name}</td>
                  <td>{data?.amount}</td>
                  <td>{data?.unit}</td>
                </tr>
              </tbody>
            )}
          </table>
          {loading && <p className="display-6 text-danger text-center p-3">...loading</p>}
          {error && <p className="lead text-danger text-center fw-bold p-3">Something went wrong!!!</p>}
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
