import React, { useEffect, useState } from 'react'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBValidation,
    MDBValidationItem,
    MDBFooter,
    MDBSpinner
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signin } from '../states/reducers/auth-reducer';
import { useAppDispatch, useAppSelector } from '../hooks';

interface Form {
    email: string;
    password: string;
}

export const Signin = () => {
    const [formValue, setFormValue] = useState<Form>({ email: "", password: "" })
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(({auth}) => auth);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(signin({ ...formValue, navigate, toast }));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <div style={{ alignContent: "center", margin: "auto", maxWidth: 450, marginTop: 120 }} >
            <MDBCard alignment='center' >
                <MDBIcon fas icon="user-circle" className='fa-2x' />
                <h5>Sign in</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={onSubmit} noValidate className='row g-3'>
                        <MDBValidationItem
                            feedback="Please provide your email"
                            invalid
                            className="col-md-12" >
                            <MDBInput
                                label="Email"
                                type="email"
                                name="email"
                                value={formValue.email}
                                onChange={onFormChange}
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback="Please provide your password"
                            invalid
                            className="col-md-12" >
                            <MDBInput
                                label="Passowrd"
                                type="password"
                                name="password"
                                value={formValue.password}
                                onChange={onFormChange}
                                required
                            />
                        </MDBValidationItem>
                        <div className='col-md-12'>
                            <MDBBtn
                                className='mt-2 col-md-12'
                                size='sm'
                                role="status"
                            >
                                {loading && (
                                    <MDBSpinner
                                        size="sm"
                                        role="status"
                                        tag="span"
                                        className="me-2"
                                    />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBFooter>
                    <Link to="/signup">
                        <p>Don't have an account? Sign Up</p>
                    </Link>
                </MDBFooter>
            </MDBCard>
        </div >
    );
}