import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player, initializePlayer } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { hitTest } from "./hitTest";
import "./style.css";
import "./collectUserInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

// --- BẮT ĐẦU THÊM NHẠC NỀN ---

// 1. Tạo một "tai nghe" và gắn nó vào camera
const listener = new THREE.AudioListener();
camera.add(listener);

// 2. Tạo một nguồn âm thanh chung
const backgroundMusic = new THREE.Audio(listener);

// 3. Tạo trình tải âm thanh
const audioLoader = new THREE.AudioLoader();

// 4. Tải tệp âm thanh
audioLoader.load(
  // Đường dẫn đến tệp nhạc trong thư mục 'public'
  '/music/background.mp3', 
  // Hàm callback sẽ chạy khi nhạc đã tải xong
  function(buffer) {
    backgroundMusic.setBuffer(buffer);
    backgroundMusic.setLoop(true); // Lặp lại nhạc
    backgroundMusic.setVolume(0.3); // Đặt âm lượng (từ 0.0 đến 1.0)
    
    // Do chính sách của trình duyệt, âm thanh chỉ có thể bắt đầu sau khi người dùng tương tác.
    // Chúng ta sẽ tạo một sự kiện để bắt đầu nhạc khi người dùng click hoặc nhấn phím lần đầu.
    const startMusic = () => {
      if (!backgroundMusic.isPlaying) {
        backgroundMusic.play();
        // Xóa sự kiện sau khi đã chạy một lần
        document.body.removeEventListener('click', startMusic);
        window.removeEventListener('keydown', startMusic);
      }
    };

    document.body.addEventListener('click', startMusic);
    window.addEventListener('keydown', startMusic);
  }
);

// --- KẾT THÚC THÊM NHẠC NỀN ---


const scoreDOM = document.getElementById("Score");
const resultDOM = document.getElementById("result-container");

initializeGame();

document
  .querySelector("#retry")
  ?.addEventListener("click", initializeGame);

function initializeGame() {
  initializePlayer();
  initializeMap();

  if (scoreDOM) scoreDOM.innerText = "0";
  if (resultDOM) resultDOM.style.visibility = "hidden";
}

const renderer = Renderer();
renderer.render(scene, camera);
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles();
  animatePlayer();
  hitTest();

  renderer.render(scene, camera);
}