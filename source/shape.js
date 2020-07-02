/* HyShape : �ٰ��� ��ü.
 * CONSTRUCTOR
 * HyShape(points)
 *  points (Array of HyPosition) : ��ġ
 * METHODS
 * setFaceColor(color) : ���� ���� ����.
 *  color (Color) : ���� ��.
 * setLineColor(color) : ���� ���� ����.
 *  color (Color) : ���� ��.
 * setLineWidth(width) : ���� ���⸦ ����.
 *  width (Float) : ���� ����.
 * setDashed() : ���� �������� ����.
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