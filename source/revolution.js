/* HyRevolution : 평면도형을 y축으로 회전시킨 입체도형.
 * CONSTRUCTOR
 * HyRevolution(shape)
 *  shape (HyPolygon) : 회전시킬 평면도형.
 * TODO
 * Method 구현 필요 -> 입체도형의 공통 method 구현.
 * COMMENTS
 * HyShape를 y축에 대해 공전시킴으로 animataion 효과를 낸다.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { scene } from './core.js';
import { y_rotation_list } from './core.js';

const HYPER_REVOLUTION_QUALITY = 128;

class HyRevolution {
	constructor(shape) {
		var points = shape.shape.extractPoints(100).shape;
		points.push(points[0]);
		var geometry = new THREE.LatheGeometry(points, HYPER_REVOLUTION_QUALITY);
		var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
		this.mesh = new THREE.Mesh(geometry, material);
		//scene.add(this.mesh);

		var edges_geometry = new THREE.EdgesGeometry(geometry);
		var edges_material = new THREE.LineBasicMaterial({ color: 0x000000 });
		this.edges = new THREE.LineSegments(edges_geometry, edges_material);
		scene.add(this.edges);

		shape.mesh.material.side = THREE.DoubleSide;
		y_rotation_list.push(shape);
	}
}

export { HyRevolution };