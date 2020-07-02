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

//ȸ��ü ȿ���� ���� ����Ʈ.
var y_rotation_list = [];

//���� ���� ȿ���� ���� ����Ʈ.
var text_list = [];

function animate() {
	requestAnimationFrame(animate);

	//ȸ��ü ȿ�� ǥ��
	y_rotation_list.forEach(function (element) {
		element.mesh.geometry.rotateY(0.01);
		element.edges.mesh.geometry.rotateY(0.01);
	})

	//���ڰ� �׻� ī�޶� ����
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
 * �����Լ�
 * geometry�� axis�� ������ ������� �����Ѵ�.
 * geometry (THREE.geometry) : ������ ��ü.
 * axis (THREE.Line3) : ������ �Ǵ� ��.
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
		console.log('�������� ���� parameter : %d', dimension);
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