import React from 'react';
import {ThemeProviderContainer} from './theme';
import {Home,Board} from "./component";

const App:React.FC = () => {
  return (
    <ThemeProviderContainer>
      <Home>
        <Board />
      </Home>
    </ThemeProviderContainer>
  );
}

export default App;
