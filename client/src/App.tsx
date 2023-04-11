import { FC } from 'react';

import CanvasModel from './canvas/CanvasModel';
import Home from './views/Home';
import Customizer from './views/Customizer';

const App: FC = () => {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel />
      <Customizer />
    </main>
  );
};

export default App;
