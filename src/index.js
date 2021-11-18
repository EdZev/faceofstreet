import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/template.css';
import 'xlsx/dist/xlsx.full.min.js';
import init from './init.jsx';

const run = async () => {
  const container = document.getElementById('container');
  const app = await init();
  ReactDOM.render(app, container);
};

run();
