<script setup>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

const container = ref(null); // 挂载 DOM 的 ref

let effect, renderer, camera, scene, cube, animationId;

function initScene() {
  // 场景
  scene = new THREE.Scene();

  // 相机
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;
  camera.lookAt(0, 0, 0);

  // 渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ASCII 效果器
  effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'black';

  // 附加到容器
  if (container.value) {
    container.value.innerHTML = ''; // 清空旧内容（防止重复挂载）
    container.value.appendChild(effect.domElement);
  }

  // 几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  effect.render(scene, camera);
}

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  effect.setSize(width, height);
}

onMounted(() => {
  initScene();
  animate();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  // 清除动画帧和事件监听
  cancelAnimationFrame(animationId);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="ascii-container" ref="container"></div>
</template>


