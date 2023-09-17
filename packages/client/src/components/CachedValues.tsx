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

  if (!cachedValues) return null;

  return (
    <div className={classes.root}>
      <h2 className={classes.heading}>Cached values</h2>
      <div>
        <table>
          <th>
            <tr>
              <td>index</td>
              <td>value</td>
            </tr>
          </th>
          {Object.entries(cachedValues).map(([key, value]) => (
            <tr>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
