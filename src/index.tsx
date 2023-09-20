import { createRoot } from 'react-dom/client';
import TSX from '@/pages/tsx';
import JSX from '@/pages/jsx';
import image from './favicon.png';

const root = createRoot(document.getElementById('app'));
root.render(
  <>
    <JSX />
    <TSX />
    <img
      src={image}
      alt=""
    />
  </>
);
