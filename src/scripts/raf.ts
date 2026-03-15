// Shared state
export let isMobile = window.innerWidth <= 750;

let resizeTimer: number;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    isMobile = window.innerWidth <= 750;
  }, 150) as unknown as number;
});

// Unified rAF loop — consolidates all continuous animations
let rafCallbacks: Array<() => void> = [];
let rafRunning = false;

function rafLoop() {
  for (let i = 0; i < rafCallbacks.length; i++) {
    rafCallbacks[i]();
  }
  if (rafCallbacks.length > 0) {
    requestAnimationFrame(rafLoop);
  } else {
    rafRunning = false;
  }
}

export function addRafCallback(cb: () => void) {
  rafCallbacks.push(cb);
  if (!rafRunning) {
    rafRunning = true;
    requestAnimationFrame(rafLoop);
  }
}

export function clearRafCallbacks() {
  rafCallbacks = [];
  rafRunning = false;
}

export function refreshMobile() {
  isMobile = window.innerWidth <= 750;
}
