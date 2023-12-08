import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import React from "react";

const Card = (props) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <article className={styles.card}>
      <Link to={`./${props.id}`}>
        <div className={styles.imageContainer}>
          <img
            src={props.img}
            className={loaded ? styles.img : styles.hidden}
            alt={`${props.name}, ${props.category} furniture`}
            onLoad={() => setLoaded(true)}
          ></img>
        </div>
      </Link>
      <div className={styles.details}>
        <Link to={`./${props.id}`} className={styles.title}>
          <span>{props.name}</span>
        </Link>
        <p>${props.price.toLocaleString("en-US")}</p>
      </div>
    </article>
  );
};

export default Card;