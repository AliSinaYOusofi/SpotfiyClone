import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { reducerCases } from '../utils/Constants';
import { useStateProvider } from '../utils/StateProvider';
import styled from 'styled-components';

function Playlist()  {
    
    const [{token, playlists}, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists',
                {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    },
                }
            );
            
            const {items} = await response.data;
            
            const playlists = items.map(({name, id}) => {
                return {name, id};
            });
            dispatch({type: reducerCases.SET_PLAYLISTS, playlists});
        };
        getPlaylistData();
    }, 
    [token, dispatch])      
    
    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId});
    }
    return (
        <Container>
            <ul>
              {
                  playlists.map( ({name, id}) => {
                      return (
                          <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name} </li> 
                      );
                  })
              }
            </ul>
        </Container>
    );
}
export default Playlist;

const Container = styled.div`
    ul {
            list-style-type: none;
            display: flex;
            flex-flow: column wrap;
            gap: 1rem;
            padding: 1rem;
            li {
                display: flex;
                gap: 1rem;
                cursor: pointer;
                transition: all 0.3s ease-in-out;
            }
            li:hover {
                color: white; 
            }
        }
`
