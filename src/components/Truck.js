import * as THREE from "three";
import { tileSize } from "../constants";

export function Truck(initialTileIndex, direction, color) {
  const chicken = new THREE.Group();
  chicken.position.x = initialTileIndex * tileSize;
  if (!direction) chicken.rotation.z = Math.PI;

  // Random màu sắc (vàng, cam, trắng)
  const chickenColors = [0xF9E076, 0xFFA500, 0xFFFFFF];
  const selectedColor = chickenColors[Math.floor(Math.random() * chickenColors.length)];
  
  // Random kích cỡ (0.8 - 1.2)
  const randomScale = 0.8 + Math.random() * 0.4;

  // --- THÂN GÀ ---
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(25, 32, 32),
    new THREE.MeshLambertMaterial({
      color: selectedColor,
      flatShading: true,
    })
  );
  body.position.set(0, 0, 20);
  body.scale.set(1.5, 1, 1);
  body.castShadow = true;
  chicken.add(body);

  // --- ĐẦU GÀ ---
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(15, 32, 32),
    new THREE.MeshLambertMaterial({ 
      color: selectedColor,
      flatShading: true 
    })
  );
  head.position.set(25, 0, 35);
  chicken.add(head);

  // --- MỎ GÀ ---
  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(5, 10, 32),
    new THREE.MeshLambertMaterial({ 
      color: 0xFF8C00,
      flatShading: true 
    })
  );
  beak.position.set(35, 0, 35);
  beak.rotation.z = Math.PI/2;
  chicken.add(beak);

  // --- MÀO GÀ ---
  const comb = new THREE.Mesh(
    new THREE.BoxGeometry(5, 10, 3),
    new THREE.MeshLambertMaterial({ 
      color: 0xFF0000,
      flatShading: true 
    })
  );
  comb.position.set(25, 0, 50);
  chicken.add(comb);

  // --- ĐUÔI GÀ ---
  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(10, 20, 32),
    new THREE.MeshLambertMaterial({ 
      color: selectedColor,
      flatShading: true 
    })
  );
  tail.position.set(-30, 0, 25);
  tail.rotation.x = Math.PI/2;
  chicken.add(tail);

  // --- MẮT GÀ ---
  const eyeGeometry = new THREE.SphereGeometry(2, 16, 16);
  const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(30, -8, 40);
  chicken.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(30, 8, 40);
  chicken.add(rightEye);

  // --- CHÂN GÀ (thay thế bánh xe) ---
  const legMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xFFA500,
    flatShading: true 
  });

  // Chân trước trái
  const frontLeftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  frontLeftLeg.position.set(15, -12, 0);
  frontLeftLeg.rotation.x = Math.PI/2;
  chicken.add(frontLeftLeg);

  // Chân trước phải
  const frontRightLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  frontRightLeg.position.set(15, 12, 0);
  frontRightLeg.rotation.x = Math.PI/2;
  chicken.add(frontRightLeg);

  // Chân sau trái
  const backLeftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  backLeftLeg.position.set(-15, -12, 0);
  backLeftLeg.rotation.x = Math.PI/2;
  chicken.add(backLeftLeg);

  // Chân sau phải
  const backRightLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  backRightLeg.position.set(-15, 12, 0);
  backRightLeg.rotation.x = Math.PI/2;
  chicken.add(backRightLeg);

  // --- BÀN CHÂN ---
  const footMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xFF8C00,
    flatShading: true 
  });

  // Bàn chân trước trái
  const frontLeftFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  frontLeftFoot.position.set(15, -18, 0);
  chicken.add(frontLeftFoot);

  // Bàn chân trước phải
  const frontRightFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  frontRightFoot.position.set(15, 18, 0);
  chicken.add(frontRightFoot);

  // Bàn chân sau trái
  const backLeftFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  backLeftFoot.position.set(-15, -18, 0);
  chicken.add(backLeftFoot);

  // Bàn chân sau phải
  const backRightFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  backRightFoot.position.set(-15, 18, 0);
  chicken.add(backRightFoot);

  // Áp dụng random kích cỡ
  chicken.scale.set(randomScale, randomScale, randomScale);

  return chicken;
}