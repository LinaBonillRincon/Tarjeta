const totalCards = 12;
let card = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let cardtemplate = '<div class="card"><div class="back"></div><div class="face"><img src="" alt="imagen"></div></div>';
let contadorfinalizado = 0;

// Lista de rutas de las imágenes. Asegúrate de tener suficientes imágenes para todas las tarjetas.
let imagePaths = ["imagen1.jpeg", "imagen2.jpeg", "imagen3.jpeg", "imagen4.jpeg", "imagen5.jpeg", "imagen6.jpeg"];

function activate(e) {
    if (currentMove < 2) {
        e.target.classList.add('active');
        if (!selectedCards[0] || selectedCards[0] !== e.target) {
            selectedCards.push(e.target);
            if (++currentMove == 2) {
                let image1 = selectedCards[0].querySelector('.face img').src;
                let image2 = selectedCards[1].querySelector('.face img').src;
                if (image1 === image2) {
                    selectedCards = [];
                    currentMove = 0;
                    contadorfinalizado++;
                    if (contadorfinalizado == totalCards / 2) {
                        document.getElementById('miBoton').style.display = 'block';
                        document.getElementById('felicitaciones').style.display = 'block';
                        document.getElementById('miBoton').disabled = false;
                    }
                } else {
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createImagePairs(imagePaths, totalPairs) {
    let pairs = [];
    for (let i = 0; i < totalPairs; i++) {
        pairs.push(imagePaths[i], imagePaths[i]); // Agregar cada imagen dos veces para formar parejas
    }
    return pairs;
}

// Crear parejas de imágenes y mezclarlas
let shuffledImages = shuffle(createImagePairs(imagePaths, totalCards / 2));

for (let i = 0; i < totalCards; i++) {
    let div = document.createElement('div');
    div.innerHTML = cardtemplate;
    card.push(div);
    document.querySelector('#game').append(card[i]);

    // Asignar la siguiente imagen del arreglo al atributo src de la imagen en la tarjeta
    card[i].querySelector('.face img').src = shuffledImages[i];

    card[i].querySelector('.card').addEventListener('click', activate);
}
function redirigir() {
    window.location.href = 'inicio_tarjeta.html'; // Cambia 'otroarchivo.html' por la ruta correcta de tu archivo HTML de destino
}

// Agregar un evento clic al botón para redirigir al usuario al hacer clic en él
document.getElementById('miBoton').addEventListener('click', redirigir);