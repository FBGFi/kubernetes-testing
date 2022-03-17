import React from 'react';
import { render } from '@testing-library/react';
import TestPage from './index';

test('TestPage rendering', () => {
	const { container } = render(<TestPage />);
	expect(container.firstChild).toHaveClass('Page TestPage');
});
