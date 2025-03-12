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
    let vertices = []
    let bufferGeometry
    let PointsMaterial
    let points
    const myObject = {
        count: 1000
    }

    gui.add(myObject,'count')
    .min(10)
    .max(10000)
    .step(1)
    .name('StarDust')
    .onChange(value =>{
        particlesDebug(value)
    })
    
    
    function particlesDebug(value) {
        // Avoids memory leaks/Stacking 
        bufferGeometry.dispose()
        PointsMaterial.dispose()
        scene.remove(points)
        vertices = []
    
    
        // Reassigning new values 
        for (let index = 0; index < value ; index++) {
            const x = THREE.MathUtils.randFloatSpread( 50 );
            const y = THREE.MathUtils.randFloatSpread( 50 );
            const z = THREE.MathUtils.randFloatSpread( 50 );
            // console.log(THREE.MathUtils.randFloatSpread.toString());
            vertices.push(x,y,z)
        }    
    
        bufferGeometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(vertices,3))
        PointsMaterial = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true
        })
    
        points = new THREE.Points(bufferGeometry,PointsMaterial)
        scene.add(points)
    }

    for (let index = 0; index < myObject.count ; index++) {
        const x = THREE.MathUtils.randFloatSpread( 50 );
        const y = THREE.MathUtils.randFloatSpread( 50 );
        const z = THREE.MathUtils.randFloatSpread( 50 );
        // console.log(THREE.MathUtils.randFloatSpread.toString());
        vertices.push(x,y,z)
    }    
        
    bufferGeometry = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(vertices,3))
    PointsMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 'red',
        sizeAttenuation: true
    });
    
    points = new THREE.Points(bufferGeometry,PointsMaterial)
    scene.add(points)
    
    



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