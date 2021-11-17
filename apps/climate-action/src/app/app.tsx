import styles from './app.module.scss';
import P5Canvas from './components/P5Canvas/P5Canvas';
import { formFields } from './components/VennDiagramForm/formFields';
import VennDiagramForm from './components/VennDiagramForm/VennDiagramForm';
import YouTubeEmbed from './components/YouTubeEmbed/YouTubeEmbed';
import { CLIMATE_YT_EMBDED_ID } from './constants';

export function App() {
  return (
    <div className={styles.app}>
      <div className={styles.fullscreen_bg}>
        <P5Canvas />
      </div>
      <header style={{ margin: '1.5em auto', position: 'relative' }}>
        <h1>Ripples Beyond Myself</h1>
      </header>

      <main>
        <YouTubeEmbed embedId={CLIMATE_YT_EMBDED_ID} />
        <VennDiagramForm formFields={formFields} />
      </main>
    </div>
  );
}

export default App;
