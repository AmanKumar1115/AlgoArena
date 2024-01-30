import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';



const Workspace = ({ problem }) => {
    const { width, height } = useWindowSize();
    const [isClient, setIsClient] = useState(false);
    const [success, setSuccess] = useState(false);
    const [solved, setSolved] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Split className="split" minSize={0}>
            <ProblemDescription problem={problem} _solved={solved} />
            <div>
                <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
                {success && isClient && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />}
            </div>
        </Split>
    );
};

export default Workspace;
