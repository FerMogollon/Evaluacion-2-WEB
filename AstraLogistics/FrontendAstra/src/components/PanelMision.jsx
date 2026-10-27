import { Navbar, Badge, Spinner } from "reactstrap";
import Temporizador from "./Temporizador.jsx";
import { creditos } from "../utils/formato.js";

// Panel superior fijo: créditos disponibles + costo total de la carga + reloj.
function PanelMision({ carga, procesando, onExpirar }) {
  return (
    <Navbar light className="panel-mision justify-content-center" fixed="top">
      <div className="panel-mision__contenido">
        <span className="marca">AstroLogistics</span>

        <span className="dato">
          Créditos disponibles: <strong>{creditos(carga.creditosDisponibles)}</strong>
        </span>

        <Badge color="dark" pill className="chip chip-total">
          Costo total de Carga: {creditos(carga.total)}
        </Badge>

        <Temporizador tiempoRestanteMs={carga.tiempoRestanteMs} onExpirar={onExpirar} />

        {procesando && (
          <span className="calculando" role="status">
            <Spinner size="sm" /> Calculando peso...
          </span>
        )}
      </div>
    </Navbar>
  );
}

export default PanelMision;
