import './style.css';
// import * as THREE from '../node_modules/three';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { contain } from 'three/src/extras/TextureUtils.js';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add (axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);

// 控制器添加,然后再animate函数中追加update
const controls = new OrbitControls( camera, renderer.domElement );
// const controls = new OrbitControls( camera, document.body );  // 从canvas换成监听body tag
// 设置带阻尼(滑动惯性)
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.1;
// 设置旋转速度(自动旋转)
controls.autoRotate = true;

// create geometry, use meta obj(BufferGeometry)
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0,
]);

// create verties attribution
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// add indices
const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

// set 2 verties group, create 2 metrial
geometry.addGroup(0,3,0);
geometry.addGroup(3,3,1);

// create material
const material = new THREE.MeshBasicMaterial({
    color: 0x662eff,
    side: THREE.DoubleSide,
    wireframe: true
});

const material1 = new THREE.MeshBasicMaterial({
    color: 0xff0000
});

// create a cube and give every plane different colors
const cubeGeometry = new THREE.BoxGeometry(1,1,1);

const cubeMaterial0 = new THREE.MeshBasicMaterial({
    color: 0x662eff
});
const cubeMaterial1 = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cubeMaterial2 = new THREE.MeshBasicMaterial({
    color: 0x0000ff
});
const cubeMaterial3 = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
const cubeMaterial4 = new THREE.MeshBasicMaterial({
    color: 0x00ffff
});
const cubeMaterial5 = new THREE.MeshBasicMaterial({
    color: 0xff00ff
});

const cube = new THREE.Mesh(cubeGeometry, [
    cubeMaterial0,
    cubeMaterial1,
    cubeMaterial2,
    cubeMaterial3,
    cubeMaterial4,
    cubeMaterial5,
]);
cube.position.x = 2;
scene.add(cube);

// set everything into Mesh
const plane = new THREE.Mesh(geometry,[material, material1]);
scene.add(plane);
console.log(geometry);

camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    // 方块旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();

// 监听窗口变化
window.addEventListener('resize', ()=>{
    // reset渲染器的宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // reset相机的宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
});


let eventObj = {
    fullScreen: function() {
        document.body.requestFullscreen();  // 整个屏幕的追加事件
        // renderer.domElement.requestFullscreen();  // 画布追加事件
        console.log('full screen clicked');
    },
    exitFullScreen: function() {
        document.exitFullscreen();  // body追加事件
        // renderer.domElement.exitFullscreen();  // 画布追加事件
        console.log('exit full screen');
    }
};

// 创建一个GUI
const gui = new GUI();
// 添加按钮
gui.add(eventObj, 'fullScreen').name('全屏');
gui.add(eventObj, 'exitFullScreen').name('退出全屏');
