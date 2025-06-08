import * as THREE from "three";
import { generateRows } from "../utilities/generateRows";
import { Grass } from "./Grass";
import { Road } from "./Road";
import { Tree } from "./Tree";
import { Swan } from "./Swan";
import { Chicken } from "./Chicken";

export const metadata = [];

export const map = new THREE.Group();

export function initializeMap() {
  metadata.length = 0;
  map.remove(...map.children);
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
        const three = Tree(tileIndex, height);
        row.add(three);
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