import React from 'react';
import LocationPicker from './components/LocationPicker';

const AddressBookMap = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-center">Chọn vị trí trên bản đồ</h1>
      <LocationPicker />
    </div>

  );
};

export default AddressBookMap;
