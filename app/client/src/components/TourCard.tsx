import React from 'react'
import { Tour } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
    windowWidth: number;
    tour: Tour;
}

const TourCard = ({ tour, windowWidth }: Props) => {
    const { title, imageFile, description, tags, name } = tour;

    const trimText = (text: string): string => {
        if (text.length > 100) {
            return text.substring(0, 100) + " ...";
        }
        return text;
    }

    return (
        <div style={
            {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                minWidth: 300,
                height: 400,
                margin: 15,
                width: windowWidth * .22,
                backgroundColor: 'white',
                boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.3)",
            }
        }>
            <div style={{
                backgroundImage: `url(${imageFile})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                width: "100%",
                height: "50%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                justifyContent: "flex-start",
                border: "1px solid black",
                color: "white"
            }}>
                <h5 style={{ marginTop: 6, marginLeft: 8 }}>{name}</h5>
            </div>
            <div style={{
                display: 'flex',
                marginTop: 20,
                marginLeft: 10,
                justifyContent: "flex-start"
            }}>
                {
                    tags.map(tag => <p key={tag} style={{ marginRight: 2 }}>{`#${tag}`}</p>)
                }
            </div>
            <div style={{
                textAlign: 'left',
                paddingLeft: 10,
            }}>
                <h3>{title}</h3>
                <p>{trimText(description)}
                    <Link to={'/tourDetail'} style={{ alignSelf: "right" }}>
                        Read more.
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default TourCard;