var modalNuevo = new bootstrap.Modal(document.getElementById('modalNuevo'), {});
var modalModificar = new bootstrap.Modal(document.getElementById('modalModificar'), {});
var modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'), {});

var lista = [];

//Registro de muestra
lista.push({
    "nombre":"Ricardo",
    "apellido1":"Cárdenas",
    "apellido2":"Guevara",
    "pokemon":"charmander"
});

function contenido(){
    document.getElementById("contenido").innerHTML = "";
    let contador = 0;
    for (let item of lista) {
        document.getElementById("contenido").innerHTML +=`<tr><td>${item.nombre} ${item.apellido1} ${item.apellido2}</td><td>${item.pokemon}</td><td><button class="btn btn-primary" onclick="mostrarModificar(${contador})">Modificar</button> <button class="btn btn-danger" onclick="mostrarEliminar(${contador})">Eliminar</button></td></tr>`;
        contador++;
    }
}

function mostrarNuevo() {
    document.getElementById("modalNuevo_nombre").value = "";
    document.getElementById("modalNuevo_apellido2").value = "";
    document.getElementById("modalNuevo_apellido1").value = "";
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }).done(function (res) {
        listaPokemon = res.results
        document.getElementById("modalNuevo_select").innerHTML = "<option selected>Selecciona un Pokemon...</option>";
        for (let pokemon of listaPokemon) {
            document.getElementById("modalNuevo_select").innerHTML += `<option value="${pokemon.name}">${pokemon.name}</option>`
        }
        modalNuevo.show();
    });
}

function mostrarModificar(id) {
    let item = lista[id];
    document.getElementById("modalModificar_nombre").value = item.nombre;
    document.getElementById("modalModificar_apellido1").value = item.apellido1;
    document.getElementById("modalModificar_apellido2").value = item.apellido2;
    document.getElementById("modalModificar_botonModificar").setAttribute('onclick', `modificar(${id})`);
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }).done(function (res) {
        listaPokemon = res.results
        document.getElementById("modalModificar_select").innerHTML = `<option value="${item.pokemon}" selected>${item.pokemon}</option>`;
        for (let pokemon of listaPokemon) {
            document.getElementById("modalModificar_select").innerHTML += `<option value="${pokemon.name}">${pokemon.name}</option>`
        }
        modalModificar.show();
    });
}

function mostrarEliminar(id) {
    let item = lista[id]
    document.getElementById("modalEliminar_nombre").innerHTML = `${item.nombre} ${item.apellido1} ${item.apellido2}`;
    document.getElementById("modalEliminar_botonEliminar").setAttribute('onclick', `eliminar(${id})`);
    modalEliminar.show();
}

function registrar() {
    let nombre = document.getElementById("modalNuevo_nombre").value;
    let apellido1 = document.getElementById("modalNuevo_apellido1").value;
    let apellido2 = document.getElementById("modalNuevo_apellido2").value;
    let select = document.getElementById("modalNuevo_select").value;
    lista.push({
        "nombre":nombre,
        "apellido1":apellido1,
        "apellido2":apellido2,
        "pokemon":select
    });
    contenido();
    modalNuevo.hide();
}

function modificar(id){
    let nombre = document.getElementById("modalModificar_nombre").value;
    let apellido1 = document.getElementById("modalModificar_apellido1").value;
    let apellido2 = document.getElementById("modalModificar_apellido2").value;
    let select = document.getElementById("modalModificar_select").value;
    lista[id] = {
        "nombre":nombre,
        "apellido1":apellido1,
        "apellido2":apellido2,
        "pokemon":select
    };
    contenido();
    modalModificar.hide();
}

function eliminar(id) {
    let eliminado = lista.splice(id, 1);
    contenido();
    modalEliminar.hide();
}

contenido();