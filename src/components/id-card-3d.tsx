
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function IdCard3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, card: THREE.Group, pivot: THREE.Object3D;
    
    // Physics variables
    const velocity = new THREE.Vector2();
    const targetPosition = new THREE.Vector2();
    const stiffness = 0.05;
    const damping = 0.85;

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
        canvas.width = 400;
        canvas.height = 640;
        const context = canvas.getContext('2d');
        if (!context) return new THREE.CanvasTexture(canvas);

        // Clear background for transparency
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Logo (Stylized 'M')
        context.fillStyle = '#bbbbbb';
        context.font = 'bold 40px "Source Code Pro"';
        context.beginPath();
        context.moveTo(30, 70);
        context.lineTo(50, 30);
        context.lineTo(70, 70);
        context.lineTo(90, 30);
        context.lineTo(110, 70);
        context.lineTo(95, 70);
        context.lineTo(80, 45);
        context.lineTo(65, 70);
        context.closePath();
        context.fill();


        // gateremark text
        context.fillStyle = '#bbbbbb';
        context.font = '20px "Source Code Pro"';
        context.textAlign = 'right';
        context.fillText('gateremark', 370, 70);
        
        // Profile picture
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = 'https://picsum.photos/seed/mark/400/400?grayscale';
        img.onload = () => {
            context.drawImage(img, 50, 150, 300, 300);
            texture.needsUpdate = true;
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
      
      const createStripeTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        if (!context) return null;
        context.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < canvas.width; i += 4) {
          context.fillRect(i, 0, 2, canvas.height);
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        return texture;
      }

      // Card Group setup for hanging effect
      const cardWidth = 2.5;
      const cardHeight = 4;
      const cardDepth = 0.05;

      pivot = new THREE.Object3D();
      pivot.position.set(0, 2.5, 0); // Pivot point from which the card hangs
      scene.add(pivot);

      const cardGeometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
      const cardMaterials = [
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.8, bumpMap: createStripeTexture(), bumpScale: 0.01 }), // right
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.8, bumpMap: createStripeTexture(), bumpScale: 0.01 }), // left
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.8 }), // top
        new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.8 }), // bottom
        new THREE.MeshStandardMaterial({
            map: createCardTexture(),
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
            opacity: 0.9,
            bumpMap: createStripeTexture(),
            bumpScale: 0.01,
          }), // front
        new THREE.MeshStandardMaterial({
            map: createCardTexture(),
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
            opacity: 0.9,
            bumpMap: createStripeTexture(),
            bumpScale: 0.01,
          }) // back
      ];


      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterials);
      cardMesh.position.set(0, -cardHeight / 2 - 0.2, 0); // Position card below the pivot

      // Lanyard texture
      const createLanyardTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, 128, 128);
        ctx.fillStyle = '#aaaaaa';
        ctx.font = 'bold 16px "Source Code Pro"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.translate(64, 64);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('gateremark', 0, 0);
        ctx.restore();
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 10);
        return texture;
      };

      // Add a lanyard strap
      const strapGeometry = new THREE.PlaneGeometry(0.2, 5);
      const strapMaterial = new THREE.MeshStandardMaterial({
        map: createLanyardTexture(),
        side: THREE.DoubleSide
      });
      const strapMesh = new THREE.Mesh(strapGeometry, strapMaterial);
      strapMesh.position.set(0, 2.5, -0.05); // Position it behind the pivot
      
      const clipGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 16);
      const clipMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.2 });
      const clipMesh = new THREE.Mesh(clipGeometry, clipMaterial);
      clipMesh.position.set(0, cardHeight / 2 + 0.15, 0);
      clipMesh.rotation.x = Math.PI / 2;
      
      cardMesh.add(clipMesh);
      pivot.add(strapMesh);
      
      card = new THREE.Group();
      card.add(cardMesh);
      pivot.add(card);

      // Event Listeners
      currentMount.addEventListener('mousemove', handleMouseMove);
      currentMount.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('resize', handleResize);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if(!currentMount) return;
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetPosition.x = x * 0.5; // Scale down the mouse effect
      targetPosition.y = y * 0.5;
    };

    const handleMouseLeave = () => {
      targetPosition.x = 0;
      targetPosition.y = 0;
    };

    const handleResize = () => {
      if (!renderer || !camera || !currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const animate = () => {
      if (!renderer || !scene || !camera) return;
      requestAnimationFrame(animate);
      
      if (pivot) {
        // Calculate the force to apply
        const forceX = (targetPosition.x - pivot.rotation.y) * stiffness;
        const forceY = (targetPosition.y - pivot.rotation.x) * stiffness;

        // Update velocity
        velocity.x += forceX;
        velocity.y += forceY;

        // Apply damping to slow it down
        velocity.x *= damping;
        velocity.y *= damping;
        
        // Update pivot rotation
        pivot.rotation.y += velocity.x;
        pivot.rotation.x += velocity.y;
      }
      
      renderer.render(scene, camera);
    };

    init();
    animate();

    return () => {
      if (currentMount) {
        currentMount.removeEventListener('mousemove', handleMouseMove);
        currentMount.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
      if (renderer && currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      if (scene) {
        scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else if (object.material) {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
