import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Grid, InputBase, IconButton, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import '@fontsource/roboto/400.css';
import './popup.css';
import WeatherCard from '../components/WeatherCard';
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  ILocalStorageOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<ILocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === '') {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput('');
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updateOptions: ILocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };
    setStoredOptions(updateOptions).then(() => {
      setOptions(updateOptions);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx='8px' my='16px'>
      <Grid container justifyContent='space-evenly'>
        <Grid item>
          <Paper>
            <Box px='15px' py='5px'>
              <InputBase
                placeholder='Add a city name'
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py='3px'>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != '' && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city: string, index) => (
        <WeatherCard
          key={index}
          city={city}
          tempScale={options.tempScale}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height='16px' />
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);

root.render(<App />);
