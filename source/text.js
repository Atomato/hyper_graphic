/* HyText : Text 객체
 * CONSTRUCTOR
 * HyText(string, position, size, color)
 *  string : 글 내용.
 *  position (HyPosition) : Text box의 왼쪽 아래 지점. 기본값은 원점.
 *  size (Float) : 글자 크기.
 *  color : 글자 색.
 * METHODS
 * setColor(color) : 글자 색 지정.
 *  color (Color) : 글자 색.
 * TODO
 * font 선택 가능하게
 * COMMENTS
 * font loader 구조상의 한계로, geometry에 대한 사후 변경이 어려움.
 */

import * as THREE from '../submodules/three.js/build/three.module.js';
import { scene } from './core.js';
import { text_list } from './core.js';
import { HyPosition } from './position.js';

const HYPER_TEXT_DEFAULT_FONT = '../submodules/three.js/examples/fonts/helvetiker_regular.typeface.json';
const HYPER_TEXT_DEFAULT_SIZE = 0.2;
const HYPER_TEXT_DEFAULT_HEIGHT = 0.01;
const HYPER_TEXT_DEFAULT_COLOR = 0x000000;

class HyText {
	constructor(string, position, size, color) {
		var local_position = (position !== undefined) ? position : new HyPosition();
		var local_size = (size !== undefined) ? size : HYPER_TEXT_DEFAULT_SIZE;
		var local_color = (color !== undefined) ? color : HYPER_TEXT_DEFAULT_COLOR;

		var obj = this;

		this.material = new THREE.MeshBasicMaterial({ color: local_color });
		var this_material = this.material;

		var font_loader = new THREE.FontLoader();
		font_loader.load(HYPER_TEXT_DEFAULT_FONT, function (font) {
			var geometry = new THREE.TextGeometry(string, {
				font: font,
				size: local_size,
				height: HYPER_TEXT_DEFAULT_HEIGHT
			});
			geometry.translate(local_position.x, local_position.y, local_position.z);
			geometry.computeBoundingBox();
			var text_size = new THREE.Vector3();
			geometry.boundingBox.getSize(text_size);
			geometry.translate(-text_size.x / 2, -text_size.y / 2, -text_size.z / 2);

			obj.mesh = new THREE.Mesh(geometry, this_material);
			scene.add(obj.mesh);
			text_list.push(obj.mesh);
		});
	}

	setColor(color) {
		this.material.setValues({ color: color });
	}
}

export { HyText };