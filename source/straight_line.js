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

export { HyStraightLine };
export { xAxis };
export { yAxis };
export { zAxis };