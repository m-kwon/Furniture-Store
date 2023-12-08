import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import CartModal from "../cart/CartModal";

const Header = (props) => {
  const [displayPopout, setDisplayPopout] = React.useState(false);
  const ref = React.useRef();
  useOnClickOutside(ref, () => setDisplayPopout(false));

  function useOnClickOutside(ref, handler) {
    React.useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  const UserPopout = (props) => {
    return (
      <div className={styles.userPopout} ref={ref}>
        <p>
          Hello, <span>{props.displayName}!</span>
        </p>
        <button onClick={props.signOut}>Sign Out</button>
      </div>
    );
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <p className={styles.title}>Furniture</p>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.navUl}>
          <div className={styles.navLinks}>
            <Link to="/living">
              <li>Living</li>
            </Link>
            <Link to="/dining">
              <li>Dining</li>
            </Link>
            <Link to="/bedroom">
              <li>Bedroom</li>
            </Link>
          </div>
          <div className={styles.navLinks}>
            <li>
              <span className="material-icons-outlined">search</span>
            </li>
            <li>
              {props.user ? (
                <img
                  style={{ width: "24px", borderRadius: "50%" }}
                  src={props.user.photoURL}
                  onClick={() => setDisplayPopout(!displayPopout)}
                  alt={`Google avatar of ${props.user.displayName}`}
                ></img>
              ) : (
                <span
                  className="material-icons-outlined"
                  // onClick={props.signInWithGoogle}
                >
                  account_circle
                </span>
              )}
              {displayPopout && (
                <UserPopout
                  displayName={props.user.displayName}
                  signOut={props.signOut}
                />
              )}
            </li>
            <li>
              <span
                className="material-icons-outlined"
                onClick={props.toggleModal}
                aria-label="shopping cart"
              >
                shopping_bag
              </span>
            </li>
          </div>
        </ul>
      </nav>
      <CartModal
        cart={props.cart}
        addToCart={props.addToCart}
        toggleModal={props.toggleModal}
        showCart={props.showCart}
        removeFromCart={props.removeFromCart}
      />
    </header>
  );
};

export default Header;