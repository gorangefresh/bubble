import {createRoot} from 'react-dom/client';
import App from './App';
import {applyPalette} from './config/colors';

import './static/fonts/bubble-bobble-font/BubbleFont.css';

// Палитру в CSS до первого рендера, чтобы стили не мигнули без цветов.
applyPalette();

createRoot(document.getElementById('root')).render(<App/>);
