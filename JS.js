class Bola {
  constructor(element, x, y, largura, altura, raio, velocidadeHor, velocidadeVer, corHex, larguraTotal, alturaTotal, direcao) {
    this.element = element;
    this.element.style.marginLeft = x + 'px';
    this.element.style.marginTop = y + 'px';
    this.element.style.width = largura + 'px';
    this.element.style.height = altura + 'px';
    this.element.style.borderRadius = raio + '%';
    this.velocidadeHor = velocidadeHor;
    this.velocidadeVer = velocidadeVer;
    this.element.style.backgroundColor = corHex;
    
    this.x = x;
    this.y = y;
    this.alturaBola = altura;
    this.larguraBola = largura;
    this.larguraTotal = larguraTotal;
    this.alturaTotal = alturaTotal;
    this.direcao = direcao;
  }

  continuarMovimento() {
    if(this.x <= this.larguraTotal - this.larguraBola - this.velocidadeVer && this.x >= this.velocidadeVer){
    this.x += this.velocidadeHor;
    this.element.style.marginLeft = this.x + 'px';
    }
    else {
      this.inverterDirecaoHor();
    }
    if(this.y <= this.alturaTotal - this.alturaBola - this.velocidadeHor && this.y >= this.velocidadeHor){
    this.y += this.velocidadeVer;
    this.element.style.marginTop = this.y + 'px';
    }
    else {
      this.inverterDirecaoVer();
    }
  }

  inverterDirecaoHor() {
    this.velocidadeHor *= -1;
    this.x += this.velocidadeHor;
    this.element.style.marginLeft = this.x + 'px';
  }
  inverterDirecaoVer() {
    this.velocidadeVer *= -1;
    this.y += this.velocidadeVer;
    this.element.style.marginTop = this.y + 'px';
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
  constructor(element, x, y, largura, altura, corHex, velocidadeVerPadrao, alturaTotal) {
    this.element = element;
    this.element.style.marginLeft = x + 'px';
    this.element.style.marginTop = y + 'px';
    this.element.style.width = largura + 'px';
    this.element.style.height = altura + 'px';
    this.element.style.backgroundColor = corHex;
    this.velocidadeVerPadrao = velocidadeVerPadrao;
    this.velocidadeVer = 0;
    this.y = y;
    this.alturaBarra = altura;
    this.alturaTotal = alturaTotal;
  }

  moverParaCima() {
    if(this.y >= this.velocidadeVerPadrao){
    this.velocidadeVer = this.velocidadeVerPadrao;
    this.y -= this.velocidadeVer;
    this.element.style.marginTop = this.y + 'px';
  }
  }

  moverParaBaixo() {
    if(this.y <= this.alturaTotal - this.alturaBarra - this.velocidadeVerPadrao){
    this.velocidadeVer = this.velocidadeVerPadrao;
    this.y += this.velocidadeVer;
    this.element.style.marginTop = this.y + 'px';
    }
  }

  continuarMovimento() {
    if (velocidadeVer == 0) {
      return;
    }

    velocidadeVer--;
    this.y += this.velocidadeVer;
  }

  trocaCor(){
    this.element.style.backgroundColor = "#FFF";
  }
}

const DISTANCIA_CENARIO_BARRA = 20;
const LARGURA_BARRA = 10;
const ALTURA_BARRA = 100;
const VELOCIDADE_VER_BARRA = 10;
const RAIO_BOLA = 50;
const LARGURA_BOLA = 20;
const ALTURA_BOLA = 20;
const VELOCIDADE_HOR_BOLA = 5;
const VELOCIDADE_VER_BOLA = 5;
const DIRECAO = 0;

class Cenario {
  constructor(element, largura, altura, corHex) {
    this.element = element;
    this.element.style.width = largura + 'px';
    this.element.style.height = altura + 'px';
    this.element.style.backgroundColor = corHex;
    const yBarra = (altura - ALTURA_BARRA) / 2;
    this.altura = altura;

    this.barra1 = new Barra(
      document.getElementById('barra1'),
      DISTANCIA_CENARIO_BARRA,
      yBarra,
      LARGURA_BARRA,
      ALTURA_BARRA,
      "#00F",
      VELOCIDADE_VER_BARRA,
      altura,
    );

    this.barra2 = new Barra(
      document.getElementById('barra2'),
      largura - DISTANCIA_CENARIO_BARRA - LARGURA_BARRA,
      yBarra,
      LARGURA_BARRA,
      ALTURA_BARRA,
      "#F00",
      VELOCIDADE_VER_BARRA,
      altura,
    );

    this.bola = new Bola(
      document.getElementById('bola'),
      (largura - LARGURA_BOLA) / 2,
      (altura - ALTURA_BOLA) / 2,
      LARGURA_BOLA,
      ALTURA_BOLA,
      RAIO_BOLA,
      VELOCIDADE_HOR_BOLA,
      VELOCIDADE_VER_BOLA,
      "#20fc03",
      largura,
      altura,
      DIRECAO
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

  // cenario.barra1.trocaCor();

  document.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'w':
        cenario.barra1.moverParaCima();
        break;
      case 's':
        cenario.barra1.moverParaBaixo();
        break;
      case 'ArrowUp':
        cenario.barra2.moverParaCima();
        break;
      case 'ArrowDown':
        cenario.barra2.moverParaBaixo();
        break;
    }
  });

  function update() {
    if(DIRECAO === 0){
    cenario.bola.continuarMovimento();
    }
    // cenario.detectarColisao()
    requestAnimationFrame(update);
  }

  update();
  
});
