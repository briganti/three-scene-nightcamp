import THREE from 'three';

export default function (app) {
  const planeGeo = new THREE.PlaneBufferGeometry(600, 900);

  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x043757,
    wireframe: false,
  });
  planeMaterial.side = THREE.DoubleSide;

  const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
  planeMesh.position.z = -5;

  app.scene.add(planeMesh);
}
