import React from 'react';
import { render } from '@testing-library/react';
import Page from './index';

test('Page template rendering', () => {
	const { container } = render(<Page className='Test' />);
	expect(container.firstChild).toHaveClass('Page Test');
});
