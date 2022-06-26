import React, { useEffect } from 'react'
import { MDBCardImage, MDBContainer } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getTour } from '../states/reducers/tour-reducer';


const TourDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { } = useAppSelector(({ tour }) => tour);

  useEffect((

  ) => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [dispatch])

  return (
    <>
      <MDBContainer>
        {/* <MDBCardImage src={} /> */}
      </MDBContainer>
    </>
  )
}

export default TourDetail;