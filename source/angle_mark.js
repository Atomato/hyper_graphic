function getAngleMarkPosition(position_a, position_b, position_c, size, over180) {
	var local_size = (size !== undefined) ? size : 0.3;
	var position_a0 = position_a.clone();
	var position_b0 = position_b.clone();
	var position_c0 = position_c.clone();

	var local_over180 = (over180 !== undefined) ? over180 : false;

	var position = position_b0.clone();
	position_a0.addScaledVector(position_b0, -1);
	position_c0.addScaledVector(position_b0, -1);
	position_a0.normalize();
	position_c0.normalize();

	var scale = ((local_over180) ? -1 : 1) * local_size;

	position.addScaledVector(position_a0, scale);
	position.addScaledVector(position_c0, scale);

	return position;
}

export { getAngleMarkPosition };