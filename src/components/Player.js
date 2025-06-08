import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";
import { metadata as rows, addRows } from "./Map";

export const player = Player();

function Player() {
  const player = new THREE.Group(); 

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 12), 
    new THREE.MeshLambertMaterial({
      color: 0xffff00,
      flatShading: true,
    })
  );
  body.castShadow = true;
  body.receiveShadow = true;
  body.scale.set(1.2, 0.8, 1.5);
  player.add(body);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.6), 
    new THREE.MeshLambertMaterial({
      color: 0xffff00,
      flatShading: true,
    })
  );
  head.position.set(0, 0.8, 1.2); 
  head.castShadow = true;
  head.receiveShadow = true;
  player.add(head);

  const beak = new THREE.Mesh(
    new THREE.ConeGeometry(0.2, 0.5, 16), 
    new THREE.MeshLambertMaterial({
      color: 0xffa500,
      flatShading: true,
    })
  );
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.8, 1.8); 
  beak.castShadow = true;
  beak.receiveShadow = true;
  player.add(beak);

  const eyeGeometry = new THREE.SphereGeometry(0.12, 12, 12);
  const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
  
  const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeLeft.position.set(0.25, 1.0, 1.65);
  player.add(eyeLeft);

  const eyeRight = eyeLeft.clone();
  eyeRight.position.x = -eyeLeft.position.x;
  player.add(eyeRight);
 
  const wingGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.8);
  const wingMaterial = new THREE.MeshLambertMaterial({
      color: 0xfdd835, 
      flatShading: true,
  });
  
  const wingLeft = new THREE.Mesh(wingGeometry, wingMaterial);
  wingLeft.position.set(0.7, 0, 0.2);
  wingLeft.rotation.z = Math.PI / 4;
  wingLeft.castShadow = true;
  player.add(wingLeft);

  const wingRight = wingLeft.clone();
  wingRight.position.x *= -1;
  wingRight.rotation.z *= -1;
  player.add(wingRight);

  const combGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.4);
  const combMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      flatShading: true,
  });
  const comb = new THREE.Mesh(combGeometry, combMaterial);
  comb.position.set(0, 1.2, 1.1);
  comb.castShadow = true;
  player.add(comb);
 
  const targetZSize = 20;
  const currentBodyEffectiveZSize = 1 * 2 * 1.5;
  
  player.rotation.x = Math.PI / 2;
  player.rotation.y = Math.PI ;

  const scaleFactor = targetZSize / currentBodyEffectiveZSize; 

  player.scale.set(scaleFactor, scaleFactor, scaleFactor); 

  const bodyOriginalRadiusYComponent = 1 * body.scale.y; 
  const liftAmount = bodyOriginalRadiusYComponent * scaleFactor;

  const playerContainer = new THREE.Group(); 
  playerContainer.add(player);
  playerContainer.userData.liftAmount = liftAmount;

  return playerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function initializePlayer(){
  player.position.x = 0;
  player.position.y = 0;

  const scaleFactor = (20) / (1 * 2 * 1.5); 
  const bodyBaseRadiusY = 1; 
  const bodyScaleY = 0.8;   
  const liftAmount = (bodyBaseRadiusY * bodyScaleY) * scaleFactor; 
  
  player.children[0].position.z = liftAmount;

  position.currentRow = 0;
  position.currentTile = 0;

  movesQueue.length = 0;
}

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;

  if (position.currentRow > rows.length - 10) {
    addRows(position.currentRow);
  }

  const scoreDOM = document.getElementById("score");
  if (scoreDOM) scoreDOM.innerText = position.currentRow.toString();
}