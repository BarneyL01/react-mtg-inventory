import axios from "axios";

const baseUrl = "https://api.scryfall.com/";

const scryfallAutocomplete = async function (searchterm) {
    try {
        let requestUrl =
            baseUrl + `cards/autocomplete?q=${searchterm}`;
        let response = await axios.get(requestUrl);

        console.log("%c scryfallAutocomplete:", "color:lightgreen", {
            d: response.data.data,
        });
        return response.data.data;
    } catch (error) {
        console.error({ error });
    }
};

export { scryfallAutocomplete };
