/**
 * Author: @Narigane3
 * Date: 2023/10/08
 * Description: Script for 3D assets (3D models, textures, etc.) display and manipulation
 */

/***********************************
 * Import modules
 **********************************/
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';

/***********************************
 * Constants
 **********************************/
const container = document.getElementById('modele3D');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Couleur et intensité
const envLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1); // Couleur du ciel, couleur du sol, intensité

/****************************************
 *  Variables
 ***************************************/
// instance of 3D model
let model3D = null;
// mouse move up or down (for rotate model)
let mouseMoveUp = true;

/****************************************
 *  Expose var for debug in console
 ***************************************/

window.THREE = THREE;
window.container = container;
window.scene = scene;
window.camera = camera;
window.renderer = renderer;
window.loader = loader;
window.dracoLoader = dracoLoader;

/****************************************
 * App Core
 ***************************************/
// Set renderer size and add it to DOM
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create cube for testing
/*const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube ); // add cube to scene

camera.position.z = 5; // move camera back
/!**
 * Animate cube rotation on each frame render
 *!/
function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
}
// Play animation
animate();*/


// Load 3D model
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

// disable shadows on renderer
renderer.shadowMap.enabled = false;

// set background color to neutral grey
renderer.setClearColor(0x333333);

// /!\ set pixel ratio for good quality of render
renderer.setPixelRatio(window.devicePixelRatio);

// add light to scene
scene.add(ambientLight);
scene.add(envLight);

// Charge un modèle GLTF
loader.load('assets/model3d/spartan.glb', function (gltf) {
    model3D = gltf; // set model3D var
    scene.add(gltf.scene);
    // Set pos and scale
    gltf.scene.position.set(0, -0.6, 0);
    gltf.scene.scale.set(0.5, 0.5, 0.5);

    animate(); // display scene and play animation


}, (xhr) => {
    // console.info((xhr.loaded / xhr.total * 100) + '% loaded');
}, (error) => {
    console.error("Error Load Model 3D: ", error);
});

// Set camera position
camera.position.set(0, .1, 1.4);
// camera.position.set(0,0.8,0.4);

/***********************************
 *  Functions
 **********************************/
/**
 * Animate scene on each frame render
 */
const animate = () => {

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // play modal animation
    if (model3D) {
        if (mouseMoveUp) {
            model3D.scene.rotation.y += 0.002;
        }

        let mixer = new THREE.AnimationMixer(model3D.scene);
        mixer.clipAction(model3D.animations[0]).play();

    }

};


/***********************************
 * Listeners
 **********************************/

// Resize renderer on window resize
window.addEventListener('resize', () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
});
