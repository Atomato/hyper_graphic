/* HyCurvedAngleLine : ���� ��ȣ�� ǥ���ϴ� �� ��ü.
 * CONSTRUCTOR
 * HyCurvedAngleLine(position_a, position_b, position_c, size, over180)
 *  position_a (HyPosition) : ��ABC�� A ����.
 *  position_b (HyPosition) : ��ABC�� B ����.
 *  position_c (HyPosition) : ��ABC�� C ����.
 *  size (Float) : ��ȣ�� ������. �⺻���� 0.3.
 *  over180 (Boolean) : true�� ��� 180�� �̻��� �� ǥ��. �⺻���� false.
 */

import { HyAngleLine } from './angle_line.js';

const HYPER_CURVED_ANGLE_LINE_QUALITY = 128;

class HyCurvedAngleLine extends HyAngleLine {
    constructor(position_a, position_b, position_c, size, over180) {
        super(position_a, position_b, position_c, size, over180, HYPER_CURVED_ANGLE_LINE_QUALITY);
    }
}

export { HyCurvedAngleLine };