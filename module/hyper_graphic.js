/* Hyper Study에 쓰일 도형을 위한 graphic library
 * Final Modified : 20200624
 * Three.js를 기반으로 한 wrapper.
 * 담당자 : AI3-2 방수빈 (soobean_bang@tmax.co.kr)
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { init2 } from '../source/init.js';
import { init3 } from '../source/init.js';
import { getAngleMarkPosition } from '../source/angle_mark.js';

import { HyCircle } from '../source/circle.js';
import { HyCurvedAngleLine } from '../source/curved_angle_line.js';
import { HyCurvedLine } from '../source/curved_line.js';
import { HyFunction } from '../source/function.js';
import { HyImage } from '../source/image.js';
import { HyLathe } from '../source/lathe.js';
import { HyPoint } from '../source/point.js';
import { HyPosition } from '../source/position.js';
import { HyRightAngleLine } from '../source/right_angle_line.js';
import { HyRevolution } from '../source/revolution.js';
import { HyShape } from '../source/shape.js';
import { HySphere } from '../source/sphere.js';
import { HyStraightLine } from '../source/straight_line.js';
import { HyText } from '../source/text.js';

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

export { init2, init3, xAxis, yAxis, zAxis };
export { getAngleMarkPosition };
export { HyCircle };
export { HyCurvedAngleLine };
export { HyCurvedLine };
export { HyFunction };
export { HyImage };
export { HyLathe };
export { HyPoint };
export { HyPosition };
export { HyRevolution };
export { HyRightAngleLine };
export { HyShape };
export { HySphere };
export { HyStraightLine };
export { HyText };