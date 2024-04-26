import React, { ChangeEventHandler } from 'react';

const SearchInput = ({ handle }: { handle: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <input type="text" placeholder="Search" onChange={handle} />
  );
};

export default SearchInput;