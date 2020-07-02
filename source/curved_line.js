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

import * as THREE from '../submodules/three.js/build/three.module.js';
import { HyLine } from './line.js';
import { HyCircle } from './circle.js';
import { scene } from './core.js';

const HYPER_CURVED_LINE_QUALITY = 128;

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
		var points = this.curve.getPoints(HYPER_CURVED_LINE_QUALITY);
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
		var circle = new HyCircle(this.curve.getLength() / 20, axis_start, axis_end);
		circle.makeCone();
	}

	setDashed() {
		var size = Math.min(this.curve.getLength() / 10, 0.1);
		this.setDashedCore(size);
	}
}

export { HyCurvedLine };