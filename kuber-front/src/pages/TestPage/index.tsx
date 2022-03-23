import React from 'react';
import './TestPage.css';
import Page from 'pages/Page';
import { io } from 'socket.io-client';
import { SocketClass } from 'constants/classes/SocketClient';

type TTestPageProps = {
	
}

const socket = io("http://localhost:3001", {
	reconnectionDelayMax: 10000,
	reconnectionAttempts: 3
});
socket.on('error', () => console.log("Connection error"));
socket.on('unauthorized', (res) => console.log(res));
socket.on('connect', () => console.log("Connected"));

const TestPage: React.FC<TTestPageProps> = (props) => {
	return (
		<Page className='TestPage'>
		</Page>
	);
}

export type { TTestPageProps };
export {  };
export default TestPage;
