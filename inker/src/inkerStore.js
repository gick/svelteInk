import { Store } from 'svelte/store.js'
class InkerStore extends Store {
	async fetchGm(){
		const gmOperations = await fetch('/gmOperations').then(r => r.json())
		this.set({ gmOperations })
	}

}
export default InkerStore
