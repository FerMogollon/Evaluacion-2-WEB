import { Row, Col } from "reactstrap";
import TarjetaSuministro from "./TarjetaSuministro.jsx";

// Cuadrícula de suministros: .map() sobre el arreglo del inventario.
function Catalogo({ inventario, deshabilitado, onAgregar }) {
  return (
    <section>
      <h2 className="seccion__titulo">Catálogo de la base</h2>
      <Row className="justify-content-center">
        {inventario.map((equipo) => (
          <Col md="4" xs="12" key={equipo.id}>
            <TarjetaSuministro equipo={equipo} deshabilitado={deshabilitado} onAgregar={onAgregar} />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default Catalogo;
