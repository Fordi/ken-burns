import html from 'html';
import css from 'css';
import { useState, useEffect } from 'preact/hooks';
import useUid from 'useUid';

const styles = css`
  .kenBurnsStack {
    background: #FFF;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
  }
  .kenBurnsImage {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 5s;
    z-index: 0;
  }
  .kenBurnsImage.visible {
    opacity: 1;
    transition: opacity 1s;
    z-index: 2;
  }
  .kenBurnsImage .img {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    height: auto;
    background: #000;
    backface-visibility: hidden;
  }
  .kenBurnsImage.visible img {
    transform: scale(1.25) rotate(0deg) translate(0, 0) !important;
  }
  .intro {
    position: absolute;
    margin: 2em;
    padding: .2em .6em;
    cursor: pointer;
    color: #FFF;
    font-size: 2em;
    max-width: 26em;
    left: 0;
    bottom: 0;
    text-shadow: 0 0 0.25em black;
  }
  .intro h1 {
    margin-bottom: .5em;
    line-height: 1;
    font-weight: 100;
  }
`;

const KenBurnsStack = ({
  className = '',
  fadeTime = 6,
  images = [],
}) => {
  const [extended] = useState(() => images.map(image => ({
    ...image,
    scale: 1 + Math.random() * 0.5,
    rotate: Math.random() * 4 - 2,
    translate: [0, 0],
  })));
  const [visible, setVisible] = useState(-1);
  useEffect(() => setVisible(0), []);
  useEffect(() => {
    const int = setInterval(() => {
      setVisible(vis => (vis + 1) % images.length);
    }, fadeTime * 1000);
    return () => {
      clearInterval(int);
    };
  }, [images.length, fadeTime]);
  return html`
    <div
      className=${styles.kenBurnsStack.and(className)}
      onClick=${() => setVisible(vis => (vis + 1) % images.length)}
    >
      ${extended.map(({
        url,
        headline,
        description,
        scale,
        rotate,
        translate,
      }, index) => {
        return html`
          <div
            className=${styles.kenBurnsImage.and(index === visible && styles.visible)}
          >
            <div 
              className=${styles.img}
              title=${headline}
              style=${{
                transform: `scale(${scale}) rotate(${rotate}deg) translate(${translate[0]}px, ${translate[1]}px)`,
                transition: `transform ${fadeTime}s`,
                backgroundImage: `url('${url}')`,
                backgroundPosition: 'center',
              }}
            />
            <div className=${styles.intro}>
              <h1>${headline}</h1>
              <p>${description}</p>
            </div>
          </div>
        `
      })}
    </div>
  `;
};

export default KenBurnsStack;