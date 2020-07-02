// HyAngleLine : HyCurvedAngleLine, HyRightAngleLine의 상위 class.

import * as THREE from '../submodules/three.js/build/three.module.js';

import { HyLine } from './line.js';
import { scene } from './core.js';

const HYPER_ANGLE_LINE_DEFAULT_SIZE = 0.3;

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

export { HyAngleLine };