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

import * as THREE from '../submodules/three.js/build/three.module.js';

import { HyLine } from './line.js';
import { scene } from './core.js';

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

export { HyFunction };