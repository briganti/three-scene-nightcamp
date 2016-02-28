import THREE from 'three';

export default function (opt) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30, opt.width / opt.height, 1, 2000);
  camera.position.set(0, 2, 14);
  camera.lookAt(new THREE.Vector3(0, 0.8, 0));

  const renderer = new THREE.WebGLRenderer({ canvas: opt.canvas, antialias: true });
  renderer.setSize(opt.width, opt.height);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  return {
    scene,
    camera,
    renderer,
    animation: [],
  };
}
