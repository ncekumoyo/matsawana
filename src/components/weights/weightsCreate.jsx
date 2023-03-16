import { useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";
import DynamicInputs from "./dynamicInputs";

export default function WeightsCreate() {
  const { data, doFetch } = useFetch("http://localhost:3002/weights");
  const nameRef = useRef("");
  const unitRef = useRef("");
  const amountRef = useRef(0);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      doFetch({
        method: "POST",
        body: JSON.stringify({
          name: nameRef.current.value,
          unit: unitRef.current.value,
          amount: amountRef.current.value,
        }),
      });
    },
    [doFetch]
  );

  useEffect(() => {
    if (data) {
      navigate("/weights");
    }
  }, [data, navigate]);

  return (
    <section className="">
      <div className="container">
        <h2>Weights - Enter for today</h2>
        <form onSubmit={handleSubmit} className="col-md-6">
          <DynamicInputs name="Chuck" />
          <DynamicInputs name="Short Ribs" />
          <DynamicInputs name="Brisket" />
          <DynamicInputs name="Steak" />
          <DynamicInputs name="Boerewors" />
          <div className="form-group">
            <button type="submit" className="btn btn-small btn-warning">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}