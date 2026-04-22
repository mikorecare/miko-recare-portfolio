'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function GunTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const gunsList = [
    'M21 EBR.glb',
    'MDR.glb',
    'MK14.glb',
    'Mpa.glb',
    'Mpsd.glb',
    'MPX.glb',
    'P226.glb',
    'P320.glb',
    'Precision Rifle Chassis.glb',
    'Revolver-AnsEmKwuu7.glb',
    'Revolver.glb',
    'RPG Launcher.glb',
    'SR1MP.glb',
    'SRSA1.glb'
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // State variables
    let ammo = 30;
    let reserveAmmo = 90;
    let isReloading = false;
    let currentGunIndexLocal = 0;

    // Audio elements
    const gunshotSound = new Audio('/gunshot.mp3');
    const reloadSound = new Audio('/reload.mp3');
    const diedSound = new Audio('/died.mp3');
    gunshotSound.preload = 'auto';
    reloadSound.preload = 'auto';
    diedSound.preload = 'auto';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 30, 80);
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1.6, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 600);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    scene.add(new THREE.AmbientLight(0x404060, 0.6));
    
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 1.2);
    sunLight.position.set(10, 20, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);
    
    const fillLight = new THREE.PointLight(0x4466ff, 0.4);
    fillLight.position.set(0, 2, 0);
    scene.add(fillLight);
    
    // Simple ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x2d5a2d, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);
    
    const gridHelper = new THREE.GridHelper(50, 20, 0x888888, 0x444444);
    gridHelper.position.y = -0.4;
    scene.add(gridHelper);
    
    // Load PNG texture
    const textureLoader = new THREE.TextureLoader();
    const kulaongTexture = textureLoader.load('/kulaong.png');
    
    // Create floating targets with PNG image
    const targets: THREE.Mesh[] = [];
    const targetPositions = [
      { x: 5, z: -5, y: 1.5 },
      { x: -4, z: -6, y: 1.5 },
      { x: 3, z: -8, y: 1.5 },
      { x: -5, z: -4, y: 1.5 },
      { x: 6, z: -3, y: 1.5 },
      { x: 0, z: -10, y: 1.5 },
      { x: 7, z: -7, y: 1.8 },
      { x: -6, z: -8, y: 1.3 },
      { x: 2, z: -12, y: 1.6 },
    ];
    
    const targetAnimations: { speed: number; offset: number }[] = [];
    
    targetPositions.forEach((pos, i) => {
      const material = new THREE.MeshStandardMaterial({
        map: kulaongTexture,
        transparent: true,
        side: THREE.DoubleSide,
        emissive: 0x442200,
        emissiveIntensity: 0.3
      });
      
      const target = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), material);
      target.position.set(pos.x, pos.y, pos.z);
      target.castShadow = true;
      target.userData = {
        originalY: pos.y,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      };
      scene.add(target);
      targets.push(target);
      targetAnimations.push({ speed: 0.5 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2 });
    });
    
    // Add floating particles around targets
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = Math.random() * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xffaa66, size: 0.05 });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Load gun - gun follows camera view but stays upright
    const gunLoader = new GLTFLoader();
    let currentGunGroup: THREE.Group | null = null;
    let muzzleFlash: THREE.PointLight | null = null;
    
    const loadGun = (gunPath: string) => {
      if (currentGunGroup) {
        scene.remove(currentGunGroup);
      }
      
      gunLoader.load(gunPath,
        (gltf) => {
          currentGunGroup = gltf.scene;
          currentGunGroup.scale.set(2.3, 2.3, 2.3);
          currentGunGroup.rotation.set(0, 0, 0);
          currentGunGroup.castShadow = true;
          scene.add(currentGunGroup);
          
          muzzleFlash = new THREE.PointLight(0xff6600, 0, 5);
          muzzleFlash.position.set(0.3, 0.1, -0.6);
          currentGunGroup.add(muzzleFlash);
          
          updateUI();
        },
        undefined,
        (error) => console.error('Failed to load gun:', error)
      );
    };
    
    loadGun(`/guns/${gunsList[0]}`);
    
    // UI Elements
    const crosshair = document.createElement('div');
    crosshair.style.position = 'absolute';
    crosshair.style.top = '50%';
    crosshair.style.left = '50%';
    crosshair.style.width = '3px';
    crosshair.style.height = '3px';
    crosshair.style.backgroundColor = 'white';
    crosshair.style.borderRadius = '50%';
    crosshair.style.transform = 'translate(-50%, -50%)';
    crosshair.style.pointerEvents = 'none';
    crosshair.style.zIndex = '1000';
    containerRef.current.style.position = 'relative';
    containerRef.current.appendChild(crosshair);
    
    const createLine = (top: string, left: string, width: string, height: string) => {
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.top = top;
      line.style.left = left;
      line.style.width = width;
      line.style.height = height;
      line.style.backgroundColor = 'white';
      line.style.transform = 'translate(-50%, -50%)';
      line.style.pointerEvents = 'none';
      line.style.zIndex = '1000';
      return line;
    };
    
    const topLine = createLine('calc(50% - 10px)', '50%', '2px', '8px');
    const bottomLine = createLine('calc(50% + 10px)', '50%', '2px', '8px');
    const leftLine = createLine('50%', 'calc(50% - 10px)', '8px', '2px');
    const rightLine = createLine('50%', 'calc(50% + 10px)', '8px', '2px');
    
    containerRef.current.appendChild(topLine);
    containerRef.current.appendChild(bottomLine);
    containerRef.current.appendChild(leftLine);
    containerRef.current.appendChild(rightLine);
    
    const ammoUI = document.createElement('div');
    ammoUI.style.position = 'absolute';
    ammoUI.style.bottom = '20px';
    ammoUI.style.right = '20px';
    ammoUI.style.backgroundColor = 'rgba(0,0,0,0.8)';
    ammoUI.style.color = '#ffaa00';
    ammoUI.style.padding = '15px 20px';
    ammoUI.style.fontFamily = 'monospace';
    ammoUI.style.fontSize = '24px';
    ammoUI.style.fontWeight = 'bold';
    ammoUI.style.borderRadius = '5px';
    ammoUI.style.zIndex = '1000';
    ammoUI.style.textAlign = 'center';
    ammoUI.style.border = '1px solid #ffaa00';
    document.body.appendChild(ammoUI);
    
    const scoreUI = document.createElement('div');
    scoreUI.style.position = 'absolute';
    scoreUI.style.top = '20px';
    scoreUI.style.right = '20px';
    scoreUI.style.backgroundColor = 'rgba(0,0,0,0.8)';
    scoreUI.style.color = '#00ff00';
    scoreUI.style.padding = '10px 15px';
    scoreUI.style.fontFamily = 'monospace';
    scoreUI.style.fontSize = '18px';
    scoreUI.style.fontWeight = 'bold';
    scoreUI.style.borderRadius = '5px';
    scoreUI.style.zIndex = '1000';
    scoreUI.style.border = '1px solid #00ff00';
    document.body.appendChild(scoreUI);
    
    const info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.bottom = '20px';
    info.style.left = '20px';
    info.style.backgroundColor = 'rgba(0,0,0,0.8)';
    info.style.color = 'white';
    info.style.padding = '10px';
    info.style.fontFamily = 'monospace';
    info.style.fontSize = '12px';
    info.style.borderRadius = '5px';
    info.style.zIndex = '1000';
    info.style.borderLeft = '3px solid #ffaa00';
    document.body.appendChild(info);
    
    let score = 0;
    
    const updateUI = () => {
      ammoUI.innerHTML = `${ammo}<span style="font-size: 14px;">/${reserveAmmo}</span><br><span style="font-size: 10px; color: #888;">${isReloading ? 'RELOADING...' : gunsList[currentGunIndexLocal].replace('.glb', '')}</span>`;
      scoreUI.innerHTML = `SCORE: ${score}`;
      info.innerHTML = `
        FPS CONTROLS
        ${gunsList[currentGunIndexLocal].replace('.glb', '')}
        
        Click to lock mouse
        WASD to move
        Mouse to aim
        SPACE to SHOOT
        R to RELOAD
        1-9 or N/P to switch weapons
        
        Shoot the Kulaong targets!
        Ammo: ${ammo} | Reserve: ${reserveAmmo}
      `;
    };
    
    // Shooting function with sound
    const shoot = () => {
      if (ammo <= 0 || isReloading) return;
      
      ammo--;
      updateUI();
      
      // Play gunshot sound
      gunshotSound.currentTime = 0;
      gunshotSound.play().catch(e => console.log('Audio play failed:', e));
      
      if (muzzleFlash) {
        muzzleFlash.intensity = 1.5;
        setTimeout(() => { if (muzzleFlash) muzzleFlash.intensity = 0; }, 50);
      }
      
      if (currentGunGroup) {
        const originalX = currentGunGroup.position.x;
        const originalY = currentGunGroup.position.y;
        currentGunGroup.position.x += 0.02;
        currentGunGroup.position.y += 0.015;
        setTimeout(() => {
          if (currentGunGroup) {
            currentGunGroup.position.x = originalX;
            currentGunGroup.position.y = originalY;
          }
        }, 50);
      }
      
      const raycaster = new THREE.Raycaster();
      const direction = new THREE.Vector3(0, 0, -1);
      direction.applyQuaternion(camera.quaternion);
      raycaster.set(camera.position, direction);
      
      const intersects = raycaster.intersectObjects(targets);
      
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const index = targets.indexOf(hit as THREE.Mesh);
        if (index !== -1) {
          scene.remove(hit);
          targets.splice(index, 1);
          score++;
          updateUI();
          
          // Play death sound with 500ms delay
          setTimeout(() => {
            diedSound.currentTime = 0;
            diedSound.play().catch(e => console.log('Audio play failed:', e));
          }, 1000);
          
          const hitFlash = new THREE.PointLight(0xff6600, 2, 5);
          hitFlash.position.copy(hit.position);
          scene.add(hitFlash);
          setTimeout(() => scene.remove(hitFlash), 150);
          
          const particleBurst = new THREE.Points(
            new THREE.BufferGeometry(),
            new THREE.PointsMaterial({ color: 0xffaa66, size: 0.1 })
          );
          const burstCount = 20;
          const burstPositions = new Float32Array(burstCount * 3);
          for (let i = 0; i < burstCount; i++) {
            burstPositions[i * 3] = (Math.random() - 0.5) * 0.5;
            burstPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
            burstPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
          }
          particleBurst.geometry.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
          particleBurst.position.copy(hit.position);
          scene.add(particleBurst);
          setTimeout(() => scene.remove(particleBurst), 300);
          
          setTimeout(() => {
            const material = new THREE.MeshStandardMaterial({
              map: kulaongTexture,
              transparent: true,
              side: THREE.DoubleSide,
              emissive: 0x442200,
              emissiveIntensity: 0.3
            });
            const newTarget = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), material);
            const randomPos = targetPositions[Math.floor(Math.random() * targetPositions.length)];
            newTarget.position.set(randomPos.x, randomPos.y, randomPos.z);
            newTarget.castShadow = true;
            newTarget.userData = {
              originalY: randomPos.y,
              speed: 0.5 + Math.random() * 0.5,
              offset: Math.random() * Math.PI * 2
            };
            scene.add(newTarget);
            targets.push(newTarget);
          }, 1500);
        }
      }
      
      const flash = document.createElement('div');
      flash.style.position = 'absolute';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100%';
      flash.style.height = '100%';
      flash.style.backgroundColor = 'white';
      flash.style.opacity = '0.1';
      flash.style.pointerEvents = 'none';
      flash.style.zIndex = '999';
      document.body.appendChild(flash);
      setTimeout(() => document.body.removeChild(flash), 50);
    };
    
    const reload = () => {
      if (isReloading || ammo === 30 || reserveAmmo === 0) return;
      
      isReloading = true;
      updateUI();
      
      // Play reload sound
      reloadSound.currentTime = 0;
      reloadSound.play().catch(e => console.log('Audio play failed:', e));
      
      setTimeout(() => {
        const needed = 30 - ammo;
        const available = Math.min(needed, reserveAmmo);
        ammo += available;
        reserveAmmo -= available;
        isReloading = false;
        updateUI();
      }, 2000);
    };
    
    // Controls
    const keyState = { w: false, a: false, s: false, d: false };
    const speed = 5;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'KeyW': keyState.w = true; break;
        case 'KeyA': keyState.a = true; break;
        case 'KeyS': keyState.s = true; break;
        case 'KeyD': keyState.d = true; break;
        case 'Space':
          e.preventDefault();
          shoot();
          break;
        case 'KeyR':
          e.preventDefault();
          reload();
          break;
        case 'Digit1': case 'Digit2': case 'Digit3': case 'Digit4': case 'Digit5':
        case 'Digit6': case 'Digit7': case 'Digit8': case 'Digit9':
          const index = parseInt(e.code.replace('Digit', '')) - 1;
          if (index < gunsList.length) {
            currentGunIndexLocal = index;
            loadGun(`/guns/${gunsList[index]}`);
            ammo = 30;
            reserveAmmo = 90;
            updateUI();
          }
          break;
        case 'KeyN':
          currentGunIndexLocal = (currentGunIndexLocal + 1) % gunsList.length;
          loadGun(`/guns/${gunsList[currentGunIndexLocal]}`);
          ammo = 30;
          reserveAmmo = 90;
          updateUI();
          break;
        case 'KeyP':
          currentGunIndexLocal = (currentGunIndexLocal - 1 + gunsList.length) % gunsList.length;
          loadGun(`/guns/${gunsList[currentGunIndexLocal]}`);
          ammo = 30;
          reserveAmmo = 90;
          updateUI();
          break;
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'KeyW': keyState.w = false; break;
        case 'KeyA': keyState.a = false; break;
        case 'KeyS': keyState.s = false; break;
        case 'KeyD': keyState.d = false; break;
      }
    };
    
    let mouseX = 0, mouseY = 0;
    let yaw = -Math.PI / 2;
    let pitch = 0;
    const mouseSpeed = 0.002;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === renderer.domElement) {
        mouseX += e.movementX * mouseSpeed;
        mouseY += e.movementY * mouseSpeed;
        mouseY = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, mouseY));
        yaw = mouseX;
        pitch = mouseY;
        camera.rotation.order = 'YXZ';
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;
      }
    };
    
    const handleClick = () => {
      renderer.domElement.requestPointerLock();
    };
    
    renderer.domElement.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    let lastTime = performance.now();
    let bobTime = 0;
    let floatTime = 0;
    
    function animate() {
      const now = performance.now();
      let delta = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;
      floatTime += delta;
      
      // Animate targets (floating up and down)
      targets.forEach((target, i) => {
        const anim = targetAnimations[i] || { speed: 0.5, offset: 0 };
        const originalY = targetPositions[i]?.y || 1.5;
        target.position.y = originalY + Math.sin(floatTime * anim.speed + anim.offset) * 0.2;
        target.lookAt(camera.position);
      });
      
      particleSystem.rotation.y += 0.005;
      
      const actualSpeed = speed * delta;
      const forward = new THREE.Vector3();
      const right = new THREE.Vector3();
      
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      right.crossVectors(new THREE.Vector3(0, 1, 0), forward);
      right.normalize();
      
      let moveDelta = new THREE.Vector3(0, 0, 0);
      const isMoving = keyState.w || keyState.s || keyState.a || keyState.d;
      if (keyState.w) moveDelta.add(forward);
      if (keyState.s) moveDelta.sub(forward);
      if (keyState.d) moveDelta.add(right);
      if (keyState.a) moveDelta.sub(right);
      moveDelta.multiplyScalar(actualSpeed);
      camera.position.add(moveDelta);
      
      // FIXED: Gun follows camera view but stays upright
      if (currentGunGroup) {
        // Calculate position based on camera position AND rotation
        // This makes the gun follow where you look
        const gunLocalOffset = new THREE.Vector3(0.35, -0.25, -0.55);
        const worldOffset = gunLocalOffset.clone().applyQuaternion(camera.quaternion);
        currentGunGroup.position.copy(camera.position.clone().add(worldOffset));
        
        // Make gun face same direction as camera, but without rolling (keep upright)
        const cameraEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
        currentGunGroup.rotation.set(cameraEuler.x, cameraEuler.y, 0);
        
        if (isMoving && !isReloading) {
          bobTime += delta * 12;
          const bobX = Math.sin(bobTime) * 0.008;
          const bobY = Math.abs(Math.sin(bobTime * 2)) * 0.006;
          currentGunGroup.position.x += bobX;
          currentGunGroup.position.y += bobY;
        } else {
          bobTime = 0;
        }
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    
    animate();
    updateUI();
    
    return () => {
      renderer.domElement.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        containerRef.current.removeChild(crosshair);
        containerRef.current.removeChild(topLine);
        containerRef.current.removeChild(bottomLine);
        containerRef.current.removeChild(leftLine);
        containerRef.current.removeChild(rightLine);
      }
      document.body.removeChild(ammoUI);
      document.body.removeChild(scoreUI);
      document.body.removeChild(info);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div>
        <div ref={containerRef} className="border-2 border-white rounded-lg shadow-2xl" />
        <p className="text-center text-white mt-4 text-sm font-bold">
          FPS SHOOTER | SPACE to shoot | R to reload | Click to start
        </p>
      </div>
    </div>
  );
}