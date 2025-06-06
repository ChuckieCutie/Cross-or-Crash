import * as THREE from "three";
import { tileSize } from "../constants";

export function Tree(tileIndex, height) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  const trunkHeight = 25;
  const trunkRadius = 7;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(trunkRadius * 0.8, trunkRadius, trunkHeight, 8),
    new THREE.MeshLambertMaterial({
      color: "#8B4513",
      flatShading: true,
    })
  );
  trunk.rotation.x = Math.PI / 2;
  trunk.position.z = trunkHeight / 2;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  tree.add(trunk);

  const foliage = new THREE.Group();
  foliage.position.z = trunkHeight;

  const foliageColor = "#2E8B57";

  const mainFoliage = new THREE.Mesh(
    new THREE.SphereGeometry(22, 5, 5),
    new THREE.MeshLambertMaterial({
      color: foliageColor,
      flatShading: true,
    })
  );
  mainFoliage.castShadow = true;
  mainFoliage.receiveShadow = true;
  foliage.add(mainFoliage);

  const puff1 = mainFoliage.clone();
  puff1.scale.set(0.7, 0.7, 0.7);
  puff1.position.set(12, 12, 0);
  foliage.add(puff1);

  const puff2 = mainFoliage.clone();
  puff2.scale.set(0.8, 0.8, 0.8);
  puff2.position.set(-15, 10, 5);
  foliage.add(puff2);

  const puff3 = mainFoliage.clone();
  puff3.scale.set(0.6, 0.6, 0.6);
  puff3.position.set(10, -12, 3);
  foliage.add(puff3);

  foliage.rotation.z = Math.random() * Math.PI * 2;
  foliage.rotation.y = Math.random() * Math.PI * 2;

  tree.add(foliage);

  return tree;
}