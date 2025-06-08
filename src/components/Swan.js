import * as THREE from "three";
import { tileSize } from "../constants";

export function Swan(initialTileIndex, direction, color) {
  const swan = new THREE.Group();
  swan.position.x = initialTileIndex * tileSize;
  if (!direction) swan.rotation.z = Math.PI;

  const swanColors = [0xffffff, 0x222222]; 
  const selectedColor = swanColors[Math.floor(Math.random() * swanColors.length)];

  const bodyMaterial = new THREE.MeshLambertMaterial({ color: selectedColor, flatShading: true });
  const beakMaterial = new THREE.MeshLambertMaterial({ color: 0xffa500, flatShading: true });
  const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000, flatShading: true });

  const bodyGeometry = new THREE.SphereGeometry(18, 32, 16);
  const body = new THREE.Mesh(
    bodyGeometry,
    bodyMaterial
  );
  body.scale.set(1.1, 1, 0.8);
  body.position.z = 10;
  body.castShadow = true;
  body.receiveShadow = true;
  swan.add(body);

  const neckCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(15, 0, 15),
    new THREE.Vector3(25, 0, 30),
    new THREE.Vector3(15, 0, 45),
    new THREE.Vector3(5, 0, 50)
  ]);

  const neckGeometry = new THREE.TubeGeometry(neckCurve, 20, 4, 8, false);
  const neck = new THREE.Mesh(neckGeometry, bodyMaterial);
  neck.castShadow = true;
  neck.receiveShadow = true;
  swan.add(neck);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    bodyMaterial
  );
  head.position.set(5, 0, 50);
  head.castShadow = true;
  head.receiveShadow = true;
  swan.add(head);

  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(4, 12, 32),
    beakMaterial
  );
  beak.position.set(15, 0, 50);
  beak.rotation.z = Math.PI / 2;
  swan.add(beak);
  
  const leftEye = new THREE.Mesh(
    new THREE.SphereGeometry(1.5),
    eyeMaterial
  );
  leftEye.position.set(8, 5, 52);
  swan.add(leftEye);

  const rightEye = leftEye.clone();
  rightEye.position.y = -leftEye.position.y;
  swan.add(rightEye);
  
  const randomScale = 0.8 + Math.random() * 0.4;
  swan.scale.set(randomScale, randomScale, randomScale);

  return swan;
}