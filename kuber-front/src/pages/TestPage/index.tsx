import React from 'react';
import './TestPage.css';
import Page from 'pages/Page';
import ChartsWithClass from 'components/ChartsWithClass';

type TTestPageProps = {
	
}

const TestPage: React.FC<TTestPageProps> = (props) => {
	return (
		<Page className='TestPage'>
			<ChartsWithClass />
		</Page>
	);
}

export type { TTestPageProps };
export {  };
export default TestPage;
