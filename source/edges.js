// HyEdges : 가장자리 처리를 위한 상위 class

import * as THREE from '../submodules/three.js/build/three.module.js';
import { HyLine } from './line.js';
import { scene } from './core.js';

class HyEdges extends HyLine {
	constructor(mesh_geometry) {
		super();
		var geometry = new THREE.EdgesGeometry(mesh_geometry);
		var material = new THREE.LineBasicMaterial({ color: 0x000000 });
		this.mesh = new THREE.LineSegments(geometry, material);

		scene.add(this.mesh);
	}

	translatePosition(position) {
		this.mesh.geometry.translate(position.x, position.y, position.z);
	}
}

export { HyEdges };