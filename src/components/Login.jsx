import React from 'react';
import styled from 'styled-components';


export default function Login() {
    const handleClick = () => {
        // login button clicked
        const clientID = '471bf7aacc6a42a191d8af4b6a83d0aa';
        const redirectURL = 'http://localhost:3000/';
        const apiURL = 'https://accounts.spotify.com/authorize';
           
        
        window.location.href=`${apiURL}?client_id=${clientID}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
    };
    
    return (
       <Container>
           <img 
           src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" 
            alt=''/>
           <button onClick={handleClick}> Connect Spotify </button>
       </Container>
    );
}

// styling the div part only
const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: #1db954;
    gap: 5rem;
    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        outline: none;
        background: black;
        color: #49f585;
        font-size: 1.4rem;
        cursor: pointer;
    }
`


