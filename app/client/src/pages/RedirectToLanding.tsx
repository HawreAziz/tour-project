import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function RedirectToLanding() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        if (count === 0) {
            navigate('/signin');
        }
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div>Redirecting in {count} seconds...</div>
    )
}

export default RedirectToLanding;