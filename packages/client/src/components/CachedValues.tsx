import { useEffect, useState } from "react";
import { slashAllApi } from "../api";
import classes from "./cachedvalues.module.css";

export const CachedValues = () => {
  const [cachedValues, setCachesValues] = useState<null | Record<
    string,
    string
  >>(null);

  const fetchAllCached = () => {
    slashAllApi.all
      .$get()
      .then((res) => res.json())
      .then((data) => setCachesValues(data.result));
  };

  useEffect(() => {
    fetchAllCached();
  }, []);

  console.log(cachedValues);

  if (!cachedValues) {
    return;
  }

  if (!Object.keys(cachedValues).length) return null;

  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Cached values</h2>
      <div>
        <table className={classes.table}>
          {/* <th> */}
          <thead>
            <tr>
              <th>index</th>
              <th>value</th>
            </tr>
          </thead>
          {/* </th> */}
          {Object.entries(cachedValues).map(([key, value]) => (
            <tbody key={key}>
              <tr>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};
