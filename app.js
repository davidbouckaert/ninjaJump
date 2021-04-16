document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div'); // add a doodler div
  const doodlerLeftSpace = 50;
  const doodlerBottomSpace = 150;
  const isGameOver = false;
  const platformCount = 7;

  function createDoodler() {
    grid.appendChild(doodler); // add the doodler to the grid
    doodler.classList.add('doodler'); // add a class 'doodler' to the doodler div
    doodler.style.left = `${doodlerLeftSpace}px`; // set starting posistion x-axis
    doodler.style.bottom = `${doodlerBottomSpace}px`; // set strating posistion y-axis
  }
  class Platform {
    constructor(newPlatformButtom) {
      this.bottom = newPlatformButtom;
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');
      const { visual } = this;
      visual.classList.add('platfrom');
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;
      grid.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i += 1) {
      const platformGap = 900 / platformCount; // calculate the gap space based upon the grid heigth and platform count
      const newPlatformBottom = 100 + i * platformGap; // use the for-loop to increment the gap space
      const newPlatform = new Platform(newPlatformBottom);
    }
  }

  function start() {
    if (!isGameOver) {
      createDoodler(); // function is only starten when the game is not over
      createPlatforms();
    }
  }
  // TODO attach to button
  start();
});
