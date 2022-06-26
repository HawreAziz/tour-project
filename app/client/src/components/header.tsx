import React, { useState } from 'react'
import {
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarLink,
} from 'mdb-react-ui-kit';
import { useAppSelector, useAppDispatch } from '../hooks';
import { signout } from '../states';


const Header: React.FunctionComponent = () => {
    const [show, setShow] = useState(true);
    const { user } = useAppSelector(({ auth }) => auth);
    const dispatch = useAppDispatch();


    return (
        <div style={{ marginBottom: 120 }}>
            <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ea", marginBottom: 120 }}>
                <MDBContainer>
                    <MDBNavbarBrand
                        href="/"
                        style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
                    >
                        Touropedia
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        onClick={() => setShow(!show)}
                        style={{ color: "#606080" }}
                    >
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={show} navbar>
                        <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                            {user?.id &&
                                <h5 style={{ marginRight: '20px', marginTop: '10px' }}>Logged in as: {user?.name}</h5>
                            }
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/">
                                    <p className="header-text">Home</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            {
                                user?.id ?
                                    <>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href="/addTour">
                                                <p className="header-text">Add Tour</p>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href="/dashboard">
                                                <p className="header-text">Dashboard</p>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                        <MDBNavbarItem>
                                            <MDBNavbarLink href="/">
                                                <p className="header-text" onClick={() => dispatch(signout())}>
                                                    Logout
                                                </p>
                                            </MDBNavbarLink>
                                        </MDBNavbarItem>
                                    </> :
                                    <MDBNavbarItem>
                                        <MDBNavbarLink href="/signin">
                                            <p className="header-text">Login</p>
                                        </MDBNavbarLink>
                                    </MDBNavbarItem>
                            }
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}


export { Header };
