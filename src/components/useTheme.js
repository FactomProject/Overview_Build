import { useEffect, useState } from "react";

export default () => {
	const [theme, setTheme] = useState("light");
	const toggleTheme = () => {
		if (theme !== "dark") {
			localStorage.setItem("theme", "dark");
			setTheme("dark");
		} else {
			localStorage.setItem("theme", "light");
			setTheme("light");
		}
	};

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		console.log('localTheme: ', localTheme)
		if (localTheme) {
			setTheme(localTheme);
		}
	}, {});

	return {
		theme,
		toggleTheme
	};
};