/* HyPoint : 점 객체.
 * CONSTRUCTOR
 * HyPoint(position, color, size)
 *  position (HyPosition) : 점의 위치. 기본값은 원점.
 *  color (Color) : 점의 색. 기본값은 검정.
 *  size : 점의 크기. 기본값은 0.05.
 * METHODS
 * setPosition(position) : 점의 위치 지정.
 *  position (HyPosition) : 점의 위치.
 * setColor(color) : 점의 색 지정.
 *  color (Color) : 점의 색.
 * [Deleted] setSize(size) : 점의 크기 지정.
 *  size (Number) : 점의 크기.
 */

import { HySphere } from './sphere.js';

const HYPER_POINT_DEFAULT_SIZE = 0.05;
const HYPER_POINT_DEFAULT_COLOR = 0x000000;

class HyPoint extends HySphere {
	constructor(position, color, size) {
		super((size !== undefined) ? size : HYPER_POINT_DEFAULT_SIZE, position);

		var local_color = (color !== undefined) ? color : HYPER_POINT_DEFAULT_COLOR;

		this.setColor(local_color);
	}

	setColor(color) {
		this.setLineColor(color);
	}
}

export { HyPoint };