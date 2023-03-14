import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function InventoryDelete() {
  const { id } = useParams();
  const { data, loading, error, doFetch } = useFetch(`http://localhost:3002/inventory/${id}`);
  const { data: res, doFetch: update } = useFetch(`http://localhost:3002/inventory/${id}`);
  const amountRef = useRef(0);
  const navigate = useNavigate();

  const incoming = () => {
    doUpdate(Number(amountRef.current.value));
  };
  const outgoing = () => {
    doUpdate(Number(amountRef.current.value) * -1);
  };

  const doUpdate = useCallback(
    (changeAmount) => {
      update({
        method: "PUT",
        body: JSON.stringify({
          ...data,
          amount: Number(data.amount) + changeAmount,
        }),
      });
    },
    [data, update]
  );

  useEffect(() => {
    if (res) {
      navigate("/");
      return;
    }
    if (!data) {
      doFetch();
      return;
    }
  }, [doFetch, res, data, navigate]);

  return (
    <section>
      <div className="container">
        <h2>Inventory - Quick Update</h2>
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
          <div className="form-group mb-3">
            <label htmlFor="" className="fw-bold">
              Amount (to be added or subtracted){" "}
            </label>
            <input type="number" defaultValue="0" min="0" step="0.001" className="form-control" ref={amountRef} />
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
