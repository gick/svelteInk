import App from './App.html';
import InkerStore from './inkerStore'

const store = new InkerStore({
	gmMethods:[]
})

const app = new App({
	target: document.body,
	store
});

window.store = store;

export default app;
