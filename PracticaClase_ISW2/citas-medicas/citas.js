/**
 * Aplicación de Citas Médicas — Lógica de negocio.
 *
 * Este módulo se comparte entre:
 *  - Las pruebas TDD (ejecutadas con Node.js, módulo node:test)
 *  - La interfaz standalone app.html (cargado por <script> en el navegador)
 *
 * Funciona tanto con CommonJS (Node) como en el navegador (window global).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CitasMedicas = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Rango horario laboral
  const HORA_INICIO = 8;   // 08:00
  const HORA_FIN = 18;     // 18:00 (exclusivo)

  /**
   * Crea un nuevo gestor de citas.
   */
  function crearGestor() {
    const citas = [];
    let siguienteId = 1;

    return {
      agendar,
      listar,
      _getCitas: () => citas
    };

    /**
     * RF-1: Agenda una cita médica.
     * @returns {object} La cita creada.
     */
    function agendar({ paciente, doctor, fecha, hora }) {
      const cita = {
        id: siguienteId++,
        paciente,
        doctor,
        fecha,
        hora,
        cancelada: false
      };
      citas.push(cita);
      return cita;
    }

    /**
     * RF-5: Lista las citas activas.
     */
    function listar() {
      return citas.filter(function (c) { return !c.cancelada; });
    }
  }

  function esHorarioLaboral() {
    return false;
  }

  return {
    crearGestor: crearGestor,
    esHorarioLaboral: esHorarioLaboral
  };
}));
