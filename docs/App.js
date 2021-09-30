import html from 'html';
import css from 'css';
import { fadeTime, images } from './config.js';
import KenBurnsStack from './KenBurnsStack/index.js';

const styles = css`
  .app {
    width: 100vw;
    height: 100vh;
  }
`;

const App = () => {
  return html`
    <${KenBurnsStack} className=${styles.app} fadeTime=${fadeTime} images=${images} />
  `;
};

export default App;
