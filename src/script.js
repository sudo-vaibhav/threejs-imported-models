import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Scene
let mixer

const excuses = new Audio("/Excuses.mp3")
// function init() {

// Canvas
const canvas = document.querySelector('canvas')
// get a renderer and attach to html dom element
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setClearColor(0x5c5c5c);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// canvas.appendChild(renderer.domElement);

// define the scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x5c5c5c, 60, 200);
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 300);
camera.position.set(0, 30, 30);

var fbxLoader = new FBXLoader();

window.addEventListener("click", () => {
    if (excuses.paused) {
        excuses.play()
    }
})
fbxLoader.load('/h3.fbx', hulk => {

    hulk.scale.set(7, 7, 7);

    console.log(hulk);
    // make it a bit smaller
    hulk.children[2].material.transparent = false;
    hulk.children[2].material.opacity = 1;
    hulk.children[2].castShadow = true;
    hulk.children[4].material.transparent = false;
    hulk.children[4].material.opacity = 1;
    hulk.children[4].castShadow = true;
    hulk.children[5].material.transparent = false;
    hulk.children[5].material.opacity = 1;
    hulk.children[5].castShadow = true;
    hulk.children[7].material.transparent = false;
    hulk.children[7].material.opacity = 1;
    hulk.children[7].castShadow = true;

    // add
    scene.add(hulk);

    // 1, 2, 3, 0

    mixer = new THREE.AnimationMixer(hulk);
    // var animationAction0 = mixer.clipAction(hulk.animations[1]);
    var animationAction1 = mixer.clipAction(hulk.animations[2]);
    var animationAction2 = mixer.clipAction(hulk.animations[3]);
    var animationAction3 = mixer.clipAction(hulk.animations[0]);

    animationAction1.setLoop(THREE.LoopOnce).play();
    mixer.addEventListener('finished', function (e) {
        // if (e.action === animationAction0) {
        // animationAction1.reset().setLoop(THREE.LoopOnce).play();
        // } else
        if (e.action === animationAction1) {
            animationAction2.reset().setLoop(THREE.LoopOnce).play();
        } else if (e.action === animationAction2) {
            animationAction3.reset().setLoop(THREE.LoopOnce).play();
        } else if (e.action === animationAction3) {
            animationAction1.reset().setLoop(THREE.LoopOnce).play();
        }
    });
}, e => console.log(e), f => console.log(f))

// add some lights
var light = new THREE.SpotLight();
light.position.x = -20;
light.position.z = 20;
light.position.y = 30;
light.castShadow = true;
light.shadow.mapSize.width = 1024;  // default
light.shadow.mapSize.height = 1024; // default
light.shadow.camera.near = 0.5;       // default
light.shadow.camera.far = 80      // default
scene.add(light);

scene.add(new THREE.AmbientLight(0x888888));

// floor
var floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshPhongMaterial(0xffffff))
floor.rotateX(-0.5 * Math.PI);
floor.receiveShadow = true;
scene.add(floor);
// scene.add(new THREE.AmbientLight(0x5c5c5c))

// kick off rendering
renderer.setAnimationLoop(render)
var clock = new THREE.Clock();

function render() {
    renderer.render(scene, camera);
    var delta = clock.getDelta()
    if (mixer) mixer.update(delta);
    // console.log("hi")
    orbitControls.update(delta);
}

var orbitControls = new OrbitControls(camera, renderer.domElement)
var clock = new THREE.Clock();

// }
// init()
// gltfLoader.load("/models/Fox/glTF/Fox.gltf",
//     (gltf) => {
//         mixer = new THREE.AnimationMixer(gltf.scene)
//         const action = mixer.clipAction(gltf.animations[2])
//         action.play()
//         gltf.scene.scale.set(0.025, 0.025, 0.025)
//         scene.add(gltf.scene)
//         console.log(gltf)
//     })
// /**
//  * Floor
//  */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Lights
//  */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

// /**
//  * Sizes
//  */


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(2, 2, 2)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.target.set(0, 0.75, 0)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     mixer?.update(deltaTime)

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()