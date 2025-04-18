import MockAdapter from 'axios-mock-adapter';
import { getStore } from '../../fixtures/store';
import http from '../../common/http';
import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_ERROR,
  DATA_AUTHORS_REQUEST,
  DATA_AUTHORS_SUCCESS,
  DATA_AUTHORS_ERROR,
} from '../actionTypes';
import fetchData, { fetchDataAuthors } from '../data';

const mockHttp = new MockAdapter(http.httpClient);

describe('data - async action creators', () => {
  describe('fetch data', () => {
    afterEach(() => {
      mockHttp.reset();
    });

    it('creates DATA_SUCCESS', async () => {
      mockHttp.onGet('/data/123').replyOnce(200, { foo: 'bar' });

      const expectedActions = [
        { type: DATA_REQUEST, payload: { recordId: 123 } },
        { type: DATA_SUCCESS, payload: { foo: 'bar' } },
      ];

      const store = getStore();
      await store.dispatch(fetchData(123));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates DATA_ERROR', async () => {
      mockHttp.onGet('/data/123').replyOnce(500, { message: 'Error' });

      const expectedActions = [
        { type: DATA_REQUEST, payload: { recordId: 123 } },
        {
          type: DATA_ERROR,
          payload: {
            error: { message: 'Error', status: 500 },
          },
          meta: { redirectableError: true },
        },
      ];

      const store = getStore();
      await store.dispatch(fetchData(123));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('data authors', () => {
  it('happy - creates DATA_AUTHORS_SUCCESS', async () => {
    mockHttp.onGet('/data/123/authors').replyOnce(200, {});

    const expectedActions = [
      { type: DATA_AUTHORS_REQUEST },
      { type: DATA_AUTHORS_SUCCESS, payload: {} },
    ];

    const store = getStore();
    await store.dispatch(fetchDataAuthors(123));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('unhappy - creates DATA_AUTHORS_ERROR', async () => {
    mockHttp.onGet('/data/123/authors').replyOnce(500);

    const expectedActions = [
      { type: DATA_AUTHORS_REQUEST },
      {
        type: DATA_AUTHORS_ERROR,
        payload: {
          error: { status: 500 },
        },
      },
    ];

    const store = getStore();
    await store.dispatch(fetchDataAuthors(123));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
