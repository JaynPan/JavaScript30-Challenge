const player = document.querySelector('.player');
const viewer = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('[type=range]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');


function playAndPause() {
    if(viewer.paused){
        viewer.play();
        toggle.innerHTML = '&#10074 &#10074';
    }else{
        viewer.pause();
        toggle.innerHTML = '►';
    };   
}

function handleRangeUpdate() {
    viewer[this.name] = this.value;
}


function skip() {
    viewer.currentTime = viewer.currentTime + parseFloat(this.dataset.skip);
}

function progressBar() {
    const playingPre = (viewer.currentTime / viewer.duration)*100;
    progressFilled.style.flexBasis = `${playingPre}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
  }

function openFullscreen() {

    if (viewer.requestFullscreen) {
        viewer.requestFullscreen();
    } else if (viewer.mozRequestFullScreen) { /* Firefox */
        viewer.mozRequestFullScreen();
    } else if (viewer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        viewer.webkitRequestFullscreen();
    } else if (viewer.msRequestFullscreen) { /* IE/Edge */
        viewer.msRequestFullscreen();
    }
      
}
  
// panel control
toggle.addEventListener('click', playAndPause);
viewer.addEventListener('click', playAndPause);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

viewer.addEventListener('timeupdate', progressBar);