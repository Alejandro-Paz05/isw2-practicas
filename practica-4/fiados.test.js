// practica-4/fiados.test.js

const { calcularMora } = require("./fiados");

let pasados = 0;
let fallados = 0;

function test(nombre, fn) {
  try {
    fn();
    pasados++;
    console.log(`✅ PASS: ${nombre}`);
  } catch (err) {
    fallados++;
    console.log(`❌ FAIL: ${nombre} -> ${err.message}`);
  }
}

function assertEqual(actual, esperado) {
  if (actual !== esperado) {
    throw new Error(`Esperado: ${esperado}, Recibido: ${actual}`);
  }
}

// ---------------------------------------------------------------------
// Suite de tests (AAA: Arrange, Act, Assert)
// ---------------------------------------------------------------------

// Camino feliz: fiado vencido con días > 0
test("calcularMora - fiado vencido cobra 5% del monto", () => {
  // Arrange
  const monto = 1000;
  const diasVencidos = 5;

  // Act
  const resultado = calcularMora(monto, diasVencidos);

  // Assert
  assertEqual(resultado, 50);
});

// Caso borde: 0 días vencidos -> no hay mora
test("calcularMora - 0 dias vencidos no genera mora", () => {
  // Arrange
  const monto = 1000;
  const diasVencidos = 0;

  // Act
  const resultado = calcularMora(monto, diasVencidos);

  // Assert
  assertEqual(resultado, 0);
});

// Caso borde: monto 0
test("calcularMora - monto 0 da mora 0 aunque este vencido", () => {
  // Arrange
  const monto = 0;
  const diasVencidos = 10;

  // Act
  const resultado = calcularMora(monto, diasVencidos);

  // Assert
  assertEqual(resultado, 0);
});

// TDD real (red -> green): este test se escribió ANTES de agregar
// la validación de monto negativo en fiados.js.
// Commit correspondiente: "test(fiados): red - caso monto negativo"
test("calcularMora - monto negativo lanza error", () => {
  // Arrange
  const monto = -100;
  const diasVencidos = 5;
  let lanzoError = false;

  // Act
  try {
    calcularMora(monto, diasVencidos);
  } catch (err) {
    lanzoError = true;
  }

  // Assert
  assertEqual(lanzoError, true);
});

// TDD real (red -> green): este test se escribió ANTES de agregar
// la validación de diasVencidos no numérico en fiados.js.
// Commit correspondiente: "test(fiados): red - caso dias no numericos"
test("calcularMora - dias vencidos no numericos lanza error", () => {
  // Arrange
  const monto = 500;
  const diasVencidos = "cinco";
  let lanzoError = false;

  // Act
  try {
    calcularMora(monto, diasVencidos);
  } catch (err) {
    lanzoError = true;
  }

  // Assert
  assertEqual(lanzoError, true);
});

// Caso borde adicional: muchos días vencidos, la mora sigue siendo 5% fijo
test("calcularMora - muchos dias vencidos sigue cobrando 5% fijo", () => {
  // Arrange
  const monto = 2000;
  const diasVencidos = 365;

  // Act
  const resultado = calcularMora(monto, diasVencidos);

  // Assert
  assertEqual(resultado, 100);
});

// Caso borde: días negativos se tratan como "no vencido"
test("calcularMora - dias negativos no genera mora", () => {
  // Arrange
  const monto = 800;
  const diasVencidos = -3;

  // Act
  const resultado = calcularMora(monto, diasVencidos);

  // Assert
  assertEqual(resultado, 0);
});

// ---------------------------------------------------------------------
// Resumen
// ---------------------------------------------------------------------
console.log("\n----------------------------------------");
console.log(`Total: ${pasados + fallados} | Pasaron: ${pasados} | Fallaron: ${fallados}`);
console.log("----------------------------------------");

process.exit(fallados > 0 ? 1 : 0);