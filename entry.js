import { game, splashAudio, completeAudio, deathAudio } from './lib/game';

const Veridis_Quo = new Audio('app/assets/audio/Daft_Punk_Veridis_Quo.mp3');
Veridis_Quo.volume = 0.3;
if (typeof Veridis_Quo.loop == 'boolean')
{
  Veridis_Quo.loop = true;
}
else
{
  Veridis_Quo.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

const background = new Image();
background.src = "app/assets/images/starry-sky.jpg";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  background.onload = () => { ctx.drawImage(background, 0, 0, canvas.width, canvas.height); };


    document.getElementById('sound').addEventListener('click', (e) => {
      if ( Veridis_Quo.muted ) {
        splashAudio.muted = false;
        deathAudio.muted = false;
        completeAudio.muted = false;
        Veridis_Quo.muted = false;
        e.target.src = "app/assets/images/Icons8-Windows-8-Media-Controls-Volume-Up.ico";
      }
      else {
        splashAudio.muted = true;
        deathAudio.muted = true;
        completeAudio.muted = true;
        Veridis_Quo.muted = true;
        e.target.src = "app/assets/images/Icons8-Windows-8-Media-Controls-Mute.ico";
      }
  });


  const startGame = (e) => {
    if (e.key === "Enter") {
      document.removeEventListener('keydown', startGame);
      game();
      Veridis_Quo.play();
      document.getElementById('start-button').style.display = 'none';
      const titleCard = document.getElementById('header');
      titleCard.style.opacity = '1';
      fade(titleCard);
    }
  };

  document.addEventListener('keydown', startGame);
});

const fade = (el) => {
  let op = 1;
  let fader = 0.008;
  const timer = setInterval(() => {
      if (op <= 0.1){
          clearInterval(timer);
          el.style.display = 'none';
      } else if (op <= 0.6) {
        fader = 0.1;
      }
      el.style.opacity = op;
      el.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * fader;
  }, 50);
};

window.addEventListener("keydown", function(e) {
  if([" ", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].indexOf(e.key) > -1) {
      e.preventDefault();
    }
}, false);
