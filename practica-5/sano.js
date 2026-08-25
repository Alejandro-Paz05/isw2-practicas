// practica-5/enfermo.js

let contadorVentas = 0;

function procesarVenta(c, tipo, m) {
  contadorVentas = contadorVentas + 1;
  let t = 0;
  for (let i = 0; i < c.length; i++) {
    if (c[i].cantidad > 0) {
      if (c[i].precio > 0) {
        t = t + (c[i].precio * c[i].cantidad);
      } else {
        console.log("precio invalido");
      }
    } else {
      console.log("cantidad invalida");
    }
  }
  let d = 0;
  if (tipo == "mayorista") {
    d = t * 0.15;
  } else {
    if (tipo == "regular") {
      d = t * 0.05;
    } else {
      d = 0;
    }
  }
  let tot = t - d;
  if (m == true) {
    tot = tot - (tot * 0.1);
  }
  let imp = tot * 0.15;
  let final = tot + imp;
  c.total = final;
  console.log("=== RECIBO ===");
  console.log("Subtotal: " + t);
  console.log("Descuento: " + d);
  console.log("Impuesto: " + imp);
  console.log("Total: " + final);
  console.log("Venta numero: " + contadorVentas);
  return final;
}

module.exports = { procesarVenta };