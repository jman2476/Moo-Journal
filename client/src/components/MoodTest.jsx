import React, { useState } from 'react';

function MoodTest() {
  // State to hold the value of the slider
  const [value, setValue] = useState(5); // Default value set to 5

  // Function to update state based on slider input
  const handleChange = (event) => {
    setValue(event.target.value);
  };

    return (
        <div>
        <input
          type="range"
          min="1" // Minimum value
          max="10" // Maximum value
          value={value} // Current value
          onChange={handleChange} // Function to call when the value changes
        />
        <p>Value: {value}</p> {/* Display the current value */}
      </div>
    )
}

export default MoodTest