import React from 'react';
import { render } from '@testing-library/react';
import AnotherComponent from './index';

test('Basic component rendering', () => {
	const { container } = render(<AnotherComponent />);
	expect(container.firstChild).toHaveClass('AnotherComponent');
});
