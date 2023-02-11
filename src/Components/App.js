import "../Styles/App.sass";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./Navigation";
import Page from "./Page";

const App = () => (
  <Router>
    <div className="app">
      <aside className="app__aside">
        <Navigation />
      </aside>
      <main className="app__main">
        <Page />
      </main>
    </div>
  </Router>
);

export default App;
