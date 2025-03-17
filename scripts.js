import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui'

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
    let gui = new GUI()
    const myObject = {
        count: 1000
    }
    let textureLoader = new THREE.TextureLoader()
    let particleTexture = textureLoader.load('/particles/1.png')


    gui.add(myObject,'count')
    .min(10)
    .max(10000)
    .step(1)
    .name('[particleCounts]')
    .onChange(value =>{
        particlesDebug(value)
    })
    
    function particlesDebug(value) {
        // Avoids memory leaks/Stacking 
        particlesGeometry.dispose()
        particleMaterial.dispose()
        scene.remove(particles)
        positions = new Float32Array(value * 3)
        console.log(positions)
    
        for(let i = 0; i < value * 3; i++) 
            {
                positions[i] = (Math.random() - 0.5) * 15
                colors[i] = Math.random() 
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
            particleMaterial = new THREE.PointsMaterial({
                size: 0.1,
                sizeAttenuation: true,
                // color: 'orange',
                map: particleTexture,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            })
            
            particles = new THREE.Points(particlesGeometry,particleMaterial)
            scene.add(particles)
    }


// Geometry
let particlesGeometry = new THREE.BufferGeometry()
let count = 10000

let positions = new Float32Array(count * 3 )
let colors = new Float32Array(count * 3 )

for(let i = 0; i < count * 3; i++) 
{
    positions[i] = (Math.random() - 0.5) * 15
    colors[i] = Math.random() 
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
let particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    // color: 'orange',
    map: particleTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

let particles = new THREE.Points(particlesGeometry,particleMaterial)
scene.add(particles)







    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    // add the output of the render function to the HTML
    document.body.appendChild(renderer.domElement);
    // function for re-rendering/animating the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping=true
    controls.dampingFactor=0.02
    const clock = new THREE.Clock()

    function tick() {
        requestAnimationFrame(tick);
        const elapsedTime = clock.getElapsedTime()
        // particles.rotation.x = elapsedTime * 0.3
        // particles.rotation.y = -elapsedTime * 0.3
        
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