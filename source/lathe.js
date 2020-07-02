/* HyLathe : ������ y������ ȸ����Ų ���.
 * CONSTRUCTOR
 * HyLathe(line)
 *  line (HyStraightLine) : ȸ����ų ����.
 * METHODS
 * setFaceColor(color) : ���� ���� ����.
 *  color (Color) : ���� ��.
 * setLineColor(color) : �����ڸ��� ���� ����.
 *  color (Color) : �����ڸ��� ��.
 * setLineWidth(width) : �����ڸ��� ���⸦ ����.
 *  width (Float) : �����ڸ��� ����.
 * setDashed() : �����ڸ��� �������� ����.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { HyFace } from './face.js';

class HyLathe extends HyFace {
    constructor(line) {
        super();
        var points = [];
        points.push(new THREE.Vector2(line.line3.start.x, line.line3.start.y));
        points.push(new THREE.Vector2(line.line3.end.x, line.line3.end.y));
        var geometry = new THREE.LatheGeometry(points, ROUND_QUALITY);

        this.setEdges(geometry);
    }
}

export { HyLathe };