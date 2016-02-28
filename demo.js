import createScene from './index.js';
import domready from 'domready';

domready(() => {
  const scene = createScene({
    canvas: document.getElementById('app'),
    width: 600,
    height: 200,
  });

  window.addEventListener('resize', () => {
    scene.updateView(window.innerWidth, window.innerHeight / 2);
  });
});
