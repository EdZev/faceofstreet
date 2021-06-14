import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/dom';
import testingLibraryUserEvent from '@testing-library/user-event';
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import init from '../src/init';

const { Response } = jest.requireActual('node-fetch');
const userEvent = testingLibraryUserEvent;

jest.mock('node-fetch');

const pathToFile = (filename) => path.resolve(__dirname, `__fixtures__/${filename}`);
const fileData = (filename) => fs.readFile(pathToFile(filename), 'utf-8');
const setHtml = async (filename) => {
  document.body.innerHTML = await fileData(filename);
};

test('district', async () => {
  const dataXlsx = await fs.readFile(pathToFile('districtsForTest.xlsx'));
  const expectedLen = await fileData('expectedLen.html');
  const expectedSvrd = await fileData('expectedSvrd.html');
  fetch.mockReturnValue(Promise.resolve(new Response(dataXlsx)));
  await setHtml('source.html');
  await init();
  expect(fetch).toHaveBeenCalledWith('./assets/districts.xlsx');
  expect(document.body.innerHTML).toEqual(expectedLen);
  userEvent.click(screen.getByText('Свердловский район'));
  expect(document.body.innerHTML).toEqual(expectedSvrd);
});

test('modal', async () => {
  const dataXlsx = await fs.readFile(pathToFile('districtsForTest.xlsx'));
  const expectedLen = await fileData('expectedLen.html');
  fetch.mockReturnValue(Promise.resolve(new Response(dataXlsx)));
  await setHtml('source.html');
  await init();
  expect(fetch).toHaveBeenCalledWith('./assets/districts.xlsx');
  expect(document.body.innerHTML).toEqual(expectedLen);
  const preview = screen.getByAltText(/Духовная семинария. Бизнес-центр «Бажов» Монастырска 12/i);
  userEvent.click(preview);
  await waitFor(() => {
    expect(screen.queryByAltText(/images\/len\/002m.jpg/i)).toBeInTheDocument();
  });

  const buttonLeft = screen.getByTestId('prev');
  userEvent.click(buttonLeft);
  await waitFor(() => {
    expect(screen.queryByAltText(/images\/len\/003m.jpg/i)).toBeInTheDocument();
  });

  const buttonRight = screen.getByTestId('next');
  userEvent.click(buttonRight);
  await waitFor(() => {
    expect(screen.queryByAltText(/images\/len\/002m.jpg/i)).toBeInTheDocument();
  });

  const buttonPlay = screen.getByTestId('play');
  const imgOld = screen.queryByAltText(/images\/len\/002o.jpg/i);
  userEvent.click(buttonPlay);
  await waitFor(() => {
    expect(imgOld).toHaveClass('animation-paused');
  });
});

test('get data error', async () => {
  const expectedError = await fileData('expectedError.html');
  fetch.mockReturnValue(Promise.resolve(new Error('not found')));
  await setHtml('source.html');
  await init();
  expect(fetch).toHaveBeenCalledWith('./assets/districts.xlsx');
  expect(document.body.innerHTML).toEqual(expectedError);
});
