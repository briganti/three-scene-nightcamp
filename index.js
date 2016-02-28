import addBackground from './src/add-background';
import addLights from './src/add-lights';
import addMeshes from './src/add-meshes';
import viewer from './src/viewer';

const render = (app) => {
  for (const animate of app.animation) {
    animate();
  }

  app.renderer.render(app.scene, app.camera);
  requestAnimationFrame(() => {
    render(app);
  });
};

export default function (options) {
  const app = viewer({
    canvas: options.canvas,
    width: options.width,
    height: options.height,
  });

  addBackground(app);
  addLights(app);
  addMeshes(app);

  render(app);

  return {
    updateView: (width, height) => {
      app.camera.aspect = width / height;
      app.camera.updateProjectionMatrix();

      app.renderer.setSize(width, height);
      app.renderer.render(app.scene, app.camera);
    },
  };
}
