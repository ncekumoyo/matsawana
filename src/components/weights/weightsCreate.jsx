import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";
import DynamicInputs from "./dynamicInputs";

export default function WeightsCreate() {
  const { data, doFetch } = useFetch("http://localhost:3002/weights");
  const [chuckSum, setChuckSum] = useState(0);
  const [shortRibSum, setShortRibSum] = useState(0);
  const [brisketSum, setBrisketSum] = useState(0);
  const [boereworsSum, setBoereworsSum] = useState(0);
  const [steakSum, setSteakSum] = useState(0);
  const [chickenSum, setChickenSum] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch({
      method: "POST",
      body: JSON.stringify({
        date: new Date().toJSON().slice(0, 10),
        meat: {
          chuck: chuckSum,
          shortrib: shortRibSum,
          brisket: brisketSum,
          steak: steakSum,
          boerewors: boereworsSum,
          chicken: chickenSum,
        },
      }),
    });
  };

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
          <DynamicInputs name="Chuck" sum={chuckSum} setSum={setChuckSum} />
          <DynamicInputs name="Short Ribs" sum={shortRibSum} setSum={setShortRibSum} />
          <DynamicInputs name="Brisket" sum={brisketSum} setSum={setBrisketSum} />
          <DynamicInputs name="Steak" sum={steakSum} setSum={setSteakSum} />
          <DynamicInputs name="Boerewors" sum={boereworsSum} setSum={setBoereworsSum} />
          <div className="form-group mb-3">
            <label className="fw-bold">Chicken {chickenSum}</label>
            <div className="d-flex">
              <input
                type="number"
                min="0"
                step="1"
                className="form-control form-control-sm me-2 diw "
                onChange={(e) => {
                  setChickenSum(Number(e.target.value));
                }}
                onFocus={(e) => {
                  if (e.target.value === "0") {
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-small btn-dark">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
