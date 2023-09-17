import classes from "./techused.module.css";
import bun from "../assets/icons/bun.svg";
import react from "../assets/icons/react.svg";
import hono from "../assets/icons/hono.svg";
import redis from "../assets/icons/redis.svg";
import docker from "../assets/icons/docker.svg";

export const TechUsed = () => {
  return (
    <div className={classes.root}>
      <h2>Tech Used</h2>

      <div className={classes.container}>
        <img src={bun} alt="bun" />
        <img src={redis} alt="redis" />
        <img src={hono} alt="hono" />
        <img src={docker} alt="docker" />
        <img src={react} alt="react" />
      </div>
    </div>
  );
};
