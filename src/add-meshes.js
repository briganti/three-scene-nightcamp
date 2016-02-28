import THREE from 'three';

function addMesh(scene, geometry, materials, options) {
  const mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
  mesh.scale.x = mesh.scale.y = mesh.scale.z = options.scale ? options.scale : 0.75;

  if (options.position) {
    mesh.position.set(options.position[0], options.position[1], options.position[2]);
  }
  if (options.rotation) {
    mesh.rotation.set(options.rotation[0], options.rotation[1], options.rotation[2]);
  }

  mesh.receiveShadow = options.receiveShadow;
  mesh.castShadow = options.castShadow;

  scene.add(mesh);

  return mesh;
}

function getFlatMaterial(options) {
  return new THREE.MeshPhongMaterial(Object.assign(options, { shading: THREE.FlatShading }));
}

export default function (app) {
  const loader = new THREE.JSONLoader();
  let json;
  let geometry;

  // Materials
  const dirtMtl = getFlatMaterial({ color: 0xA59760 });
  const grassMtl = getFlatMaterial({ color: 0xB4BB71 });
  const cloudMtl = getFlatMaterial({ color: 0xffffff });
  const leafMtl = getFlatMaterial({ color: 0x1C991C });
  const trunkMtl = getFlatMaterial({ color: 0x3B2312 });
  const stringMtl = getFlatMaterial({ color: 0x000000 });
  const tentMtl = getFlatMaterial({ color: 0xAA7B5A });
  const flametopMtl = getFlatMaterial({ color: 0xE7CE60, emissive: 0xE7CE60, skinning: true });
  const flamecenterMtl = getFlatMaterial({ color: 0xE78B1E, emissive: 0xE78B1E, skinning: true });
  const flamebottomMtl = getFlatMaterial({ color: 0x922A00, emissive: 0x922A00, skinning: true });
  const baseMtl = getFlatMaterial({ color: 0x1D1109 });
  const rockMtl = getFlatMaterial({ color: 0x818181 });

  // Island
  json = require('asset/island.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [dirtMtl, grassMtl],
    { position: [0, -0.501, 0], receiveShadow: true }
  );

  // Clouds
  json = require('asset/cloud.json');
  geometry = loader.parse(json).geometry;

  const cloudA = addMesh(
    app.scene,
    geometry,
    [cloudMtl],
    { position: [-8, 2, 5], rotation: [0, Math.PI, 0], castShadow: true }
  );
  const cloudB = addMesh(
    app.scene,
    geometry,
    [cloudMtl],
    { position: [0, -3, -3], castShadow: true }
  );
  const cloudC = addMesh(
    app.scene,
    geometry,
    [cloudMtl],
    { position: [12, 3, 0], rotation: [Math.PI / 3, 0, 0], castShadow: true }
  );

  // Clouds animation
  const cloudDirection = new THREE.Vector3(-0.01, 0, 0);

  app.animation.push(() => {
    if (cloudA.position.x < -13) {
      cloudA.position.x = 13;
    }
    if (cloudB.position.x < -22) {
      cloudB.position.x = 22;
    }
    if (cloudC.position.x < -20) {
      cloudC.position.x = 20;
    }

    cloudA.position.add(cloudDirection);
    cloudB.position.add(cloudDirection);
    cloudC.position.add(cloudDirection);
  });

  // Forest
  json = require('asset/tree1.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [leafMtl, trunkMtl],
    { position: [-2, 0.27, -1.7], castShadow: true, receiveShadow: true }
  );
  addMesh(
    app.scene,
    geometry,
    [leafMtl, trunkMtl],
    {
      position: [-1.2, 0.37, -3],
      rotation: [0, 2, 0],
      scale: 0.9,
      castShadow: true,
      receiveShadow: true,
    }
  );
  addMesh(
    app.scene,
    geometry,
    [leafMtl, trunkMtl],
    {
      position: [0.1, 0.17, -2],
      rotation: [0, 1, 0],
      scale: 0.5,
      castShadow: true,
      receiveShadow: true,
    }
  );

  json = require('asset/tree2.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [leafMtl, trunkMtl],
    { position: [-2.4, 1.1, -2.3], castShadow: true, receiveShadow: true }
  );
  addMesh(
    app.scene,
    geometry,
    [leafMtl, trunkMtl],
    {
      position: [-3.2, 0.8, -1.4],
      rotation: [0, -0.3, 0],
      scale: 0.7,
      castShadow: true,
      receiveShadow: true,
    }
  );
  addMesh(
    app.scene,
    geometry,
    [leafMtl, trunkMtl],
    {
      position: [-0.6, 0.6, -1.9],
      rotation: [0, -0.9, 0],
      scale: 0.65,
      castShadow: true,
      receiveShadow: true,
    }
  );

  // Tent
  json = require('asset/tent.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [stringMtl, tentMtl],
    { position: [2.5, 0.2, 0], rotation: [0, 0.5, 0], castShadow: true, receiveShadow: true }
  );

  // Fire
  json = require('asset/flame.json');
  geometry = loader.parse(json).geometry;

  const flame = addMesh(
    app.scene,
    geometry,
    [flametopMtl, flamecenterMtl, flamebottomMtl],
    { position: [0.15, 0.16, 1.45] }
  );
  const mixer = new THREE.AnimationMixer(flame);
  mixer.clipAction(geometry.animations[0]);

  json = require('asset/fire-base.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [baseMtl],
    { position: [0.17, 0.16, 1.45], castShadow: true, receiveShadow: true }
  );

  // trunk
  json = require('asset/trunk.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [trunkMtl],
    { position: [-1, 0.14, 2.5], rotation: [0, -0.3, 0], castShadow: true, receiveShadow: true }
  );

  // rock
  json = require('asset/rock.json');
  geometry = loader.parse(json).geometry;

  addMesh(
    app.scene,
    geometry,
    [rockMtl],
    { position: [-3, 0.19, 1.5], castShadow: true, receiveShadow: true }
  );
}
