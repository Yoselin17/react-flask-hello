import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const handleSubmit = (evento) => {
    console.log("entroaqui");
    evento.preventDefault();

    const correo = evento.target[0].value;
    const pass = evento.target[1].value;
    const passrepetida = evento.target[2].value;

    if (pass !== passrepetida) {
      setErrormensaje("las contraseñas deben ser iguales");
    } else {
      actions.registrarFunction(correo, pass);
      navigate("../login", { replace: true });
    }

    actions.registrarFunction(correo, pass);
    navigate("../login", { replace: true });
  };

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" />
        <input placeholder="Contraseña" />
        <input placeholder="Repetir Contraseña" />
        <button>Enviar</button>
        <h3>{errormensaje}</h3>
      </form>
    </div>
  );
};
