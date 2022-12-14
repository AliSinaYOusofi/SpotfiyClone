import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import axios from 'axios';

const CurrentTrack = () => {
    const [{token, currentlyPlaying}, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/player/currently-playing',
                {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    },
                }
            );
            
            if (response.data !== "") {
                const { item } = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artist: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url
                }
                dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying});
            } 
            
        };
        getCurrentTrack();
    }, 
    [token, dispatch]);

    return (
        <Container>
             {
                 currentlyPlaying && (
                     <div className="track">
                         <div className="track__image">
                             <img 
                                src={currentlyPlaying.image} alt="playing" />
                         </div>
                         <div className="track__info">
                                <h4> {currentlyPlaying.name} </h4>
                                <h6> {currentlyPlaying.artist.join(", ")}</h6>
                            </div>
                     </div>
                 )
             }
        </Container>
    ); 
}
const Container = styled.div`
    .track {
        display: flex;
        align-items: center;
        flex: row wrap;
        gap: 1rem;

        h4, h6 {
            font-size: 1rem;
        }
    }
`

export default CurrentTrack;

