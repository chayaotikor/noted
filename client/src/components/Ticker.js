import React from "react";
import { TickerContainer, TickerMessage } from "../style/ticker-styles";

export const Ticker = ({ message, ticker, error }) => {
  return (
    <TickerContainer ticker={ticker}>
      <TickerMessage>
        {error
          ? error
          : message
          ? message
          : null}
      </TickerMessage>
    </TickerContainer>
  );
};
