import * as THREE from '../submodules/three.js/build/three.module.js';
import { OrbitControls } from '../submodules/three.js/examples/jsm/controls/OrbitControls.js';

var container, camera;
container = document.getElementById('container');

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.add(new THREE.AmbientLight(0xffffff));

var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

//회전체 효과를 위한 리스트.
var y_rotation_list = [];

//글자 정렬 효과를 위한 리스트.
var text_list = [];

function animate() {
	requestAnimationFrame(animate);

	//회전체 효과 표현
	y_rotation_list.forEach(function (element) {
		element.mesh.geometry.rotateY(0.01);
		element.edges.mesh.geometry.rotateY(0.01);
	})

	//글자가 항상 카메라를 향함
	text_list.forEach(function (element) {
		var camera_position = new THREE.Vector3();
		camera.getWorldPosition(camera_position);
		element.lookAt(camera_position);
    })

	render();
}

function render() {
	renderer.render(scene, camera);
}

/* geomtryAline
 * 내부함수
 * geometry를 axis에 수직인 평면으로 정렬한다.
 * geometry (THREE.geometry) : 정렬할 객체.
 * axis (THREE.Line3) : 기준이 되는 축.
 */
function geometryAline(geometry, axis) {
	var normal = new THREE.Vector3();
	axis.delta(normal);
	normal.normalize();
	geometry.rotateY(Math.acos(normal.z));
	geometry.rotateZ(Math.atan2(normal.y, normal.x));
	geometry.translate(axis.start.x, axis.start.y, axis.start.z);
}

function setCameraOrthographic(width, height) {
	camera = new THREE.OrthographicCamera(-width / 2., width / 2., height / 2., -height / 2);
	camera.position.set(0, 0, 10);
	scene.add(camera);
}

function setCameraPerspective(position) {
	camera = new THREE.PerspectiveCamera();
	camera.position.set(position.x, position.y, position.z);
	scene.add(camera);
}

function setControls(dimension) {
	var controls = new OrbitControls(camera, renderer.domElement);
	controls.damping = 0.2;
	if (dimension == 2) {
		controls.enableRotate = false;
		controls.enablePan = false;
	} else if (dimension == 3) {
	} else {
		console.log('예상하지 못한 parameter : %d', dimension);
    }
	controls.addEventListener('change', render);
}

export { camera };
export { scene };
export { y_rotation_list };
export { text_list };

export { animate };
export { geometryAline };
export { setCameraOrthographic };
export { setCameraPerspective };
export { setControls };