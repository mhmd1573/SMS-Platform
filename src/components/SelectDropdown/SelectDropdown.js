import React from 'react';
import Select from 'react-select';

const SelectDropdown = ({ options, onChange, placeholder, styles , value , isMulti }) => {

  // Default custom styles for the dropdown
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '250px', // Customize the width of the control
      borderColor: state.isFocused ? '#4CAF50' : '#ccc',
      boxShadow: state.isFocused ? '0 0 5px rgba(76, 175, 80, 0.5)' : 'none',
      padding: '5px',
      fontSize: '5px'
    }),
    menu: (provided) => ({
      ...provided,
      width: '230px', // Match the menu width with the control
      maxHeight: '100px', // Limit the height of the dropdown menu
      overflowY: 'auto', // Enable vertical scrolling if content exceeds maxHeight
      backgroundColor: '#f4f4f9', // Set a background color for the menu
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add a shadow for depth
      borderRadius: '4px', // Round the corners of the menu
      zIndex: 1000, // Ensure the dropdown appears above other content
     
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4CAF50' : state.isFocused ? '#e8e8e8' : 'transparent',
      color: state.isSelected ? '#fff' : '#333',
      padding: '10px',
      borderRadius: '4px',
      transition: 'background-color 0.3s ease',
      fontSize:'12px',
      cursor : 'pointer'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#888', // Placeholder text color
      fontStyle: 'italic', // Make placeholder text italic
      fontSize: '12px', // Customize the font size
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '16px', // Customize the font size of the selected option
      color: '#333', // Customize the text color if needed
      fontWeight: 'bold', // Optional: make the selected value bold
      fontSize: '12px'
    }),
    input: (provided) => ({
      ...provided,
      fontSize: '12px', // Adjust font size for typed text
      color: '#333', // Customize text color while typing
    }),
  };



  return (

  

    <Select
      options={Array.isArray(options) ? options : []}  // Ensure it's always an array
      onChange={onChange}
      value={isMulti ? value : options.find((opt) => opt.value === value) || null} // Multi-select handling
      placeholder={placeholder || "Select an option"}  // Use the dynamic placeholder
      styles={{ ...customStyles, ...styles }}  // Merge the default and passed styles
    />
  );
};

export default SelectDropdown;
