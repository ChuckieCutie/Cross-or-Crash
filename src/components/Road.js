import * as THREE from "three";
import { tilesPerRow, tileSize } from "../constants";

export function Road(rowIndex) {
  const road = new THREE.Group();
  road.position.y = rowIndex * tileSize;

  // Foundation (nền đường màu xanh nhạt)
  const foundation = new THREE.Mesh(
    new THREE.PlaneGeometry(tilesPerRow * tileSize, tileSize),
    new THREE.MeshLambertMaterial({ color: "#9dc3db" })
  );
  foundation.receiveShadow = true;
  foundation.position.z = 0;
  road.add(foundation);

  // Kích thước đường và vạch kẻ
  const roadWidth = tilesPerRow * tileSize;
  const lineWidth = 0.15; // Độ rộng vạch kẻ
  const dashLength = 2; // Độ dài mỗi đoạn vạch đứt
  const dashGap = 1; // Khoảng cách giữa các đoạn vạch đứt
  
  // Vạch kẻ giữa đường (center line) - vạch đứt màu trắng
  const numDashes = Math.floor(roadWidth / (dashLength + dashGap));
  
  for (let i = 0; i < numDashes; i++) {
    const centerDash = new THREE.Mesh(
      new THREE.PlaneGeometry(dashLength, lineWidth),
      new THREE.MeshLambertMaterial({ color: "#ffffff" })
    );
    
    // Vị trí của từng đoạn vạch (chạy dọc theo chiều rộng đường)
    const dashPosition = -roadWidth/2 + dashLength/2 + i * (dashLength + dashGap);
    centerDash.position.set(dashPosition, 0, 0.01);
    
    road.add(centerDash);
  }

  // Vạch viền đường (road edges) - vạch liền màu trắng
  const edgeLineWidth = 0.2;
  
  // Viền trái
  const leftEdge = new THREE.Mesh(
    new THREE.PlaneGeometry(roadWidth, edgeLineWidth),
    new THREE.MeshLambertMaterial({ color: "#ffffff" })
  );
  leftEdge.position.set(0, -tileSize/2 + edgeLineWidth/2, 0.01);
  road.add(leftEdge);
  
  // Viền phải  
  const rightEdge = new THREE.Mesh(
    new THREE.PlaneGeometry(roadWidth, edgeLineWidth),
    new THREE.MeshLambertMaterial({ color: "#ffffff" })
  );
  rightEdge.position.set(0, tileSize/2 - edgeLineWidth/2, 0.01);
  road.add(rightEdge);

  // Tùy chọn: Thêm vạch phân làn (nếu đường rộng)
  if (tileSize > 4) { // Chỉ thêm khi đường đủ rộng
    // Vạch phân làn bên trái
    for (let i = 0; i < numDashes; i++) {
      const leftLaneDash = new THREE.Mesh(
        new THREE.PlaneGeometry(dashLength * 0.7, lineWidth * 0.8),
        new THREE.MeshLambertMaterial({ color: "#ffffff" })
      );
      
      const dashPosition = -roadWidth/2 + dashLength/2 + i * (dashLength + dashGap);
      leftLaneDash.position.set(dashPosition, -tileSize/4, 0.01);
      
      road.add(leftLaneDash);
    }
    
    // Vạch phân làn bên phải
    for (let i = 0; i < numDashes; i++) {
      const rightLaneDash = new THREE.Mesh(
        new THREE.PlaneGeometry(dashLength * 0.7, lineWidth * 0.8),
        new THREE.MeshLambertMaterial({ color: "#ffffff" })
      );
      
      const dashPosition = -roadWidth/2 + dashLength/2 + i * (dashLength + dashGap);
      rightLaneDash.position.set(dashPosition, tileSize/4, 0.01);
      
      road.add(rightLaneDash);
    }
  }

  return road;
}