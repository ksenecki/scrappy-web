import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchableList from './SearchableList';

const el = document.getElementById('root');
// eslint-disable-next-line no-use-before-define
const root = ReactDOM.createRoot(el!);

const App = () => {
  return (
    <div>
      <SearchableList />
    </div>
  );
};

root.render(<App />);
