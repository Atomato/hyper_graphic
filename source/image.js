/* HyImage : �׸� ��ü
 * CONSTRUCTOR
 * HyImage(url, width, height)
 *  url : �׸� file ���
 *  width : ���� ����
 *  height : ���� ����
 * METHODS
 * setPosition(position) : �׸��� �̵�.
 *  position : �׸��� �߽� ��ġ.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';

import { scene } from './core.js';

class HyImage {
	constructor(url, width, height) {
		this.position = new THREE.Vector3();
		var loader = new THREE.ImageBitmapLoader();
		loader.setOptions({ imageOrientation: 'flipY' });
		var hy_image = this;
		this.geometry = new THREE.PlaneGeometry(width, height);

		loader.load(url, function (imageBitmap) {
			console.log(imageBitmap);
			var texture = new THREE.CanvasTexture(imageBitmap);
			var material = new THREE.MeshBasicMaterial({ map: texture, transparent : true });
			hy_image.mesh = new THREE.Mesh(hy_image.geometry, material);
			scene.add(hy_image.mesh);
		});
	}

	setPosition(position) {
		this.geometry.translate(-this.position.x, -this.position.y, -this.position.z);
		this.position = position;
		this.geometry.translate(position.x, position.y, position.z);
	}

}

export {HyImage};