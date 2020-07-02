// HyFace : 원, 다각형의 변, 면의 색 등을 처리하기 위한 상위 class

import * as THREE from '../submodules/three.js/build/three.module.js';

class HyFace {
	constructor() { }

	setFaceColor(color) {
		this.mesh.material.setValues({ colorWrite: true, color: color });
	}

	setLineColor(color) {
		this.edges.setLineColor(color);
	}

	hideLine() {
		this.edges.hide();
	}

	setLineWidth(width) {
		this.edges.setLineWidth(width);
	}

	setDashed() {
		this.edges.setDashed();
	}

	translatePosition(position) {
		this.mesh.geometry.translate(position.x, position.y, position.z);
		this.edges.translatePosition(position);
	}

	setPosition(position) {
		this.translatePosition(this.position.multiplyScalar(-1));
		this.position = position;
		this.translatePosition(this.position);
	}
}

export { HyFace };