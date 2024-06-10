import './style.css';

const VITE_CONVERTER_API_KEY = "fca_live_y13Kc0360znqC5DeAPa3kXz73o7aIqPH6SAKKtjG";

export async function getContent() {
    const response = await fetch("https://api.freecurrencyapi.com/v1/currencies?apikey=" + VITE_CONVERTER_API_KEY, {
        method: "GET",
    });


    if(!response.ok) {
        alert("Une erreur est survenue lors de l'appel à l'API");
    }

    return response.json();
}

export async function convertDevise(baseDevise = "EUR", targetDevise = "USD") {
    const response = await fetch("https://api.freecurrencyapi.com/v1/latest?base_currency=" + baseDevise + "&currencies=" + targetDevise + "&apikey=" + VITE_CONVERTER_API_KEY, {
        method: "GET",
    });

    if(!response.ok) {
        alert("Une erreur est survenenue lors de l'appel à l'API");
    }

    return response.json();
}