"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function IdCard3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, card: THREE.Mesh;
    const targetRotation = { x: 0, y: 0 };

    const init = () => {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      currentMount.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1.2);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      // Card Texture
      const createCardTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 300;
        const context = canvas.getContext('2d');
        if (!context) return new THREE.CanvasTexture(canvas);

        context.fillStyle = '#1a1a1a';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#98FF98';
        context.lineWidth = 4;
        context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
        
        context.fillStyle = '#98FF98';
        context.font = 'bold 40px "Source Code Pro"';
        context.fillText('THOUSEEF', 30, 70);

        context.fillStyle = '#BBBBBB';
        context.font = '24px "Source Code Pro"';
        context.fillText('Software Engineer', 30, 110);
        
        context.strokeStyle = '#BBBBBB';
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(30, 130);
        context.lineTo(482, 130);
        context.stroke();
        
        context.fillStyle = '#98FF98';
        context.font = 'bold 20px "Source Code Pro"';
        context.fillText('DIGITAL ID', 380, 50);

        context.fillStyle = '#BBBBBB';
        const qrSize = 8;
        const pixelSize = 15;
        const qrX = 350;
        const qrY = 150;
        for (let i = 0; i < qrSize; i++) {
          for (let j = 0; j < qrSize; j++) {
            if (Math.random() > 0.5) {
              context.fillRect(qrX + i * pixelSize, qrY + j * pixelSize, pixelSize, pixelSize);
            }
          }
        }
        return new THREE.CanvasTexture(canvas);
      };

      // Card Geometry
      const geometry = new THREE.BoxGeometry(4, 2.37, 0.05);
      const material = new THREE.MeshStandardMaterial({
        map: createCardTexture(),
        roughness: 0.4,
        metalness: 0.2,
      });
      card = new THREE.Mesh(geometry, material);
      scene.add(card);

      // Event Listeners
      currentMount.addEventListener('mousemove', handleMouseMove);
      currentMount.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('resize', handleResize);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotation.x = y * 0.3;
      targetRotation.y = x * 0.3;
    };

    const handleMouseLeave = () => {
      targetRotation.x = 0;
      targetRotation.y = 0;
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const animate = () => {
      if (!renderer) return;
      requestAnimationFrame(animate);
      if (card) {
        card.rotation.x += (targetRotation.x - card.rotation.x) * 0.05;
        card.rotation.y += (targetRotation.y - card.rotation.y) * 0.05;
      }
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      currentMount.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        currentMount.removeChild(renderer.domElement);
      }
      if (scene) {
        scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
