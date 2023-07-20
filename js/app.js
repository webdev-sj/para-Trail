// const parallax_el = document.querySelectorAll(".parallax");

// let xValue = 0, 
//    yValue = 0 ; 

// let rotateDegree = 0;

// function update (cursorPosition){
//    parallax_el.forEach((el)=> {
//       let speedx = el.dataset.speedx;
//       let speedy = el.dataset.speedy;
//       let speedz = el.dataset.speedz;
//       let rotateSpeed = el.dataset.rotation;

//       let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
//       let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

//       el.style.transform = ` perspective(2300px) translateZ(${zValue *speedz}px) 
//       rotateY(${rotateDegree * rotateSpeed}deg)
//       translateX(calc(-50% + ${-xValue * speedx}px)) 
//       translateY(calc(-50% + ${yValue * speedy}px))`
     
//    })
// }

//    update(0)

//    window.addEventListener("mousemove", (e) => { 
//       xValue = e.clientX - window.innerWidth / 2;
//       yValue = e.clientY - window.innerHeight / 2; 

//       rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

      
   
//       update(e.clientX);
 
//    });

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
  yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px) 
      rotateY(${rotateDegree * rotateSpeed}deg)
      translateX(calc(-50% + ${-xValue * speedx}px)) 
      translateY(calc(-50% + ${yValue * speedy}px))`;
  });
}

function handleOrientation(event) {
  xValue = event.gamma; // Device's rotation around the x-axis (tilt left or right)
  yValue = event.beta;  // Device's rotation around the y-axis (tilt forward or backward)
  rotateDegree = (xValue / 90) * 20; // Adjust the rotation speed as per your requirement

  update(window.innerWidth / 2 + (xValue * 10)); // You can adjust the multiplier to control the effect intensity
}

// Check if the device supports deviceorientation event
if ('ondeviceorientation' in window) {
  window.addEventListener('deviceorientation', handleOrientation);
} else {
  // Fallback for devices that do not support deviceorientation (e.g., desktops)
  window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
  });
}
