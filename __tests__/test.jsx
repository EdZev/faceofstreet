// @ts-check

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import 'regenerator-runtime/runtime.js';

import init from '../src/init.jsx';

const { Response } = jest.requireActual('node-fetch');

window.HTMLElement.prototype.scrollIntoView = jest.fn();

jest.mock('node-fetch');

const pathToFile = (filename) => path.resolve(__dirname, `__fixtures__/${filename}`);
const fileData = (filename) => fs.readFile(pathToFile(filename), 'utf-8');

test('app', async () => {
  const dataXlsx = await fs.readFile(pathToFile('districtsForTest.xlsx'));
  const pageLen = await fileData('expectedLen.html');
  const pageSvrd = await fileData('expectedSvrd.html');
  const pageModal = await fileData('expectedModal.html');
  const pageModalPause = await fileData('expectedModalPause.html');
  const pageModalNext = await fileData('expectedModalNext.html');
  const pageModalPrev = await fileData('expectedModalPrev.html');
  fetch.mockReturnValue(Promise.resolve(new Response(dataXlsx)));
  const app = await init();
  render(app);
  expect(document.body.innerHTML).toEqual(pageLen);

  const buttons = screen.getAllByRole('button');
  const numberButtonNav = 1;
  userEvent.click(buttons[numberButtonNav]);
  userEvent.click(screen.getByText('Свердловский район'));
  expect(document.body.innerHTML).toEqual(pageSvrd);

  const card = screen.getByAltText('Улица Сибирская');
  userEvent.click(card);
  expect(document.body.innerHTML).toEqual(pageModal);

  const buttonPause = screen.getByAltText('Pause');
  userEvent.click(buttonPause);
  expect(document.body.innerHTML).toEqual(pageModalPause);

  const buttonNext = screen.getByAltText('Right');
  userEvent.click(buttonNext);
  expect(document.body.innerHTML).toEqual(pageModalNext);

  const buttonPrev = screen.getByAltText('Left');
  userEvent.click(buttonPrev);
  expect(document.body.innerHTML).toEqual(pageModalPrev);
});
