{ // Canvas
const canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');

const xp_max = ctx.canvas.width;
const yp_max = ctx.canvas.height;

const x0p = xp_max/2;
const y0p = yp_max/2;

// Eixos coordenados
ctx.beginPath()
ctx.strokeStyle = 'black'
ctx.lineWidth = '0.5'

// Linhas
ctx.moveTo(0,y0p); ctx.lineTo(xp_max,y0p); // x
ctx.moveTo(x0p,0); ctx.lineTo(x0p,yp_max); // y


// Marcas
totalx = 15 // total de marcas
deltax = xp_max/(totalx-1)
dim = 4
for(i=0;i<totalx;i++) {
    xip = i*deltax
    ctx.moveTo(xip,y0p-dim); ctx.lineTo(xip,y0p+dim);
}



totaly = 11 // total de marcas
deltay = yp_max/(totaly-1)
for(i=0;i<totaly;i++) {
    yip = i*deltay
    ctx.moveTo(x0p-dim,yip); ctx.lineTo(x0p+dim,yip);
}

// Escala
x_max=4
x_min=-4
ctx.font = '9px Arial'

Deltax = (x_max-x_min)/xp_max // Proporção entre a escala do eixo e quantos pixesl
for(i=0;i<totalx;i++) {
    xip = i*deltax
    x = (xip-x0p)*Deltax
    ctx.fillText(x.toFixed(1), xip-9, y0p+4*dim) // Escreve o valor das marcas
}

y_max=3
y_min=-3
Deltay = (y_max-y_min)/yp_max // Proporção entre a escala do eixo e quantos pixesl
for(i=0;i<totaly;i++) {
    yip = i*deltay
    y = (y0p-yip)*Deltay
    ctx.fillText(y.toFixed(1), x0p+4, yip) // Escreve o valor das marcas
}

ctx.stroke()

// Diferenças finitas
// Condições iniciais
var x = -3;
var y = 1;
var vy= 1.15;
var vx = 2;

console.log(x0p + x/Deltax,y0p - y/Deltay)

// Parâmetros
var Dt = 0.01;
var a = -1;
var total = 300;

ctx.beginPath()
ctx.fillStyle = "red";
ctx.fillRect(x0p + 3.0/Deltax,y0p - 0.0/Deltay,8,8);
console.log(x0p + 3.0/Deltax,y0p - 0.0/Deltay)
for(let i=0; i<total; i++) {
    // Valores calculados na escala
    x = x + vx*Dt;
    y = y + vy*Dt;
    vy = vy + a*Dt;
    
    // Valores em pixel
    xp = x0p + x/Deltax;
    yp = y0p - y/Deltay;
    
    // Desenha o ponto
    ctx.fillRect(xp,yp,2,2)
}
ctx.stroke()
    
}


{ // SVG
    const svgObject = document.getElementById('external-1');
    const circ1 = svgObject.getElementById('circulo-1');
    
    const xp_max = svgObject.getBoundingClientRect().width // largura em pixel
    const yp_max = svgObject.getBoundingClientRect().height // altura em pixel
    const x0p = xp_max/2;
    const y0p = yp_max/2;

    const x_max=4
    const x_min=-4
    let Deltax = (x_max-x_min)/xp_max
    
    const y_max=3
    const y_min=-3
    let Deltay = (y_max-y_min)/yp_max
    
    // Condições iniciais
    var x = -3;
    var y = 1;
    var vy= 1.15;
    var vx = 2;

    // Parâmetros
    var Dt = 0.01;
    var a = -1;
    var total = 300;

    let c = 0;
    let n = 0;
    
    function animar() {
        
        const frame = () => {
            x = x + vx*Dt;
            y = y + vy*Dt;
            vy = vy + a*Dt;
            n = n + 1;
            xp = x0p + x/Deltax;
            yp = y0p - y/Deltay;
        
            console.log(n)
            circ1.setAttributeNS(null,'cy',yp);
            circ1.setAttributeNS(null,'cx',xp);
        
        
            if(c==0) {
                clearInterval(id); // espera um intervalo
            }
            if(n>300) {
                c = 0; 
            }
        
        }
    
        if(c==0) {
            c = 1;
            id = setInterval(frame, 5);
        }
    }
}