import React from 'react';
import './TestingComponent.css';

type TTestingComponentProps = {

}

const TestingComponent: React.FC<TTestingComponentProps> = (props) => {
    const [testData, setTestData] = React.useState<string[] | null>(null);

    const fetchFromApi = async (ac: AbortController) => {
        try {
            const res = await fetch('/api/bar', { signal: ac.signal });
            if (res.status !== 500) {
                const json = await res.json();
                setTestData(json);
            }
        } catch (error) {
            // Aborted
        }
    }
    React.useEffect(() => {
        // fetch from api
        const ac = new AbortController();
        fetchFromApi(ac);

        return (() => {
            ac.abort();
        })
    }, []);
    return (
        <div className='TestingComponent'>
            {testData ? <ul>{testData.map(d => <li key={d}>{d}</li>)}</ul> : <p>Data not fetched</p>}
        </div>
    );
}

export type { TTestingComponentProps };
export { };
export default TestingComponent;