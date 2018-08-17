import * as styles from './shared/styles/main.css';

import * as React from 'react';
import { render } from 'react-dom';

import { TestComponentA } from './components/TestComponentA';
import { TestComponentB } from './components/TestComponentB';

const app = (
  <div className={styles.box}>
    <TestComponentA />
    <TestComponentB />
  </div>
);

render(app, document.getElementById('app'));