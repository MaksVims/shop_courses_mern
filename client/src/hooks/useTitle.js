import {useEffect} from "react";

export default (value = 'Магазин курсов') => {
	useEffect(() => {
		document.title = value
	}, [value])
}