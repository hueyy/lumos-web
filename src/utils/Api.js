import * as firebase from 'firebase'
import Constants from 'lib/Constants'

const firebaseApp = firebase.initializeApp(Constants.firebaseConfig)
const firebaseDb = firebaseApp.database()


class Api {
  static getAreas = async () => {
    let areas = null
    const snapshot = await firebaseDb.ref('areas/').once('value')
    areas = snapshot.val()
    return areas
  }
  static getDevices = async () => {
    let devices = null
    const snapshot = await firebaseDb.ref(`devices/`).once('value')
    devices = snapshot.val()
    return devices
  }
  static getDevicesByArea = async (areaId) => {
    let devices = null
    const snapshot = await firebaseDb.ref(`/devices/${areaId}/`).once('value')
    devices = snapshot.val()
    return devices
  }
  static toggleSwitch (switchId) {
    // TO-DO
  }
}

export default Api
