document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div'); // add a doodler div
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = 150;
  let isGameOver = false;
  const platformCount = 7;
  const gridHeigth = 900
  let platforms = []
  let upTimerId
  let downTimerId

  function createDoodler() {
    grid.appendChild(doodler); // add the doodler to the grid
    doodler.classList.add('doodler'); // add a class 'doodler' to the doodler div
    doodler.style.left = `${doodlerLeftSpace}px`; // set starting posistion x-axis
    doodler.style.bottom = `${doodlerBottomSpace}px`; // set strating posistion y-axis
  }
  class Platform {
    constructor(newPlatformButtom) {
      this.bottom = newPlatformButtom; // determine the location of the plaform bottom.
      this.left = Math.random() * 310; // grid width 400 - platform width 90
      this.visual = document.createElement('div'); // create a div for each platform
      const visual = this.visual
      visual.classList.add('platfrom'); // adding the class to the visual div won't work without storing 'visual' as a variable first.
      visual.style.left = `${this.left}px`; // determine the div's space from the left
      visual.style.bottom = `${this.bottom}px`; // determine the div's space from the bottom
      grid.appendChild(visual); // add the element 'visual' to the grid.
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i += 1) {
      const platformGap = gridHeigth / platformCount; // calculate the gap space based upon the grid heigth and platform count
      const newPlatformBottom = 100 + i * platformGap; // use the for-loop to increment the gap space. 100px + (ix128)
      const newPlatform = new Platform(newPlatformBottom); // create new platform using the class
      platforms.push(newPlatform) // each loop, add the platform to the array.
      console.log(platforms)
    }
  }

  function movePlatforms() {
    if(doodlerBottomSpace > 200) {
      platforms.forEach(platform => {
        platform.bottom -= 4 // for each platform in the array, lower the platform's bottom location with 4 pixels
        let visual = platform.visual
        visual.style.bottom = `${platform.bottom}px` // chaning the actual css.  
      })
    }
  }

  function jump() {
    // using a timer ID so we can clear this interval later.
    clearInterval(downTimerId) // when jumping, clear the falling interval
    upTimerId = setInterval(function() {
      doodlerBottomSpace += 3 // adding 20 px each time the interval runs
      doodler.style.bottom = `${doodlerBottomSpace}px` // add the new bottom space to the bottom location of our doodler
      // if our doodler reaches a certain hight, we want it to fall down again.
      if (doodlerBottomSpace > 550) {
        fall()
      }
    }, 1)
  }

  function fall() {
    clearInterval(upTimerId) // when falling, clear the jumping interval.
    downTimerId = setInterval(function() {
      doodlerBottomSpace -= 1 // removing 5 pixels from the doodlers bottom location
      doodler.style.bottom = `${doodlerBottomSpace}px`
      // let's stop the game when when doodler's bottom is at 0 pixels.
      if (doodlerBottomSpace <= 0) {
        gameOver()
      }
    }, 3)
  }

  function gameOver() {
    isGameOver = true
    console.log('game over!')
    // clearing all interval timers.
    clearInterval(upTimerId)
    clearInterval(downTimerId)
  }

  function start() {
    if (!isGameOver) {
      createDoodler(); // function is only starten when the game is not over
      createPlatforms();
      setInterval(movePlatforms, 20) // running the function every 20 ms -> lowering the platforms.
      jump()
    }
  }
  // TODO attach to button
  start();
});
