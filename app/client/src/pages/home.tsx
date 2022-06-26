import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getTours } from '../states/reducers/tour-reducer';
import TourCard from '../components/TourCard';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { Tour } from '../../types';


export const Home = () => {
    const { tours, loading } = useAppSelector(({ tour }) => tour);
    const dispatch = useAppDispatch();
    const { innerWidth } = window;

    useEffect(() => {
        dispatch(getTours(""));
    }, []);


    if (loading) {
        return <MDBSpinner
            size='lg'
            className='m-10'
        />
    }

    return (
        <div style={{
            display: 'flex',
            flexFlow: 'row wrap',
            padding: 0,
            margin: 'auto',
            maxWidth: 1500,
            justifyContent: 'flex-start'
        }}>

            {tours?.map((tour: Tour) => {
                return <TourCard key={tour.id} tour={tour} windowWidth={innerWidth} />
            })}
        </div>
    )
}