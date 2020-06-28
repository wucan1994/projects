export const MYCENTER_LOGIN = 'MYCENTER_LOGIN';

export function mycenterLogin(payload) {
  return {
    type: MYCENTER_LOGIN,
    payload,
  };
}
