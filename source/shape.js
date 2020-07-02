/* HyShape : 다각형 객체.
 * CONSTRUCTOR
 * HyShape(points)
 *  points (Array of HyPosition) : 위치
 * METHODS
 * setFaceColor(color) : 면의 색을 지정.
 *  color (Color) : 면의 색.
 * setLineColor(color) : 변의 색을 지정.
 *  color (Color) : 변의 색.
 * setLineWidth(width) : 변의 굵기를 지정.
 *  width (Float) : 변의 굵기.
 * setDashed() : 변을 점선으로 설정.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { HyFace } from './face.js';
import { HyEdges } from './edges.js';
import { scene } from './core.js';

class HyShape extends HyFace {
    constructor(points) {
        super();
        this.shape = new THREE.Shape(points);
        var geometry = new THREE.ShapeGeometry(this.shape);
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        material.setValues({ colorWrite: false });

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

        this.edges = new HyEdges(geometry);
    }
}

export { HyShape };