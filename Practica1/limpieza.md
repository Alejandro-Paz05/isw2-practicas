

//CODIGO VIEJO//

#include <iostream>
using namespace std;

double procesarPedido(int tipo, double precio, int cant, string cliente, bool vip, double desc, int codigoInutil) {
    double total = 0;
    if (tipo == 1) {
        if (cant > 0) {
            if (vip == true) {
                total = precio * cant * 0.85; // 0.85 mágico
            } else {
                total = precio * cant * 0.15; // duplicado del cálculo de arriba (mismo patrón)
            }
        }
    }
    cout << cliente << " pagó: " << total << endl;
    return total;
}

//CODIGO CON LOS SMELLS//

#include <iostream>
using namespace std;

const double DESCUENTO_VIP = 0.85;         //Smell: Numeros magicos = constante con nombre
const double DESCUENTO_REGULAR = 0.15;

