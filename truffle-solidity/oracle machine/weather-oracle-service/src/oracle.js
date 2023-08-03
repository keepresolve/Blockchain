require("dotenv").config();

import request from "request-promise-native";

import { updateWeather } from "./ethereum";

const options = { uri: process.env.WEATHER_URL, json: true };

const start = () => {
  request(options)
  .then(parseData)
  .then(updateWeather)
  .then(restart)
  .catch(error);
};

const parseData = (body) => {
  return new Promise((resolve, reject) => {
    console.log(body)
    let weatherDescription, temperature, humidity, visibility, windSpeed, windDirection, windGust;
    try {
      weatherDescription = body.data.ganmao.toString();
      temperature = body.data.wendu.toString();
      humidity = body.data.shidu.toString();
      visibility = body.data.quality.toString();
      windSpeed = ""
      windDirection = ""
      windGust =""
    } catch(error) {
      reject(error);
      return;
    }
    resolve({ weatherDescription, temperature, humidity, visibility, windSpeed, windDirection, windGust });
  });
};

const restart = () => {
  wait(process.env.TIMEOUT).then(start);
};

const wait = (milliseconds) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), milliseconds));
};

const error = (error) => {
  console.error(error);
  restart();
};

export default start;
