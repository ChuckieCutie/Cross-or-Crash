import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { Tree } from "./components/Tree.js";

// 1. Thiết lập Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd); // Đặt màu nền xám để dễ nhìn

// 2. Thiết lập Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100; // Đặt camera lùi ra xa một chút

// 3. Thiết lập Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Thêm một vài nguồn sáng để thấy rõ đối tượng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 50, 50);
scene.add(directionalLight);

// 4. Tạo đối tượng bạn muốn xem
// Bây giờ chúng ta sẽ hiển thị đối tượng người chơi
const objectToView = Tree (0, true);

// Thêm đối tượng vào trung tâm của scene
scene.add(objectToView);

// 5. Thiết lập OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Làm cho chuyển động mượt hơn

// 6. Vòng lặp Animation
function animate() {
  requestAnimationFrame(animate);

  // Cập nhật controls để các thao tác chuột có hiệu lực
  controls.update();

  renderer.render(scene, camera);
}

// Xử lý khi cửa sổ trình duyệt thay đổi kích thước
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Bắt đầu chạy
animate();