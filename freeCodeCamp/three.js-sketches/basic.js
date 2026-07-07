import * as THREE from "three";
//so we can drag and move around
import {OrbitControls} from 'jsm/controls/OrbitControls.js';


//1. renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
//handels high intencity lights and vibrant gradients (more smooth and natural)
renderer.toneMapping = THREE.ACESFilmicToneMapping;
//without this the colores will look washed out
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);
//2. camera
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;
const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor= 0.03;
const hemLight = new THREE.HemisphereLight(0xffffff,0x4444444);
scene.add(hemLight);

//to animate the scene, we need to create a render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

function handleWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
window.addEventListener('resize',handleWindowResize, false);