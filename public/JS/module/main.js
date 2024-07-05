// main.js
import { addEventListeners } from './event/eventListeners.js';

export const lamps = [
    {
        lamp: '.radiationlamp',
        light: '.radiationlamplight',
        backgroundClass: 'radiation-scene',
        additionalContent:`
        <canvas id="canvas"></canvas>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="shadowed-goo">
          
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
          <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
          <feOffset in="shadow" dx="1" dy="1" result="shadow" />
          <feBlend in2="shadow" in="goo" result="goo" />
          <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
      <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
    </svg>`,
    additionalCSS:`
html, body{
  margin:0;
  padding:0;
     background-color:hsl(250, 100%, 1%);
}

#canvas{
z-index:1;
 position:absolute;
 background-color : "black";
  margin:0 auto;
  display:block;
  filter:url('#shadowed-goo');
}

`,
        additionalScript:`

const TWO_PI = Math.PI * 2;


class Application {
  
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        this.circleContainers = [];

        window.addEventListener('resize', () => this.resizeCanvas(), false);
    }


    resizeCanvas() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

      
        this.circleContainers = [];
        this.initializeCircleContainers();
    }

 
    initializeCircleContainers() {
        for (let x = 0; x < this.width + 100; x += 100) {
            for (let y = 0; y < this.height + 100; y += 100) {

                let circleContainer = new CircleContainer(this.context, x, y);


                circleContainer.initializeCircles();

     
                this.circleContainers.push(circleContainer);
            }
        }
    }


    update() {
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].update();
        }
    }


    render() {

        this.context.clearRect(0, 0, this.width, this.height);

 
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].render();
        }
    }


    loop() {
        this.update();
        this.render();

        window.requestAnimationFrame(() => this.loop());
    }
}


class CircleContainer {

    constructor(context, x, y) {
        this.context = context;
        this.position = {x, y};

        this.numberOfCircles = 19;
        this.circles = [];

        this.baseRadius = 20;
        this.bounceRadius = 150;
        this.singleSlice = TWO_PI / this.numberOfCircles;
    }

 
    initializeCircles() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles.push(new Circle(this.position.x, this.position.y + Math.random(), this.baseRadius, this.bounceRadius, i * this.singleSlice));
        }
    }

 
    update() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].update(this.context);
        }
    }


    render() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].render(this.context);
        }
    }
}


class Circle {

    constructor(x, y, baseRadius, bounceRadius, angleCircle) {
        this.basePosition = {x, y};
        this.position = {x, y};
        this.speed = 0.01;
        this.baseSize = 10;
        this.size = 10;
        this.angle = (x + y);
        this.baseRadius = baseRadius;
        this.bounceRadius = bounceRadius;
        this.angleCircle = angleCircle;
    }


    update() {
        this.position.x = this.basePosition.x + Math.cos(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.position.y = this.basePosition.y + Math.sin(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.size = Math.cos(this.angle) * 8 + this.baseSize;

        this.angle += this.speed;
    }


    render(context) {
        context.fillStyle = "hsl(50, 100%, " + this.size * 3 + "%)";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
        context.fill();
    }
}

    const application = new Application();


    application.initializeCircleContainers();


    application.loop();

`,
        imgClass: 'radiation_rock',
        imgSrc: '../../img/radiation_rock.png',
        coinCount: 0
    },
    {
        lamp: '.animallamp',
        light: '.animallamplight',
        backgroundClass: 'animal-scene',
        additionalContent: `
  <div id="background-wrap">
    <div class="x1">
        <div class="cloud"></div>
    </div>

    <div class="x2">
        <div class="cloud"></div>
    </div>

    <div class="x3">
        <div class="cloud"></div>
    </div>

    <div class="x4">
        <div class="cloud"></div>
    </div>

    <div class="x5">
        <div class="cloud"></div>
    </div>
</d
        `,
        additionalCSS : `body {
	background: lightblue;
	color: #333;
	font: 100% Arial, Sans Serif;
	height: 100vh;
	margin: 0;
	padding: 0;
	overflow-x: hidden;
  background: repeating-linear-gradient(
        180deg,      /* Stripe angle */
        #c8dfff,    /* Stripe color 1 */
        #c8dfff 10px, /* Stripe width */
        #ffffff 10px, /* Space color */
        #ffffff 25px  /* Space width */
    );
}



#background-wrap {
    bottom: 0;
	left: 0;
	padding-top: 50px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: -1;
}

/* KEYFRAMES */

@-webkit-keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

@-moz-keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

@keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

/* ANIMATIONS */

.x1 {
	-webkit-animation: animateCloud 35s linear infinite;
	-moz-animation: animateCloud 35s linear infinite;
	animation: animateCloud 35s linear infinite;
	
	-webkit-transform: scale(0.65);
	-moz-transform: scale(0.65);
	transform: scale(0.65);
}

.x2 {
	-webkit-animation: animateCloud 20s linear infinite;
	-moz-animation: animateCloud 20s linear infinite;
	animation: animateCloud 20s linear infinite;
	
	-webkit-transform: scale(0.3);
	-moz-transform: scale(0.3);
	transform: scale(0.3);
}

.x3 {
	-webkit-animation: animateCloud 30s linear infinite;
	-moz-animation: animateCloud 30s linear infinite;
	animation: animateCloud 30s linear infinite;
	
	-webkit-transform: scale(0.5);
	-moz-transform: scale(0.5);
	transform: scale(0.5);
}

.x4 {
	-webkit-animation: animateCloud 18s linear infinite;
	-moz-animation: animateCloud 18s linear infinite;
	animation: animateCloud 18s linear infinite;
	
	-webkit-transform: scale(0.4);
	-moz-transform: scale(0.4);
	transform: scale(0.4);
}

.x5 {
	-webkit-animation: animateCloud 25s linear infinite;
	-moz-animation: animateCloud 25s linear infinite;
	animation: animateCloud 25s linear infinite;
	
	-webkit-transform: scale(0.55);
	-moz-transform: scale(0.55);
	transform: scale(0.55);
}

/* OBJECTS */

.cloud {
	background: #fff;
	background: -moz-linear-gradient(top,  #fff 5%, #f1f1f1 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(5%,#fff), color-stop(100%,#f1f1f1));
	background: -webkit-linear-gradient(top,  #fff 5%,#f1f1f1 100%);
	background: -o-linear-gradient(top,  #fff 5%,#f1f1f1 100%);
	background: -ms-linear-gradient(top,  #fff 5%,#f1f1f1 100%);
	background: linear-gradient(top,  #fff 5%,#f1f1f1 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff', endColorstr='#f1f1f1',GradientType=0 );
	
	-webkit-border-radius: 100px;
	-moz-border-radius: 100px;
	border-radius: 100px;
	
	-webkit-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);
	box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);

	height: 120px;
	position: relative;
	width: 350px;
}

.cloud:after, .cloud:before {
    background: #fff;
	content: '';
	position: absolute;
	z-indeX: -1;
}

.cloud:after {
	-webkit-border-radius: 100px;
	-moz-border-radius: 100px;
	border-radius: 100px;

	height: 100px;
	left: 50px;
	top: -50px;
	width: 100px;
}

.cloud:before {
	-webkit-border-radius: 200px;
	-moz-border-radius: 200px;
	border-radius: 200px;

	width: 180px;
	height: 180px;
	right: 50px;
	top: -90px;
}`,
        imgClass: 'animal_rock',
        imgSrc: '../../img/animal_rock.png',
        coinCount: 0
    },
    {
        lamp: '.crimelamp',
        light: '.crimelamplight',
        backgroundClass: 'crime-scene',
        additionalContent: `
            <div class="blood-stain2"><img src="../../img/bloodstain2.png" alt=""></div>
            <div class="blood-stain"><img src="../../img/bloodstain.png" alt=""></div>
            <h1 class="police-tape police-tape--1">
                &nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE
            </h1>
            <h1 class="police-tape police-tape--2">POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POLICE LINE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        `,
        imgClass: 'crime_rock',
        imgSrc: '../../img/crime_rock.png',
        coinCount: 0
    },
    {
        lamp: '.timelamp',
        light: '.timelamplight',
        backgroundClass: 'time-scene',
        additionalContent: `
             <canvas id="c"></canvas>
        `,
        additionalScript: `
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const dotCount = 3000;
const size = 4;
const f = 3;
const dots = [];
let w, h, cX, cY, mD, nX, nY, sX, sY;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cX = w / 2;
  cY = h / 2;
  mD = Math.sqrt((cX * cX) + (cY * cY));
  
  nX = Math.sqrt((w / h * dotCount) + ((w - h) * (w - h) / ((4 * h) * (4 * h)))) - ((w - h) / (2 * h));
  nY = dotCount / nX;
  sX = w / (nX - 1);
  sY = h / (nY - 1);
  
  for (let i = 0; i < dotCount; i++) {
    const x = sX * (i % nX);
    const y = sY * (i / nX | 0);
    const t = Math.random() * 3000;
    const c = Math.random() * 360 | 0;
    dots[i] = { x, y, oX: x, oY: y, t, c };
  }
}

window.addEventListener('resize', resize);
resize();

function draw(time = 0) {
  ctx.clearRect(0, 0, w, h);

  for (let i = 0; i < dotCount; i++) {
    const d = dots[i];
    const t = (d.t + time) * 0.004;
    const a = Math.sin(t);

    const r = Math.floor(255 * Math.random());
    const g = Math.floor(255 * Math.random());
    const b = Math.floor(255 * Math.random());

    if (Math.abs(d.x - d.oX) > f || Math.abs(d.y - d.oY) > f) {
      ctx.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
    } else {
      ctx.fillStyle = 'rgba(0, 255, 1, ' + a + ')';
    }

    ctx.fillRect(d.x, d.y, size, size);
  }
  requestAnimationFrame(draw);
}

draw();


        `,
        additionalCSS: `
                        * {
            margin: 0;
            padding: 0;
            }

            canvas {
            position:absolute;
            display: block;
            background: black;
            box-sizing: border-box;
            height:900px;
            }
        `,
        imgClass: 'time_rock',
        imgSrc: '../../img/time_rock.png',
        coinCount: 0
    },
    {
        lamp: '.spacelamp',
        light: '.spacelamplight',
        backgroundClass: 'space-scene',
        additionalHTML: `
            <div class="shooting-stars"></div>
        `,
        additionalCSS: `
            .shooting-stars {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: -1; /* 배경 요소를 뒤로 보내기 위해 z-index를 -1로 설정 */
            }
            
            .space-star { /* 클래스 이름 변경 */
                position: absolute;
                background-color: #fff;
                width: 2px;
                height: 2px;
                border-radius: 50%;
                animation: twinkling 2s infinite;
            }
            
            @keyframes twinkling {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
            }
            
            @keyframes shoot {
                0% {
                    transform: translate3d(0, 0, 0) scale(0);
                    opacity: 1;
                }
                70% {
                    opacity: 1;
                }
                100% {
                    transform: translate3d(100vw, -100vh, 0) scale(0.5);
                    opacity: 0;
                }
            }
        `,
        additionalScript: `
            function createStars() {
                const numberOfStars = 200; // 생성할 별의 개수
                const container = document.querySelector('.shooting-stars');
                for (let i = 0; i < numberOfStars; i++) {
                    const star = document.createElement('div');
                    star.className = 'space-star'; /* 클래스 이름 변경 */
                    star.style.left = \`\${Math.random() * 100}%\`;
                    star.style.top = \`\${Math.random() * 100}%\`;
                    star.style.animationDelay = \`\${Math.random() * 2}s\`; // 랜덤한 딜레이를 추가합니다.
                    container.appendChild(star);
                }
            }
            createStars();
            
            document.addEventListener('DOMContentLoaded', () => {
                const numStars = 100;
                const container = document.querySelector('.shooting-stars');
            
                for (let i = 0; i < numStars; i++) {
                    const star = document.createElement('div');
                    star.className = 'space-star';
                    star.style.top = \`\${Math.random() * 100}vh\`;
                    star.style.left = \`\${Math.random() * 100}vw\`;
                    star.style.animationDelay = \`\${Math.random() * 5}s\`; // 랜덤한 딜레이를 추가합니다.
                    star.style.animationDuration = \`\${2 + Math.random() * 3}s\`;
                    container.appendChild(star);
                }
            });
        `,
        imgClass: 'space_rock',
        imgSrc: '../../img/space_rock.png',
        coinCount: 0
    }
];

addEventListeners(lamps);
