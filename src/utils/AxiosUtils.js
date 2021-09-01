import axios from "axios";

export const jsonContentTypeConfig = {
    headers: {
      'Content-Type': 'application/json',
    }
};

export function setTokenHeader() {
  const authToken = localStorage.getItem("token")

  if(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }
}

export function removeTokenHeader() {
  const authToken = localStorage.getItem("token")

  if(authToken) {
    delete axios.defaults.headers.common['Authorization']
  }
}