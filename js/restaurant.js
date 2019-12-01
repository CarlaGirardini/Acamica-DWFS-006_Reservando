var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones, precio) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
    this.precio = precio;
}

Restaurant.prototype.reservarHorario = function(horarioReservado){
    this.horarios=this.horarios.filter(hora => hora !== horarioReservado);
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion <= 10) {
        // Agregué el = en <=10 porque sino no podía calificarse con diez
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    }
    return promedio(this.calificaciones);
}

function sumatoria(numeros){
    let resultadoSuma = 0;
    for(let i=0; i<numeros.length; i++){
        resultadoSuma += numeros[i];
    }
    return resultadoSuma;
}

function promedio(numeros){
    // Calcula el promedio con un dígito decimal
    return Math.round(sumatoria(numeros)*10/numeros.length)/10;
}