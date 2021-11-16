import { Link, Route } from 'react-router-dom';
import styles from './app.module.scss';
import { formFields } from './components/VennDiagramForm/formFields';
import VennDiagramForm from './components/VennDiagramForm/VennDiagramForm';
import YouTubeEmbed from './components/YouTubeEmbed/YouTubeEmbed';
import { CLIMATE_YT_EMBDED_ID } from './constants';

export function App() {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('CHANGE')

    console.log(event.target.value);
  };

  const onSubmitHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log('SUBMIT')
    console.log(event.target);
  };

  return (
    <div className={styles.app}>
      <header className="flex">
        <h1>Welcome to climate-action!</h1>
      </header>
      <main>
        <YouTubeEmbed embedId={CLIMATE_YT_EMBDED_ID} />
        <VennDiagramForm
          formFields={formFields}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
        />
      </main>


      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </div>
  );
}

export default App;
