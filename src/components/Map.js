import * as THREE from "three";
import { generateRows } from "../utilities/generateRows";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Swan } from "./Swan";
import { Chicken } from "./Chicken";

// export const metadata = [];

// export const map = new THREE.Group();

// export function initializeMap() {
//   metadata.length = 0;
//   map.remove(...map.children);
//   for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
//     const grass = Grass(rowIndex);
//     map.add(grass);
//   }
//   addRows();
// }

// export function addRows() {
//   const newMetadata = generateRows(20);

//   const startIndex = metadata.length;
//   metadata.push(...newMetadata);

//   newMetadata.forEach((rowData, index) => {
//     const rowIndex = startIndex + index + 1;

//     if (rowData.type === "forest") {
//       const row = Grass(rowIndex);

//       rowData.trees.forEach(({ tileIndex, height }) => {
//         const three = Tree(tileIndex, height);
//         row.add(three);
//       });

//       map.add(row);
//     }

//     if (rowData.type === "swan") {
//       const row = Road(rowIndex);

//       rowData.vehicles.forEach((vehicle) => {
//         const swan = Swan(
//           vehicle.initialTileIndex,
//           rowData.direction,
//           vehicle.color
//         );
//         vehicle.ref = swan;
//         row.add(swan);
//       });

//       map.add(row);
//     }

//     if (rowData.type === "chicken") {
//       const row = Road(rowIndex);

//       rowData.vehicles.forEach((vehicle) => {
//         const chicken = Chicken(
//           vehicle.initialTileIndex,
//           rowData.direction,
//           vehicle.color
//         );
//         vehicle.ref = chicken;
//         row.add(chicken);
//       });

//       map.add(row);
//     }
//   });
// }

export const metadata = [];

export const map = new THREE.Group();

// Danh sách các loại cây có sẵn
const treeTypes = [
  'original', 'realistic', 'spring', 'summer', 'autumn', 'winter',
  'apple', 'orange', 'cherry', 'animated', 'dead'
];

// Biến để theo dõi thời gian cho animation
let animationTime = 0;
const animatedTrees = [];

export function initializeMap() {
  metadata.length = 0;
  map.remove(...map.children);
  animatedTrees.length = 0;
  
  for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
    const grass = Grass(rowIndex);
    map.add(grass);
  }
  addRows();
}

export function addRows() {
  const newMetadata = generateRows(20);

  const startIndex = metadata.length;
  metadata.push(...newMetadata);

  newMetadata.forEach((rowData, index) => {
    const rowIndex = startIndex + index + 1;

    if (rowData.type === "forest") {
      const row = Grass(rowIndex);

      rowData.trees.forEach(({ tileIndex, height }) => {
        // Chọn ngẫu nhiên một loại cây từ danh sách
        const randomTreeType = treeTypes[Math.floor(Math.random() * treeTypes.length)];
        
        // Tạo cây với loại đã chọn
        const tree = Tree(tileIndex, height, randomTreeType);
        
        // Nếu là cây animated, thêm vào danh sách để animate
        if (randomTreeType === 'animated' && tree.animate) {
          animatedTrees.push(tree);
        }
        
        row.add(tree);
      });

      map.add(row);
    }

    if (rowData.type === "swan") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const swan = Swan(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = swan;
        row.add(swan);
      });

      map.add(row);
    }

    if (rowData.type === "chicken") {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicle) => {
        const chicken = Chicken(
          vehicle.initialTileIndex,
          rowData.direction,
          vehicle.color
        );
        vehicle.ref = chicken;
        row.add(chicken);
      });

      map.add(row);
    }
  });
}

// Hàm để tạo một hàng cây với loại cây cụ thể (tùy chọn)
export function addSpecificTreeRow(treeType = 'realistic', rowIndex = -10) {
  const row = Grass(rowIndex);
  
  // Tạo một số cây với loại cụ thể
  const treeCount = 5 + Math.floor(Math.random() * 5);
  for (let i = 0; i < treeCount; i++) {
    const tileIndex = Math.floor(Math.random() * 20) - 10;
    const height = 20 + Math.random() * 15;
    
    const tree = Tree(tileIndex, height, treeType);
    
    if (treeType === 'animated' && tree.animate) {
      animatedTrees.push(tree);
    }
    
    row.add(tree);
  }
  
  map.add(row);
}

// Hàm để tạo một khu vườn trái cây
export function addOrchardSection(startRowIndex = -15) {
  const fruitTypes = ['apple', 'orange', 'cherry'];
  
  fruitTypes.forEach((fruitType, index) => {
    const row = Grass(startRowIndex - index);
    
    // Tạo một hàng cây trái cây
    for (let tileIndex = -8; tileIndex <= 8; tileIndex += 2) {
      const tree = Tree(tileIndex, 25, fruitType);
      row.add(tree);
    }
    
    map.add(row);
  });
}

// Hàm để tạo một khu rừng theo mùa
export function addSeasonalForest(startRowIndex = -20) {
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  
  seasons.forEach((season, index) => {
    const row = Grass(startRowIndex - index);
    
    // Tạo một hàng cây theo mùa
    for (let tileIndex = -6; tileIndex <= 6; tileIndex += 3) {
      const tree = Tree(tileIndex, 25, season);
      row.add(tree);
    }
    
    map.add(row);
  });
}

// Hàm để tạo một khu rừng ma quái
export function addSpookyForest(startRowIndex = -30) {
  const row = Grass(startRowIndex);
  
  // Tạo nhiều cây chết
  for (let i = 0; i < 10; i++) {
    const tileIndex = Math.floor(Math.random() * 16) - 8;
    const height = 15 + Math.random() * 20;
    const tree = Tree(tileIndex, height, 'dead');
    row.add(tree);
  }
  
  map.add(row);
}

// Hàm animate cho các cây có animation
export function animateTrees(deltaTime) {
  animationTime += deltaTime;
  
  animatedTrees.forEach(tree => {
    if (tree.animate) {
      tree.animate(animationTime);
    }
  });
}

// Hàm để tạo demo tất cả các loại cây
export function createTreeShowcase() {
  // Xóa map hiện tại
  initializeMap();
  
  // Tạo từng hàng với mỗi loại cây
  treeTypes.forEach((treeType, index) => {
    const row = Grass(-5 - index);
    
    // Tạo 3-5 cây của mỗi loại
    for (let i = 0; i < 4; i++) {
      const tileIndex = (i - 1.5) * 4; // Giãn cách các cây
      const height = 20 + Math.random() * 10;
      const tree = Tree(tileIndex, height, treeType);
      
      if (treeType === 'animated' && tree.animate) {
        animatedTrees.push(tree);
      }
      
      row.add(tree);
    }
    
    map.add(row);
  });
  
  // Thêm một số hàng đặc biệt
  addOrchardSection(-20);
  addSeasonalForest(-25);
  addSpookyForest(-30);
}