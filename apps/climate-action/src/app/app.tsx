import styles from './app.module.scss';
import GradientBackground from './components/GradientBackground/GradientBackground';
import P5Canvas from './components/P5Canvas/P5Canvas';
import ReflectionPrompt from './components/ReflectionPrompt/ReflectionPrompt';
import { formFields } from './components/VennDiagramForm/formFields';
import VennDiagramForm from './components/VennDiagramForm/VennDiagramForm';
import YouTubeEmbed from './components/YouTubeEmbed/YouTubeEmbed';
import { CLIMATE_YT_EMBDED_ID } from './constants';

export function App() {
  return (
    <>
      <div className={styles.app}>
        <header style={{ margin: '1.5em auto', position: 'relative' }}>
          <h1>Ripples Beyond Myself</h1>
          <p>An Audio Visual Exercise on Climate Solutions</p>
        </header>

        <main>
          <GradientBackground>
            <div className={styles.prompt}>
              <p>
                If you have not yet watched the audio visual piece, I invite you
                to watch it below.
              </p>
              <p>
                Otherwise, the Climate Action Venn Diagram Reflection is below.
              </p>
              <br />
            </div>
          </GradientBackground>
          <YouTubeEmbed embedId={CLIMATE_YT_EMBDED_ID} />
          <ReflectionPrompt />
          <VennDiagramForm formFields={formFields} />
        </main>
      </div>
      <div className={styles.fullscreen_bg}>
        <P5Canvas />
      </div>
    </>
  );
}

export default App;
