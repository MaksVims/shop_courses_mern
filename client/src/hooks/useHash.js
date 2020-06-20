import {useEffect, useState} from "react";

const getHash = () => document.location.hash.slice(1)

export function useHash() {
	const [hash, setHash] = useState(getHash())
	useEffect(() => {
		const hashChangeHandler = () => setHash(getHash())
		window.addEventListener('hashchange', hashChangeHandler)
		return () => window.removeEventListener('hashchange', hashChangeHandler)
	}, [])

	return {hash, setHash}
}