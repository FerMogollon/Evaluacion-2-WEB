// Error con código HTTP. Los services lo lanzan; el errorHandler lo convierte en respuesta.
export class HttpError extends Error {
  constructor(status, message, extra = {}) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}
