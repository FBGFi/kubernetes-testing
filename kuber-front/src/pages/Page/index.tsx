import React from 'react';
import './Page.css';

type TPageProps = {
	className: string
}

const Page: React.FC<TPageProps> = (props) => {
	return (
		<div className={'Page ' + props.className}>
			{props.children}
		</div>
	);
}

export type { TPageProps };
export {  };
export default Page;
