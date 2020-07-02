import { animate } from './core.js';

import { setCameraOrthographic } from './core.js';
import { setCameraPerspective } from './core.js';
import { setControls } from './core.js';

//2���� �׷����� ǥ���ϰ� ���� �� �� �Լ��� ���� �� �� ȣ���ؾ���.
function init2(width, height) {
	setCameraOrthographic(width, height);
	setControls(2);
	animate();
}

//3���� �׷����� ǥ���ϰ� ���� �� �� �Լ��� ���� �� �� ȣ���ؾ���.
function init3(position) {
	setCameraPerspective(position);
	setControls(3);
	animate();
}

export { init2 };
export { init3 };