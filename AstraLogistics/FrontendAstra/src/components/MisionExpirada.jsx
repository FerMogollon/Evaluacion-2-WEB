import { Button } from "reactstrap";

function MisionExpirada({ onReiniciar, procesando }) {
  return (
    <div className="expirada text-center">
      <h2>La ventana de lanzamiento se cerró</h2>
      <p>El tiempo de la misión terminó. Reinicia para devolver el stock a la base y empezar de nuevo.</p>
      <Button color="success" size="lg" disabled={procesando} onClick={onReiniciar}>
        Reiniciar misión
      </Button>
    </div>
  );
}

export default MisionExpirada;
