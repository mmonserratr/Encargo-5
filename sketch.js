let flechas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(300);

  // Dibuja y actualiza cada flecha
  for (let i = flechas.length - 1; i >= 0; i--) {
    flechas[i].dibujar();
    flechas[i].actualizar();
  }
}

function mousePressed() {
  // Crea una nueva flecha en la posición del clic
  let nuevaFlecha = new Flecha(mouseX, mouseY);
  flechas.push(nuevaFlecha);
}

class Flecha {
  constructor(x, y, direccion) {
    this.x = x;
    this.y = y;
    this.longitud = 1; // Inicializa con longitud mínima
    this.maxLongitud = 100; // Longitud máxima de la flecha
    this.direccion = direccion || p5.Vector.random2D(); // Dirección aleatoria si no se proporciona
    this.color = color(random(255), random(255), random(255)); // Color aleatorio
    this.grosor = 10;
    this.vida = 100; // Establece una vida máxima para la flecha
    this.maxHijas = 3; // Número máximo de flechas hijas
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    stroke(this.color, this.vida); // Cambia la opacidad con base en la vida
    strokeWeight(this.grosor);
    rotate(this.direccion.heading());
    line(0, 0, this.longitud, 0);
    pop();
  }

  actualizar() {
    // Aumenta la longitud de la flecha hasta el máximo
    if (this.longitud < this.maxLongitud) {
      this.longitud += 1;
    }

    // Reduz la vida de la flecha
    this.vida -= 1;

    // Crea una nueva flecha hija si la vida es mayor que cero y no ha alcanzado el límite
    if (this.vida > 0 && flechas.length < this.maxHijas) {
      let nuevaDireccion = this.direccion.copy().rotate(PI / 4); // Gira la dirección actual
      let nuevaFlecha = new Flecha(this.x, this.y, nuevaDireccion);
      flechas.push(nuevaFlecha);
    }

    // Mueve la flecha en su dirección
    this.x += this.direccion.x * 2;
    this.y += this.direccion.y * 2;

    // Elimina la flecha si sale de la pantalla o si su vida llega a cero
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.vida <= 0) {
      flechas.splice(flechas.indexOf(this), 1);
    }
  }
}