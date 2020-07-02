/* HyCurvedAngleLine : 각을 원호로 표시하는 선 객체.
 * CONSTRUCTOR
 * HyCurvedAngleLine(position_a, position_b, position_c, size, over180)
 *  position_a (HyPosition) : 각ABC의 A 지점.
 *  position_b (HyPosition) : 각ABC의 B 지점.
 *  position_c (HyPosition) : 각ABC의 C 지점.
 *  size (Float) : 원호의 반지름. 기본값은 0.3.
 *  over180 (Boolean) : true일 경우 180도 이상의 각 표시. 기본값은 false.
 */

import { HyAngleLine } from './angle_line.js';

const HYPER_CURVED_ANGLE_LINE_QUALITY = 128;

class HyCurvedAngleLine extends HyAngleLine {
    constructor(position_a, position_b, position_c, size, over180) {
        super(position_a, position_b, position_c, size, over180, HYPER_CURVED_ANGLE_LINE_QUALITY);
    }
}

export { HyCurvedAngleLine };