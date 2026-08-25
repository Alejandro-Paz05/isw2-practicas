function calcularMora(monto, diasVencidos) {
  if (typeof monto !== "number" || Number.isNaN(monto)) {
    throw new Error("El monto debe ser un número");
  }
  if (monto < 0) {
    throw new Error("El monto no puede ser negativo");
  }
  if (typeof diasVencidos !== "number" || Number.isNaN(diasVencidos)) {
    throw new Error("Los días vencidos deben ser un número");
  }
 
  if (diasVencidos > 0) {
    return monto * 0.05;
  }
 
  return 0;
}
 
module.exports = { calcularMora };_