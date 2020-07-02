/* HyLathe : 선분을 y축으로 회전시킨 곡면.
 * CONSTRUCTOR
 * HyLathe(line)
 *  line (HyStraightLine) : 회전시킬 선분.
 * METHODS
 * setFaceColor(color) : 면의 색을 지정.
 *  color (Color) : 면의 색.
 * setLineColor(color) : 가장자리의 색을 지정.
 *  color (Color) : 가장자리의 색.
 * setLineWidth(width) : 가장자리의 굵기를 지정.
 *  width (Float) : 가장자리의 굵기.
 * setDashed() : 가장자리을 점선으로 설정.
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