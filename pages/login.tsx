import { Button } from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import styled from "styled-components"
import whatsappLogo from "../assets/whatsapplogo.png"
import {useSignInWithGoogle} from "react-firebase-hooks/auth"
import { auth } from "../config/firebase"

const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;
`

const StyledLoginContaier = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px;
    background-color: white;
    border-radius: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`

const Login = () => {
    const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);
    const signIn = () => {
        signInWithGoogle()
    }
    return (
        <StyledContainer>
            <Head>
                <title>Log in</title>
            </Head>
            <StyledLoginContaier>
                <StyledImageWrapper>
                    <Image  src={whatsappLogo} alt="ERROR" height="200" width="200"></Image>
                </StyledImageWrapper>
                <Button variant="contained" onClick={signIn} >Sign In With Google</Button>
            </StyledLoginContaier>
        </StyledContainer>
    )
}

export default Login
