import * as THREE from "three";
import {
  player,
  position,
  movesQueue,
  stepCompleted,
} from "./components/Player"; 
import { tileSize } from "./constants"; 

const moveClock = new THREE.Clock(false);
const targetZSize = 20; 
const currentBodyEffectiveZSize = 1 * 2 * 1.5; 
const overallScaleFactor = targetZSize / currentBodyEffectiveZSize; 
const bodyBaseRadiusForWorldZ = 1;
const bodyLocalScaleForWorldZ = 0.8;
const liftAmount = (bodyBaseRadiusForWorldZ * bodyLocalScaleForWorldZ) * overallScaleFactor; 

export function animatePlayer() {
  if (!movesQueue.length) return;

  if (!moveClock.running) moveClock.start();

  const stepTime = 0.2; 
  const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

  setPosition(progress);
  setRotation(progress);

  if (progress >= 1) {
    stepCompleted();
    moveClock.stop();
  }
}

function setPosition(progress) {
  const startX = position.currentTile * tileSize;
  const startY = position.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (movesQueue[0] === "left") endX -= tileSize;
  if (movesQueue[0] === "right") endX += tileSize;
  if (movesQueue[0] === "forward") endY += tileSize;
  if (movesQueue[0] === "backward") endY -= tileSize;

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);

  const hopAmplitude = 8; 
  player.children[0].position.z = liftAmount + Math.sin(progress * Math.PI) * hopAmplitude;
}

function setRotation(progress) {
  let endRotation = 0;
  
  if (movesQueue[0] == "forward") { 
    endRotation = Math.PI;                
  }
  if (movesQueue[0] == "left") {   
    endRotation = -Math.PI / 2;      
  }
  if (movesQueue[0] == "right") {   
    endRotation = Math.PI / 2;     
  }
  if (movesQueue[0] == "backward") {
    endRotation = 0 ;          
  }

if (Math.abs(player.children[0].rotation.y - endRotation) > 0.01 || progress < 0.1) {
    player.children[0].rotation.y = THREE.MathUtils.lerp(
      player.children[0].rotation.y,
      endRotation,
    progress
  );
}
}   