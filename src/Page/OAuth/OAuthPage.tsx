import React, { useEffect } from 'react';
import Axios, { AxiosError } from 'axios';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';

// Axios.interceptors.response.use((response) => {
//     return response;
// }, function (error) {
//     console.log(error)
//     return Promise.reject(error.response);
// });

export function OAuthPage() {
  useEffect(() => {
    // Axios.request({
    //   method: 'get',
    //   url: 'http://localhost:8080/oauth2/authorization/keycloak',
    //   maxRedirects: 0,
    // }).then(
    //   (resp) => {
    //     console.log('resp', resp);
    //   },
    //   (err: AxiosError) => {
    //     console.log('err', err.toJSON());
    //   }
    // );

    window.location.href = 'http://localhost:8080/oauth2/authorization/keycloak';
  }, []);

  // 'http://192.168.50.251:6180/auth/realms/humpback_dev/protocol/openid-connect/auth?response_type=code&client_id=humpback-gateway&scope=openid%20profile%20email%20resource.read%20roles&state=4LaaTNoTFf95DRriApvwGTaXjDAS8brcEDN3kN2cQoc%3D&redirect_uri=http://localhost:8080/login/oauth2/code/keycloak&nonce=m7zFACeqztoGbQb5cJ8mL4QAntgfbYgtgO990LTIOns'
  return <div>hi</div>;
}
