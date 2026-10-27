import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  UncontrolledAlert,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import * as api from "./services/api.js";
import PanelMision from "./components/PanelMision.jsx";
import Catalogo from "./components/Catalogo.jsx";
import BodegaCarga from "./components/BodegaCarga.jsx";
import MisionExpirada from "./components/MisionExpirada.jsx";

function App() {
  const [inventario, setInventario] = useState([]); // arreglo de suministros
  const [carga, setCarga] = useState(null); // objeto { creditos, total, itemsCargados[], ... }
  const [cargando, setCargando] = useState(true); // boolean: primera carga
  const [procesando, setProcesando] = useState(false); // boolean: "Calculando peso..."
  const [expirada, setExpirada] = useState(false);
  const [error, setError] = useState(null); // { id, mensaje } | null
  const [confirmando, setConfirmando] = useState(false); // modal de confirmación de reinicio

  // Carga inicial con promesas encadenadas (.then / .catch / .finally):
  // Endpoint 1 (inventario) + Endpoint 2 (carga).
  const cargarEstadoInicial = () => {
    setCargando(true);
    setError(null);
    Promise.all([api.obtenerInventario(), api.obtenerCarga()])
      .then(([listaInventario, estadoCarga]) => {
        setInventario(listaInventario);
        setCarga(estadoCarga);
        setExpirada(false);
      })
      .catch((err) => {
        if (err.expirada) setExpirada(true);
        setError({ id: Date.now(), mensaje: err.message });
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarEstadoInicial();
  }, []);

  // Las alertas se cierran solas a los 6 s.
  useEffect(() => {
    if (!error) return undefined;
    const temporizador = setTimeout(() => setError(null), 6000);
    return () => clearTimeout(temporizador);
  }, [error]);

  // Ejecuta cualquier mutación con async/await. El backend responde con
  // { mensaje, carga, inventario }, así que una sola respuesta sincroniza todo.
  const ejecutar = async (accion) => {
    setProcesando(true);
    try {
      const respuesta = await accion();
      setInventario(respuesta.inventario);
      setCarga(respuesta.carga);
      setExpirada(false);
      setError(null);
    } catch (err) {
      if (err.expirada) setExpirada(true);
      setError({ id: Date.now(), mensaje: err.message });
    } finally {
      setProcesando(false);
    }
  };

  const agregar = (equipoId) => ejecutar(() => api.agregarSuministro(equipoId, 1));
  const cambiarUnidades = (id, cantidad) => ejecutar(() => api.actualizarUnidades(id, cantidad));
  const desembarcar = (id) => ejecutar(() => api.eliminarSuministro(id));
  const reiniciar = () => ejecutar(() => api.reiniciarMision());

  // Reemplaza window.confirm por un modal con estilo propio.
  const confirmarReinicio = () => setConfirmando(true);
  const cancelarReinicio = () => setConfirmando(false);
  const aceptarReinicio = () => {
    setConfirmando(false);
    reiniciar();
  };

  const marcarExpirada = () => setExpirada(true);

  const alerta = error && (
    <UncontrolledAlert key={error.id} color="warning" className="alerta-mision">
      {error.mensaje}
    </UncontrolledAlert>
  );

  if (cargando) {
    return (
      <div className="pantalla-central">
        <Spinner color="success" />
        <p>Conectando con la base...</p>
      </div>
    );
  }

  // Sin datos (el backend no respondió): pantalla de reintento.
  if (!carga) {
    return (
      <div className="pantalla-central">
        {alerta}
        <h2>Sin conexión con la base</h2>
        <Button color="success" onClick={cargarEstadoInicial}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <>
      {alerta}
      <PanelMision carga={carga} procesando={procesando} onExpirar={marcarExpirada} />

      <Container className="contenido">
        <header className="encabezado text-center">
          <h1>Prepara tu nave</h1>
          <p>Elige los suministros dentro del presupuesto antes de que se cierre la ventana de lanzamiento.</p>
          {!expirada && (
            <Button color="danger" outline disabled={procesando} onClick={confirmarReinicio}>
              Reiniciar misión
            </Button>
          )}
        </header>

        {expirada ? (
          <MisionExpirada onReiniciar={reiniciar} procesando={procesando} />
        ) : (
          <Row className="justify-content-center">
            <Col lg="8" xs="12">
              <Catalogo inventario={inventario} deshabilitado={procesando} onAgregar={agregar} />
            </Col>
            <Col lg="4" xs="12">
              <BodegaCarga
                carga={carga}
                inventario={inventario}
                deshabilitado={procesando}
                onCambiarUnidades={cambiarUnidades}
                onDesembarcar={desembarcar}
              />
            </Col>
          </Row>
        )}
      </Container>

      <Modal isOpen={confirmando} toggle={cancelarReinicio} centered contentClassName="modal-mision">
        <ModalBody>
          <h5>¿Reiniciar la misión?</h5>
          <p>La carga actual se devolverá a la base.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={aceptarReinicio}>
            Reiniciar
          </Button>
          <Button color="secondary" outline onClick={cancelarReinicio}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default App;
