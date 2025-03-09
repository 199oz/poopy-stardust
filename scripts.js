import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // tell the camera where to look
    camera.position.set(0, 0, 15);
    // create a render and set the size
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }


const particleGeometry = new THREE.SphereGeometry(1,32,32)
const particleMaterial = new THREE.PointsMaterial()
particleMaterial.size = 0.1
particleMaterial.sizeAttenuation = true
particleMaterial.vertexColors = false
const count = 1000
const vertices = []

for (let index = 0; index < count; index++) {

    const x = THREE.MathUtils.randFloatSpread(20) * 10
    const y = THREE.MathUtils.randFloatSpread(20) * 10
    const z = THREE.MathUtils.randFloatSpread(20) * 10
    vertices.push(x,y,z)
}

particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3))
const particleMesh = new THREE.Points(particleGeometry,particleMaterial)
scene.add(particleMesh)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    // add the output of the render function to the HTML
    document.body.appendChild(renderer.domElement);
    // function for re-rendering/animating the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping=true
    controls.dampingFactor=0.02
    function tick() {
        requestAnimationFrame(tick);
        controls.update()
        renderer.render(scene, camera);
    }
    tick();

    window.addEventListener('resize', onResize, false);
    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
init();