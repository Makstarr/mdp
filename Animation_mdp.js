/*   Анимации зонных диаграмм для МДП структур
     c полупроводниками p и n типа
     Напряжение изменяется слайдером
     Носители задаются в рандомных координатах с выбранными границами
     Движение носителей зависит от приложенного напряжения
     Все построения сделаны на canvas
*/
// Цвета для canvas берутся из html документа (можно задать цвета этим переменным)

const
      fermi_level = document.getElementById('fermi_level').style.color,
      dielectric_border = document.getElementById('dielectric_border').style.color,
      eg_border = document.getElementById('Eg_border').style.color,
      fermi_level_metal = document.getElementById('fermi_level_metal').style.color,
      dielectric_fill = document.getElementById('dielectric_fill').style.color,
      ei_level = document.getElementById('Ei_level').style.color,
      eg_fill = document.getElementById('Eg_fill').style.color,
      electrons = document.getElementById('electrons').style.color,
      disappearance_color = ('#f4f4f4'),
      electrons_border = document.getElementById('electrons_border').style.color,
      holes = document.getElementById('holes').style.color,
      holes_border = document.getElementById('holes_border').style.color;

// Canvas подготавливается к работе
var canvas = document.getElementById('n_type_carriers');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
var canvas2 = document.getElementById('p_type_carriers');
var ctx2 = canvas2.getContext('2d');
canvas2.width = 500;
canvas2.height = 500;
var width = 500;
var height = 500;

var balls2 = [],
    balls = [];

// Генератор рандомных чисел в интервале от min до max
function random(min,max)
{
  var num = Math.floor(Math.random()*(max-min)) + min;
  if(num==0)
  {
      num=random(min,max)
  }
  return num;
}

// Функция для создания одного носителя
function Ball(type,id,x, y, velX, velY,maxX,minX,minY)
{
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.size = 3.5;
  this.color = "red";
  this.b_color = "black"
  this.type = type;
  this.maxX = maxX;
  this.minX = minX;
  this.minY = minY;
  this.id=id;
}

// Функция рисующая носители на холсте
Ball.prototype.draw = function()
{
  if (this.type =='nn'|| this.type =='pn'){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.b_color;
  ctx.lineWidth = 1;
  ctx.arc(this.x,this.y, this.size, 0,2*Math.PI);
  ctx.fill();
  ctx.stroke();}

  if (this.type =='pp'|| this.type =='np') {
  ctx2.beginPath();
  ctx2.fillStyle = this.color;
  ctx2.strokeStyle = this.b_color;
  ctx2.lineWidth = 1;
  ctx2.arc(this.x,this.y, this.size, 0,2*Math.PI);
  ctx2.fill();
  ctx2.stroke();}
}

// Фунцкия определяющая пересещение носителей по холсту
Ball.prototype.update = function(){
    let s = document.querySelector('#n_type_slider').value;
    let s2 = document.querySelector('#p_type_slider').value;
    document.getElementById('fermi_level_metal').style.left=-20+'px';
    document.getElementById('fermi_level_metal2').style.left=-20+'px';

    // Электроны n-типе
    if (this.type=='nn')
    {
      this.color=electrons;
      this.b_color=electrons_border;
      if(this.id<=200-s&&s>=150)
      {

        this.color=disappearance_color
        this.b_color=disappearance_color
      }
      if(this.id<=35+(150-s)&&s<150)
      {

        this.color=disappearance_color
        this.b_color=disappearance_color
      }

      if (this.x>=this.maxX-this.size){
        this.velX = -random(0,3)
        this.velY = random(-3,3)
      }

      if ((this.y>=Math.exp((-this.x+250+(s-160)*2.8)/30)+200-this.size)&&this.x<280+(s-150)&&s>=150){
        this.velY = -random(0,3)
        this.velX = random(-3,3)
      }
      if ((this.y>=200-this.size)&&this.x>=280+(s-150)&&s>=150){
        this.velY = -random(0,3)
        this.velX = random(-2,3)
      }
      if ((this.y>=-Math.exp((-this.x+370-(s-90))/32)+200-this.size)&&this.x<330&&s<150){
        this.velY = -random(0,3)
        this.velX = random(0,3)
      }
      if ((this.y>=200-this.size)&&this.x>=330&&s<150){
        this.velY = -random(0,2)
        this.velX = random(-2,3)
      }

      if (this.y<=this.minY+this.size){//(this.y<=-Math.exp((-this.x+370-(s-90))/32)+400){
        this.velY = random(0,2)
        this.velX = random(-2,3)
      }
      if (this.x<=this.minX+2*this.size){
        this.velX = random(0,3)
        this.velY = random(-2,2)
      }
    }

    // Дырки в n-типе
    if (this.type=='pn')
    {
      this.color=holes;
      this.b_color=holes_border;
        if(this.id<=(s-120)&&this.id<=30)
        {
          this.color=disappearance_color;
          this.b_color=disappearance_color;
        }
        if (this.x>=500-this.size&&this.id>30){
          this.velX = -random(0,2)
          this.velY = random(-2,2)
        }
        if ((this.y<=393)&&this.id>30){
          this.velY = random(0,2)
          this.velX = random(-2,3)
        }
        if (this.y>=440&&this.id>30){//(this.y<=-Math.exp((-this.x+370-(s-90))/32)+400){
          this.velY = -random(0,2)
          this.velX = random(-2,2)
        }

        if (this.x>=330-this.size&&this.id<=30){
          this.velX = -random(0,2)
          this.velY = random(-2,0)
        }
        if ((this.y<=-Math.exp((-this.x+350-(s-90))/32)+385-this.size)&&this.id<=30){
          this.velY = random(0,3)
          this.velX = random(-2,1)
        }
        if (this.y>=390&&this.id<=30){//(this.y<=-Math.exp((-this.x+370-(s-90))/32)+400){
          this.velY = -random(0,2)
          this.velX = random(-2,2)
        }
        if (this.x<=220+5){
          this.velX = random(0,3)
          this.velY = random(-2,2)
        }
        if (this.x<=220+5&&s>150){
          this.velX = random(0,3)
          this.velY = random(0,2)
        }

        if (this.x<=220&&s>150){
          this.velX = 3
          this.velY = 3
        }
        if (this.y>=442&&s>150){//(this.y<=-Math.exp((-this.x+370-(s-90))/32)+400){
          this.velY = -3
          this.velX = 4

        }

        if ((this.y<=Math.exp((-this.x+230+(s-160)*2.8)/30)+405-this.size)&&this.x<330&&s>=150&&this.id>30){
          this.velY = random(0,3)
          this.velX = random(0,3)
        }
      }

    // Электроны p-типе
    if (this.type=='np')
    {
        this.color=electrons;
        this.b_color=electrons_border

        if(this.id<=30&&this.id<=(-s2+240)/3)
        {
          this.color=disappearance_color;
          this.b_color=disappearance_color;
        }
        if (this.x>=500-this.size&&this.id>30){
          this.velX = -random(0,2)
          this.velY = random(-2,2)
        }
        if (this.y>=200-this.size&&this.id>30){
          this.velX = random(-2,2)
          this.velY = -random(0,2)
        }
        if ((this.y<=150)&&this.id>30){
          this.velY = random(0,2)
          this.velX = random(-2,3)
        }
        if (this.y>=200&&this.id>30){
          this.velX = random(-2,2)
        }
        if (this.x<=220+5){
          this.velX = random(0,3)
          this.velY = random(-2,2)
        }
        if (this.x<=220+5&&s2>155){
          this.velX = random(0,3)
          this.velY = random(0,2)
        }

        if (this.x<=220&&s2>155){
          this.velX = 3
          this.velY = 3
        }
        if (this.y<=190&&this.id<=30){
          this.velY = random(0,2)
          this.velX = random(-2,2)
        }
        if ((this.y>=Math.exp((-this.x+240-(90-s2))/32)+200-this.size)&&this.x<280+(s2-150)&&s2>=155){
          this.velY = -random(0,3)
          this.velX = random(-3,3)
        }
        if ((this.y>=200-this.size)&&this.x>=280+(s2-150)&&s2>=155){
          this.velY = -random(0,3)
          this.velX = random(-2,3)
        }
        if ((this.y>=-Math.exp((-this.x+370-(s2-90))/32)+200-this.size)&&this.x<330&&s2<148){
          this.velY = -random(0,3)
          this.velX = random(0,3)
        }
        if ((this.y>=200-this.size)&&this.x>=330&&s2<155){
          this.velY = -random(0,2)
          this.velX = random(-2,3)
        }

        if (this.y<=this.minY+this.size){//(this.y<=-Math.exp((-this.x+370-(s-90))/32)+400){
          this.velY = random(0,2)
          this.velX = random(-2,3)
        }
        if (this.x<=this.minX+2*this.size){
          this.velX = random(0,3)
          this.velY = random(-2,2)
        }
      }

    // Дырки в p-типе
    if (this.type=='pp')
    {
        this.color=holes;
        this.b_color=holes_border;
        if (this.x>=this.maxX-this.size){
          this.velX = -random(0,3)
          this.velY = random(-3,3)
        }
        if(this.id<=(s2-100)&&s2<=150)
        {
          this.color=disappearance_color
          this.b_color=disappearance_color
        }
        if(this.id<=35+(s2-150)&&s2>=150)
        {

          this.color=disappearance_color
          this.b_color=disappearance_color
        }
          if (this.x>=500-this.size){
            this.velX = -random(0,2)
            this.velY = random(-2,2)
          }
          if ((this.y<=393)&&this.x>330){
            this.velY = random(0,2)
            this.velX = random(-2,3)
          }

          if ((this.y<=393)&&s2==150&&this.x<=330){
            this.velY = random(0,3)
            this.velX = random(-2,1)
          }
          if ((this.y<=-Math.exp((-this.x+350-(s2-90))/32)+385+this.size)&&s2<150&&this.x<=330){
            this.velY = random(0,3)
            this.velX = random(-2,1)
          }

          if (this.x<=220+5){
            this.velX = random(0,3)
            this.velY = random(-2,2)
          }
          if (this.x<=220+5&&s2>150){
            this.velX = random(0,3)
            this.velY = random(0,2)
          }

          if (this.x<=220&&s2>150){
            this.velX = 3
            this.velY = 3
          }


          if ((this.y<=Math.exp((-this.x+250+(s2-165)*2.8)/30)+396+this.size)&&this.x<=330&&s2>150){
            this.velY = random(0,3)
            this.velX = random(0,3)
          }
          if (this.y>=this.minY-this.size){
            this.velY = -random(0,2)
            this.velX = random(-2,3)
          }
          if (this.x<=this.minX+2*this.size){
            this.velX = random(0,3)
            this.velY = random(-2,2)
          }
        }

    // Обновление коодинат в соответствии с условиями
    this.x += this.velX;
    this.y += this.velY;
}

// Функция создающая массив содержащий все носители и запускающая анимации
function loop(){
    ctx.clearRect(0,0,1000,1000);
    ctx2.clearRect(0,0,1000,1000);
    id=0
    id2=0
    // n в n
    while (balls.length < 80)  {
        var ball = new Ball(
        'nn',           //type
        id,
        random(230,350),//x
        random(140,200),//y
        random(-2,2),   //velX
        random(-1,3),   //velY
        random(300,350),//maxX
        random(220,220),
        random(110,140)
        );
       balls.push(ball);
       id+=1;
    }
    while (balls.length < 100)  {
        var ball = new Ball(
        'nn',           //type
        id,
        random(230,350),//x
        random(140,200),//y
        random(-2,2),   //velX
        random(-1,3),   //velY
        random(300,380),//maxX
        random(220,220),
        random(110,140)
        );
       balls.push(ball);
       id+=1;
    }
    while (balls.length < 150) {
    var ball = new Ball(
        'nn',          //type
        id,
        random(350,500),//x
        random(140,200),//y
        random(-2,2),   //velX
        random(-1,3),   //velY
        random(500,500), //maxX
        random(330,350),
        random(110,140)
        );
        balls.push(ball);
        id+=1;
    }
    // p в n
    while (balls.length < 171) {
    var ball = new Ball(
       'pn',          //type
      id-160,
      random(220,330),//x
      random(390,390),//y
      random(-2,2),   //velX
      random(-2,2),   //velY
      random(70,80) ,            //minY
      random(90,90)   ,
      random(120,170)          //maxY
    );
      balls.push(ball);
      id+=1;
  }
    while (balls.length < 190) {
      var ball = new Ball(
         'pn',          //type
        id-140,
        random(220,500),//x
        random(385,450),//y
        random(-2,3),   //velX
        random(-2,2),   //velY
        random(70,80) ,            //minY
        random(90,90)   ,
        random(120,170)          //maxY
      );
        balls.push(ball);
        id+=1;
    }

    // p в p
    while (balls2.length < 80)  {
        var ball = new Ball(
        'pp',           //type
        id2,
        random(230,350),//x
        random(385,480),//y
        random(-2,2),   //velX
        random(-1,3),   //velY
        random(300,350),//maxX
        random(220,220),
        random(420,470)
        );
       balls2.push(ball);
       id2+=1;
    }
    while (balls2.length < 100)  {
        var ball = new Ball(
        'pp',           //type
        id2,
        random(230,350),//x
        random(385,480),//y
        random(-2,2),   //velX
        random(-1,3),   //velY
        random(300,380),//maxX
        random(220,220),
        random(420,470)
        );
       balls2.push(ball);
       id2+=1;
    }
    while (balls2.length < 150) {
    var ball = new Ball(
        'pp',          //type
        id2,
        random(350,500),//x
        random(385,480),//y
        random(-2,2),   //velX
        random(-1,3),   //velY
        random(500,500), //maxX
        random(330,350),
        random(420,470)
        );
        balls2.push(ball);
        id2+=1;
    }
    // n в p
    while (balls2.length < 181) {
    var ball = new Ball(
       'np',          //type
      id2-150,
      random(220,330),//x
      random(150,200),//y
      random(-2,2),   //velX
      random(-2,2),   //velY
      random(70,80) ,            //minY
      random(90,90)   ,
      random(120,170)          //maxY
    );
      balls2.push(ball);
      id2+=1;
  }
    while (balls2.length < 195) {
      var ball = new Ball(
         'np',          //type
        id2-150,
        random(220,500),//x
        random(150,200),//y
        random(-2,3),   //velX
        random(-2,2),   //velY
        random(70,80) ,            //minY
        random(90,90)   ,
        random(120,170)          //maxY
      );
        balls2.push(ball);
        id2+=1;
    }
    // Рисование и обновление
    for (var i = 0; i < balls.length; i++)
    {
        balls[i].draw();
        balls[i].update();
     }
     for (var i = 0; i < balls2.length; i++)
     {
         balls2[i].draw();
         balls2[i].update();
      }
    requestAnimationFrame(loop);
}

// Рисует злнную картинку слева s=slider.value
function Semiconductor(s){
  if (s>150){
    document.getElementById('fermi_level_metal').style.top=s*2.9+185-425+'px';
  }
  else {
    document.getElementById('fermi_level_metal').style.top=s*1.6+185-230+'px';
  }

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
    // Задает изменение ширины ОПЗ
var opz = 0;
   // Задает запрещенную зону
ctx.beginPath();
    ctx.moveTo(220, 200-(-s)-150);
    ctx.quadraticCurveTo(270,200,350,200)
    ctx.lineTo(w+10,200);
    ctx.lineTo(w+10,385);
    ctx.lineTo(350, 385);
    ctx.quadraticCurveTo(270, 385,220,235-(-s));
ctx.closePath();

    ctx.clearRect(0,0,w,h);
    // Рисует запрещенную зону
    ctx.lineWidth ="2";
    ctx.strokeStyle = eg_border;
    ctx.fillStyle = eg_fill;
    ctx.fill();
    ctx.stroke();

ctx.beginPath();
    ctx.moveTo(220, 290-(-s)-150);
    ctx.quadraticCurveTo(270,290,350,290)
    ctx.lineTo(w+10,290);
    ctx.lineWidth ="2";
    ctx.strokeStyle = ei_level;
    ctx.stroke();


//Задает и рисует линии - границы диэлектрика
ctx.beginPath();
    ctx.moveTo(220, 50-s/1.5+100);
    ctx.lineTo(220, h+10);
    ctx.lineTo(180, h+10);
    ctx.lineTo(180, 50+s/3-50);
    ctx.lineTo(220, 50-s/1.5+100);
ctx.closePath();
    ctx.lineWidth ="2"
    ctx.strokeStyle = dielectric_border;
    ctx.fillStyle = dielectric_fill;
    ctx.fill();
    ctx.stroke();


//Задает и рисует уровень ферми
ctx.beginPath();
    for(var f=220;f<500;f=f+5)
    {
    //В полупроводнике
        ctx.moveTo(-(-f) ,  248)
        f=f+10;
        ctx.lineTo(-(-f),  248)
    }
    ctx.strokeStyle=fermi_level;
    ctx.lineWidth ="2"
    ctx.stroke();
ctx.beginPath();
      for(var f=0;f<180;f=f+5)
      {
      //В металле
      if(s<=150){
          ctx.moveTo(2-(-f) ,  s*2-300+248)
          f=f+10;
          ctx.lineTo(2-(-f),  s*2-300+248)
          }
      else{
          ctx.moveTo(2-(-f) ,  s*3.5-525+248)
          f=f+10;
          ctx.lineTo(2-(-f),  s*3.5-525+248)
          }
        }
      ctx.strokeStyle=fermi_level_metal;
      ctx.lineWidth ="2"
      ctx.stroke();
}
// Рисует злнную картинку справа s=slider.value
function Semiconductor2(s){

if (s>150){
    document.getElementById('fermi_level_metal2').style.top=s*1.22+185-105+'px';
  }
else {
    document.getElementById('fermi_level_metal2').style.top=s*2.8+185-341+'px';
  }

var canvas = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
    // Задает изменение ширины ОПЗ
var opz = 0;
   // Задает запрещенную зону
ctx.beginPath();
    ctx.moveTo(220, 200-(-s)-150);
    ctx.quadraticCurveTo(270,200,350,200)
    ctx.lineTo(w+10,200);
    ctx.lineTo(w+10,385);
    ctx.lineTo(350, 385);
    ctx.quadraticCurveTo(270, 385,220,235-(-s));
ctx.closePath();

    ctx.clearRect(0,0,w,h);
    // Рисует запрещенную зону
    ctx.lineWidth ="2";
    ctx.strokeStyle = eg_border;
    ctx.fillStyle = eg_fill;
    ctx.fill();
    ctx.stroke();

ctx.beginPath();
    ctx.moveTo(220, 290-(-s)-150);
    ctx.quadraticCurveTo(270,290,350,290)
    ctx.lineTo(w+10,290);
    ctx.lineWidth ="2";
    ctx.strokeStyle = ei_level;
    ctx.stroke();


//Задает и рисует линии - границы диэлектрика
ctx.beginPath();
    ctx.moveTo(220, 50-s/1.5+100);
    ctx.lineTo(220, h+10);
    ctx.lineTo(180, h+10);
    ctx.lineTo(180, 50+s/3-50);
    ctx.lineTo(220, 50-s/1.5+100);
ctx.closePath();
    ctx.lineWidth ="2"
    ctx.strokeStyle = dielectric_border;
    ctx.fillStyle = dielectric_fill;
    ctx.fill();
    ctx.stroke();


//Задает и рисует уровень ферми
ctx.beginPath();
    for(var f=220;f<500;f=f+5)
    {
    //В полупроводнике
        ctx.moveTo(-(-f) ,  335)
        f=f+10;
        ctx.lineTo(-(-f),  335)
    }
    ctx.strokeStyle=fermi_level;
    ctx.lineWidth ="2"
    ctx.stroke();
ctx.beginPath();
      for(var f=0;f<180;f=f+5)
      {
        //В металле
        if(s<=150){
            ctx.moveTo(2-(-f) ,  s*3.5-525+335)
            f=f+10;
            ctx.lineTo(2-(-f),  s*3.5-525+335)
            }
        else{
            ctx.moveTo(2-(-f) ,  s*1.5-225+335)
            f=f+10;
            ctx.lineTo(2-(-f),  s*1.5-225+335)
            }
        }
      ctx.strokeStyle=fermi_level_metal;
      ctx.lineWidth ="2"
      ctx.stroke();
}

// Вызов функций для прорисовки до использования слайдера
Semiconductor(document.querySelector('#n_type_slider').value);
Semiconductor2(document.querySelector('#p_type_slider').value);
loop()

//Вывод значений напряжения и вида смещения
//QuerySelector is supported on Firefox 3.1+, IE8+ (only in IE8 standards mode), and Safari 3.1+ browsers.
//Можно использовать id или class
const slider1 = document.getElementById('n_type_slider'),
slider2 = document.getElementById('p_type_slider'),
voltsOutput1 = document.querySelector('.voltsI'),
voltsOutput2 = document.querySelector('.voltsII'),
mode = document.querySelector('.mode'),
mode2= document.querySelector('.mode2');

// Включается слайдер1
slider1.addEventListener('input', () => {
      // Подгон слайдера к значениям вольт
      voltsOutput1.textContent= ((slider1.value-150)*75/4000).toFixed(2);
      if(slider1.value>155){
      mode.textContent= "Режим обогащения (аккумуляции)";
      }
      if(slider1.value<148){
      mode.textContent= "Режим истощения (обеднения поверхности)";
      }
      if(slider1.value<110){
      mode.textContent= "Режим инверсии";
      }
      if(slider1.value>=148&&slider1.value<=155 ){
      mode.textContent= "Состояние плоских зон";
      }

      //Анимированный график n-type
      Semiconductor(slider1.value);

})
// Включается слайдер2
slider2.addEventListener('input', () => {
      voltsOutput2.textContent= ((slider2.value-150)*75/4000).toFixed(2);

      if(slider2.value>155){
      mode2.textContent= "Режим истощения (обеднения поверхности)";
      }
      if(slider2.value>190){
      mode2.textContent= "Режим инверсии";
      }
      if(slider2.value<148){
      mode2.textContent= "Режим обогащения (аккумуляции)";
      }
      if(slider2.value>=148&&slider2.value<=155 ){
      mode2.textContent= "Состояние плоских зон";
      }

      //Анимированный график p-type
      Semiconductor2(slider2.value);

})
