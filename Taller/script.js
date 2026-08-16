window.onload = function () {
    let fichas = document.querySelectorAll(".ficha");

    console.log(fichas.length);

    let boton = document.createElement("button");
    boton.textContent = "Mostrar solo heroes";
    document.body.appendChild(boton);

    boton.addEventListener("click", function() {

        for (let ficha of fichas) {
            if(ficha.getAttribute("data-tipo") === "villano") {
                ficha.style.display = "none";
            }else {
                ficha.classList.add("resaltado");
            }
        }

    });

    for (let ficha of fichas) {

        ficha.addEventListener("mouseover", function() {
            this.style.backgroundColor = "#3a3a3a";
        });

        ficha.addEventListener("mouseout", function() {
            this.style.backgroundColor = "";
        });
    }

    let imagenes = document.querySelectorAll(".ficha img");

    for (let imagen of imagenes) {
        imagen.classList.add("borde-redondeado");
    }

    function cargarFraseDelDia(callback) {

        fetch("https://catfact.ninja/fact")
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            callback(datos.fact);
        })
        .catch(function(error) {
            console.log("No se pudo cargar la frase.", error);
        });
        
    }

    let botonFrase = document.createElement("button");
    botonFrase.textContent = "Frase del dia";
    document.body.appendChild(botonFrase);
    botonFrase.addEventListener("click", function() {
        cargarFraseDelDia(function(frase) {
            let p = document.createElement("p");
            p.textContent = frase;
            document.body.appendChild(p);
        })
    })

    function guardarFavorito(nombre) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (nombre) {
                    resolve(nombre + " guardado como favorito");
                }else {
                    reject("No se pudo guardar: falta el nombre");
                }
            }, 1000);
        });
    }

    for (let ficha of fichas) {
        let botonFav = document.createElement("button");
        botonFav.textContent = " Favorito";
        ficha.appendChild(botonFav);
        botonFav.addEventListener("click", function() {
            let nombreX =this.parentElement.querySelector(".nombre");
            guardarFavorito(nombreX.textContent)
                .then(function(mensaje) {
                    console.log(mensaje);
                })
                .catch(function(error) {
                    console.log(error);
                })
        });
    }

};

