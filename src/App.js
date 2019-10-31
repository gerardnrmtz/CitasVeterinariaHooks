import React, { useState, useEffect, Fragment } from "react";

function Cita({ cita, index, eliminarCita }) {
  return (
    <div className="cita">
      <p>
        Mascota : <span>{cita.mascota}</span>
      </p>
      <p>
        Dueño : <span>{cita.propietario}</span>
      </p>
      <p>
        Fecha : <span>{cita.fecha}</span>
      </p>
      <p>
        Hora : <span>{cita.hora}</span>
      </p>
      <p>
        Sintomas : <span>{cita.sintomas}</span>
      </p>
      <button
        onClick={() => eliminarCita(index)}
        type="button"
        className="button eliminar u-full-widith"
      >
        Eliminar X
      </button>
    </div>
  );
}

function Formulario({ crearCita }) {
  const statetInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  };
  const [cita, actualizarCita] = useState(statetInicial);

  const handleChange = e => {
    //Primero copia del state actual
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    //pasar la cita hacia el componente principal

    crearCita(cita);

    //reiniciar el state (reiniciar el form)
    actualizarCita(statetInicial);
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={handleChange}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={handleChange}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={handleChange}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleChange}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </Fragment>
  );
}

function App() {
  //cargar las citas de localstare como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if(!citasIniciales){
    citasIniciales=[];
  }
  //UserState retorna 2 funciones
  //el state actual = this.state
  //funcion que actualia el state (this.setState())
  const [citas, guardarCita] = useState(citasIniciales);
  //Agregar las nuevas citas al state

  const crearCita = cita => {
    //tomar una copia del state y agregar el nuevo cliente

    const nuevasCitas = [...citas, cita];

    //lo agregamos al state de la aplicacion
    guardarCita(nuevasCitas);
  };
  //Eliminar las citas del state

  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    //El puntero a eliminar,y la cantidad despues de ese puntero
    nuevasCitas.splice(index, 1);

    guardarCita(nuevasCitas);
  };
  //equivalente componendidmount o componnendidupdate,Poner los componentes a los cuales va a reaccionar
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  },[citas]);

  //Cargar condicionalmente un titulo

  const titulo =
    Object.keys(citas).length === 0
      ? "no hay citas"
      : "Administrar Las Citas Aqui";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default App;
