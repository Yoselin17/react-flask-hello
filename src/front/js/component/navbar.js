import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  console.log(store);
  let navigate = useNavigate();

  function logout() {
    actions.logout();
    navigate("../login", { replace: true });
  }
  return (
    <nav className="navbar navbar-light bg-light">
      hola a todas
      <div className="container">
        <div className="ml-auto">
          {store.permiso ? ( //si esta, muestrame tru, de lo contrario no se muestra nada.
            <button className="btn btn-danger ms-5" onClick={() => logout()}>
              cerrar sesion
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};
