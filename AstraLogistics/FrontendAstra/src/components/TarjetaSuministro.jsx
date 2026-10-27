import { Card, CardBody, CardTitle, CardSubtitle, Badge, Button } from "reactstrap";
import { creditos } from "../utils/formato.js";

function TarjetaSuministro({ equipo, deshabilitado, onAgregar }) {
  const agotado = equipo.stock === 0;

  return (
    <Card className="mb-3 tarjeta text-center">
      <CardBody>
        <CardTitle tag="h5" className="tarjeta__nombre">
          {equipo.nombre}
        </CardTitle>
        <CardSubtitle className="mb-3 tarjeta__categoria">{equipo.categoria}</CardSubtitle>

        <Badge color="success" pill className="chip chip-precio">
          {creditos(equipo.precio)}
        </Badge>

        <p className={`tarjeta__stock ${agotado ? "sin-stock" : ""}`}>
          Stock disponible: <strong>{equipo.stock}</strong>
        </p>

        {agotado ? (
          <Button color="secondary" disabled block>
            Agotado en Base
          </Button>
        ) : (
          <Button color="success" block disabled={deshabilitado} onClick={() => onAgregar(equipo.id)}>
            Añadir a la Nave
          </Button>
        )}
      </CardBody>
    </Card>
  );
}

export default TarjetaSuministro;
