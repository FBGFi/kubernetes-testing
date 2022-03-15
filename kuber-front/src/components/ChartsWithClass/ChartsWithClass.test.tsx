import React from 'react';
import { render } from '@testing-library/react';
import ChartsWithClass from './index';

test('Basic component rendering', () => {
	const { container } = render(<ChartsWithClass />);
	expect(container.firstChild).toHaveClass('ChartsWithClass');
});
