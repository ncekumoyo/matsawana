import { useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function FinanceCreate() {
  const { data, doFetch } = useFetch("http://localhost:3002/finance");
  const salesRef = useRef(0);
  const cardSalesRef = useRef(0);
  const toPayRef = useRef(0);
  const expensesRef = useRef(0);
  const cashRef = useRef(0);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const record = {
        date: new Date().toJSON().slice(0, 10),
        sales: Number(salesRef.current.value),
        cardsales: Number(cardSalesRef.current.value),
        topay: Number(toPayRef.current.value),
        expenses: Number(expensesRef.current.value),
        cash: Number(cashRef.current.value),
      };
      const expectedCash = record.sales - record.cardsales - record.topay - record.expenses;
      if (expectedCash < record.cash) {
        record.sales += record.cash - expectedCash;
      } else if (expectedCash > record.cash) {
        record.deficit = expectedCash - record.cash;
      }
      doFetch({
        method: "POST",
        body: JSON.stringify(record),
      });
    },
    [doFetch]
  );

  useEffect(() => {
    if (data) {
      navigate("/finance");
    }
  }, [data, navigate]);

  return (
    <section className="">
      <div className="container">
        <h2>Finance - Create New Item</h2>
        <form onSubmit={handleSubmit} className="col-md-6">
          <div className="form-group mb-3">
            <label htmlFor="">Sales</label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              step="0.001"
              className="form-control"
              ref={salesRef}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Card Sales</label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              step="0.001"
              className="form-control"
              ref={cardSalesRef}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">To Pay</label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              step="0.001"
              className="form-control"
              ref={toPayRef}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Expenses</label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              step="0.001"
              className="form-control"
              ref={expensesRef}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="">Cash in Hand</label>
            <input
              type="number"
              defaultValue="0"
              min="0"
              step="0.001"
              className="form-control"
              ref={cashRef}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-small btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
