import axios from "axios";

let options = {
  timeout: 15000,
  // headers: { "Content-Type": "application/x-www-form-urlencoded" }
};

let xhr = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.create(options).get(url, { params }).then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.create(options).post(url, params).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    });
  }
};

export default xhr;
