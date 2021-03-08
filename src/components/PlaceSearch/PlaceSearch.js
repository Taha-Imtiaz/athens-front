import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { throttle } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import parse from 'autosuggest-highlight/parse';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { connect } from "react-redux";
import { showMessage } from "../../Redux/Common/commonActions";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));


const PlaceSearch = (props) => {
  const { handleSetLocation, index, locationValue } = props;
  const classes = useStyles();
  const [value, setValue] = useState(locationValue);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        //   'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGd00IwQ2wF71fLa-50AWUf7tbvxn_k7s&libraries=places',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBq1rGW21xOD8LbEKP9fN4rQ9hrlkvu1BQ&libraries=places',

        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;
    setValue(locationValue)
   
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue, componentRestrictions: { country: "us" } }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, locationValue]);
  return (
    <Autocomplete
      id="google-map-demo"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.terms.length > 2) {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          handleSetLocation(newValue, index)
        } else {
          let { showMessage } = props;
          showMessage("Choose location icluding city.");
          setOptions(options);
          setValue('');
          handleSetLocation('', index)
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" variant="outlined" size="small"
          fullWidth />
      )}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

var actions = {
  showMessage
};

export default connect(null, actions)(PlaceSearch);
