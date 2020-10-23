import App from './App.svelte';

const app = new App({
	target: document.body
});

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
	  // [::1] is the IPv6 localhost address.
	  window.location.hostname === '[::1]' ||
	  // 127.0.0.0/8 are considered localhost for IPv4.
	  window.location.hostname.match(
		/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
	  )
);

if (!isLocalhost && process.env.production && 'serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js');
};

export default app;