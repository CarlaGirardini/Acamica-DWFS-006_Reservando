var expect = chai.expect;

describe('Función reservarHorario(horario)', function(){

    // beforeEach(function(){
    //     let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);
    //     // return restaurant;
    // });

    it('Eliminar horario del arreglo', function(){
        // Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        restaurant.horarios.map((hora)=>{
            restaurant.reservarHorario(hora);
            let horarioReservado = expect(restaurant.horarios.indexOf(hora)).to.equal(-1);
            return horarioReservado;
        });
    })

    it('No modificar si se reserva un horario inexistente', function(){
        // Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        let arregloOriginal = restaurant.horarios;
        restaurant.reservarHorario('25');
        // expect(restaurant.horarios).to.equal(arregloOriginal);
        return restaurant.horarios===arregloOriginal;
    });

    it('No modificar arreglo si no se pasa parámetro', function(){
        // Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        let arregloOriginal = restaurant.horarios;
        restaurant.reservarHorario();
        // expect(restaurant.horarios).to.equal(arregloOriginal);
        return restaurant.horarios===arregloOriginal;
    });

});

describe('Función obtenerPuntuación()',function(){

    it('La puntuación se calcula correctamente', function(){
        // Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        let esUnArray = expect(restaurant.calificaciones).to.be.an('array');
        if(esUnArray){
            // Primero vacío el arreglo y le doy tres puntuaciones positivas
            restaurant.calificaciones=[];
            restaurant.calificar(3);
            restaurant.calificar(9);
            restaurant.calificar(5);
            // La longitud del arreglo tiene que ser 3
            let longitudArreglo = expect(restaurant.calificaciones.length).to.equal(3);
            // Verifico el resultado, que debe redondearse con un decimal. Para esto, multiplico y divido por 10 (la división después del redondeo)
            let calPositivas = expect(restaurant.obtenerPuntuacion()).to.equal(Math.round(170/3)/10);
            // Ahora agrego una calificación negativa. No debería modificar al arreglo
            restaurant.calificar(-3);
            let calNegativa = expect(restaurant.calificaciones.length).to.equal(3);
            // Por último, agrego calificación cero. Debería ignorarla
            restaurant.calificar(0);
            let calCero = expect(restaurant.obtenerPuntuacion()).to.equal(Math.round(170/3)/10);
            let verificarTodo = longitudArreglo&&calPositivas&&calNegativa&&calCero;
            return verificarTodo;
        }
        return false;
    });
    
    it('La puntuación sin calificaciones es cero', function(){
        // Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Primero vacío el array
        restaurant.calificaciones=[];
        // La puntuación debería ser nula
        expect(restaurant.obtenerPuntuacion()).to.equal(0);
    });
    
});

describe('Función calificar()', function(){
    it('Calificación dentro del rango permitido', function(){
        // Si la calificación está dentro del rango permitido, se pushea al arreglo de calificaciones
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        let longOriginal = restaurant.calificaciones.length;
        // Califico con un número dentro del rango y con los dos extremos del rango
        restaurant.calificar(5);
        restaurant.calificar(1);
        restaurant.calificar(10);
        // La longitud del arreglo debería aumentar en tres
        expect(restaurant.calificaciones.length).to.equal(longOriginal+3);
    });

    it('Calificación fuera del rango permitido', function(){
        // Si la calificación está fuera del rango permitido, debería ignorarla.
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        let longOriginal = restaurant.calificaciones.length;            
        // Califico con cero, con un valor negativo y con un número mayor a diez.
        restaurant.calificar(0);
        restaurant.calificar(-3);
        restaurant.calificar(15);
        // La longitud del arreglo no debería modificarse
        expect(restaurant.calificaciones.length).to.equal(longOriginal);
    });
});

describe('Función buscarRestaurante(id)', function(){

    it('Busca un restaurant en el listado', function(){
        let restaurantBuscado = listado.buscarRestaurante('Mandarín Kitchen');
        return 'Mandarín Kitchen'===restaurantBuscado.id;
    });

    it('Devuelve error si el restaurant no está en el listado', function(){
        let restaurantBuscado = listado.buscarRestaurante('Otro restaurant');
        return restaurantBuscado==='No se ha encontrado ningún restaurant';
    });

    it('Devuelve error con string vacío', function(){
        let restaurantBuscado = listado.buscarRestaurante('');
        return restaurantBuscado==='No se ha encontrado ningún restaurant';
    });

    it('Devuelve error con dato numérico', function(){
        let restaurantBuscado = listado.buscarRestaurante(95);
        return restaurantBuscado==='No se ha encontrado ningún restaurant';
    });
});

describe('Función obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)', function(){
    // Verificar restaurantes filtrados por rubro, por ciudad y por horario
    it('null en todos los filtros', function(){
        expect(listado.obtenerRestaurantes(null,null,null)).to.equal(listadoDeRestaurantes);
    });

    it('Filtra por rubro', function(){
        let rubroFiltrado = listado.obtenerRestaurantes('Pasta',null,null);
        let esUnArray = expect(rubroFiltrado).to.be.an('array');
        let verificarLongitud = expect(rubroFiltrado.length).to.equal(5);
        let verificarRubro = rubroFiltrado.forEach(restaurant=>expect(restaurant.rubro).to.equal('Pasta'));
        return esUnArray&&verificarLongitud&&verificarRubro;
    });

    it('Filtra por ciudad', function(){
        let ciudadFiltrada = listado.obtenerRestaurantes(null,'París',null);
        let esUnArray = expect(ciudadFiltrada).to.be.an('array');
        let verificarLongitud = expect(ciudadFiltrada.length).to.equal(6);
        let verificarCiudad = ciudadFiltrada.forEach(restaurant=>expect(restaurant.ubicacion).to.equal('París'));
        return esUnArray&&verificarLongitud&&verificarCiudad;
    });

    it('Filtra por horario', function(){
        let horarioFiltrado = listado.obtenerRestaurantes(null,null,'15:30');
        var cantidadHorarios = horarioFiltrado.length;
        var total = 4;
        let esUnArray = expect(horarioFiltrado).to.be.an('array');

        let verificarLongitud = expect(cantidadHorarios).to.equal(total);

        let verificarHorario = horarioFiltrado.every((restaurant)=>{
            return restaurant.horarios.some((hora)=>{hora==='15:30'});
        });
        return esUnArray&&verificarLongitud&&verificarHorario;
    });
});

describe('Objeto Reserva', function(){
    it('Calcula el precio base de la reserva', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Primero tengo que hacer la reserva.
        let cantPersonas = 5;
        let fecha = new Date(2019,10,26,21,00);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // El precio base de una reserva es igual a la cantidad de personas por el precio por persona.
        let precioBase = cantPersonas * restaurant.precio;
        expect(reserva.calcularPrecioBase()).to.equal(precioBase);
    });

    it('Calcula el precio total de la reserva, sin código de descuento. Grupo de menos de 4 personas', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Para grupos de menos de 4 personas no hay descuento
        let cantPersonas = 2;
        let fecha = new Date(2019,10,26,22,30);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        let precioFinal = reserva.calcularPrecioBase();
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });

    it('Calcula el precio total de la reserva, sin código de descuento. Grupo entre 4 y 6 personas', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Si la cantidad de personas de la reserva está entre 4 y 6 personas, se agrega un 5% de descuento
        let cantPersonas = 4;
        let fecha = new Date(2019,10,27,22,30);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        let precioFinal = reserva.calcularPrecioBase() * 0.95;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });

    it('Calcula el precio total de la reserva, sin código de descuento. Grupo entre 7 y 8 personas', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Para grupos entre de 7 y 8 personas se debería aplicar un 10% de descuento
        let cantPersonas = 7;
        let precioFinal;
        let fecha = new Date(2019,10,27,22,30);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() * 0.9;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });

    it('Calcula el precio total de la reserva, sin código de descuento. Grupo de más de 8 personas', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Para grupos de más de 8 personas se aplica un 15% de descuento
        let cantPersonas = 10;
        let precioFinal;
        let fecha = new Date(2019,10,28,22,30);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() * 0.85;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });
    
    it('Calcula el precio total de la reserva, código de descuento DES15', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // obtiene un 15% de descuento
        let cantPersonas = 2;
        let precioFinal;
        let fecha = new Date(2019,10,28,22,30);
        let codigoDescuento = 'DES15';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() * 0.85;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });
    
    it('Calcula el precio total de la reserva, código de descuento DES200', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // obtiene $200 de descuento
        let cantPersonas = 2;
        let precioFinal;
        let fecha = new Date(2019,10,25,22,30);
        let codigoDescuento = 'DES200';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() - 200;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });
    
    it('Calcula el precio total de la reserva, código de descuento DES1', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // obtiene de descuento el valor equivalente al precio de una persona
        let cantPersonas = 2;
        let precioFinal;
        let fecha = new Date(2019,10,25,22,30);
        let codigoDescuento = 'DES1';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() - restaurant.precio;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });

    it('Calcula el precio total de la reserva, sin código de descuento. Franja horaria de 13 a 14', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "13:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Se agrega un adicional del 5%
        let cantPersonas = 2;
        let precioFinal;
        let fecha = new Date(2019,10,26,13,30);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() * 1.05;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });
    
    it('Calcula el precio total de la reserva, sin código de descuento. Franja horaria de 20 a 21', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Se agrega un adicional del 5%
        let cantPersonas = 2;
        let precioFinal;
        let fecha = new Date(2019,10,26,21,00);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() * 1.05;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });
    
    it('Calcula el precio total de la reserva, sin código de descuento. Fin de semana', function(){
        let restaurant = new Restaurant(25, "Restaurant Prueba", "Desayuno", "Nueva York", ["21:00", "22:30", "15:00"], "../img/desayuno2.jpg", [9, 5, 7, 6, 7], 290);

        // Se agrega un adicional del 10%
        let cantPersonas = 2;
        let precioFinal;
        // 29-nov-2019 es viernes
        let fecha = new Date(2019,10,29,22,30);
        let codigoDescuento = '';
        let reserva = new Reserva(restaurant, fecha, cantPersonas, codigoDescuento);
        // Ahora calculo el precio final.
        precioFinal = reserva.calcularPrecioBase() * 1.1;
        expect(reserva.calcularMontoTotal()).to.equal(precioFinal);
    });    
});