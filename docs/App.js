import html from 'html';
import css from 'css';
import { fadeTime, images } from './config.js';
import KenBurnsStack from './KenBurnsStack/index.js';

const styles = css`
  .app {
    width: 100vw;
    height: 100vh;
    cursor: none;
  }
`;

const { fade } = window.location.search.replace(/^\?/, '').split('&').reduce((obj, part) => {
  const [name, ...value] = part.split('=');
  obj[decodeURIComponent(name)] = decodeURIComponent(value.join('='));
  return obj;
}, {});

const App = () => {
  return html`
    <${KenBurnsStack} className=${styles.app} fadeTime=${fade || fadeTime} images=${images} />
  `;
};

export default App;
