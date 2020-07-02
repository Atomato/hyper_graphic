import { animate } from './core.js';

import { setCameraOrthographic } from './core.js';
import { setCameraPerspective } from './core.js';
import { setControls } from './core.js';

//2차원 그래픽을 표현하고 싶을 때 이 함수를 먼저 한 번 호출해야함.
function init2(width, height) {
	setCameraOrthographic(width, height);
	setControls(2);
	animate();
}

//3차원 그래픽을 표현하고 싶을 때 이 함수를 먼저 한 번 호출해야함.
function init3(position) {
	setCameraPerspective(position);
	setControls(3);
	animate();
}

export { init2 };
export { init3 };