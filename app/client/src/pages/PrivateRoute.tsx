import React from 'react'
import { useAppSelector } from '../hooks';
import RedirectToLanding from './RedirectToLanding';

type Props = {
    children: React.ReactElement;
}

function PrivateRoute({ children }: Props) {
    const { user } = useAppSelector(({ auth }) => auth)
    return user ? children : <RedirectToLanding />
}

export default PrivateRoute;