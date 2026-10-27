import { ListGroup, ListGroupItem, ButtonGroup, Button, Badge } from "reactstrap";
import { creditos } from "../utils/formato.js";

// Panel lateral: lo que el capitán ya subió a la nave.
function BodegaCarga({ carga, inventario, deshabilitado, onCambiarUnidades, onDesembarcar }) {
  const items = carga.itemsCargados;

  // `let` + iteración manual: total de unidades a bordo
  let unidadesTotales = 0;
  items.forEach((item) => {
    unidadesTotales += item.cantidad;
  });

  return (
    <aside className="bodega">
      <h2 className="seccion__titulo">Tu bodega de carga</h2>
      <p className="bodega__resumen">
        {unidadesTotales} {unidadesTotales === 1 ? "unidad" : "unidades"} a bordo
      </p>

      {items.length === 0 ? (
        <p className="bodega__vacia">La bodega está vacía. Añade suministros desde el catálogo.</p>
      ) : (
        <ListGroup flush>
          {items.map((item) => {
            const equipo = inventario.find((e) => e.id === item.id);
            if (!equipo) return null;

            return (
              <ListGroupItem key={item.id} className="bodega__item">
                <div className="bodega__nombre">{equipo.nombre}</div>
                <Badge color="success" pill className="chip mb-2">
                  {creditos(equipo.precio * item.cantidad)}
                </Badge>

                <div className="bodega__controles">
                  <ButtonGroup size="sm">
                    <Button
                      color="dark"
                      outline
                      aria-label="Quitar una unidad"
                      disabled={deshabilitado || item.cantidad <= 1}
                      onClick={() => onCambiarUnidades(item.id, item.cantidad - 1)}
                    >
                      −
                    </Button>
                    <Button color="dark" outline disabled className="cantidad">
                      {item.cantidad}
                    </Button>
                    <Button
                      color="dark"
                      outline
                      aria-label="Añadir una unidad"
                      disabled={deshabilitado || equipo.stock === 0}
                      onClick={() => onCambiarUnidades(item.id, item.cantidad + 1)}
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  <Button
                    color="danger"
                    outline
                    size="sm"
                    disabled={deshabilitado}
                    onClick={() => onDesembarcar(item.id)}
                  >
                    Desembarcar
                  </Button>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      )}
    </aside>
  );
}

export default BodegaCarga;
