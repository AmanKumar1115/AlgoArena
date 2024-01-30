import Topbar from '@/components/Topbar/Topbar'
import Workspace from '@/components/Workspace/Workspace'
import useHasMounted from '@/hooks/useHasMounted';
import { problems } from "@/utils/problems";
import React from 'react'

const ProblemPage = ({ problem }) => {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
        return null;
    }

    return (
        <div>
            <Topbar problemPage={true} />
            <Workspace problem={problem} />
        </div>
    )
}

export default ProblemPage

//fetch the local data
//SSG - Static Site Generation
//getStaticPaths => it create the dynamic routes

export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params: { pid: key },
    }));

    return {
        paths,
        fallback: false,
    };
}

//getStaticProps = it fetch the data

export async function getStaticProps({ params }) {
    const { pid } = params;
    const problem = problems[pid];

    if (!problem) {
        return {
            notFound: true,
        };
    }
    //function cannot be serialized as JSON
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem,
        },
    };
}