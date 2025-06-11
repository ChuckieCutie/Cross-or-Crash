import * as THREE from "three";
import { tileSize } from "../constants";

export function Chicken(initialTileIndex, direction, color) {
  const chicken = new THREE.Group();
  chicken.position.x = initialTileIndex * tileSize;
  if (!direction) chicken.rotation.z = Math.PI;

  const chickenColors = [0xF9E076, 0xFFA500, 0xFFFFFF];
  const selectedColor = chickenColors[Math.floor(Math.random() * chickenColors.length)];
  
  const randomScale = 0.8 + Math.random() * 0.4;

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

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(15, 32, 32),
    new THREE.MeshLambertMaterial({ 
      color: selectedColor,
      flatShading: true 
    })
  );
  head.position.set(25, 0, 35);
  chicken.add(head);

  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(5, 10, 32),
    new THREE.MeshLambertMaterial({ 
      color: 0xFF8C00,
      flatShading: true 
    })
  );
  // SỬA LẠI: Di chuyển mỏ lại gần đầu hơn để không có khoảng trống
  beak.position.set(42, 0, 35);
  beak.rotation.z = -Math.PI / 2;
  chicken.add(beak);

  const comb = new THREE.Mesh(
    new THREE.BoxGeometry(5, 10, 3),
    new THREE.MeshLambertMaterial({ 
      color: 0xFF0000,
      flatShading: true 
    })
  );
  comb.position.set(25, 0, 50);
  chicken.add(comb);

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

  const eyeGeometry = new THREE.SphereGeometry(2, 16, 16);
  const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
  
  // SỬA LẠI: Thay đổi vị trí của mắt để chúng nằm trên bề mặt của đầu
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(38, -6, 38);
  chicken.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(38, 6, 38);
  chicken.add(rightEye);

  const legMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xFFA500,
    flatShading: true 
  });

  const frontLeftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  frontLeftLeg.position.set(15, -12, 0);
  frontLeftLeg.rotation.x = Math.PI/2;
  chicken.add(frontLeftLeg);

  const frontRightLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  frontRightLeg.position.set(15, 12, 0);
  frontRightLeg.rotation.x = Math.PI/2;
  chicken.add(frontRightLeg);

  const backLeftLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  backLeftLeg.position.set(-15, -12, 0);
  backLeftLeg.rotation.x = Math.PI/2;
  chicken.add(backLeftLeg);

  const backRightLeg = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 15, 16),
    legMaterial
  );
  backRightLeg.position.set(-15, 12, 0);
  backRightLeg.rotation.x = Math.PI/2;
  chicken.add(backRightLeg);

  const footMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xFF8C00,
    flatShading: true 
  });

  const frontLeftFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  frontLeftFoot.position.set(15, -12, 7.5);
  chicken.add(frontLeftFoot);

  const frontRightFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  frontRightFoot.position.set(15, 12, 7.5);
  chicken.add(frontRightFoot);

  const backLeftFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  backLeftFoot.position.set(-15, -12, 7.5);
  chicken.add(backLeftFoot);

  const backRightFoot = new THREE.Mesh(
    new THREE.BoxGeometry(8, 3, 5),
    footMaterial
  );
  backRightFoot.position.set(-15, 12, 7.5);
  chicken.add(backRightFoot);

  chicken.scale.set(randomScale, randomScale, randomScale);

  return chicken;
}