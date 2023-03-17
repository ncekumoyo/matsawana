import { useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function WeightsDelete() {
  const { id } = useParams();
  const { data, loading, error, doFetch } = useFetch(`http://localhost:3002/weights/${id}`);
  const { data: res, doFetch: del } = useFetch(`http://localhost:3002/weights/${id}`);
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
      navigate("/weights");
    }
    if (!data) {
      doFetch();
      return;
    }
  }, [data, navigate, doFetch, res]);

  return (
    <section>
      <div className="container">
        <h2>Weights/Count - Delete</h2>
        <p className="lead">Are you sure you want to delete this record?</p>
        <div className="col-md-6">
          <table className="table table-sm col-md-6 text-end">
            <thead className="bg-dark text-light">
              <tr>
                <th className="text-start" colSpan="6">
                  Entered on {data?.date}
                </th>
              </tr>
            </thead>
            {data && (
              <tbody>
                <tr>
                  <th className="text-start">Chuck</th>
                  <td>{data?.meat?.chuck} kg</td>
                </tr>
                <tr>
                  <th className="text-start">Short Ribs</th>
                  <td>{data?.meat?.shortrib} kg</td>
                </tr>
                <tr>
                  <th className="text-start">Brisket</th>
                  <td>{data?.meat?.brisket} kg</td>
                </tr>
                <tr>
                  <th className="text-start">Steak</th>
                  <td>{data?.meat?.steak} kg</td>
                </tr>
                <tr>
                  <th className="text-start">Boerewors</th>
                  <td>{data?.meat?.boerewors} kg</td>
                </tr>
                <tr>
                  <th className="text-start">Chicken</th>
                  <td>{data?.meat?.chicken}</td>
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
            <Link to="/weights" className="btn btn-sm btn-dark me-2">
              No, Go Back!
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
