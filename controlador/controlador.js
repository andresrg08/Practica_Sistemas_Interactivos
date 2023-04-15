// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("canvas")});
renderer.setSize(window.innerWidth, window.innerHeight);

// Creación de la esfera
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({color: 0xffffff});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Manejo de eventos para la interacción con la esfera
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);

function onMouseDown(event) {
  isDragging = true;
}

function onMouseUp(event) {
  isDragging = false;
}

function onMouseMove(event) {
  const deltaMove = {
    x: event.clientX - previousMousePosition.x,
    y: event.clientY - previousMousePosition.y
  };

  if (isDragging) {
    const deltaRotationQuaternion = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        'XYZ'
      ));

    sphere.quaternion.multiplyQuaternions(deltaRotationQuaternion, sphere.quaternion);
  }

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY
  };
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

// Función de renderizado
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();