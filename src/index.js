import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GalleryOfImages from './GalleryOfImages';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GalleryOfImages />, document.getElementById('root'));
registerServiceWorker();
