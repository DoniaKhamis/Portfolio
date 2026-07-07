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
    {color: 0x0ea5e9,
        flatShading: true,
        metalness:0.6,
        roughness:0.1
    });
const ballMesh = new THREE.Mesh(ball, ballMaterial);
scene.add(ballMesh);
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,       // Glowing Neon
    wireframe: true,       
    transparent: true,   
    opacity: 0.45   // Makes lines look like a holographic glow
});
const ballWireframe = new THREE.Mesh(ball, wireframeMaterial);

// By adding the wireframe directly to the ballMesh, they lock together in space
ballMesh.add(ballWireframe);
//lets experement with some other geometry objects, like a box, a sphere, and a torus
const torusGeometry = new THREE.TorusGeometry(1.5, 0.1, 10, 100);
const torusMaterial = new THREE.MeshStandardMaterial(
    {color: 0x8b5cf0,
        metalness:0.1,
        roughness:0.3
    });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
//put it in another position so we can see it
// torusMesh.position.x = 3;
scene.add(torusMesh);    

//now lets try to interact with the light!
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//color the box red, and use a standard material so we can see the light

const boxMaterial = new THREE.MeshStandardMaterial(
    {color: 0xec4899,
        flatShading: true,
        roughness:0.3,
        metalness:0.4
    });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.x = -3;
scene.add(boxMesh);

//# adding some stars to the background
const starCount = 600;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 15;     // Random X
    starPositions[i + 1] = (Math.random() - 0.5) * 15; // Random Y
    starPositions[i + 2] = (Math.random() - 0.5) * 15; // Random Z
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.03,
    sizeAttenuation: true // Makes depth-based sizes work automatically
});

const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

// //to interact with the light, we need to add a light source
//this is basic one dimentional light
// const pointLight = new THREE.HemisphereLight(0xffffff, 0x000000);
// scene.add(pointLight);

//this upgraded light mimics real life light
//1) ambient light, for the base = dark base shadow
const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2); // Dark base space wash
scene.add(ambientLight);
//2) directional light, from the top = bright & sharp
const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0); //for reflections
directionalLight.position.set(5, 5, 4);
scene.add(directionalLight);
//3) point light, acts like a glowing star radiating light from a single point
const nebulaLight = new THREE.PointLight(0xec4899, 1.5, 10); // Magenta background accent light
nebulaLight.position.set(-2, -2, -1);
scene.add(nebulaLight);

//now we can add some objects to the scene
renderer.render(scene, camera);

//to animate the scene, we need to create a render loop
function animate(t = 0) {
    requestAnimationFrame(animate);
    
    // Convert milliseconds to smooth tracking seconds
    const time = t / 1000;

    // 1. Central Core complex rotations (From Step 1)
    ballMesh.rotation.x = time * 0.3;
    ballMesh.rotation.y = time * 0.3;
    ballWireframe.rotation.y = -time * 0.15;
    ballWireframe.rotation.x = -time * 0.05;

    // 2. UPGRADE: Floating Background Box Logic
    boxMesh.rotation.x = time * 0.5;
    boxMesh.rotation.y = time * 0.2;
    // Math.sin creates a smooth up-and-down wave pattern 
    boxMesh.position.y = 0 + Math.sin(time * 2) * 0.3; 

    // 3. UPGRADE: Tilting Torus Ring Orbit Logic
    torusMesh.rotation.x = 1.3; // Tilts the ring on its side (like Saturn's rings)
    torusMesh.rotation.y = time * 0.4; // Spins the ring around the center core
    starField.rotation.y = time * 0.02; 
    renderer.render(scene, camera);
}
animate();