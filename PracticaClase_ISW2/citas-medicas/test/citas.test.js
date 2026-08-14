/**
 * Pruebas TDD del sistema de citas médicas.
 *
 * Cada prueba sigue el patrón AAA (Arrange - Act - Assert):
 *   - ARRANGE: preparar datos y estado inicial.
 *   - ACT: ejecutar la acción que se quiere probar.
 *   - ASSERT: comprobar que el resultado es el esperado.
 *
 * Ejecución:  node --test
 */
const test = require('node:test');
const assert = require('node:assert');
const { crearGestor, esHorarioLaboral } = require('../citas.js');

// ---------------------------------------------------------------------------
// Prueba 1 (HU-1): Agendar una cita médica
// ---------------------------------------------------------------------------
test('Cita Medica: agendar una cita válida devuelve el objeto con id', () => {
  // ARRANGE
  const gestor = crearGestor();
  const datos = {
    paciente: 'Edgar Paz',
    doctor: 'Dr. Lopez',
    fecha: '2026-08-20',
    hora: '10:00'
  };

  // ACT
  const cita = gestor.agendar(datos);

  // ASSERT
  assert.strictEqual(cita.paciente, 'Edgar Paz');
  assert.strictEqual(cita.doctor, 'Dr. Lopez');
  assert.strictEqual(cita.fecha, '2026-08-20');
  assert.strictEqual(cita.hora, '10:00');
  assert.ok(cita.id > 0, 'La cita debe tener un id positivo');
  assert.strictEqual(cita.cancelada, false);
});

// ---------------------------------------------------------------------------
// Prueba 2 (HU-2): Validar horario laboral (08:00 - 18:00)
// ---------------------------------------------------------------------------
test('Cita Medica: rechaza una cita fuera del horario laboral', () => {
  // ARRANGE
  const gestor = crearGestor();
  const datos = {
    paciente: 'Maria Gomez',
    doctor: 'Dr. Lopez',
    fecha: '2026-08-20',
    hora: '22:30'
  };

  // ACT + ASSERT
  assert.throws(() => {
    gestor.agendar(datos);
  }, /Fuera del horario laboral/);
});

test('Cita Medica: esHorarioLaboral acepta 08:00 y rechaza 17:59 vs 18:00', () => {
  // ARRANGE (hora de prueba)
  // ACT
  const enLimite = esHorarioLaboral('08:00');
  const antesDelCierre = esHorarioLaboral('17:59');
  const alCierre = esHorarioLaboral('18:00');
  const fueraMadrugada = esHorarioLaboral('02:00');

  // ASSERT
  assert.strictEqual(enLimite, true);
  assert.strictEqual(antesDelCierre, true);
  assert.strictEqual(alCierre, false);
  assert.strictEqual(fueraMadrugada, false);
});

// ---------------------------------------------------------------------------
// Prueba 3 (HU-3): Evitar citas duplicadas
// ---------------------------------------------------------------------------
test('Cita Medica: rechaza una cita duplicada (mismo doctor, fecha y hora)', () => {
  // ARRANGE
  const gestor = crearGestor();
  gestor.agendar({
    paciente: 'Edgar Paz',
    doctor: 'Dr. Lopez',
    fecha: '2026-08-20',
    hora: '10:00'
  });

  // ACT + ASSERT
  assert.throws(() => {
    gestor.agendar({
      paciente: 'Otro Paciente',
      doctor: 'Dr. Lopez',
      fecha: '2026-08-20',
      hora: '10:00'
    });
  }, /Ya existe una cita/);
});

// ---------------------------------------------------------------------------
// Prueba 4 (HU-4): Cancelar una cita
// ---------------------------------------------------------------------------
test('Cita Medica: cancelar una cita la elimina de la lista activa', () => {
  // ARRANGE
  const gestor = crearGestor();
  const cita = gestor.agendar({
    paciente: 'Edgar Paz',
    doctor: 'Dr. Lopez',
    fecha: '2026-08-20',
    hora: '10:00'
  });

  // ACT
  const resultado = gestor.cancelar(cita.id);
  const activas = gestor.listar();

  // ASSERT
  assert.strictEqual(resultado, true);
  assert.strictEqual(activas.length, 0, 'La cita cancelada no debe aparecer');
});

// ---------------------------------------------------------------------------
// Prueba 5 (RF-5): Listar citas activas
// ---------------------------------------------------------------------------
test('Cita Medica: listar devuelve solo las citas no canceladas', () => {
  // ARRANGE
  const gestor = crearGestor();
  const cita1 = gestor.agendar({
    paciente: 'Edgar Paz',
    doctor: 'Dr. Lopez',
    fecha: '2026-08-20',
    hora: '10:00'
  });
  gestor.agendar({
    paciente: 'Maria Gomez',
    doctor: 'Dra. Ruiz',
    fecha: '2026-08-21',
    hora: '11:00'
  });

  // ACT
  gestor.cancelar(cita1.id);
  const activas = gestor.listar();

  // ASSERT
  assert.strictEqual(activas.length, 1);
  assert.strictEqual(activas[0].paciente, 'Maria Gomez');
});
