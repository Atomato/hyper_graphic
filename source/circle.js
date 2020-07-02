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

import * as THREE from '../submodules/three.js/build/three.module.js';
import { HyPosition } from './position.js';
import { HyFace } from './face.js';
import { HyEdges } from './edges.js';
import { scene } from './core.js';
import { geometryAline } from './core.js';

const HYPER_CIRCLE_QUALITY = 128;

class HyCircle extends HyFace {
	constructor(radius, axis_start, axis_end, theta_start, theta_length) {
		super();
		var local_axis_start = (axis_start !== undefined) ? axis_start : new HyPosition();
		var local_axis_end = (axis_end !== undefined) ? axis_end : new HyPosition(local_axis_start.x, local_axis_start.y, 1);
		this.radius = radius;
		this.axis = new THREE.Line3(local_axis_start, local_axis_end);

		var geometry = new THREE.CircleGeometry(this.radius, HYPER_CIRCLE_QUALITY, theta_start, theta_length);

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

		var geometry = new THREE.ConeGeometry(this.radius, this.axis.distance(), HYPER_CIRCLE_QUALITY);
		geometry.rotateX(Math.PI / 2);
		geometry.translate(0, 0, this.axis.distance() / 2);

		geometryAline(geometry, this.axis);

		var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
		this.mesh = new THREE.Mesh(geometry, material);
		scene.add(this.mesh);
	}
}

export { HyCircle };