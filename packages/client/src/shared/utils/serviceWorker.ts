export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(
        () => {
          console.info('ServiceWorker успешно зарегестрирован');
        },
        error => {
          console.error(`Ошибка регистрации ServiceWorker: ${error}`);
        }
      );
    });
  } else {
    console.warn('ServiceWorker не поддерживается');
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
  }
}
