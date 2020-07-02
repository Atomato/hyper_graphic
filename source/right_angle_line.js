/* HyRightAngleLine : 각을 꺾인 선으로 표시하는 선 객체.
 * CONSTRUCTOR
 * HyRightAngleLine(position_a, position_b, position_c, size, over180)
 *  position_a (HyPosition) : 각ABC의 A 지점.
 *  position_b (HyPosition) : 각ABC의 B 지점.
 *  position_c (HyPosition) : 각ABC의 C 지점.
 *  size (Float) : 꺾이는 지점과 B 지점과의 거리. 기본값은 0.3.
 *  over180 (Boolean) : true일 경우 180도 이상의 각 표시. 기본값은 false.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { HyLine } from './line.js';
import { getAngleMarkPosition } from './angle_mark.js';
import { scene } from './core.js';

class HyRightAngleLine extends HyLine {
    constructor(position_a, position_b, position_c, size, over180) {
        super();

        var points = [];

        var position_b_1 = new getAngleMarkPosition(position_a, position_b, position_c, size, over180);

        var lineab = new THREE.Line3(position_b, position_a);
        var position_a_1 = new THREE.Vector3();
        lineab.closestPointToPoint(position_b_1, false, position_a_1);
        points.push(position_a_1);

        points.push(position_b_1);

        var linecb = new THREE.Line3(position_b, position_c);
        var position_c_1 = new THREE.Vector3();
        linecb.closestPointToPoint(position_b_1, false, position_c_1);
        points.push(position_c_1);

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        var material = this.makeMaterial();

        this.mesh = new THREE.Line(geometry, material);
        this.mesh.computeLineDistances();

        scene.add(this.mesh);
	}
}

export { HyRightAngleLine };