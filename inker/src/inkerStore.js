import {
  Store
} from 'svelte/store.js'
class InkerStore extends Store {
	fetchGm() {
    this.fetchList()
		.then((methodArray) =>methodArray.map(this.fetchMethod))
      .then(promiseArray => Promise.all(promiseArray))
      .then(gmMethods => this.set({
        gmMethods
      }))
  }
  async fetchList() {
    return await fetch('/DOCS/METHOD_LIST')
      .then(r => r.text())
      .then(text => text.split(/\r?\n/))
      .then(methodArray => methodArray.filter(name => name.length > 0))
  }
  async fetchMethod(name) {
		let format=function(name, methodArray) {
			return {
				name: name,
				args: getArgs(methodArray[0]),
				doc: getText(methodArray)
			}
		}
		let getArgs=function(firstLine) {
			let re=/(<:?)\w+(>:?)/g
			if(firstLine.match(re))
				return firstLine.match(re)
			return []
		}
		let getText= function(methodArray) {
			 methodArray.shift()
			 return methodArray
		}

    return await fetch('/DOCS/' + name)
      .then(r => r.text())
      .then(text => text.split(/\r?\n/))
      .then((methodArray) => {
        return format(name, methodArray)
      })
  }

}
export default InkerStore
