import axios from "axios";
import {useState, useEffect} from 'react';

const baseURL = 'https://api.everconnect.dk/manager/v1';

const defaultConfig = (request) => {

  let returnData = {};
  returnData.headers = {};

  if (request.headers['Content-Type'] === null) {
    returnData.headers['Content-Type'] = "application/json"
  } else {
    returnData.headers['Content-Type'] = request.headers['Content-Type']
  }

  returnData.timeout = 5000;

  return returnData;
};

export const managerAPIPost = (url, request, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.post(baseURL + url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, dependencies);

  return [isLoading, fetchedData];

};

export const managerAPIGet = (url, request, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.get(url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, dependencies);

  return [isLoading, fetchedData];

};

export const managerAPIPut = (url, request, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.put(baseURL + url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, dependencies);

  return [isLoading, fetchedData];

};

export const managerAPIPatch = (url, request, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.patch(url, defaultConfig(request))
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, dependencies);

  return [isLoading, fetchedData];

};
