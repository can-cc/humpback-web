import React, { useEffect } from 'react';

export function OAuthPage() {
  useEffect(() => {
    const baseUrl = window.location.protocol + '//' + window.location.host;
    window.location.href = `${baseUrl}/oauth2/authorization/keycloak`;
  }, []);
  return <div>Login...</div>;
}
