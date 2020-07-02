/* HyStraightLine : ���� ��ü.
 * CONSTRUCTOR
 * HyStraightLine(position_start, position_end)
 *  position_start (HyPosition) : ������ �� �� ���� ��ġ.
 *  position_end (HyPosition) : ������ �ٸ� �� �� ���� ��ġ.
 * METHODS
 * showStartPointArrowMark() : position_start�� ȭ��ǥ ǥ��.
 * showEndPointArrowMart() : position_end�� ȭ��ǥ ǥ��.
 * setLineColor(color) : ������ �� ����.
 *  color (Color) : ������ ��.
 * setLineWidth(width) : ������ ���� ����.
 *  width (Float) : ������ ����.
 * setDashed() : ������ �������� ����.
 * getPositionAt(t, position) : ���� ���� �� ������ HyPosition���� ����.
 *  t (Float) : ���� ���� ������ �����Ǵ� 0~1 ��.
 *  position (HyPosition) : ����� ������ ��ü.
 * getFootOfPerpendicular(src, dst) : �� ������ �� ���п� ���� ������ ��.
 *  src (HyPosition) : ������ ���� ��.
 *  dst (HyPosition) : ������ �� ��ġ�� ���� ��ü.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';
import { HyPosition } from './position.js';
import { HyLine } from './line.js';
import { HyCircle } from './circle.js';
import { scene } from './core.js';

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
		var arrow = new HyCircle(axis.distance() * 0.2, axis_start, axis_end);
		arrow.makeCone();
	}

	setDashed() {
		var size = Math.min(this.line3.distance() / 10, 0.1);
		this.setDashedCore(size);
	}

	getPositionAt(t, position) {
		this.line3.at(t, position);
	}

	getFootOfPerpendicular(src, dst) {
		return this.line3.closestPointToPoint(src, dst);
	}
}

/* xAxis, yAxis, zAxis
 * ������ �����ϴ� �����Լ�.
 * min (Float) : �� ������ �� �� ���� ��ǥ.
 * max (Float) : �� ������ �ٸ� �� ���� ��ǥ.
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

export { HyStraightLine };
export { xAxis };
export { yAxis };
export { zAxis };