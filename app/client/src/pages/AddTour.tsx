import React, { useState, useEffect } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBValidation,
    MDBTextArea,
    MDBBtn,
    MDBValidationItem
} from 'mdb-react-ui-kit';
import ChipInput from 'material-ui-chip-input';
import FileBase from 'react-file-base64';
import { Tour } from '../../types'
import { toast } from 'react-toastify';

const INITIAL_STATE: Tour = {
    // name: "",
    title: "",
    description: "",
    imageFile: "",
    tags: []
}

const AddTour = () => {
    const [tourData, setTourData] = useState<Tour>(INITIAL_STATE);

    // useEffect(() => {
    //     if (error) {
    //         toast.error(error);
    //     }
    // }, [error]);

    const onAddTag = (tag: string) => {
        setTourData({ ...tourData, tags: [...tourData.tags, tag] });
    }

    const onDeleteTag = (tag: string) => {
        setTourData({
            ...tourData,
            tags: tourData.tags.filter(currentTag => currentTag !== tag)
        })
    }
    const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        setTourData({ ...tourData, [name]: value });
    }


    const onClear = () => {
        setTourData(INITIAL_STATE);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("create tour");
        // createTour(tourData);
    }

    return (
        <div style={{
            margin: "auto",
            marginTop: '120px',
            alignContent: 'center',
            maxWidth: '450px'
        }}>
            <MDBCard alignment='center'>
                <MDBCardBody>
                    <h5 style={{ marginBottom: "20px", color: "#0d6efd" }}> Create Tour</h5>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className='row g-3'
                        noValidate
                    >
                        <div>
                            <MDBValidationItem
                                feedback="Please provide a title"
                                invalid
                                className='col-md-12'
                            >
                                <MDBInput
                                    placeholder="title"
                                    name="title"
                                    type="text"
                                    value={tourData.title}
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div>
                            <MDBValidationItem
                                feedback="Provide description"
                                invalid
                            >
                                <MDBTextArea
                                    placeholder="Type description"
                                    name="description"
                                    className='mt-3'
                                    value={tourData.description}
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div>

                            <ChipInput
                                className="mt-2"
                                value={tourData.tags}
                                style={{ width: "100%" }}
                                onAdd={(tag: string) => onAddTag(tag)}
                                onDelete={(tag: string) => onDeleteTag(tag)}
                                placeholder="Enter tags"
                            />
                        </div>
                        <MDBValidationItem
                            feedback="Please provide a file"
                            invalid
                        >
                            <div className="d-flex justify-content-start">
                                <FileBase
                                    className="mt-5"
                                    multiple={false}
                                    // type="file"
                                    onDone={({ base64 }: { base64: string }) => setTourData({ ...tourData, imageFile: base64 })}
                                    required
                                />
                            </div>
                        </MDBValidationItem>
                        <MDBBtn
                            role="statue"
                            className='mt-5'
                        >
                            Create
                        </MDBBtn>
                        <MDBBtn
                            role="statue"
                            className='mt-3 btn-danger'
                            onClick={() => onClear()}
                        >
                            Clear
                        </MDBBtn>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default AddTour;