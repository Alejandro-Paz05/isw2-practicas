# Requerimientos — Aplicación de Citas Médicas

**Proyecto:** Aplicación HTML *standalone* para la gestión de citas médicas.
**Metodología:** TDD (Test-Driven Development) con pruebas estructuradas bajo el patrón **AAA** (Arrange-Act-Assert).
**Rama:** `feature/citas-medicas-tdd`
**Ruta:** `PracticaClase_ISW2/citas-medicas/`

---

## 1. Alcance

Se desarrollará una aplicación para agendar, listar y cancelar citas médicas. La lógica de negocio se implementará en JavaScript puro (sin dependencias externas), y la interfaz será un único archivo HTML *standalone* que funcione abriéndolo directamente en el navegador.

El desarrollo se hará siguiendo **TDD**: primero se escribe cada prueba (en rojo / RED), luego el código mínimo para pasarla (en verde / GREEN), realizando **un commit por prueba** en cada fase.

---

## 2. Requerimientos Funcionales (RF)

### RF-1: Agendar una cita médica
- El usuario debe poder agendar una cita indicando:
  - **Paciente** (nombre, obligatorio y no vacío).
  - **Doctor** (nombre, obligatorio y no vacío).
  - **Fecha** (formato `YYYY-MM-DD` válido).
  - **Hora** (formato `HH:MM` dentro del horario laboral).
- Al agendar, el sistema debe regresar un objeto de cita con **id único**.

### RF-2: Validar horario laboral
- Solo se permiten citas dentro del **horario laboral: de 08:00 a 18:00 (8 AM – 6 PM)**.
- Una cita con hora fuera de ese rango **debe ser rechazada**.

### RF-3: Evitar citas duplicadas
- No se permite agendar **dos citas con el mismo doctor a la misma fecha y hora**.
- Un intento de cita duplicada debe ser rechazado.

### RF-4: Cancelar una cita
- El usuario debe poder **cancelar** una cita existente por su **id**.
- Al cancelar, la cita deja de aparecer en la lista activa.

### RF-5: Listar citas agendadas
- El sistema debe poder devolver la **lista de citas activas** (las que no han sido canceladas).

---

## 3. Requerimientos No Funcionales (RNF)

### RNF-1: Standalone
- La aplicación debe ser un **único archivo HTML** que contenga HTML, CSS y JavaScript embebidos.
- Debe funcionar sin servidor, sin dependencias externas y sin conexión.

### RNF-2: Calidad de código — patrón AAA
- Cada prueba debe seguir la estructura **AAA**:
  - **Arrange (Organizar):** preparar datos y estado inicial.
  - **Act (Actuar):** ejecutar la acción que se desea probar.
  - **Assert (Verificar):** comprobar que el resultado es el esperado.

### RNF-3: Pruebas
- Las pruebas deben poder ejecutarse por línea de comandos con **Node.js** (módulo `node:test`), sin frameworks externos.

---

## 4. Historias de Usuario / Pruebas (casos TDD)

| # | Historia de usuario | Resultado esperado |
|---|--------------------|--------------------|
| 1 | Como paciente quiero agendar una cita con doctor, fecha y hora | Devuelve el objeto de cita con id |
| 2 | Como paciente quiero saber que no puedo agendar fuera del horario laboral | Rechaza citas fuera de 08:00–18:00 |
| 3 | Como paciente quiero que no se dupliquen mis citas con el mismo doctor a la misma hora | Rechaza citas duplicadas |
| 4 | Como paciente quiero cancelar una cita que ya no necesito | La cita desaparece de la lista activa |

---

## 5. Definición de Listo (DoD)

- [ ] Cada prueba escrita primero (RED) y confirmada en rojo.
- [ ] Código mínimo implementado para pasar la prueba (GREEN).
- [ ] Un commit por cada fase de prueba (RED y GREEN).
- [ ] Todas las pruebas pasan en verde al final.
- [ ] La aplicación `app.html` consume la misma lógica probada.
- [ ] Se desglosaron y documentaron los requerimientos (este archivo).
