import { http, HttpResponse } from 'msw';

import {contentConvertObject, contentListObject} from "./mock_objects.ts";

export const handlers = [
	http.get("https://api.freecurrencyapi.com/v1/currencies?apikey=" + import.meta.env.VITE_CONVERTER_API_KEY, () => {
		return HttpResponse.json(contentListObject);
	}),
	http.get("https://api.freecurrencyapi.com/v1/latest?base_currency=EUR&currencies=USD&apikey=" + import.meta.env.VITE_CONVERTER_API_KEY, () => {
		return HttpResponse.json(contentConvertObject);
	}),
]

