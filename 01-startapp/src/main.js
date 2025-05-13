import './style.css';
// import * as THREE from '../node_modules/three';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { contain } from 'three/src/extras/TextureUtils.js';

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

// document.body.appendChild(renderer.domElement);
// 显式的去添加canvas到canvas-container中,而不是直接添加在body最后
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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 创建一个父元素的cube(层级测试)
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xa0522d });
let parentCube = new THREE.Mesh(geometry, parentMaterial);
// 根据前面设置的几何体和材质创建Mesh
const cube = new THREE.Mesh(geometry, material);

// 设置Mesh的放大, 同样的父元素的属性改变会传递给子元素
cube.scale.set(2, 2, 2);
// parentCube.scale.set(3,2,7);

parentCube.add(cube);
parentCube.position.set(-3, 0, 0)
// 绕x轴旋转45度
parentCube.rotation.x = Math.PI / 4;

// 设置位移
// cube.position.x = 2;
// 或者使用position的set, 由于父元素传递了位置,因此子元素cube的位置是父元素的相对位置, 也就是父元素的平移三格
cube.position.set(3, 0, 0);
// 叠加父元素的45度
cube.rotation.x = Math.PI/4;

scene.add(parentCube);
// scene.add(cube);  // 如果添加了父对象,就不需要再次添加子对象作为scene的子对象

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

// 监听按钮
let btn = document.createElement('button');
btn.innerHTML = 'click to full screen';
btn.style.position = 'absolute';
btn.style.top = '10px';
btn.style.left = '10px';
btn.style.zIndex = '999';
btn.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡给 OrbitControls
    e.preventDefault();
    document.body.requestFullscreen();  // 整个屏幕的追加事件
    // renderer.domElement.requestFullscreen();  // 画布追加事件
    console.log('full screen clicked');
});
document.body.appendChild(btn);


let exitBtn = document.createElement('button');
exitBtn.innerHTML = 'click to exit full screen';
exitBtn.style.position = 'absolute';
exitBtn.style.top = '10px';
exitBtn.style.left = '300px';
exitBtn.style.zIndex = '999';
exitBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡给 OrbitControls
    e.preventDefault();
    document.exitFullscreen();  // body追加事件
    // renderer.domElement.exitFullscreen();  // 画布追加事件
    console.log('exit full screen');
});
document.body.appendChild(exitBtn);