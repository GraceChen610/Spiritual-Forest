/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export default function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        panTo({ lat, lng });
      })
      .catch((error) => {
        console.log('😱 Error: ', error);
      });
  };

  const renderSuggestions = () => data.map((suggestion) => {
    const {
      placeId,
      structured_formatting: { mainText, secondaryText },
    } = suggestion;

    return (
      <li key={placeId} onClick={() => handleSelect(suggestion)}>
        <strong>{mainText}</strong>
        {' '}
        <small>{secondaryText}</small>
      </li>
    );
  });

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
