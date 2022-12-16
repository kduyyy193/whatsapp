import styled from "styled-components";
import Image from "next/image";
import whatsappLogo from "../assets/whatsapplogo.png";
import { CircularProgress } from "@mui/material"

const StyledContaier = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`

const Loading = () => {

    return (
        <StyledContaier>
            <StyledImageWrapper>
                <Image src={whatsappLogo} alt="ERROR" height="200" width="200"></Image>
            </StyledImageWrapper>
            <CircularProgress />
        </StyledContaier>
    )
}

export default Loading
