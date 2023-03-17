import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../customhooks/useFetch";

export default function Weights() {
  const { data, loading, error, doFetch } = useFetch("http://localhost:3002/weights");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <section className="">
      <div className="container">
        <h2>Weights/Counts </h2>
        <Link to="/weights/create" className="btn btn-sm btn-warning my-2">
          Add Item
        </Link>
        <table className="table table-sm table-striped text-end">
          <thead className="bg-dark text-light">
            <tr>
              <th className="text-start">Date</th>
              <th>Chuck</th>
              <th>Short Ribs</th>
              <th>Brisket</th>
              <th>Steak</th>
              <th>Boerewors</th>
              <th>TOTAL (kg)</th>
              <th>Chickens</th>
              <th></th>
            </tr>
          </thead>
          {data && (
            <tbody>
              {data?.map((x) => (
                <tr key={x?.id}>
                  <td className="text-start">{x?.date}</td>
                  <td>{x?.meat?.chuck}</td>
                  <td>{x?.meat?.shortrib}</td>
                  <td>{x?.meat?.brisket}</td>
                  <td>{x?.meat?.steak}</td>
                  <td>{x?.meat?.boerewors}</td>
                  <td className="lead fw-bold">
                    {(
                      Number(x?.meat?.chuck) +
                      Number(x?.meat?.shortrib) +
                      Number(x?.meat?.brisket) +
                      Number(x?.meat?.steak) +
                      Number(x?.meat?.boerewors)
                    ).toFixed(3)}
                  </td>
                  <td>{x?.meat?.chicken}</td>
                  <td className="text-center">
                    <Link to={`/weights/delete/${x?.id}`} className="btn btn-sm btn-danger me-2">
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
