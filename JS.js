class Bola {
  constructor(element, x, y, largura, altura, raio, velocidadeHor, velocidadeVer, corHex) {
    this.element = element;
    this.element.style.marginLeft = x + 'px';
    this.element.style.marginTop = y + 'px';
    this.element.style.width = largura + 'px';
    this.element.style.height = altura + 'px';
    this.element.style.borderRadius = raio + '%';
    this.velocidadeHor = velocidadeHor + 'px';
    this.velocidadeVer = velocidadeVer + 'px';
    this.element.style.backgroundColor = corHex;
  }
  continuarMovimento() {
    this.x += this.velocidadeHor;
    this.y += this.velocidadeVer;
  }
  inverterDirecaoHor() {
    this.velocidadeHor *= -1;
  }
  inverterDirecaoVer() {
    this.velocidadeVer *= -1;
  }
  x1() {
    return this.x - this.raio;
  }
  x2() {
    return this.x + this.raio;
  }
  y1() {
    return this.y - this.raio;
  }
  y2() {
    return this.y + this.raio;
  }
}

class Barra {
  constructor(element, x, y, largura, altura, corHex, velocidadeVerPadrao, teclaCima, teclaBaixo) {
    this.element = element;
    this.element.style.marginLeft = x + 'px';
    this.element.style.marginTop = y + 'px';
    this.element.style.width = largura + 'px';
    this.element.style.height = altura + 'px';
    this.element.style.backgroundColor = corHex;
    this.velocidadeVerPadrao = velocidadeVerPadrao + 'px';
    this.velocidadeVer = 0 + 'px';
  }

  moverParaCima() {
    this.velocidadeVer = velocidadeVerPadrao;
    this.y -= velocidadeVer;
  }

  moverParaBaixo() {
    this.velocidadeVer = velocidadeVerPadrao;
    this.y += velocidadeVer;
  }

  continuarMovimento() {
    if (velocidadeVer == 0) {
      return;
    }

    velocidadeVer--;
    this.y += this.velocidadeVer;
  }
}

const DISTANCIA_CENARIO_BARRA = 20;
const LARGURA_BARRA = 10;
const ALTURA_BARRA = 100;
const VELOCIDADE_VER_BARRA = 10;
const RAIO_BOLA = 50;
const LARGURA_BOLA = 16;
const ALTURA_BOLA = 16;
const VELOCIDADE_HOR_BOLA = 20;
const VELOCIDADE_VER_BOLA = 20;

class Cenario {
  constructor(element, largura, altura, corHex) {
    this.element = element;
    this.element.style.width = largura + 'px';
    this.element.style.height = altura + 'px';
    this.element.style.backgroundColor = corHex;
    const yBarra = (altura - ALTURA_BARRA) / 2;

    this.barra1 = new Barra(
      document.getElementById('barra1'),
      DISTANCIA_CENARIO_BARRA,
      yBarra,
      LARGURA_BARRA,
      ALTURA_BARRA,
      "#00F",
      VELOCIDADE_VER_BARRA,
      'w',
      's'
    );

    this.barra2 = new Barra(
      document.getElementById('barra2'),
      largura - DISTANCIA_CENARIO_BARRA - LARGURA_BARRA,
      yBarra,
      LARGURA_BARRA,
      ALTURA_BARRA,
      "#F00",
      VELOCIDADE_VER_BARRA,
      'ArrowUp',
      'ArrowDown'
    );

    this.bola = new Bola(
      document.getElementById('bola'),
      largura / 2,
      altura / 2,
      LARGURA_BOLA,
      ALTURA_BOLA,
      RAIO_BOLA,
      VELOCIDADE_HOR_BOLA,
      VELOCIDADE_VER_BOLA,
      "#20fc03"
    );
  }

  detectarColisao(objeto1, objeto2) {
    const maiorX1 = objeto1.x1 > objeto2.x1() ? objeto1.x1 : objeto2.x1();
    const menorX2 = objeto1.x2 < objeto2.x2() ? objeto1.x2 : objeto2.x2();
    const maiorY1 = objeto1.y1 > objeto2.y1() ? objeto1.y1 : objeto2.y1();
    const menorY2 = objeto1.y2 < objeto2.y2() ? objeto1.y2 : objeto2.y2();
    return maiorX1 < menorX2 && maiorY1 < menorY2;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const cenario = new Cenario(document.getElementById('cenario'), "1000", "600", "#000");

  cenario.barra1.moverParaCima();
  
});
