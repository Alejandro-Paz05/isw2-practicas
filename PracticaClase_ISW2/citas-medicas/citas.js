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
  function crearGestor() {
    return {
      agendar: function () {
        // TODO: implementar
        throw new Error('No implementado');
      },
      cancelar: function () {},
      listar: function () { return []; }
    };
  }

  function esHorarioLaboral() {
    return false;
  }

  return {
    crearGestor: crearGestor,
    esHorarioLaboral: esHorarioLaboral
  };
}));
