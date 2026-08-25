# Diagnóstico · Práctica 5

Dominio: cálculo de venta en una pulpería (`procesarVenta`).

## Problemas encontrados en la versión original (ver historial git)

| # | Problema (síntoma) | Principio violado | Refactor aplicado |
|---|---|---|---|
| 1 | Nombres de una letra (`c`, `t`, `m`, `d`, `tot`, `imp`) | M1 · Nombres poco descriptivos | Commit "renombrar variables" |
| 2 | Números mágicos repetidos (`0.15`, `0.05`, `0.1`) | M1 · Números mágicos | Commit "extraer numeros magicos" |
| 3 | Condicionales anidados en el bucle y en la selección de descuento | M1 · Anidamiento excesivo / falta de early return | Commit "early return + filter/reduce" |
| 4 | Una sola función valida, suma, calcula descuentos, calcula impuesto, imprime el recibo y lleva un contador global | M3 · SRP (S de SOLID) | Commit "extraer funciones puras" |
| 5 | Agregar un tipo de cliente nuevo obliga a editar el cuerpo de la función | M3 · OCP (O de SOLID) | `DESCUENTOS_POR_TIPO` como mapa extensible |
| 6 | Muta el parámetro de entrada (`carrito.total = ...`) y depende de una variable global mutable | M3 · SRP / side effects ocultos | Commit "eliminar mutacion..." — contador en closure, sin mutación (cambio de contrato documentado) |
| 7 | `console.log` de validación mezclado con el cálculo | M1 · Responsabilidad mezclada | Eliminado al reemplazar el bucle por `filter` |

## Cambio de contrato (a propósito, no accidental)

`procesarVenta` ya no agrega `.total` al arreglo `carrito`. Se decidió eliminar esa mutación oculta; el test que la caracterizaba se actualizó en el mismo commit que hizo el cambio.