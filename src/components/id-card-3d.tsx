
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

        // Card background
        context.fillStyle = '#333333';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Logo
        context.fillStyle = '#999999';
        context.font = 'bold 40px "Source Code Pro"';
        context.fillText('G', 30, 70);

        // GatereMark text
        context.fillStyle = '#999999';
        context.font = '20px "Source Code Pro"';
        context.fillText('gateremark', 250, 70);
        
        // Profile picture
        const img = new Image();
        img.src = 'https://picsum.photos/seed/mark/400/400';
        img.onload = () => {
            context.drawImage(img, 0, 120, 400, 400);
            texture.needsUpdate = true;
        }

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
      };

      // Card Group setup for hanging effect
      const cardWidth = 2.5;
      const cardHeight = 4;
      const cardDepth = 0.05;

      pivot = new THREE.Object3D();
      pivot.position.set(0, 2.5, 0); // Pivot point from which the card hangs
      scene.add(pivot);

      const geometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
      const material = new THREE.MeshStandardMaterial({
        map: createCardTexture(),
        roughness: 0.4,
        metalness: 0.2,
      });
      const cardMesh = new THREE.Mesh(geometry, material);
      cardMesh.position.set(0, -cardHeight / 2 - 0.2, 0); // Position card below the pivot

      // Add a string
      const stringMaterial = new THREE.LineBasicMaterial({ color: 0x999999, linewidth: 2 });
      const stringPoints = [];
      stringPoints.push(new THREE.Vector3(0, cardHeight / 2 + 0.2, 0));
      stringPoints.push(new THREE.Vector3(0, 2.5, 0));
      const stringGeometry = new THREE.BufferGeometry().setFromPoints(stringPoints);

      const cardString = new THREE.Line(stringGeometry, stringMaterial);
      cardMesh.add(cardString);
      
      card = new THREE.Group();
      card.add(cardMesh);
      pivot.add(card);

      // Event Listeners
      currentMount.addEventListener('mousemove', handleMouseMove);
      currentMount.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('resize', handleResize);
    };

    const handleMouseMove = (event: MouseEvent) => {
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
      if (!renderer || !camera) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const animate = () => {
      if (!renderer) return;
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
