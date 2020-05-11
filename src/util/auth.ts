export function redirectLogin() {
  const currentUrl = window.location.href;
  window.sessionStorage.setItem('urlRedirectAfterLogin', currentUrl);
  const baseUrl = window.location.protocol + '//' + window.location.host;
  window.location.href = `${baseUrl}/oauth2/authorization/keycloak`;
}

export function checkSessionRedirectAfterLandIn() {
  const urlRedirectAfterLogin = window.sessionStorage.getItem('urlRedirectAfterLogin');
  if (urlRedirectAfterLogin) {
    window.sessionStorage.removeItem('urlRedirectAfterLogin');
    window.location.href = urlRedirectAfterLogin;
  }
}
