import axios from "axios";

const baseUrl = "https://api.scryfall.com/";

const scryfallAutocomplete = async function (searchterm) {
  try {
    let requestUrl = baseUrl + `cards/autocomplete?q=${searchterm}`;
    let response = await axios.get(requestUrl);

    console.log("%c scryfallAutocomplete:", "color:lightgreen", {
      d: response.data.data,
    });
    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};

const scryfallGetCardExactName = async function (searchterm) {
  try {
    let requestUrl = baseUrl + `/cards/named?exact=${searchterm}`;
    let response = await axios.get(requestUrl);

    console.log("%c scryfallGetCardExactName:", "color:lightgreen", {
      d: response.data,
    });
    return response.data;
  } catch (error) {
    console.error({ error });
  }
};

const scryfallGetPublishedCards = async function (requestUrl) {
  try {
    let response = await axios.get(requestUrl);

    console.log("%c scryfallGetPublishedCards:", "color:lightgreen", {
      d: response.data,
    });
    return response.data.data;
  } catch (error) {
    console.error({ error });
  }
};

const scryfallGetByScryfallId = async function (scryfallId) {
  try {
    let requestUrl = baseUrl + `cards/${scryfallId}?format=json`;
    let response = await axios.get(requestUrl);

    console.log("%c scryfallGetByScryfallId:", "color:lightgreen", {
      d: response.data,
    });
    return response.data;
  } catch (error) {
    console.error({ error });
  }
};

export {
  scryfallAutocomplete,
  scryfallGetCardExactName,
  scryfallGetPublishedCards,
  scryfallGetByScryfallId,
};
