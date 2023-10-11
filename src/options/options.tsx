import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Switch,
} from '@mui/material';
import '@fontsource/roboto/400.css';
import './options.css';
import {
  ILocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from '../utils/storage';

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<ILocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const handleSaveHomeCityButtonClick = () => {
    setFormState('saving');
    setStoredOptions(options).then(() =>
      setTimeout(() => {
        setFormState('ready');
      }, 1000)
    );
  };

  if (!options) return null;

  const isFieldsDisabled = formState === 'saving';

  return (
    <Box mx='10%' my='2%'>
      <Card>
        <CardContent>
          <Grid container direction='column' spacing={4}>
            <Grid item>
              <Typography variant='h4'>Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>Home city name</Typography>
              <TextField
                fullWidth
                id='standard-basic'
                variant='standard'
                placeholder='Enter a home city name'
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
                disabled={isFieldsDisabled}
              />
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                Auto toggle overlay on webpage load
              </Typography>
              <Switch
                color='primary'
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                disabled={isFieldsDisabled}
              ></Switch>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSaveHomeCityButtonClick}
                disabled={isFieldsDisabled}
              >
                {formState === 'ready' ? 'Save' : 'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);

root.render(<App />);
