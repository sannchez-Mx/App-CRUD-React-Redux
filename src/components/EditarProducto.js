import React, { useState, useEffect, useLayoutEffect } from "react";

// Redux
import { connect } from "react-redux";
import { mostrarProducto, editarProducto } from "../actions/productosActions";

const EditarProducto = ({
  history,
  match,
  mostrarProducto,
  producto,
  editarProducto
}) => {

  useEffect(() => {
    const { id } = match.params;
    mostrarProducto(id);
  }, [mostrarProducto, match.params]);

  useLayoutEffect(() => {
    const { id } = match.params;
    if (producto !== undefined) {
      const { nombre, precio } = producto;
      guardarProductoInfo({
        nombre,
        precio,
        id
      });
    }
  }, [producto, match.params]);

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

  const actualizarProducto = e => {
    e.preventDefault();

    if (productoInfo.nombre === "" || productoInfo.precio === "") {
      guardarError(true);
      return;
    }
    guardarError(false);

    // Actualizar el producto actual
    editarProducto(productoInfo);

    // redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center">Editar Producto</h2>
            {error ? (
              <div className="font-weight-bold alert alert-danger text-center mt-4 ">
                Todos los campos son Obligatorios
              </div>
            ) : (
              ""
            )}
            <form onSubmit={actualizarProducto}>
              <div className="form-group">
                <label>Titulo</label>
                <input
                  defaultValue={productoInfo.nombre}
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
                  defaultValue={productoInfo.precio}
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
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  producto: state.productos.producto
});

export default connect(
  mapStateToProps,
  { mostrarProducto, editarProducto }
)(EditarProducto);
