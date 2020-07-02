/* HyPosition(x,y,z) : ��ġ ��ǥ���� ��� class.
 * CONSTRUCTOR
 *  x (Float) : x ��ǥ. �⺻���� 0.
 *  y (Float) : y ��ǥ. �⺻���� 0.
 *  z (Float) : z ��ǥ. �⺻���� 0.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

class HyPosition extends THREE.Vector3 {
	constructor(x, y, z) {
		var local_x = (x !== undefined) ? x : 0;
		var local_y = (y !== undefined) ? y : 0;
		var local_z = (z !== undefined) ? z : 0;
		super(local_x, local_y, local_z);
	}
}

export { HyPosition };