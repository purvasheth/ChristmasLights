function Lights(el) {
  this.el = document.querySelector(el);
  this.init();
}
const n = 7;
Lights.prototype.init = function () {
  const main = document.createDocumentFragment();
  for (var i = 0; i < n + 1; i++) {
    var rope = document.createElement("div");
    rope.className = "rope";
    var holder = document.createElement("div");
    holder.className = "holder";
    var light = document.createElement("div");
    light.className = "light";
    light.id = `light${i + 1}`;
    main.appendChild(rope);
    if (i !== n) {
      main.appendChild(holder);
      main.appendChild(light);
    }
  }
  this.el.appendChild(main);
};

new Lights("#main");
var flag = false;
var flip = false;
var duration = 1;

const on = document.querySelector("#btn-on");
const off = document.querySelector("#btn-off");
const change = document.querySelector("#btn-change");
const durationInput = document.querySelector("#duration");
const lights = [];
for (var i = 1; i < n + 1; i++) {
  lights.push(document.querySelector(`#light${i}`));
}

on.addEventListener("click", onhandler);
off.addEventListener("click", offhandler);
change.addEventListener("click", changehandler);

function onhandler() {
  flag = true;
  lights.forEach((light, i) => {
    light.style.background = getColor(i + 1);
  });
  blink();
}
function offhandler() {
  flag = false;
  lights.forEach((light) => {
    light.style.background = "#5457A0";
    light1.style.animation = "none";
  });
}
function changehandler() {
  const val = +durationInput.value;
  if (val) {
    duration = val;
  }
}

function getColor(index) {
  if (index % 3 === 0) {
    return "yellow";
  }
  if (index % 3 == 1) {
    return "cyan";
  }
  return "tomato";
}
function blink() {
  flip = !flip;
  if (flag) {
    if (flip) {
      lights.forEach((light, i) => {
        if (i % 2 == 0) {
          light.style.animation = `${getColor(i + 1)}-blink ${duration}s`;
        } else {
          light.style.animation = "none";
        }
      });
    } else {
      lights.forEach((light, i) => {
        if (i % 2 == 0) {
          light.style.animation = "none";
        } else {
          light.style.animation = `${getColor(i + 1)}-blink ${duration}s`;
        }
      });
    }
    setTimeout(blink, 1000 * duration); // calls blink after every duration seconds
  }
}
