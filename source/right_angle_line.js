/* HyRightAngleLine : ���� ���� ������ ǥ���ϴ� �� ��ü.
 * CONSTRUCTOR
 * HyRightAngleLine(position_a, position_b, position_c, size, over180)
 *  position_a (HyPosition) : ��ABC�� A ����.
 *  position_b (HyPosition) : ��ABC�� B ����.
 *  position_c (HyPosition) : ��ABC�� C ����.
 *  size (Float) : ���̴� ������ B �������� �Ÿ�. �⺻���� 0.3.
 *  over180 (Boolean) : true�� ��� 180�� �̻��� �� ǥ��. �⺻���� false.
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