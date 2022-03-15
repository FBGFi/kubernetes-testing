import React from 'react';
import { render } from '@testing-library/react';
import ChartTest from './index';

test('Basic component rendering', () => {
	const { container } = render(<ChartTest />);
	expect(container.firstChild).toHaveClass('ChartTest');
});
