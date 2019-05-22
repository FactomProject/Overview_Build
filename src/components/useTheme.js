import { useEffect, useState } from "react";

export default () => {
  const [theme, setTheme] = useState("light");
	const toggleTheme = () => {
		theme === "light" ? (
			localStorage.setItem("theme", "dark"),
			setTheme("dark")
		 ) : (
			localStorage.setItem("theme", "light"),
			setTheme("light")
		 )
	};

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		if (localTheme) {
			setTheme(localTheme);
		}
	}, {});

	return {
		theme,
		toggleTheme
	};
};