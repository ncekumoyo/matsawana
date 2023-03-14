import { useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function InventoryUpdate() {
  const { id } = useParams();
  const { data, loading, error, doFetch } = useFetch(`http://localhost:3002/inventory/${id}`);
  const { data: res, doFetch: update } = useFetch(`http://localhost:3002/inventory/${id}`);
  const nameRef = useRef("");
  const unitRef = useRef("");
  const amountRef = useRef(0);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      update({
        method: "PUT",
        body: JSON.stringify({
          id: id,
          name: nameRef.current.value,
          unit: unitRef.current.value,
          amount: amountRef.current.value,
        }),
      });
    },
    [id, update]
  );

  useEffect(() => {
    if (res) {
      navigate("/");
      return;
    }
    if (!data) {
      doFetch();
      return;
    } else {
      nameRef.current.value = data?.name;
      unitRef.current.value = data?.unit;
      amountRef.current.value = data?.amount;
      return;
    }
  }, [doFetch, res, data, navigate]);

  return (
    <section>
      <div className="container">
        <h2>Inventory - Update Item</h2>
        {data && (
          <form onSubmit={handleSubmit} className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="">Name</label>
              <input type="text" className="form-control" ref={nameRef} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Unit</label>
              <input type="text" className="form-control" ref={unitRef} required />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="">Amount</label>
              <input type="number" min="0" step="0.001" className="form-control" ref={amountRef} required />
            </div>
            <div className="form-group mb-3">
              <button type="submit" className="btn btn-sm btn-warning">
                Save
              </button>
            </div>
          </form>
        )}
        {loading && <p className="display-6 text-danger text-center p-3">...loading</p>}
        {error && <p className="lead text-danger text-center fw-bold p-3">Something went wrong!!!</p>}
      </div>
    </section>
  );
}
