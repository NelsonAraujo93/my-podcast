import React, { ChangeEventHandler } from 'react';
import styles from '@/app/styles/searchInput.module.css';

const SearchInput = ({ handle }: { handle: ChangeEventHandler<HTMLInputElement> }) => {
  return (
    <input className={styles.search} type="text" placeholder="Search" onChange={handle} />
  );
};

export default SearchInput;