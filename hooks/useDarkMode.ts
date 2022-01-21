import moment, { getHours } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');

  // 重置本地存储
  const resetTheme = useCallback(() => {
    const isDark = Array.from(document.documentElement.classList).includes(
      'dark',
    );

    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // 切换模式
  const toggleDarkMode = useCallback(() => {
    document.documentElement.classList.toggle('dark'); // 手动切换

    // semi 的暗色模式
    const body = document.body;
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode');
    } else {
      body.setAttribute('theme-mode', 'dark');
    }

    resetTheme(); // 重置本地存储
  }, [resetTheme]);

  // 首次自动切换
  useEffect(() => {
    const isDark = Array.from(document.documentElement.classList).includes(
      'dark',
    );
    const shouldBeDark = getHours(Date.now()) >= 18;

    if (shouldBeDark && !isDark) {
      toggleDarkMode(); // 自动切换为 dark
    } else {
      resetTheme(); // 不切换，仅重置本地存储
    }
  }, [resetTheme, toggleDarkMode]);

  return { theme, toggleDarkMode };
};
