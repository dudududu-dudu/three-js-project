<script setup>
  import * as THREE from 'three';
  import { onMounted, ref } from 'vue';
  import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';


  const container = ref(null); // 用于挂载 ASCII 效果的 DOM 元素

  onMounted(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert:true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';
    container.value.appendChild(effect.domElement);  // 挂载在页面上

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 5;
    camera.lookAt(0, 0, 0);

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    });


    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        effect.render(scene, camera);
    };

    animate();

  })
</script>

<template>
  <div>
      <!-- 一定要绑定 ref -->
  <div ref="container" class="ascii-container"></div>
  </div>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  canvas{
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .ascii-container pre {
    font-family: monospace;
    font-size: 8px;
    line-height: 1em;
    white-space: pre; /* 保留换行和空格 */
    margin: 0;
    padding: 0;

    /* 限制尺寸 + 居中显示 */
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;

    /* 禁止内容撑开布局 */
    display: block;
    box-sizing: border-box;
  }

  .ascii-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
  }

</style>
