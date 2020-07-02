/* HyPoint : �� ��ü.
 * CONSTRUCTOR
 * HyPoint(position, color, size)
 *  position (HyPosition) : ���� ��ġ. �⺻���� ����.
 *  color (Color) : ���� ��. �⺻���� ����.
 *  size : ���� ũ��. �⺻���� 0.05.
 * METHODS
 * setPosition(position) : ���� ��ġ ����.
 *  position (HyPosition) : ���� ��ġ.
 * setColor(color) : ���� �� ����.
 *  color (Color) : ���� ��.
 * [Deleted] setSize(size) : ���� ũ�� ����.
 *  size (Number) : ���� ũ��.
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