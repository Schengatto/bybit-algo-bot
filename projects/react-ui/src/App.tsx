import { FunctionComponent } from 'react';
import './App.css';
import Header from './components/Header/Header';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header>
          <div><strong>Prova</strong></div>
        </Header>
      </header>
      <main>
        <div>Main</div>
      </main>
      <footer>
        Footer
      </footer>
    </div>
  );
}

export default App;
