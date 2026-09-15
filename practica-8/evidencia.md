# Práctica 8 · Pipeline verde + URL viva

## Run verde

![Run verde en GitHub Actions](run-verde.png)

- Pipeline: [GitHub Actions · CI](https://github.com/Alejandro-Paz05/isw2-practicas/actions/workflows/ci.yml)
- Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

## URL viva

https://alejandro-paz05.github.io/isw2-practicas/

## Primer run rojo (y cómo lo arreglé)

El [run #1](https://github.com/Alejandro-Paz05/isw2-practicas/actions/runs/34925544296) falló en el paso *Tests práctica 4 (fiados)*.
El log mostraba `ReferenceError: _ is not defined` en `practica-4/fiados.js:19`: había un `_` suelto después de `module.exports`, así que el módulo reventaba al hacer `require` y ningún test llegaba a correr.
Quité el carácter, verifiqué en local (14/14 tests) y volví a hacer push: el run #2 salió verde.

## ¿Qué corre mi pipeline y qué agregaría después?

1. En cada push y en cada PR hacia `main`, GitHub Actions levanta un Ubuntu con Node 24.
2. Corre los tests de la práctica 4 (`calcularMora`, 7 casos) y de la práctica 5 (`procesarVenta`, 7 casos).
3. Si algún test falla, el script sale con código 1 y el check queda en rojo, lo que bloquea el merge a `main` por la branch protection.
4. Después agregaría **lint** (ESLint) como paso previo, para frenar errores como el `_` suelto antes de llegar a los tests.
5. Y tests **E2E** (Playwright) contra la página publicada, para comprobar que la URL viva responde y que los links funcionan.
