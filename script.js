// ─────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────

const phrases = [
  "Execution complete: 4 years, unforgettable.",
  "$ git push origin memories --force",
  "Building final_memory.exe...",
  "Compiling 4 years of chaos...",
  "One Last Bell Before Goodbye...",
  "Saved successfully into forever.zip"
];

let pIdx = 0;
let cIdx = 0;
let del = false;

const el = document.getElementById("typewriter-text");

function type(){

  const phrase = phrases[pIdx];

  if(!del){

    if(cIdx < phrase.length){

      el.textContent += phrase.charAt(cIdx);

      cIdx++;

      setTimeout(
        type,
        45 + Math.random() * 35
      );

    }else{

      setTimeout(() => {

        del = true;

        type();

      }, 2400);
    }

  }else{

    if(cIdx > 0){

      el.textContent =
        phrase.substring(0, cIdx - 1);

      cIdx--;

      setTimeout(type, 24);

    }else{

      del = false;

      pIdx =
        (pIdx + 1) % phrases.length;

      setTimeout(type, 500);
    }
  }
}

setTimeout(type, 1500);
// ─────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────

const obs = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if(entry.isIntersecting){

        entry.target.classList.add("visible");

      }

    });

  },

  {
    threshold: 0.12
  }
);

document
  .querySelectorAll("[data-animate]")
  .forEach((el) => obs.observe(el));
  // ─────────────────────────────────────
// RSVP TOGGLE
// ─────────────────────────────────────

function toggleReg(el){

  el.classList.toggle("off");

  // glow effect
  el.animate(

    [
      {
        transform:"scale(1)"
      },

      {
        transform:"scale(1.08)"
      },

      {
        transform:"scale(1)"
      }
    ],

    {
      duration:300,
      easing:"ease"
    }
  );
}
// ─────────────────────────────────────
// MOUSE GLOW EFFECT
// ─────────────────────────────────────

const glow = document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

  glow.style.left = e.clientX + "px";

  glow.style.top = e.clientY + "px";

});
// Disable heavy glow on phones

if(window.innerWidth < 768){

  const glow =
    document.querySelector(".cursor-glow");

  if(glow){
    glow.remove();
  }
}