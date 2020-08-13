import styled, {keyframes} from "styled-components";

const appear = keyframes`
0 {
    opacity: 0;
} 
50% {

    opacity: 1;
}

100% {
    opacity: 0;
}

`;

export const TickerContainer = styled.div`
         display: ${(props) => (props.ticker === null ? "none" : "flex")};
         animation: ${appear} 2s ease-out 1;
         animation-fill-mode: backwards;
         width: 200px;
         justify-content: center;
         align-items: center;
         background: ${(props) =>
           props.ticker === "success"
             ? "rgb(68, 187, 164)"
             : "rgb(148, 19, 44)"};
         height: 50px;
         z-index: 100;
         position: absolute;
         top: 80px;
         opacity: 0;
         @media only screen and (orientation: Portrait) and (max-width: 600px) {
           top: 100px;
         }
       `;

export const TickerMessage = styled.p`
         color: white;
         font-family: "Montserrat", sans-serif;
       `;