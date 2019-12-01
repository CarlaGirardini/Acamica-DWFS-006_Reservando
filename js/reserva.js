Reserva = function(restaurant, fecha, cantPersonas, codigoDescuento) {
    this.horario = fecha;
    this.cantPersonas = cantPersonas;
    this.descuentoAplicado;
    this.adicional = 0;
    this.montoTotal;
    this.precioBase;
    this.calcularPrecioBase = () => this.precioBase = cantPersonas*restaurant.precio;
    this.aplicarDescuento = function(codigoDescuento){
        // Descuentos aplicados por código:
        aplicarCodigoDescuento(codigoDescuento,this,restaurant);

        // Descuentos adicionales por grupos grandes:
        let descuentoAdicional = 0;

        if(cantPersonas >= 4 && cantPersonas < 7){
            // Si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento.
            descuentoAdicional = this.precioBase * 0.05;
        }
        
        if(cantPersonas >= 7 && cantPersonas < 9){
            // Para grupos entre de 7 y 8 personas se agrega un 10% de descuento
            descuentoAdicional = this.precioBase*0.1;
        }
        
        if(cantPersonas >= 9){
            // Para grupos de más de 8 personas se agrega un 15% de descuento
            descuentoAdicional = this.precioBase*0.15;
        }

        return this.descuentoAplicado-=descuentoAdicional;
    };
    this.aplicarAdicionales = function(){
        
        let dia = fecha.getDay();
        let finDeSemana = dia === 0 || dia === 5 || dia === 6;
        
        let hora = this.horario.getHours();
        let esMediodia = hora >= 12 && hora <= 14;
        let esNoche = hora >= 20 && hora <= 21;
        
        // Adicional por horario:
        if(esMediodia || esNoche){
            // Se agrega un adicional del 5% si la reserva fue hecha para un horario dentro de las franjas de 13 a 14 y de 20 a 21
            this.adicional += this.precioBase*0.05;
        }
        
        // Adicional por fin de semana:
        if(finDeSemana){
            // Si la reserva fue realizada para viernes, sábado o domingo, se le agrega un adicional del 10%
            this.adicional += this.precioBase*0.1;
        }
        return this.adicional;
    }
    this.calcularMontoTotal = function(){
        this.aplicarDescuento(codigoDescuento);
        this.aplicarAdicionales();
        montoTotal = this.descuentoAplicado+this.adicional;
        return montoTotal;
    };
}

function aplicarCodigoDescuento(codigo,esto,restaurant){
    switch (codigo) {
        case 'DES15':
            // obtiene un 15% de descuento
            esto.descuentoAplicado = esto.precioBase*0.85;
            break;

        case 'DES200':
            // obtiene $200 de descuento
            esto.descuentoAplicado = esto.precioBase-200;
            if(esto.descuentoAplicado<0){
                return esto.descuentoAplicado=0;
            }
            break;

        case 'DES1':
            // obtiene de descuento el valor equivalente al precio de una persona
            esto.descuentoAplicado = esto.precioBase-restaurant.precio;
            if(esto.descuentoAplicado<0){
                return esto.descuentoAplicado=0;
            }
            break;

        case '':
            esto.descuentoAplicado = esto.calcularPrecioBase();

        default:
            console.log('No es un código de descuento válido');
    };
}