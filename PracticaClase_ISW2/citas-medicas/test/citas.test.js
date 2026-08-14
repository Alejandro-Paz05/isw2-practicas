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
const { crearGestor } = require('../citas.js');

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
