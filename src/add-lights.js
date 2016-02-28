import THREE from 'three';

function addSpotLight(scene, options) {
  const light = new THREE.SpotLight(...options.args);

  if (options.position) {
    light.position.set(options.position[0], options.position[1], options.position[2]);
  }
  if (options.target) {
    light.target.position.set(options.target[0], options.target[1], options.target[2]);
    light.target.updateMatrixWorld();
  }

  light.castShadow = true;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 1000;
  light.shadow.camera.fov = 70;
  light.shadow.camera.near = true;
  light.shadow.bias = 0.0001;
  light.shadow.darkness = 0.1;
  light.shadowMapWidth = 2048;
  light.shadowMapHeight = 1024;

  scene.add(light);

  return light;
}

export default function (app) {
  const light = new THREE.AmbientLight(0x000040);
  app.scene.add(light);

  addSpotLight(app.scene, {
    args: [0x666666, 1, 60, Math.PI / 2, 1],
    position: [-10, 7, 10],
    target: [0, 0, 0],
  });

  // Fireplace
  const fireLightLeft = addSpotLight(app.scene, {
    args: [0x806010, 3, 1.3, Math.PI / 2, 1, 1],
    position: [0.15, 0.3, 1.45],
    target: [-0.85, 0.3, 1.45],
  });
  const fireLightRight = addSpotLight(app.scene, {
    args: [0x806010, 3, 1.3, Math.PI / 2, 1, 1],
    position: [0.15, 0.3, 1.45],
    target: [1.15, 0.3, 1.45],
  });

  // Fireplace animation
  let lightModifier = 0.01;

  app.animation.push(() => {
    if (fireLightLeft.intensity > 2) {
      lightModifier = -0.02;
    } else if (fireLightLeft.intensity < 0.8) {
      lightModifier = 0.01;
    }
    fireLightLeft.intensity += lightModifier;
    fireLightRight.intensity += lightModifier;
  });
}
