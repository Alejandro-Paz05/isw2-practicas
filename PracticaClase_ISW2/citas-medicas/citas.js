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
      cancelar,
      listar,
      _getCitas: () => citas
    };

    /**
     * RF-1: Agenda una cita médica.
     * RF-2: Valida horario laboral (08:00 - 18:00).
     * RF-3: Evita citas duplicadas (mismo doctor, fecha y hora).
     * @returns {object} La cita creada.
     */
    function agendar({ paciente, doctor, fecha, hora }) {
      if (!esHorarioLaboral(hora)) {
        throw new Error('Fuera del horario laboral (08:00 - 18:00)');
      }
      if (estaDuplicada(doctor, fecha, hora)) {
        throw new Error('Ya existe una cita con este doctor en esa fecha y hora');
      }
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

    // Verifica si ya existe una cita activa con el mismo doctor, fecha y hora.
    function estaDuplicada(doctor, fecha, hora) {
      const activas = citas.filter(function (c) { return !c.cancelada; });
      return activas.some(function (c) {
        return c.doctor === doctor && c.fecha === fecha && c.hora === hora;
      });
    }

    /**
     * RF-4: Cancela una cita por su id.
     * @param {number} id
     * @returns {boolean} true si se canceló, false si no existía.
     */
    function cancelar(id) {
      const cita = citas.find(function (c) { return c.id === id; });
      if (!cita) {
        return false;
      }
      cita.cancelada = true;
      return true;
    }

    /**
     * RF-5: Lista las citas activas.
     */
    function listar() {
      return citas.filter(function (c) { return !c.cancelada; });
    }
  }

  /**
   * RF-2: Verifica si la hora está dentro del horario laboral.
   * @param {string} hora Formato "HH:MM".
   * @returns {boolean}
   */
  function esHorarioLaboral(hora) {
    if (typeof hora !== 'string' || !/^\d{2}:\d{2}$/.test(hora)) {
      return false;
    }
    const partes = hora.split(':');
    const hh = parseInt(partes[0], 10);
    const mm = parseInt(partes[1], 10);
    if (mm < 0 || mm > 59) {
      return false;
    }
    return hh >= HORA_INICIO && hh < HORA_FIN;
  }

  return {
    crearGestor: crearGestor,
    esHorarioLaboral: esHorarioLaboral
  };
}));
