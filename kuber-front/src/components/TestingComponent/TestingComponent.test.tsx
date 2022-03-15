import React from 'react';
import { render } from '@testing-library/react';
import TestingComponent from './index';

test('Basic component rendering', () => {
    const { container } = render(<TestingComponent />);
    expect(container.firstChild).toHaveClass('TestingComponent');
});