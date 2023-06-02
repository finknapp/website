import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let camera, scene, renderer, logo;

init();
animate();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5.5);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000); // Set the background color to black
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();

  // Add lights to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(-1, -1, -1);
  scene.add(directionalLight2);

  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight3.position.set(1, -1, 1);
  scene.add(directionalLight3);

  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight4.position.set(-1, 1, -1);
  scene.add(directionalLight4);

  const pointLight1 = new THREE.PointLight(0xff0000, 1, 5);
  pointLight1.position.set(-2, 2, 0);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x00ff00, 1, 5);
  pointLight2.position.set(2, 2, 0);
  scene.add(pointLight2);

  window.addEventListener('resize', onWindowResize);

  const loader = new GLTFLoader();
  loader.load('assets/bad.gltf', function (gltf) {
    logo = gltf.scene;

    // Assign the roughness and metallic properties
    logo.traverse(function (object) {
      if (object.isMesh) {
        object.material.roughness = 0.5; // Adjust the roughness value (0 - smooth, 1 - rough)
        object.material.metalness = 0.8; // Adjust the metalness value (0 - non-metallic, 1 - metallic)
      }
    });

    logo.position.y = -1; // Adjust the vertical position here
    scene.add(logo);

    render();
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the logo
  if (logo) {
    logo.rotation.y += 0.01; // Adjust the rotation speed as desired
  }

  render();
}

function render() {
  renderer.render(scene, camera);
}
