var Piramide = /** @class */ (function () {
    function Piramide(x, y, radius, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
    }
    Piramide.prototype.draw = function () {
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
    };
    Piramide.prototype.update = function () {
        this.radius += 0.5; // Incremento reducido a la mitad
    };
    return Piramide;
}());
export { Piramide };
//end
//..............
//..............
//New..........

//....................
var ColorWheel = /** @class */ (function () {
    function ColorWheel(x, y, radius, ctx, colors) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ctx = ctx;
        this.colors = colors;
        this.angle = 0;
    }

    ColorWheel.prototype.draw = function () {
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
        var numRays = 12;
        for (var i = 0; i < numRays; i++) {
            var angle = this.angle + (i * 2 * Math.PI) / numRays;
            var x = this.x + this.radius * 0.2 * Math.cos(angle);
            var y = this.y + this.radius * 0.2 * Math.sin(angle);
            var xEnd = this.x + this.radius * 0.9 * Math.cos(angle);
            var yEnd = this.y + this.radius * 0.9 * Math.sin(angle);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(xEnd, yEnd);
            this.ctx.strokeStyle = 'white';
            this.ctx.stroke();
        }
    };

    ColorWheel.prototype.update = function () {
        // Actualiza el ángulo para hacer girar la rueda
        this.angle += 0.09;
    };

    return ColorWheel;
}());
export { ColorWheel };

//End.........
//..............
//New..............

var MovingCrosshair = /** @class */ (function () {
    function MovingCrosshair(x, y, size, ctx, option) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
        this.color = this.getColor(option);
    }

    MovingCrosshair.prototype.getColor = function (option) {
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
    };

    MovingCrosshair.prototype.update = function (mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
    };

    MovingCrosshair.prototype.draw = function () {
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
        for (var i = 0; i < 50; i++) {
            var radius = Math.random() * 20;
            var x = this.x + (Math.random() - 0.5) * this.size * 2;
            var y = this.y + (Math.random() - 0.5) * this.size * 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            this.ctx.strokeStyle = 'rgba(173, 216, 230, 0.5)'; // Color de las burbujas
            this.ctx.stroke();
            this.ctx.closePath();
        }
    };
    return MovingCrosshair;
}());
export { MovingCrosshair };