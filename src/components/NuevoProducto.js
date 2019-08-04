import React, { useState } from "react";

// Redux
import { connect } from "react-redux";
import { agregarProducto } from "../actions/productosActions";

const NuevoProducto = ({ history, agregarProducto }) => {
  const [productoInfo, guardarProductoInfo] = useState({
    nombre: "",
    precio: ""
  });

  const [error, guardarError] = useState(false);

  const nombreProducto = e => {
    guardarProductoInfo({
      ...productoInfo,
      [e.target.name]: e.target.value
    });
  };

  const nuevoProducto = e => {
    e.preventDefault();

    if (productoInfo.nombre === "" || productoInfo.precio === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    // crear el nuevo producto
    agregarProducto(productoInfo);

    // redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Agregar Nuevo Producto</h2>
            {error ? (
              <div className="font-weight-bold alert alert-danger text-center mt-4 ">
                Todos los campos son Obligatorios
              </div>
            ) : (
              ""
            )}
            <form onSubmit={nuevoProducto}>
              <div className="form-group">
                <label>Titulo</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Titulo"
                  onChange={nombreProducto}
                />
              </div>
              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="text"
                  name="precio"
                  className="form-control"
                  placeholder="Precio"
                  onChange={nombreProducto}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  productos: state.productos.productos
});

export default connect(
  mapStateToProps,
  { agregarProducto }
)(NuevoProducto);
