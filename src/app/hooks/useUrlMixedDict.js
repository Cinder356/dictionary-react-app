import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getModuleDictinary } from '@/app/helpers/moduleController'
import shuffleArray from "../helpers/shuffleArray";

export default function (id) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [dictionary, setDictionary] = useState([])

	useEffect(() => {
		if (id < 0) return
		getModuleDictinary(id).then((dict) => {
			if (JSON.parse(searchParams.get('isReverse')))
				dict = dict.map((pair) => { return { ...pair, left: pair.right, right: pair.left } })
			shuffleArray(dict)
			setDictionary(dict)
		})
	}, [id, searchParams])

	return [dictionary, setDictionary]
}