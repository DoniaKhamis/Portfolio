import * as THREE from "three";
//so we can drag and move around
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import spline from "./spline.js";

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

//**add fogg */
scene.fog = new THREE.FogExp2(0x00000,0.3);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor= 0.03;
// const hemLight = new THREE.HemisphereLight(0xffffff,0x4444444);
// scene.add(hemLight);

//create a tube geometry to go though
const tubeGeo = new THREE.TubeGeometry(spline, 222,0.65,16,true);
const tubeMat = new THREE.MeshBasicMaterial({
    color:0x00999f,
    //from the inside of the obj and the outside(so we can get into the interour)
    // side:THREE.DoubleSide,
    wireframe: true
});
const tube = new THREE.Mesh(tubeGeo,tubeMat);
// scene.add(tube);

//create tube edges instead of the mesh
const edges = new THREE.EdgesGeometry(tubeGeo,0.2);
const limMat = new THREE.LineBasicMaterial({color:0xffffff});
const tubeLines = new THREE.LineSegments(edges,limMat);
scene.add(tubeLines);


//**adding some boxes on the path */
const numBoxes = 55;
const size = 0.075;
const boxGeo = new THREE.BoxGeometry(size,size,size);
const boxMat = new THREE.MeshBasicMaterial({color:0xffff99,wireframe:true});
for(let i = 0;i<numBoxes;i++){
    const box = new THREE.Mesh(boxGeo,boxMat);
    const p = (i/numBoxes*Math.random()*0.1)%1;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    pos.x += Math.random;
    pos.y += Math.random;
    box.position.copy(pos);

    box.rotation.set()
}

//to fly though!!
function updateCamera(t){
    const time = t * 0.05;
    const looptime = 8*1000;
    const p = (time%looptime)/looptime;
    const pos = tubeGeo.parameters.path.getPointAt(p);
    const lookAt = tubeGeo.parameters.path.getPointAt((p+0.03)%1);
    camera.position.copy(pos);
    // Force the camera to stay upright before looking at the next point
    // camera.up.set(0, 1, 0);
    camera.lookAt(lookAt);
}
//to animate the scene, we need to create a render loop
function animate(t=0) {
    requestAnimationFrame(animate);
    updateCamera(t);
    renderer.render(scene, camera);
    // controls.update();
}

animate();

function handleWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
window.addEventListener('resize',handleWindowResize, false);
