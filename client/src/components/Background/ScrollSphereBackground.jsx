import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Renders a scrolling-reactive sphere behind all content.
const ScrollSphereBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent so page gradient shows through
    mountEl.appendChild(renderer.domElement);

    // Geometry and material: wireframe-ish glow
    const geometry = new THREE.IcosahedronGeometry(3, 2);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f59e0b"), // amber
      emissive: new THREE.Color("#e11d48"), // rose
      emissiveIntensity: 0.3,
      roughness: 0.35,
      metalness: 0.25,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting for depth and glow
    const keyLight = new THREE.PointLight("#f472b6", 1.2, 20);
    keyLight.position.set(5, 5, 5);
    const fillLight = new THREE.PointLight("#38bdf8", 0.8, 20);
    fillLight.position.set(-6, -3, 4);
    scene.add(keyLight, fillLight);

    let frameId;

    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    const animate = () => {
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === mountEl) {
        mountEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-80"
      aria-hidden="true"
    />
  );
};

export default ScrollSphereBackground;
