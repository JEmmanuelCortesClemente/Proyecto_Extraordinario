export class Piramide {
  protected x: number;
  protected y: number;
  public radius: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
  }

  public draw() {
    // Dibuja la primera mitad del triángulo en negro
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y - this.radius);
    this.ctx.lineTo(this.x + this.radius, this.y + this.radius);
    this.ctx.lineTo(this.x, this.y + this.radius);
    this.ctx.closePath();
    this.ctx.stroke();

    // Dibuja la segunda mitad del triángulo en rojo
    this.ctx.strokeStyle = 'red';
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y - this.radius);
    this.ctx.lineTo(this.x - this.radius, this.y + this.radius);
    this.ctx.lineTo(this.x, this.y + this.radius);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  public update() {
    this.radius += 0.5; // Incremento reducido a la mitad
  }
}

//..............
export class ColorWheel {
  protected x: number;
  protected y: number;
  protected radius: number;
  protected ctx: CanvasRenderingContext2D;
  protected colors: string[];
  protected angle: number;

  constructor(x: number, y: number, radius: number, ctx: CanvasRenderingContext2D, colors: string[]) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ctx = ctx;
    this.colors = colors;
    this.angle = 0;
  }

  public draw() {
    // Dibuja el neumático
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();

    // Dibuja el borde de la llanta
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius * 0.9, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'gray';
    this.ctx.fill();

    // Dibuja el centro de la llanta
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius * 0.2, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();

    // Dibuja los rayos de la llanta
    const numRays = 12;
    for (let i = 0; i < numRays; i++) {
        const angle = this.angle + (i * 2 * Math.PI) / numRays;
        const x = this.x + this.radius * 0.2 * Math.cos(angle);
        const y = this.y + this.radius * 0.2 * Math.sin(angle);
        const xEnd = this.x + this.radius * 0.9 * Math.cos(angle);
        const yEnd = this.y + this.radius * 0.9 * Math.sin(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(xEnd, yEnd);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }
  }

  public update() {
    // Actualiza el ángulo para hacer girar la rueda
    this.angle += 0.09; //velocidad de llanta AJUSTASBLE
  }
}

export class MovingCrosshair {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected color: string;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D, option: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.color = this.getColor(option);
  }

  protected getColor(option: string): string {
    switch (option) {
      case 'trapito':
        return 'blue';
      case 'jabon':
        return 'green';
      case 'estropajo':
        return 'yellow';
      default:
        return 'red';
    }
  }

  public update(mouseX: number, mouseY: number) {
    this.x = mouseX;
    this.y = mouseY;
  }

  public draw() {
    // Dibujar el rectángulo
    this.ctx.beginPath();
    this.ctx.rect(this.x - this.size / 2, this.y - this.size * 2.10, this.size, this.size * 6 * 0.3); // Reducir la longitud en un 70%
    this.ctx.fillStyle = 'pink'; // Relleno de color rosa
    this.ctx.fill();
    this.ctx.closePath();

    //  "ZOTE" en el centro del rectángulo
    this.ctx.save();
    this.ctx.translate(this.x, this.y - this.size * 1.20);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.font = this.size * 0.45 + 'px Arial'; // Aumentar el tamaño del texto al triple
    this.ctx.fillStyle = 'hotpink'; // Color de texto rosado fuerte
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('ZOTE', 0, 0);
    this.ctx.restore();

    // Dibujar burbujas alrededor del rectángulo
    for (let i = 0; i < 50; i++) {
      let radius = Math.random() * 20;
      let x = this.x + (Math.random() - 0.5) * this.size * 2;
      let y = this.y + (Math.random() - 0.5) * this.size * 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      this.ctx.strokeStyle = 'rgba(173, 216, 230, 0.5)'; // Color de las burbujas
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}