import store from './store';

export const CHOSE_PERSON = 'CHOSE_PERSON';

export function chosePersonAction(personId) {
  store.dispatch({
    type: CHOSE_PERSON,
    personId,
  });
}
