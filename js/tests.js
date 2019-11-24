var expect = chai.expect;

describe('Función reservarHorario(horario)', function(){

    it('Eliminar horario del arreglo', function(){
        // Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.
        // El arreglo se llama Restaurant.horarios
        let esUnArray = expect(listadoDeRestaurantes).to.be.an('array');
        if(esUnArray){
            listadoDeRestaurantes.map((restaurant)=>{
                restaurant.horarios.map((hora)=>{
                    restaurant.reservarHorario(hora);
                    let horarioReservado = expect(restaurant.horarios.indexOf(hora)).to.equal(-1);
                    return horarioReservado;
                });
            });
        };
        return false;
    })

    it('No modificar si se reserva un horario inexistente', function(){
        // Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.
        listadoDeRestaurantes.map((restaurant)=>{
            let arregloOriginal = restaurant.horarios;
            restaurant.reservarHorario('25');
            return restaurant.horarios===arregloOriginal;
        })
    });

    it('No modificar arreglo si no se pasa parámetro', function(){
        // Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.
        listadoDeRestaurantes.forEach((restaurant)=>{
            let arregloOriginal = restaurant.horarios;
            restaurant.reservarHorario();
            return restaurant.horarios===arregloOriginal;
        });
    });

});

describe('Función obtenerPuntuación()',function(){

    it('La puntuación se calcula correctamente', function(){
        // Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
        listadoDeRestaurantes.map((restaurant)=>{
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
                console.log('longitudArreglo', longitudArreglo);
                console.log('calPositivas', calPositivas);
                console.log('calNegativa', calNegativa);
                console.log('calCero', calCero);
                return verificarTodo;
            }
            return false;
        });
    });

    // it('Es un array', function(){
    //     // Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
    //     listadoDeRestaurantes.map((restaurant)=>{
    //         let esUnArray = expect(restaurant.calificaciones).to.be.an('array');
    //         return esUnArray;
    //     });
    // });

    // it('Puntuaciones positivas bien calculadas', function(){
    //     // Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
    //     listadoDeRestaurantes.map((restaurant)=>{
    //         // Primero vacío el arreglo y le doy tres puntuaciones positivas
    //         restaurant.calificaciones=[];
    //         restaurant.calificar(3);
    //         restaurant.calificar(9);
    //         restaurant.calificar(5);
    //         // La longitud del arreglo tiene que ser 3
    //         let longitudArreglo = expect(restaurant.calificaciones.length).to.equal(3);
    //         // Verifico el resultado, que debe redondearse con un decimal. Para esto, multiplico y divido por 10 (la división después del redondeo)
    //         let calPositivas = expect(restaurant.obtenerPuntuacion()).to.equal(Math.round(170/3)/10);
    //         return longitudArreglo&&calPositivas;
    //     });
    // });

    // it('Puntuaciones negativas ignoradas', function(){
    //     // Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
    //     listadoDeRestaurantes.map((restaurant)=>{
    //         // Primero vacío el arreglo y le doy tres puntuaciones positivas
    //         restaurant.calificaciones=[];
    //         restaurant.calificar(3);
    //         restaurant.calificar(9);
    //         restaurant.calificar(5);
    //         // Ahora agrego una calificación negativa. No debería modificar al arreglo
    //         restaurant.calificar(-3);
    //         let calNegativa = expect(restaurant.calificaciones.length).to.equal(3);
    //         return calNegativa;
    //     });
    // });

    // it('Puntuaciones nulas ignoradas', function(){
    //     // Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente.
    //     listadoDeRestaurantes.map((restaurant)=>{
    //         // Primero vacío el arreglo y le doy tres puntuaciones positivas
    //         restaurant.calificaciones=[];
    //         restaurant.calificar(3);
    //         restaurant.calificar(9);
    //         restaurant.calificar(5);
    //         // Por último, agrego calificación cero
    //         restaurant.calificar(0);
    //         let calCero = expect(restaurant.obtenerPuntuacion()).to.equal(Math.round(170/3)/10);
    //         return calCero;
    //     });
    // });
    
    it('La puntuación sin calificaciones es cero', function(){
        // Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0.
        listadoDeRestaurantes.map((restaurant)=>{
            // Primero vacío el array
            restaurant.calificaciones=[];
            // La puntuación debería ser nula
            let calNula = expect(restaurant.obtenerPuntuacion()).to.equal(0);
            return calNula;
        })
    });
    
});

describe('Función calificar()', function(){
    it('Calificación dentro del rango permitido', function(){
        // Si la calificación está dentro del rango permitido, se pushea al arreglo de calificaciones
        listadoDeRestaurantes.map((restaurant)=>{
            let longOriginal = restaurant.calificaciones.length;
            // Califico con un número dentro del rango y con los dos extremos del rango
            restaurant.calificar(5);
            restaurant.calificar(1);
            restaurant.calificar(10);
            // La longitud del arreglo debería aumentar en tres
            let verificarLongitud = expect(restaurant.calificaciones.length).to.equal(longOriginal+3);
            return verificarLongitud;
        })
    });

    it('Calificación fuera del rango permitido', function(){
        // Si la calificación está fuera del rango permitido, debería ignorarla.
        listadoDeRestaurantes.map((restaurant)=>{
            let longOriginal = restaurant.calificaciones.length;            
            // Califico con cero, con un valor negativo y con un número mayor a diez.
            restaurant.calificar(0);
            restaurant.calificar(-3);
            restaurant.calificar(15);
            // La longitud del arreglo no debería modificarse
            let verificarLongitud = expect(restaurant.calificaciones.length).to.equal(longOriginal);
            return verificarLongitud;
        });
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

    it('Devuelve error con valor null/undefined', function(){
        let restaurantBuscado = listado.buscarRestaurante(null);
        let verificar1 = restaurantBuscado==='No se ha encontrado ningún restaurant';
        restaurantBuscado = listado.buscarRestaurante(undefined);
        let verificar2 = restaurantBuscado==='No se ha encontrado ningún restaurant';
        return verificar1&&verificar2;
    });

    it('Devuelve error con dato numérico', function(){
        let restaurantBuscado = listado.buscarRestaurante(95);
        return restaurantBuscado==='No se ha encontrado ningún restaurant';
    });
});

describe('Función obtenerRestaurantes(filtroRubro, filtroCiudad, filtroHorario)', function(){
    // Verificar restaurantes filtrados por rubro, por ciudad y por horario
    it('null/undefined/string vacío en todos los filtros', function(){
        let verificarNull = expect(listado.obtenerRestaurantes(null,null,null)).to.equal(listadoDeRestaurantes);
        let verificarUndefined = expect(listado.obtenerRestaurantes(undefined,undefined,undefined)).to.equal(listadoDeRestaurantes);
        let verificarVacio = expect(listado.obtenerRestaurantes('','','')).to.equal(listadoDeRestaurantes);
        return verificarNull&&verificarUndefined&&verificarVacio;
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
        let esUnArray = expect(horarioFiltrado).to.be.an('array');
        let verificarLongitud = expect(horarioFiltrado.length).to.equal(4);
        let verificarHorario = horarioFiltrado.every((restaurant)=>{
            return restaurant.horarios.some((hora)=>{hora==='15:30'});
        });
        return esUnArray&&verificarLongitud&&verificarHorario;
    });
});