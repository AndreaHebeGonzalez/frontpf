
const contenedorMascotas = document.querySelector('.mascotas__grid');

async function solicitarPerritos() {
    const respuesta = await fetch('https://andreagzlez.alwaysdata.net/perritos/libre-en-proceso');
    if(!respuesta.ok) {
        console.error('Error al filtrar perrito por estado libre y en proceso', respuesta.status);
        return;
    };
    const datos = await respuesta.json();
    return datos;
};

function iterarPerritosLista(listaPerritos) {
    listaPerritos.map((perrito) => {

        const urlbase = "https://andreagzlez.alwaysdata.net/";
        const urlCompleta= `${urlbase}${perrito.url_img}`;

        const mascotaContenedor = document.createElement('div');
        mascotaContenedor.setAttribute('class', 'mascota');
        mascotaContenedor.setAttribute('data-id', `${perrito.id}`); // es común y estandarizado usar atributos personalizados de datos con el prefijo data-, como data-id. 

        const contenidoMascota = 
                `<div class="mascota__corazon">
                    <figure class="mascota__imagen">
                        <img src=${urlCompleta} alt="Imagen mascota">
                    </figure>
                </div>
                <div class="mascota__contenido">
                    <h3 class="mascota__nombre"></h3>
                    <p class="mascota__genero-edad"></p>
                    <p class="mascota__tamaño"></p>
                    <a class="btn__light btn__light--adoptar">Adoptar</a>
                </div>`;
        mascotaContenedor.innerHTML = contenidoMascota;
        contenedorMascotas.appendChild(mascotaContenedor);
        const mascotaNombre = mascotaContenedor.querySelector('.mascota__nombre');
        const generoEdad = mascotaContenedor.querySelector('.mascota__genero-edad');
        const mascotaTamano = mascotaContenedor.querySelector('.mascota__tamaño');
        const btnAdoptar = mascotaContenedor.querySelector('.btn__light--adoptar');

        mascotaNombre.textContent = perrito.nombre;
        generoEdad.textContent = `${perrito.genero} - ${perrito.edad}`;
        mascotaTamano.textContent = `Tamaño: ${perrito.tamano}`; 

        btnAdoptar.setAttribute('href', `./formulario.html?id=${perrito.id}&nombre=${perrito.nombre}`)
    });
}

async function renderizarCards() {
    try {
        const listaPerritos = await solicitarPerritos();
        console.log(listaPerritos)
        if(listaPerritos) {
            iterarPerritosLista(listaPerritos);
        }
    } catch (error) {
        console.error('Error al renderizar los perritos', error)
    } 
}


document.addEventListener('DOMContentLoaded', renderizarCards);