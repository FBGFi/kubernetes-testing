import React from 'react';
import { render, screen } from '@testing-library/react';
import TestingComponent from './index';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const mockData = [
    "bar",
    "foo"
]

const server = setupServer(
    rest.get('/api/bar', (req, res, ctx) => {
        return res(ctx.json(mockData));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Basic component rendering', () => {
    const { container } = render(<TestingComponent />);
    expect(container.firstChild).toHaveClass('TestingComponent');
});

test('API mock test with async rendering', async () => {
    render(<TestingComponent />);

    const fooBar = await screen.findAllByRole('listitem');
    expect(fooBar).toHaveLength(2);
    expect(fooBar[0]).toHaveTextContent("bar");
    expect(fooBar[1]).toHaveTextContent("foo");
});

test('Test server errors', async() => {
    server.use(
        rest.get('/api/bar', (req, res, ctx) => {
            return res(ctx.status(500), ctx.json({message: "Error"}));
        })
    )
    render(<TestingComponent />);
    expect(await screen.findByText("Data not fetched")).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});