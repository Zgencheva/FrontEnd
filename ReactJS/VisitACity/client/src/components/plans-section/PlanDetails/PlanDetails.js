import { useParams } from 'react-router-dom';

export const PlanDetails = () => {
    const { planId } = useParams();
    console.log(planId)

    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <h3>Hello to plan ${planId}</h3>

        </>
    );
}