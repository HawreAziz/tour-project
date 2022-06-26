import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { MDBSpinner, MDBCard, MDBRow, MDBCol, MDBCardImage, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardGroup, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { getToursByUser, deleteTour } from '../states/reducers/tour-reducer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Dashboard = () => {
    const { tour } = useAppSelector(tourData => tourData);
    const { user } = useAppSelector(tourData => tourData.auth);
    const userId = user ? user.id : null;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tour.error) {
            console.log("tour error");
            toast.error(tour.error);
        }
        if (userId) {
            dispatch(getToursByUser(userId));
        }

    }, [userId, tour.error]);

    if (tour.loading) {
        return <MDBSpinner size="lg" />
    }


    const truncateText = (text: string): string => text.length > 40 ? `${text.substring(0, 40)}...` : text;

    const handleDeleteTour = (id: string) => {
        dispatch(deleteTour(id));
    }


    return (
        <div
            style={{
                alignContent: "center",
                margin: "auto",
                padding: 120,
                maxWidth: 900
            }}
        >
            <h2 className='text-center'>Dashboard: {user?.name}</h2>
            <hr style={{ maxWidth: "600px" }} />
            {
                tour.userTours && tour.userTours.map(tour => {
                    return (
                        <MDBCardGroup key={tour.id}>

                            <MDBCard key={tour.id} style={{ maxWidth: "600px" }} className="mt-2">
                                <MDBRow className="g-0">
                                    <MDBCol md="4">
                                        <MDBCardImage src={tour.imageFile} alt="..." fluid />
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody>
                                            <MDBCardTitle className='text-start'>{tour.title}</MDBCardTitle>
                                            <MDBCardText className='text-start'>
                                                <small className="text=muted">
                                                    {truncateText(tour.description)}
                                                </small>
                                            </MDBCardText>
                                            <div style={{
                                                float: "right",
                                                marginTop: "-60px",
                                                marginLeft: "5px",
                                            }}>
                                                <MDBBtn color="none" tag="a" className='mt-1'>
                                                    <MDBIcon
                                                        fas
                                                        icon="trash"
                                                        style={{ color: "#dd4b39" }}
                                                        size="lg"
                                                        onClick={() => handleDeleteTour(tour.id)}
                                                    />
                                                </MDBBtn>
                                                <Link to={"/edittour"}>
                                                    <MDBIcon
                                                        fas
                                                        icon="edit"
                                                        size='lg'
                                                        style={{ marginLeft: "10px", color: "#55acee" }}
                                                    />

                                                </Link>
                                            </div>
                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCardGroup>
                    );
                })
            }
        </div>
    );
}

export default Dashboard;