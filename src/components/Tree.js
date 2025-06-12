import * as THREE from "three";
import { tileSize } from "../constants";

// OPTION 1: Realistic Tree with Detailed Branches
export function RealisticTree(tileIndex, height = 25) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  // Main trunk with texture-like appearance
  const trunkHeight = height;
  const trunkRadius = Math.max(4, height * 0.15);

  // Create trunk with segments for more natural look
  const trunkSegments = 6;
  for (let i = 0; i < trunkSegments; i++) {
    const segmentHeight = trunkHeight / trunkSegments;
    const segmentRadius = trunkRadius * (1 - (i * 0.1) / trunkSegments);

    const segment = new THREE.Mesh(
      new THREE.CylinderGeometry(
        segmentRadius * 0.9,
        segmentRadius,
        segmentHeight,
        8
      ),
      new THREE.MeshLambertMaterial({
        color: new THREE.Color().setHSL(0.08, 0.6, 0.2 + Math.random() * 0.1),
        flatShading: true,
      })
    );
    segment.position.z = (i + 0.5) * segmentHeight;
    segment.rotation.y = Math.random() * Math.PI * 2;
    segment.castShadow = true;
    segment.receiveShadow = true;
    tree.add(segment);
  }

  // Branch system
  const branchLevels = 3;
  const branchesPerLevel = [8, 12, 16];

  for (let level = 0; level < branchLevels; level++) {
    const branchHeight = trunkHeight * (0.6 + level * 0.2);
    const branchCount = branchesPerLevel[level];

    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 2 + Math.random() * 0.5;
      const branchLength = 8 - level * 2 + Math.random() * 5;
      const branchRadius = Math.max(0.5, 2 - level * 0.5);

      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(
          branchRadius * 0.3,
          branchRadius,
          branchLength,
          6
        ),
        new THREE.MeshLambertMaterial({
          color: "#654321",
          flatShading: true,
        })
      );

      // Position and orient branch
      const distance = trunkRadius + branchLength / 2;
      branch.position.set(
        Math.cos(angle) * distance * 0.7,
        Math.sin(angle) * distance * 0.7,
        branchHeight + Math.random() * 3
      );

      branch.rotation.z = (-Math.cos(angle) * Math.PI) / 4;
      branch.rotation.x = (-Math.sin(angle) * Math.PI) / 4;
      branch.rotation.y = angle;

      branch.castShadow = true;
      tree.add(branch);

      // Add leaves to branch
      const leafCluster = new THREE.Mesh(
        new THREE.SphereGeometry(branchLength * 0.6, 6, 6),
        new THREE.MeshLambertMaterial({
          color: new THREE.Color().setHSL(0.3, 0.7, 0.3 + Math.random() * 0.2),
          flatShading: true,
        })
      );

      leafCluster.position.copy(branch.position);
      leafCluster.position.x += Math.cos(angle) * branchLength * 0.5;
      leafCluster.position.y += Math.sin(angle) * branchLength * 0.5;
      leafCluster.position.z += branchLength * 0.3;
      leafCluster.castShadow = true;
      tree.add(leafCluster);
    }
  }

  return tree;
}

// OPTION 2: Seasonal Tree (Different Seasons)
export function SeasonalTree(tileIndex, season = "spring", height = 25) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  // Trunk (same for all seasons)
  const trunkHeight = height;
  const trunkRadius = 7;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(trunkRadius * 0.8, trunkRadius, trunkHeight, 8),
    new THREE.MeshLambertMaterial({
      color: "#5D4037",
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

  // Season-specific colors and effects
  const seasonConfig = {
    spring: {
      color: "#90EE90",
      puffCount: 4,
      hasFlowers: true,
      leafDensity: 0.9,
    },
    summer: {
      color: "#228B22",
      puffCount: 5,
      hasFlowers: false,
      leafDensity: 1.0,
    },
    autumn: {
      color: "#DAA520",
      puffCount: 3,
      hasFlowers: false,
      leafDensity: 0.7,
      hasFallingLeaves: true,
    },
    winter: {
      color: "#2F4F2F",
      puffCount: 2,
      hasFlowers: false,
      leafDensity: 0.3,
      hasSnow: true,
    },
  };

  const config = seasonConfig[season] || seasonConfig.spring;

  // Main foliage
  for (let i = 0; i < config.puffCount; i++) {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(15 + Math.random() * 8, 6, 6),
      new THREE.MeshLambertMaterial({
        color: config.color,
        transparent: true,
        opacity: config.leafDensity,
        flatShading: true,
      })
    );

    puff.position.set(
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
      Math.random() * 10 - 5
    );
    puff.castShadow = true;
    foliage.add(puff);
  }

  // Spring flowers
  if (config.hasFlowers) {
    for (let i = 0; i < 15; i++) {
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(1, 6, 6),
        new THREE.MeshLambertMaterial({
          color: ["#FFB6C1", "#FFC0CB", "#FF69B4"][
            Math.floor(Math.random() * 3)
          ],
        })
      );
      flower.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        Math.random() * 15
      );
      foliage.add(flower);
    }
  }

  // Autumn falling leaves
  if (config.hasFallingLeaves) {
    for (let i = 0; i < 20; i++) {
      const leaf = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshLambertMaterial({
          color: ["#FF6347", "#FF4500", "#DAA520"][
            Math.floor(Math.random() * 3)
          ],
          transparent: true,
          opacity: 0.8,
        })
      );
      leaf.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        Math.random() * 20 - 10
      );
      leaf.rotation.z = Math.random() * Math.PI * 2;
      foliage.add(leaf);
    }
  }

  // Winter snow
  if (config.hasSnow) {
    for (let i = 0; i < 25; i++) {
      const snow = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 6, 6),
        new THREE.MeshLambertMaterial({ color: "#FFFFFF" })
      );
      snow.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 35,
        Math.random() * 20
      );
      foliage.add(snow);
    }
  }

  foliage.rotation.z = Math.random() * Math.PI * 2;
  tree.add(foliage);

  return tree;
}

// OPTION 3: Fruit Tree
export function FruitTree(tileIndex, fruitType = "apple", height = 25) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  // Base tree structure
  const trunkHeight = height;
  const trunkRadius = 6;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(trunkRadius * 0.9, trunkRadius, trunkHeight, 8),
    new THREE.MeshLambertMaterial({
      color: "#8B4513",
      flatShading: true,
    })
  );
  trunk.rotation.x = Math.PI / 2;
  trunk.position.z = trunkHeight / 2;
  trunk.castShadow = true;
  tree.add(trunk);

  const foliage = new THREE.Group();
  foliage.position.z = trunkHeight;

  // Dense green foliage
  const mainFoliage = new THREE.Mesh(
    new THREE.SphereGeometry(18, 8, 8),
    new THREE.MeshLambertMaterial({
      color: "#228B22",
      flatShading: true,
    })
  );
  mainFoliage.castShadow = true;
  foliage.add(mainFoliage);

  // Additional foliage puffs
  for (let i = 0; i < 4; i++) {
    const puff = mainFoliage.clone();
    puff.scale.set(
      0.6 + Math.random() * 0.3,
      0.6 + Math.random() * 0.3,
      0.6 + Math.random() * 0.3
    );
    puff.position.set(
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 25,
      (Math.random() - 0.5) * 8
    );
    foliage.add(puff);
  }

  // Fruits
  const fruitConfig = {
    apple: { color: "#FF0000", size: 1.2, shape: "sphere" },
    orange: { color: "#FFA500", size: 1.0, shape: "sphere" },
    pear: { color: "#FFFF00", size: 1.3, shape: "pear" },
    cherry: { color: "#DC143C", size: 0.6, shape: "sphere" },
  };

  const config = fruitConfig[fruitType] || fruitConfig.apple;
  const fruitCount = fruitType === "cherry" ? 30 : 12;

  for (let i = 0; i < fruitCount; i++) {
    let fruit;

    if (config.shape === "pear") {
      fruit = new THREE.Mesh(
        new THREE.SphereGeometry(config.size, 8, 8),
        new THREE.MeshLambertMaterial({ color: config.color })
      );
      fruit.scale.set(0.8, 1.2, 0.8);
    } else {
      fruit = new THREE.Mesh(
        new THREE.SphereGeometry(config.size, 6, 6),
        new THREE.MeshLambertMaterial({ color: config.color })
      );
    }

    fruit.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 30,
      Math.random() * 15 - 5
    );
    fruit.castShadow = true;
    foliage.add(fruit);
  }

  tree.add(foliage);
  return tree;
}

// OPTION 4: Animated Tree (Swaying in Wind)
export function AnimatedTree(tileIndex, height = 25) {
  const tree = RealisticTree(tileIndex, height);

  // Store original positions for animation
  tree.children.forEach((child) => {
    if (child.userData) {
      child.userData.originalPosition = child.position.clone();
      child.userData.originalRotation = child.rotation.clone();
    } else {
      child.userData = {
        originalPosition: child.position.clone(),
        originalRotation: child.rotation.clone(),
      };
    }
    child.userData.animationOffset = Math.random() * Math.PI * 2;
  });

  // Animation function
  tree.animate = function (time) {
    const windStrength = 0.5;
    const windSpeed = 2;

    tree.children.forEach((child, index) => {
      if (child.userData) {
        const sway =
          Math.sin(time * windSpeed + child.userData.animationOffset) *
          windStrength;
        const heightFactor = child.position.z / height; // Higher parts sway more

        child.rotation.x =
          child.userData.originalRotation.x + sway * heightFactor * 0.1;
        child.rotation.z =
          child.userData.originalRotation.z + sway * heightFactor * 0.05;
      }
    });
  };

  return tree;
}

// OPTION 5: Dead/Spooky Tree
export function DeadTree(tileIndex, height = 25) {
  const tree = new THREE.Group();
  tree.position.x = tileIndex * tileSize;

  // Dark, twisted trunk
  const trunkHeight = height;
  const trunkRadius = 5;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 6),
    new THREE.MeshLambertMaterial({
      color: "#2F1B14",
      flatShading: true,
    })
  );
  trunk.rotation.x = Math.PI / 2;
  trunk.position.z = trunkHeight / 2;
  trunk.castShadow = true;
  tree.add(trunk);

  // Twisted bare branches
  const branchCount = 8;
  for (let i = 0; i < branchCount; i++) {
    const angle = (i / branchCount) * Math.PI * 2;
    const branchLength = 8 + Math.random() * 6;
    const branchHeight = trunkHeight * (0.6 + Math.random() * 0.3);

    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 1, branchLength, 6),
      new THREE.MeshLambertMaterial({
        color: "#2F1B14",
        flatShading: true,
      })
    );

    branch.position.set(
      Math.cos(angle) * (trunkRadius + branchLength / 3),
      Math.sin(angle) * (trunkRadius + branchLength / 3),
      branchHeight
    );

    branch.rotation.z = (-Math.cos(angle) * Math.PI) / 3;
    branch.rotation.x = (-Math.sin(angle) * Math.PI) / 3;
    branch.rotation.y = angle + Math.random() * 0.5;

    branch.castShadow = true;
    tree.add(branch);

    // Add smaller twigs
    for (let j = 0; j < 3; j++) {
      const twig = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.2, 3, 4),
        new THREE.MeshLambertMaterial({ color: "#2F1B14" })
      );

      twig.position.copy(branch.position);
      twig.position.x += Math.cos(angle + j) * 2;
      twig.position.y += Math.sin(angle + j) * 2;
      twig.position.z += 2;
      twig.rotation.set(Math.random(), Math.random(), Math.random());

      tree.add(twig);
    }
  }

  return tree;
}

// Main export function with type selection
export function Tree(tileIndex, height = 25, type = "original") {
  switch (type) {
    case "realistic":
      return RealisticTree(tileIndex, height);
    case "spring":
      return SeasonalTree(tileIndex, "spring", height);
    case "summer":
      return SeasonalTree(tileIndex, "summer", height);
    case "autumn":
      return SeasonalTree(tileIndex, "autumn", height);
    case "winter":
      return SeasonalTree(tileIndex, "winter", height);
    case "apple":
      return FruitTree(tileIndex, "apple", height);
    case "orange":
      return FruitTree(tileIndex, "orange", height);
    case "cherry":
      return FruitTree(tileIndex, "cherry", height);
    case "animated":
      return AnimatedTree(tileIndex, height);
    case "dead":
      return DeadTree(tileIndex, height);
    default:
      // Original tree code
      const tree = new THREE.Group();
      tree.position.x = tileIndex * tileSize;

      const trunkHeight = 25;
      const trunkRadius = 7;
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(
          trunkRadius * 0.8,
          trunkRadius,
          trunkHeight,
          8
        ),
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
}