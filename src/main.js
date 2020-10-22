import App from './App.svelte';

const app = new App({
	target: document.body
});

console.log(process.env.production);

if (process.env.production && 'serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js');
};

export default app;