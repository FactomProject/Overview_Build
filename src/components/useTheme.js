import { useEffect, useState } from 'react';

export default () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    const setTo =
      theme === 'light'
        ? (localStorage.setItem('theme', 'dark'), 'dark')
        : (localStorage.setItem('theme', 'light'), 'light');
    setTheme(setTo);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, {});

  return {
    theme,
    toggleTheme
  };
};
