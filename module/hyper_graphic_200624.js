/* Hyper Study에 쓰일 도형을 위한 graphic library
 * Final Modified : 20200624
 * Three.js를 기반으로 한 wrapper.
 * 담당자 : AI3-2 방수빈 (soobean_bang@tmax.co.kr)
 */

import * as THREE from '../build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

const HYPER_ANGLE_LINE_DEFAULT_SIZE = 0.3;
const HYPER_POINT_DEFAULT_SIZE = 0.05;
const HYPER_POINT_DEFAULT_COLOR = 0x000000;
const HYPER_LINE_DEFAULT_COLOR = 0x000000;
const ROUND_QUALITY = 128;
const HYPER_SPHERE_DEFAULT_RADIUS = 1;

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

function animate() {
	requestAnimationFrame(animate);

	//회전체 효과 표현
	y_rotation_list.forEach(function (element) {
		element.mesh.geometry.rotateY(0.01);
		element.edges.geometry.rotateY(0.01);
	})

	render();
}

function render() {
	renderer.render(scene, camera);
}

//2차원 그래픽을 표현하고 싶을 때 이 함수를 먼저 한 번 호출해야함.
function init2(width, height) {
	camera = new THREE.OrthographicCamera(-width / 2., width / 2., height / 2., -height / 2);
	camera.position.set(0, 0, 10);
	scene.add(camera);

	// Controls
	var controls = new OrbitControls(camera, renderer.domElement);
	controls.damping = 0.2;
	controls.enableRotate = false;
	controls.enablePan = false;
	controls.addEventListener('change', render);

	animate();
}

//3차원 그래픽을 표현하고 싶을 때 이 함수를 먼저 한 번 호출해야함.
function init3(position) {
	camera = new THREE.PerspectiveCamera();
	camera.position.set(position.x, position.y, position.z);
	scene.add(camera);

	// Controls
	var controls = new OrbitControls(camera, renderer.domElement);
	controls.damping = 0.2;
	//controls.enableRotate = false;
	//controls.enablePan = false;
	controls.addEventListener('change', render);

	animate();
}

/* xAxis, yAxis, zAxis
 * 삼축을 생성하는 편의함수.
 * min (Float) : 축 선분의 한 끝 점의 좌표.
 * max (Float) : 축 선분의 다른 끝 점의 좌표.
 */
function xAxis(min, max) {
	return new HyStraightLine(new THREE.Vector3(min, 0, 0), new THREE.Vector3(max, 0, 0));
}

function yAxis(min, max) {
	return new HyStraightLine(new THREE.Vector3(0, min, 0), new THREE.Vector3(0, max, 0));
}

function zAxis(min, max) {
	return new HyStraightLine(new THREE.Vector3(0, 0, min), new THREE.Vector3(0, 0, max));
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

/* HyPosition(x,y,z) : 위치 좌표값을 담는 class.
 * CONSTRUCTOR
 *  x (Float) : x 좌표. 기본값은 0.
 *  y (Float) : y 좌표. 기본값은 0.
 *  z (Float) : z 좌표. 기본값은 0.
 */
class HyPosition extends THREE.Vector3 {
	constructor(x, y, z) {
		var local_x = (x !== undefined) ? x : 0;
		var local_y = (y !== undefined) ? y : 0;
		var local_z = (z !== undefined) ? z : 0;
		super(local_x, local_y, local_z);
	}

	getVector2() {
		return new THREE.Vector2(this.x, this.y);
	}
}

// HyLine : 직선, 곡선의 material, 장식 관리를 위한 상위 class
class HyLine {
	constructor() {
		this.arrows = [];
	}

	makeMaterial() {
		return new THREE.LineBasicMaterial({ color: HYPER_LINE_DEFAULT_COLOR });
	}

	hide() {
		this.mesh.material.setValues({ colorWrite: false });
	}

	showStartPointArrowMark(size) {
		this.showArrowMark(size, true);
	}

	showEndPointArrowMark(size) {
		this.showArrowMark(size, false);
	}

	setLineColor(color) {
		this.mesh.material.color.set(color);
	}

	setLineWidth(line_width) {
		this.mesh.material.linewidth = line_width;
	}

	setDashedCore(size) {
		var color = this.mesh.material.color;
		var linewidth = this.mesh.material.linewidth;
		var new_material = new THREE.LineDashedMaterial({ color:color, linewidth:linewidth, dashSize: size, gapSize: size / 3 });
		this.mesh.material = new_material;
	}
}

/* HyStraightLine : 선분 객체.
 * CONSTRUCTOR
 * HyStraightLine(position_start, position_end)
 *  position_start (HyPosition) : 선분의 한 끝 점의 위치.
 *  position_end (HyPosition) : 선분의 다른 한 끝 점의 위치.
 * METHODS
 * showStartPointArrowMark() : position_start에 화살표 표시.
 * showEndPointArrowMart() : position_end에 화살표 표시.
 * setLineColor(color) : 선분의 색 지정.
 *  color (Color) : 선분의 색.
 * setLineWidth(width) : 선분의 굵기 지정.
 *  width (Float) : 선분의 굵기.
 * setDashed() : 선분을 점선으로 설정.
 * getPositionAt(t, position) : 선분 위의 한 지점을 HyPosition으로 제공.
 *  t (Float) : 선분 위의 지점에 대응되는 0~1 값.
 *  position (HyPosition) : 결과를 저장할 객체.
 * getFootOfPerpendicular(src, dst) : 한 점에서 이 선분에 내린 수선의 발.
 *  src (HyPosition) : 수선을 그을 점.
 *  dst (HyPosition) : 수선의 발 위치를 받을 객체.
 */
class HyStraightLine extends HyLine {
	constructor(position0, position1) {
		super();
		this.line3 = new THREE.Line3(position0, position1);
		var points = [];
		points.push(position0);
		points.push(position1);
		var geometry = new THREE.BufferGeometry().setFromPoints(points);

		var material = this.makeMaterial();

		this.mesh = new THREE.Line(geometry, material);
		this.mesh.computeLineDistances();

		scene.add(this.mesh);
	}

	showArrowMark(size, start_point) {
		var local_size = (size !== undefined) ? size : 0.05;
		var axis_start = new HyPosition();
		var axis_end = new HyPosition();
		if (start_point) {
			axis_end = this.line3.start;
			this.line3.at(local_size, axis_start);
		} else {
			axis_end = this.line3.end;
			this.line3.at(1 - local_size, axis_start);
		}
		var axis = new THREE.Line3(axis_start, axis_end);
		var circle = new HyCircle(axis.distance() * 0.2, axis_start, axis_end);
		circle.makeCone();
	}

	setDashed() {
		var size = Math.min(this.line3.distance() / 10, 0.1);
		this.setDashedCore(size);
	}

	getPositionAt(t, position) {
		this.line3.at(t, position);
	}

	getFootOfPerpendicular(src, dst) {
		this.line3.closestPointToPoint(src, dst);
	}
}

/* HyCurvedLine : 곡선 객체.
 * CONSTRUCTOR
 * HyCurvedLine(position_start, position_end, middle_point_distance, normal)
 *  position_start : 곡선의 한 끝 점의 위치.
 *  position_end : 곡선의 다른 한 끝 점의 위치.
 *  middle_point_distance : 곡선이 구부러진 정도. 크면 클 수록 더 구부러짐. 기본값은 두 끝 점 거리의 1/4.
 *  normal : 곡선을 포함하는 평면의 법선 vector. 기본값은 (0,0,1).
 * METHODS
 * showStartPointArrowMark() : position_start에 화살표 표시.
 * showEndPointArrowMart() : position_end에 화살표 표시.
 * setLineColor(color) : 선분의 색 지정.
 *  color (Color) : 선분의 색.
 * setLineWidth(width) : 선분의 굵기 지정.
 *  width (Float) : 선분의 굵기.
 * setDashed() : 선분을 점선으로 설정.
 */
class HyCurvedLine extends HyLine {
	constructor(position0, position1, middle_point_distance, normal) {
		super();
		var line = new THREE.Line3(position0, position1);
		if (line.distance() == 0) {
			return;
		}

		var local_middle_point_distance
			= (middle_point_distance !== undefined) ? middle_point_distance : line.distance() / 2;

		var local_normal = (normal !== undefined) ? normal : new THREE.Vector3(0, 0, 1);

		var line_delta = new THREE.Vector3();
		line.delta(line_delta);

		local_normal.cross(line_delta).normalize();

		var middle_point = new THREE.Vector3();
		line.getCenter(middle_point);

		local_normal.multiplyScalar(local_middle_point_distance);
		middle_point.add(local_normal);

		this.curve = new THREE.QuadraticBezierCurve3(position0, middle_point, position1);
		var points = this.curve.getPoints(ROUND_QUALITY);
		var geometry = new THREE.BufferGeometry().setFromPoints(points);

		var material = new THREE.LineBasicMaterial({ color: 0x000000 });
		this.mesh = new THREE.Line(geometry, material);
		this.mesh.computeLineDistances();

		scene.add(this.mesh);
	}

	showArrowMark(start_point) {
		var axis_start = new THREE.Vector3();
		var axis_end = new THREE.Vector3();
		if (start_point) {
			axis_end = this.curve.getPoint(0);
			axis_start = this.curve.getPoint(0.1);
		} else {
			axis_end = this.curve.getPoint(1);
			axis_start = this.curve.getPoint(0.9);
		}
		var axis = new THREE.Line3(axis_start, axis_end);
		var circle = new HyCircle(this.curve.getLength()/20, axis_start, axis_end);
		circle.makeCone();
	}

	setDashed() {
		var size = Math.min(this.curve.getLength() / 10, 0.1);
		this.setDashedCore(size);
	}
}

// HyAngleLine : HyCurvedAngleLine, HyRightAngleLine의 상위 class.
class HyAngleLine extends HyLine {
	constructor(position_a, position_b, position_c, size, over180, number_of_points) {
		super();
		var position_a0 = position_a.clone();
		var position_b0 = position_b.clone();
		var position_c0 = position_c.clone();

		var local_size = (size !== undefined) ? size : HYPER_ANGLE_LINE_DEFAULT_SIZE;

		//position b를 원점에 맞춤
		this.translate1 = new THREE.Vector3();
		this.translate1.addScaledVector(position_b0, -1);
		position_a0.add(this.translate1);
		//position_b0.add(translate1);
		position_c0.add(this.translate1);

		//position a를 xy 평면에 놓음
		//x축 기준으로 회전시킴
		var x_axis = new THREE.Vector3(1, 0, 0);
		this.rotate1theta = Math.atan2(-position_a0.z, position_a0.y);
		position_a0.applyAxisAngle(x_axis, this.rotate1theta);
		//position_b0.applyAxisAngle(x_axis, rotate1theta);
		position_c0.applyAxisAngle(x_axis, this.rotate1theta);

		//poisition a를 x축에 놓음
		//z축 기준으로 회전시킴
		var z_axis = new THREE.Vector3(0, 0, 1);
		this.rotate2theta = Math.atan2(-position_a0.y, position_a0.x);
		//position_a0.applyAxisAngle(z_axis, rotate2theta);
		//position_b0.applyAxisAngle(z_axis, rotate2theta);
		position_c0.applyAxisAngle(z_axis, this.rotate2theta);

		//position c를 xy 평면에 놓음
		//x축 기준으로 회전시킴
		this.rotate3theta = Math.atan2(-position_c0.z, position_c0.y);
		//position_a0.applyAxisAngle(x_axis, rotate3theta);
		//position_b0.applyAxisAngle(x_axis, rotate3theta);
		position_c0.applyAxisAngle(x_axis, this.rotate3theta);

		//각을 그림
		var theta_start = 0;
		var theta_length = Math.atan2(position_c0.y, position_c0.x);
		var local_over180 = (over180 !== undefined) ? over180 : false;
		if (local_over180) {
			theta_start = theta_length;
			theta_length = 2 * Math.PI - theta_length;
		}

		var start_angle = theta_start;
		var end_angle = theta_start + theta_length;
		var curve = new THREE.EllipseCurve(0, 0, local_size, local_size, start_angle, end_angle);

		var points = curve.getPoints(number_of_points);

		var geometry = new THREE.BufferGeometry().setFromPoints(points);
		geometry.rotateX(-this.rotate3theta);
		geometry.rotateZ(-this.rotate2theta);
		geometry.rotateX(-this.rotate1theta);
		geometry.translate(-this.translate1.x, -this.translate1.y, -this.translate1.z);
		var material = new THREE.LineBasicMaterial({ color: 0x000000 });

		this.mesh = new THREE.Line(geometry, material);
		scene.add(this.mesh);
	}
}

/* HyCurvedAngleLine : 각을 원호로 표시하는 선 객체.
 * CONSTRUCTOR
 * HyCurvedAngleLine(position_a, position_b, position_c, size, over180)
 *  position_a (HyPosition) : 각ABC의 A 지점.
 *  position_b (HyPosition) : 각ABC의 B 지점.
 *  position_c (HyPosition) : 각ABC의 C 지점.
 *  size (Float) : 원호의 반지름. 기본값은 0.3.
 *  over180 (Boolean) : true일 경우 180도 이상의 각 표시. 기본값은 false.
 */
class HyCurvedAngleLine extends HyAngleLine {
	constructor(position_a, position_b, position_c, size, over180) {
		super(position_a, position_b, position_c, size, over180, ROUND_QUALITY);
	}
}

/* HyRightAngleLine : 각을 꺾인 선으로 표시하는 선 객체.
 * CONSTRUCTOR
 * HyRightAngleLine(position_a, position_b, position_c, size, over180)
 *  position_a (HyPosition) : 각ABC의 A 지점.
 *  position_b (HyPosition) : 각ABC의 B 지점.
 *  position_c (HyPosition) : 각ABC의 C 지점.
 *  size (Float) : 꺾이는 지점과 B 지점과의 거리. 기본값은 0.3.
 *  over180 (Boolean) : true일 경우 180도 이상의 각 표시. 기본값은 false.
 */
class HyRightAngleLine extends HyAngleLine {
	constructor(position_a, position_b, position_c, size, over180) {
		super(position_a, position_b, position_c, size, over180, 2);
	}
}

/* HyFunction : 양함수의 graph 객체.
 * CONSTRUCTOR
 * HyFunction(func, x_min, x_max)
 *  func (function) : x 값을 인자로 받아 y 값을 return하는 사용자 정의 함수
 *  x_min (float) : x 최솟값.
 *  x_max (float) : x 최댓값.
 * METHODS
 * setLineColor(color) : graph의 색 지정.
 *  color (Color) : graph의 색.
 * setLineWidth(width) : graph의 굵기 지정.
 *  width (Float) : graph의 굵기.
 */
class HyFunction extends HyLine {
	constructor(func, x0, x1) {
		super();
		var delta_x = (x1 - x0) / 100;
		var points = [];
		for (var x = x0; x < x1; x=x+delta_x) {
			var y = func(x);
			points.push(new THREE.Vector3(x, y, 0));
		}
		var geometry = new THREE.BufferGeometry().setFromPoints(points);

		var material = new THREE.LineBasicMaterial({ color: 0x000000 });

		this.mesh = new THREE.Line(geometry, material);
		scene.add(this.mesh);
	}
}

// HyEdges : 가장자리 처리를 위한 상위 class
class HyEdges extends HyLine {
	constructor(mesh_geometry) {
		super();
		var geometry = new THREE.EdgesGeometry(mesh_geometry);
		var material = new THREE.LineBasicMaterial({ color: 0x000000 });
		this.mesh = new THREE.LineSegments(geometry, material);

		scene.add(this.mesh);
	}

	translatePosition(position) {
		this.mesh.geometry.translate(position.x, position.y, position.z);
	}
}

// HyFace : 원, 다각형의 변, 면의 색 등을 처리하기 위한 상위 class
class HyFace {
	constructor() { }

	setFaceColor(color) {
		this.mesh.material.setValues({ colorWrite: true, color: color });
	}

	setLineColor(color) {
		this.edges.setLineColor(color);
	}

	hideLine() {
		this.edges.hide();
	}

	setLineWidth(width) {
		this.edges.setLineWidth(width);
	}

	setDashed() {
		this.edges.setDashed();
	}

	translatePosition(position) {
		this.mesh.geometry.translate(position.x, position.y, position.z);
		this.edges.translatePosition(position);
	}

	setPosition(position) {
		this.translatePosition(this.position.multiplyScalar(-1));
		this.position = position;
		this.translatePosition(this.position);
	}
}

/* HyShape : 다각형 객체.
 * CONSTRUCTOR
 * HyShape(points)
 *  points (Array of HyPosition) : 위치
 * METHODS
 * setFaceColor(color) : 면의 색을 지정.
 *  color (Color) : 면의 색.
 * setLineColor(color) : 변의 색을 지정.
 *  color (Color) : 변의 색.
 * setLineWidth(width) : 변의 굵기를 지정.
 *  width (Float) : 변의 굵기.
 * setDashed() : 변을 점선으로 설정.
 */
class HyShape extends HyFace {
	constructor(points) {
		super();
		this.shape = new THREE.Shape(points);
		var geometry = new THREE.ShapeGeometry(this.shape);
		var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
		material.setValues({ colorWrite: false });

		this.mesh = new THREE.Mesh(geometry, material);
		scene.add(this.mesh);

		this.edges = new HyEdges(geometry);
	}
}

/* HyCircle : 원 객체.
 * CONSTRUCTOR
 * HyCircle(radius, axis_start, axis_end)
 *  radius : 원의 반지름
 *  axis_start : 원의 중심
 *  axis_end : 원의 중심으로 부터 원의 법선 vector만큼 진행한 점.
 * METHODS
 * setFaceColor(color) : 면의 색을 지정.
 *  color (Color) : 면의 색.
 * setLineColor(color) : 가장자리의 색을 지정.
 *  color (Color) : 가장자리의 색.
 * setLineWidth(width) : 가장자리의 굵기를 지정.
 *  width (Float) : 가장자리의 굵기.
 * setDashed() : 가장자리을 점선으로 설정.
 */
class HyCircle extends HyFace {
	constructor(radius, axis_start, axis_end, theta_start, theta_length) {
		super();
		var local_axis_start = (axis_start !== undefined) ? axis_start : new THREE.Vector3();
		var local_axis_end = (axis_end !== undefined) ? axis_end : new THREE.Vector3(local_axis_start.x, local_axis_start.y, 1);
		this.radius = radius;
		this.axis = new THREE.Line3(local_axis_start, local_axis_end);

		var geometry = new THREE.CircleGeometry(this.radius, ROUND_QUALITY, theta_start, theta_length);

		geometryAline(geometry, this.axis);

		var material = new THREE.MeshBasicMaterial();
		material.setValues({ colorWrite: false });
		this.mesh = new THREE.Mesh(geometry, material);
		scene.add(this.mesh);

		this.edges = new HyEdges(geometry);
	}

	makeCone() {
		scene.remove(this.mesh);
		scene.remove(this.edges);

		var geometry = new THREE.ConeGeometry(this.radius, this.axis.distance(), ROUND_QUALITY);
		geometry.rotateX(Math.PI / 2);
		geometry.translate(0, 0, this.axis.distance() / 2);

		geometryAline(geometry, this.axis);

		var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
		this.mesh = new THREE.Mesh(geometry, material);
		scene.add(this.mesh);
	}
}

/* HyLathe : 선분을 y축으로 회전시킨 곡면.
 * CONSTRUCTOR
 * HyLathe(line)
 *  line (HyStraightLine) : 회전시킬 선분.
 * METHODS
 * setFaceColor(color) : 면의 색을 지정.
 *  color (Color) : 면의 색.
 * setLineColor(color) : 가장자리의 색을 지정.
 *  color (Color) : 가장자리의 색.
 * setLineWidth(width) : 가장자리의 굵기를 지정.
 *  width (Float) : 가장자리의 굵기.
 * setDashed() : 가장자리을 점선으로 설정.
 */
class HyLathe extends HyFace {
	constructor(line) {
		super();
		var points = [];
		points.push(new THREE.Vector2(line.line3.start.x, line.line3.start.y));
		points.push(new THREE.Vector2(line.line3.end.x, line.line3.end.y));
		var geometry = new THREE.LatheGeometry(points, ROUND_QUALITY);

		this.setEdges(geometry);
	}
}

/* HyText : Text 객체
 * CONSTRUCTOR
 *  string : 글 내용.
 *  position (HyPosition) : Text box의 왼쪽 아래 지점. 기본값은 원점.
 *  size (Float) : 글자 크기.
 *  color : 글자 색.
 * METHODS
 * setColor(color) : 글자 색 지정.
 *  color (Color) : 글자 색.
 * TODO
 * font 선택 가능하게
 * COMMENTS
 * font loader 구조상의 한계로, geometry에 대한 사후 변경이 어려움.
 */
class HyText {
	constructor(string, position, size, color) {
		var local_position = (position !== undefined) ? position : new HyPosition();
		var local_size = (size !== undefined) ? size : 0.2;
		var local_color = (color !== undefined) ? color : 0x000000;
		//TODO default size TBD

		var hy_text = this;

		this.material = new THREE.MeshBasicMaterial({ color: local_color });
		var this_material = this.material;

		var font_loader = new THREE.FontLoader();
		font_loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
			var geometry = new THREE.TextGeometry(string, {
				font: font,
				size: local_size,
				height: 0.01
			});
			geometry.translate(local_position.x, local_position.y, local_position.z);
			hy_text.mesh = new THREE.Mesh(geometry, this_material);

			scene.add(hy_text.mesh);
		});
	}

	setColor(color) {
		this.material.setValues({ color: color });
	}
}

function getAngleMarkPosition(position_a, position_b, position_c, size, over180) {
	var local_size = (size !== undefined) ? size : 0.5;
	var position_a0 = position_a.clone();
	var position_b0 = position_b.clone();
	var position_c0 = position_c.clone();

	var local_over180 = (over180 !== undefined) ? over180 : false;

	var position = position_b0.clone();
	position_a0.addScaledVector(position_b0, -1);
	position_c0.addScaledVector(position_b0, -1);
	position_a0.normalize();
	position_c0.normalize();

	var scale = ((local_over180) ? -1 : 1) * local_size;

	position.addScaledVector(position_a0, scale);
	position.addScaledVector(position_c0, scale);

	return position;
}

/* HyRevolution : 평면도형을 y축으로 회전시킨 입체도형.
 * CONSTRUCTOR
 * HyRevolution(shape)
 *  shape (HyPolygon) : 회전시킬 평면도형.
 * TODO
 * Method 구현 필요 -> 입체도형의 공통 method 구현.
 * COMMENTS
 * HyShape를 y축에 대해 공전시킴으로 animataion 효과를 낸다.
 */
class HyRevolution {
	constructor(shape) {
		var points = shape.shape.extractPoints(100).shape;
		points.push(points[0]);
		var geometry = new THREE.LatheGeometry(points, ROUND_QUALITY);
		var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
		this.mesh = new THREE.Mesh(geometry, material);
		//scene.add(this.mesh);

		var edges_geometry = new THREE.EdgesGeometry(geometry);
		var edges_material = new THREE.LineBasicMaterial({ color: 0x000000 });
		this.edges = new THREE.LineSegments(edges_geometry, edges_material);
		scene.add(this.edges);

		shape.mesh.material.side = THREE.DoubleSide;
		y_rotation_list.push(shape);
	}
}

/* HySphere : 구 객체.
 * CONSTRUCTOR
 * HySphere(radius, position)
 *  radius (Float) : 반지름.
 *  position (HyPosition) : 위치.
 */
class HySphere extends HyFace {
	constructor(radius, position) {
		super();

		var local_radius = (radius !== undefined) ? radius : HYPER_SPHERE_DEFAULT_RADIUS;

		var geometry = new THREE.SphereGeometry(local_radius, ROUND_QUALITY, ROUND_QUALITY);
		var material = new THREE.MeshBasicMaterial();
		material.setValues({ colorWrite: false });
		this.mesh = new THREE.Mesh(geometry, material);

		this.edges = new HyEdges(geometry);

		this.position = (position !== undefined) ? position : new HyPosition();
		this.translatePosition(this.position);

		scene.add(this.mesh);
	}
}

/* HyPoint : 점 객체.
 * CONSTRUCTOR
 * HyPoint(position, color, size)
 *  position (HyPosition) : 점의 위치. 기본값은 원점.
 *  color (Color) : 점의 색. 기본값은 검정.
 *  size : 점의 크기. 기본값은 0.05.
 * METHODS
 * setPosition(position) : 점의 위치 지정.
 *  position (HyPosition) : 점의 위치.
 * setColor(color) : 점의 색 지정.
 *  color (Color) : 점의 색.
 * [Deleted] setSize(size) : 점의 크기 지정.
 *  size (Number) : 점의 크기.
 */
class HyPoint extends HySphere {
	constructor(position, color, size) {
		super((size !== undefined) ? size : HYPER_POINT_DEFAULT_SIZE, position);

		var local_color = (color !== undefined) ? color : HYPER_POINT_DEFAULT_COLOR;

		this.setColor(local_color);
	}

	setColor(color) {
		this.setLineColor(color);
	}
}

/* HyImage : 그림 객체
 * CONSTRUCTOR
 * HyImage(url, width, height)
 *  url : 그림 file 경로
 *  width : 가로 길이
 *  height : 세로 길이
 * METHODS
 * setPosition(position) : 그림을 이동.
 *  position : 그림의 중심 위치.
 */
class HyImage {
	constructor(url, width, height) {
		this.position = new HyPosition(0, 0, 0);
		var loader = new THREE.ImageBitmapLoader();
		var hy_image = this;
		this.geometry = new THREE.PlaneGeometry(width, height);

		loader.load(url, function (imageBitmap) {
			var texture = new THREE.CanvasTexture(imageBitmap);
			var material = new THREE.MeshBasicMaterial({ map: texture, transparent : true });
			hy_image.mesh = new THREE.Mesh(hy_image.geometry, material);
			scene.add(hy_image.mesh);
		});
	}

	setPosition(position) {
		this.geometry.translate(-this.position.x, -this.position.y, -this.position.z);
		this.position = position;
		this.geometry.translate(position.x, position.y, position.z);
	}

}

export { Vector2, Vector3 } from '../build/three.module.js';
export { init2, init3, render, animate, xAxis, yAxis, zAxis };
export { getAngleMarkPosition };
export { HyCircle };
export { HyCurvedAngleLine };
export { HyCurvedLine };
export { HyFunction };
export { HyImage };
export { HyLathe };
export { HyPoint };
export { HyPosition };
export { HyRevolution };
export { HyRightAngleLine };
export { HyShape };
export { HySphere };
export { HyStraightLine };
export { HyText };
