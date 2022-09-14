const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      usuario: "",
      permiso: false,
      nombre: "",
    },

    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      registrarFunction: (correo, pass) => {
        console.log(correo, pass);
        console.log("correo, flux, correo");
        console.log("pass, flux , pass");
        const posData = {
          correo: correo,
          pass: pass,
          activo: true,
        };
        fetch(process.env.BACKEND_URL + "/api/registrar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(posData),
        })
          .then((response) => response.json())
          .then((data) => data);
      },

      iniciarSesionFuncion: (correo, pass) => {
        const postData = {
          correo: correo,
          pass: pass,
        };
        fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(postData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setStore({
              nombre: data.user.email,
            });
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("nombre", data.user.email);
          });
      },
      privateFuncion: () => {
        fetch(process.env.BACKEND_URL + "/api/private", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({
              permiso: result.permiso,
            });
          })
          .catch((error) => console.log("error", error));
      },

      logout: () => {
        //es para cerrar la sesion, donde ingresa mail y contrase;a.
        const store = getStore();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("nombre");

        store.permiso = false;
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
