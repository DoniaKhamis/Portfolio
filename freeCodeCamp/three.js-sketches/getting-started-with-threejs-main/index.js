//import three.js 
import * as THREE from "three";

//the core: for the scene, we need a renderer, a camera, and a scene object
//why do we need a scene?
//  the renderer is what we use to render the scene to the screen
//1. renderer
const renderer = new THREE.WebGLRenderer({antialias: true});

//to set the size of the renderer to the window size
renderer.setSize(window.innerWidth, window.innerHeight);
//also we need to create a canvas element, another way to do that is with html, 
document.body.appendChild(renderer.domElement);

//and the camera is what we use to view the scene
//2. camera
const fov = 75; //field of view, in degrees, how much of the scene is visible to the camera
const aspect = window.innerWidth / window.innerHeight; //aspect ratio, width / height
const near = 0.1;
const far = 1000; //near and far clipping planes, anything closer than near or farther than far will not be rendered
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//scoot the camera back a bit so we can see the scene
camera.position.z = 5;

//because the scene is where we put all the objects that we want to render
//3. scene
const scene = new THREE.Scene();
//note i didnt write any of this code :)

//the library already has some geometry objects that we can use

const ball = new THREE.IcosahedronGeometry(1.0,2);
//put some material on the geometry so we can see it
const ballMaterial = new THREE.MeshStandardMaterial(
    {color: 0x00ff00,
        flatShading: true
    });
const ballMesh = new THREE.Mesh(ball, ballMaterial);
scene.add(ballMesh);

//lets experement with some other geometry objects, like a box, a sphere, and a torus
const torusGeometry = new THREE.TorusGeometry(1, 0.2, 10, 1000);
const torusMaterial = new THREE.MeshStandardMaterial(
    {color: 0xff0000,
        flatShading: true
    });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
//put it in another position so we can see it
// torusMesh.position.x = 3;
scene.add(torusMesh);    

//now lets try to interact with the light!
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//color the box red, and use a standard material so we can see the light

const boxMaterial = new THREE.MeshStandardMaterial(
    {color: 0x0000ff,
        flatShading: true
    });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.x = -3;
scene.add(boxMesh);
//to interact with the light, we need to add a light source
const pointLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(pointLight);

//now we can add some objects to the scene
renderer.render(scene, camera);

//to animate the scene, we need to create a render loop
function animate(t=0) {
    requestAnimationFrame(animate);
    ballMesh.rotation.x = t/1000;
    ballMesh.rotation.y = t/1000;
    boxMesh.rotation.x = t/10000;
    boxMesh.rotation.y = t/1000;
    //move the torus in a circle
    torusMesh.position.x = Math.cos(t/1000);
    torusMesh.position.z = Math.sin(t/1000);
    renderer.render(scene, camera);
}
animate();