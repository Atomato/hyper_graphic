/* HySphere : 구 객체.
 * CONSTRUCTOR
 * HySphere(radius, position)
 *  radius (Float) : 반지름.
 *  position (HyPosition) : 위치.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { HyPosition } from './position.js';
import { HyFace } from './face.js';
import { HyEdges } from './edges.js';
import { scene } from './core.js';

const HYPER_SPHERE_DEFAULT_RADIUS = 1;
const HYPER_SPHERE_QUALITY = 128;

class HySphere extends HyFace {
	constructor(radius, position) {
		super();

		var local_radius = (radius !== undefined) ? radius : HYPER_SPHERE_DEFAULT_RADIUS;

		var geometry = new THREE.SphereGeometry(local_radius, HYPER_SPHERE_QUALITY, HYPER_SPHERE_QUALITY);
		var material = new THREE.MeshBasicMaterial();
		material.setValues({ colorWrite: false });
		this.mesh = new THREE.Mesh(geometry, material);

		this.edges = new HyEdges(geometry);

		this.position = (position !== undefined) ? position : new HyPosition();
		this.translatePosition(this.position);

		scene.add(this.mesh);
	}
}

export { HySphere };