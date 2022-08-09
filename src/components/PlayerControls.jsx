import React from 'react';
import styled from 'styled-components';
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle
}from 'react-icons/bs';

import {
    CgPlayTrackNext,
    CgPlayTrackPrev
} from 'react-icons/cg';

import {FiRepeat} from 'react-icons/fi';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

const PlayerControls = () => {
    
    const [{ token, playerState}, dispatch] = useStateProvider();
    const changeTrack = async (type) => {
        // this is currently not working 
        // because i don't own a premium account on spotfiy
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`, {},
            {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                },
            }
        );
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
        } else {
            dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying : null});
        }
    };

    const changeState = async () => {
        const state = playerState ? 'pause' : 'play';

        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                },
            }
        );
        dispatch({type: reducerCases.SET_PLAYER_STATE, playerState : !playerState});
    };
   


    return (
        <Container>
             <div className="shffle">
                 <BsShuffle />
             </div>
             <div className="previous">
                 <CgPlayTrackPrev onClick={() => changeTrack("previous")}/>
             </div>
             <div className="state">
                 {
                     playerState ? <BsFillPauseCircleFill onClick={changeState}/> 
                     : <BsFillPlayCircleFill onClick={changeState}/>
                 }
             </div>
             <div className="next">
                 <CgPlayTrackNext onClick={() => changeTrack("next")}/>
             </div>
             <div className="repeat">
                 <FiRepeat />
             </div>
        </Container>
    );
}

export default PlayerControls;
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    svg {
        color: #b3b3b3;
        transition: all 0.2s ease-in-out;
        &:hover {
            color: wheat;
        }
    }

    .state {
        svg {
            color: white;
        }
    }
    .previous, .next, .state {
        font-size: 2rem;
    }

`