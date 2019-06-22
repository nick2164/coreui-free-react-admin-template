import {useState, useEffect} from 'react';
import axios from "axios";

export const managerAPIGet = (url, config, dependencies) => {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    axios.get(url, config)
      .then(response => {
        setIsLoading(false);
        setFetchedData(response.data);
      }, res => {
        setIsLoading(false);
      })
  }, dependencies);

  return [isLoading, fetchedData];

}
