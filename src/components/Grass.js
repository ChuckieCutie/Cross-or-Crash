import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constants";
import grassTextureUrl from '../textures/grass.jpg'; 

// --- BẮT ĐẦU THAY ĐỔI ---

// 1. Tải texture MỘT LẦN DUY NHẤT ở đây
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load(grassTextureUrl);

// 2. Cấu hình texture lặp lại
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(tilesPerRow, 1);

// --- KẾT THÚC THAY ĐỔI ---


export function Grass(rowIndex) {
  const grass = new THREE.Group();
  grass.position.y = rowIndex * tileSize;

  // Xóa phần tải texture ở đây và chỉ cần sử dụng texture đã được tải sẵn
  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(tilesPerRow * tileSize, tileSize, 3),
    // Sử dụng 'map' với texture đã được tải sẵn
    new THREE.MeshLambertMaterial({ map: grassTexture }) 
  );
  foundation.position.z = 1.5;
  foundation.receiveShadow = true;
  grass.add(foundation);

  return grass;
}