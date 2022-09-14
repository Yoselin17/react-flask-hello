import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    const correo = evento.target[0].value;
    const pass = evento.target[1].value;

    actions.iniciarSesionFuncion(correo, pass);
    navigate("../private", { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" />
        <input placeholder="Contraseña" />
        <button>Enviar</button>
      </form>
    </div>
  );
};
