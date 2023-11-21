import { useState } from "react"


function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [total, setTotal] = useState(0);

  const agregarProducto = () => {
    if (nombre && precio) {
      const nuevoProducto = { nombre, descripcion, precio: parseFloat(precio) };
      setProductos([...productos, nuevoProducto]);
      setTotal(total + parseFloat(precio));
      // Limpiar el formulario
      setNombre('');
      setDescripcion('');
      setPrecio('');
    }
  };

  const sacarDelCarrito = (index) => {
    const productoEliminado = productos[index];
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
    setTotal(total - productoEliminado.precio);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Formulario de Productos</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre*</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">Precio*</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={agregarProducto} disabled={!nombre || !precio}>
              Agregar Producto
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Carrito de Compras</h2>
          {productos.length === 0 ? (
            <p>Cargar productos</p>
          ) : (
            <ul className="list-group">
              {productos.map((producto, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {producto.nombre} - {producto.descripcion} - ${producto.precio}
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => sacarDelCarrito(index)}>
                    Sacar del carrito
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3">
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default App