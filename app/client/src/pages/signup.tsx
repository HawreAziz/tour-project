import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBBtn,
    MDBValidation,
    MDBValidationItem,
    MDBIcon,
    MDBFooter,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../states';
import { useAppDispatch, useAppSelector } from '../hooks';


interface SignupProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Signup = () => {
    const INITIAL_PROPS = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const [formValue, setFormValue] = useState<SignupProps>(INITIAL_PROPS);
    const { email, firstName, lastName, password, confirmPassword } = formValue;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { error } = useAppSelector(auth => auth);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const passwordsDoesNotMatch = password !== confirmPassword;
        if (passwordsDoesNotMatch) {
            toast.error("Passwords should match");
        }
        if (email && password && firstName && lastName && !passwordsDoesNotMatch) {
            dispatch(signup({ email, password, name: `${firstName} ${lastName}`, navigate, toast }));
        }
    }

    const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormValue({ ...formValue, [name]: value });
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


    return (
        <div style={{ alignContent: "center", margin: "auto", maxWidth: 420, marginTop: 120 }}>
            <MDBCard alignment='center'>
                <MDBCardBody>
                    <MDBIcon fas icon="user-circle" className="fa-2x" />
                    <h5>Sign Up</h5>
                    <MDBValidation onSubmit={onSubmit} noValidate className="row g-3">
                        <MDBValidationItem
                            feedback="Please provide first name"
                            invalid
                            className="col-md-6"
                        >
                            <MDBInput
                                label="First Name"
                                type="text"
                                required
                                value={firstName}
                                name="firstName"
                                onChange={onFormChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback="Please provide a last name"
                            invalid
                            className="col-md-6"
                        >
                            <MDBInput
                                label="Last Name"
                                type="text"
                                required
                                name="lastName"
                                value={lastName}
                                onChange={onFormChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback="Please provide an email"
                            invalid
                            className='col-md-12'
                        >
                            <MDBInput
                                label="Email"
                                name="email"
                                value={email}
                                type="email"
                                onChange={onFormChange}
                                required
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback="Please provide a password"
                            invalid
                            className='col-md-12'
                        >
                            <MDBInput
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                required
                                onChange={onFormChange}
                            />
                        </MDBValidationItem>
                        <MDBValidationItem
                            feedback=""
                            invalid
                            className="Password does not match"
                        >
                            <MDBInput
                                label="Password Confirm"
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                required
                                onChange={onFormChange}
                            />
                        </MDBValidationItem>
                        <MDBBtn
                            size='lg'
                            role="status"
                            className='mt-4 col-md-12'
                        >
                            Sign Up
                        </MDBBtn>
                    </MDBValidation>
                </MDBCardBody>
                <MDBFooter className="p-2">
                    <Link to="/signin">Already have an account? Sign In</Link>
                </MDBFooter>
            </MDBCard>
        </div>
    );
}
