// HyLine : 직선, 곡선의 material, 장식 관리를 위한 상위 class

import * as THREE from '../submodules/three.js/build/three.module.js';

const HYPER_LINE_DEFAULT_COLOR = 0x000000;

class HyLine {
	constructor() {
		this.arrows = [];
	}

	makeMaterial() {
		return new THREE.LineBasicMaterial({ color: HYPER_LINE_DEFAULT_COLOR });
	}

	hide() {
		this.mesh.material.setValues({ colorWrite: false });
	}

	showStartPointArrowMark(size) {
		this.showArrowMark(size, true);
	}

	showEndPointArrowMark(size) {
		this.showArrowMark(size, false);
	}

	setLineColor(color) {
		this.mesh.material.color.set(color);
	}

	setLineWidth(line_width) {
		this.mesh.material.linewidth = line_width;
	}

	setDashedCore(size) {
		var color = this.mesh.material.color;
		var linewidth = this.mesh.material.linewidth;
		var new_material = new THREE.LineDashedMaterial({ color: color, linewidth: linewidth, dashSize: size, gapSize: size / 3 });
		this.mesh.material = new_material;
	}
}

export { HyLine };