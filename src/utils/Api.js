
import Constants from 'lib/Constants'

const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
}

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT'
}

const defaultHeaders = {
  'Content-Type': 'application/json'
}

class Api {
  static request = (url, method=METHODS.GET, headers=defaultHeaders, body='{}') => new Promise((resolve, reject) => {
    const config = { method, headers }
    if(method === METHODS.POST || method === METHODS.PATCH || method === METHODS.PUT){
      config.body = body
    }
    fetch(url, config)
      .then(response => {
        if(response.status === HTTP_CODES.OK || response.status === HTTP_CODES.BAD_REQUEST){
          return response.json()
        } else {
          throw Error(JSON.stringify(response))
        }
      })
      .then(responseJson => resolve(responseJson))
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
  static getAreas = async () => {
    let areas = null
    // const snapshot = await firebaseDb.ref('areas/').once('value')
    //areas = snapshot.val()
    return areas
  }
  static getAreas = () => new Promise((resolve) => {
    let areas = null
    //const snapshot = await firebaseDb.ref('devices/').once('value')

    fetch('https://lumos.ketupat.me/areas/')
                      .then(response => response.json())
                      .then(responseJson => {
                        resolve(responseJson)
                      })
                      .catch(console.error)
    //let data = await snapshot.json()


    //devices = snapshot.val()
    return areas
  })
  static getDevices = () => new Promise((resolve) => {
    let devices = null
    //const snapshot = await firebaseDb.ref('devices/').once('value')
    //https://lumos.ketupat.me/devices/ ; https://api.github.com/
    fetch('https://lumos.ketupat.me/devices/')
                      .then(response => response.json())
                      .then(responseJson => {
                        resolve(responseJson)
                      })
                      .catch(console.error)
    //let data = await snapshot.json()


    //devices = snapshot.val()
    return devices
  })

  static toggleSwitch (switchId) {
    // TO-DO
  }

  static getSpells = () => new Promise((resolve, reject) => {
    Api.request(Constants.spellsUrl)
      .then(resolve)
      .catch(reject)
  })
}

export default Api
