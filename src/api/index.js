import axios from 'axios'
// Lab
// const API_URL = 'http://10.38.225.64:8443' - Production
// var API_URL = 'http://xx.xx.xx.xx:xxxx'
// fetch('/config.json').then(res => res.json()).then(config => {
//   // console.log(config)
//   API_URL = config['API_URL']
// })
// Development
var API_URL = 'http://10.201.5.61:8445/'

export function getdbdata (DbName, jwt) {
  return axios.get(`${API_URL}/system/db/${DbName}`, { headers: { Authorization: 'Bearer ' + jwt, 'Content-Type': 'application/json' } })
}

export function authenticate (userData) {
  return axios.post(`${API_URL}/system/users/login`, userData, { headers: { 'Content-Type': 'application/json' } })
}

export function register (userData) {
  // console.log('pass in api -register post call => ' + userData)
  return axios.post(`${API_URL}/system/users/register`, userData)
}

export function collectlog (compData, jwt) {
  // console.log('pass in api post call => ' + compData.applications)
  return axios.post(`${API_URL}/logs/pull`, compData, { headers: { Authorization: 'Bearer ' + jwt, 'Content-Type': 'application/json' } })
}

export function agentupload (formData, jwt) {
  // console.log('AgentUpload Bearer = ' + jwt)
  return axios.post(`${API_URL}/agent/list`, formData, { headers: { Authorization: 'Bearer ' + jwt, 'Content-Type': 'application/json' } }, {
    // onUploadProgress: uploadEvent => {
    //   console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100))
    // }
  })
}
