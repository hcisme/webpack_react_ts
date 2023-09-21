import { createRoot } from 'react-dom/client';
import { sum } from './utils';

const root = createRoot(document.getElementById('app'));
root.render(<h1>{sum(1, 2)}</h1>);
