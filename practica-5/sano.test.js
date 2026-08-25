// practica-5/enfermo.test.js

const { procesarVenta } = require("./sano");

let pasadas = 0;
let fallidas = 0;

function test(nombre, fn) {
  try {
    fn();
    console.log(`OK   ${nombre}`);
    pasadas++;
  } catch (e) {
    console.log(`FAIL ${nombre}`);
    console.log(`     ${e.message}`);
    fallidas++;
  }
}

function assertEqual(actual, esperado, msg = "") {
  if (actual !== esperado) {
    throw new Error(`${msg} -> esperado ${esperado}, obtuvo ${actual}`);
  }
}

function assertCercaDe(actual, esperado, tolerancia = 0.01) {
  if (Math.abs(actual - esperado) > tolerancia) {
    throw new Error(`esperado ~${esperado}, obtuvo ${actual}`);
  }
}

test("cliente regular sin membresia: descuento 5% + impuesto 15%", () => {
  const carrito = [{ precio: 100, cantidad: 2 }];
  const total = procesarVenta(carrito, "regular", false);
  assertCercaDe(total, 218.5);
});

test("cliente mayorista sin membresia: descuento 15%", () => {
  const carrito = [{ precio: 100, cantidad: 2 }];
  const total = procesarVenta(carrito, "mayorista", false);
  assertCercaDe(total, 195.5);
});

test("tipo de cliente desconocido no aplica descuento", () => {
  const carrito = [{ precio: 50, cantidad: 1 }];
  const total = procesarVenta(carrito, "otro", false);
  assertCercaDe(total, 57.5);
});

test("miembro obtiene 10% adicional sobre el monto ya descontado", () => {
  const carrito = [{ precio: 100, cantidad: 1 }];
  const total = procesarVenta(carrito, "regular", true);
  assertCercaDe(total, 98.325);
});

test("items con cantidad invalida (<=0) se ignoran del subtotal", () => {
  const carrito = [{ precio: 100, cantidad: 0 }, { precio: 50, cantidad: 1 }];
  const total = procesarVenta(carrito, "otro", false);
  assertCercaDe(total, 57.5);
});

test("items con precio invalido (<=0) se ignoran del subtotal", () => {
  const carrito = [{ precio: -10, cantidad: 2 }, { precio: 20, cantidad: 1 }];
  const total = procesarVenta(carrito, "otro", false);
  assertCercaDe(total, 23);
});

test("efecto secundario actual: procesarVenta muta el carrito agregando .total", () => {
  const carrito = [{ precio: 100, cantidad: 1 }];
  procesarVenta(carrito, "otro", false);
  assertEqual(typeof carrito.total, "number", "carrito.total deberia existir");
});

console.log(`\n${pasadas} pasadas, ${fallidas} fallidas`);
if (fallidas > 0) process.exit(1);