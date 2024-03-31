import styles from './SearchBar.module.css';
import searchIcon from '../../public/icons/search.svg';
import cancelIcon from '../../public/icons/cancel.svg';
import React, { ChangeEvent } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  value: string;
  onInputChange: (value: string) => void;
}

const SearchBar = ({ value, onInputChange }: SearchBarProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };
  const handleCancelInput = () => {
    onInputChange('');
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Image id={styles.icon} src={searchIcon} alt="search-icon" width={16} height={16} />
        <input
          className={styles.bar}
          type="text"
          name="search-bar"
          placeholder="링크를 검색해 보세요."
          value={value}
          onChange={handleInputChange}
        />
        {value && (
          <Image
            id={styles.cancelIcon}
            src={cancelIcon}
            onClick={handleCancelInput}
            alt="cancel-icon"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
};
export default SearchBar;
