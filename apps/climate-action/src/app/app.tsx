import styles from './app.module.scss';
import { formFields } from './components/VennDiagramForm/formFields';
import VennDiagramForm from './components/VennDiagramForm/VennDiagramForm';
import YouTubeEmbed from './components/YouTubeEmbed/YouTubeEmbed';
import { CLIMATE_YT_EMBDED_ID } from './constants';

export function App() {

  return (
    <div className={styles.app}>
      <header className="flex" style={{margin: '1.5em auto'}}>
        <h1>Ripples Beyond Myself</h1>
      </header>
      <main>
        <YouTubeEmbed embedId={CLIMATE_YT_EMBDED_ID} />
        <VennDiagramForm
          formFields={formFields}
          // onChangeHandler={onChangeHandler}
          // onSubmitHandler={onSubmitHandler}
        />
      </main>
    </div>
  );
}

export default App;
