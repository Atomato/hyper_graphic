/* HyFunction : ���Լ��� graph ��ü.
 * CONSTRUCTOR
 * HyFunction(func, x_min, x_max)
 *  func (function) : x ���� ���ڷ� �޾� y ���� return�ϴ� ����� ���� �Լ�
 *  x_min (float) : x �ּڰ�.
 *  x_max (float) : x �ִ�.
 * METHODS
 * setLineColor(color) : graph�� �� ����.
 *  color (Color) : graph�� ��.
 * setLineWidth(width) : graph�� ���� ����.
 *  width (Float) : graph�� ����.
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