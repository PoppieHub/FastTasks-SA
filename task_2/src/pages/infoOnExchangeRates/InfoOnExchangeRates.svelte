<script lang="ts">
import getInfoRates from "../../api/getInfoRates";
import translation from "../../data/translation";
import {getCollectionRates, setCollectionRates} from "../../utils";
import type {ResponseApi} from "../../models";
import {onMount} from "svelte";

let options = Object.values(translation);
let defaultParam: string = getCollectionRates().base_code || 'USD';

const currentValuesOfRates = {
    mainCurrency: 1,
    selectCurrency: 1,
    selectCurrencyRate: 1,
    setSelectCurrencyRate: function(rate: number) {
        this.selectCurrencyRate = rate;
    }
};

const convertSelectCurrency = () => {
    currentValuesOfRates.selectCurrency = parseFloat((currentValuesOfRates.mainCurrency * currentValuesOfRates.selectCurrencyRate).toFixed(2));
};

const convertMainCurrency = () => {
    currentValuesOfRates.mainCurrency = parseFloat((currentValuesOfRates.selectCurrency / currentValuesOfRates.selectCurrencyRate).toFixed(2));
};

let currencyPair: Promise<ResponseApi>;

onMount(() => {
    refreshCurrencyPair();
});

const defaultOptions = {
    // @ts-ignore
    mainCurrency: translation.hasOwnProperty(defaultParam) ? translation[defaultParam] : translation.USD,
    selectCurrency: translation.RUB.code === defaultParam ? translation.USD : translation.RUB
}

const refreshCurrencyPair = (): void => {
    currencyPair = getInfoRates(defaultParam);
    currencyPair.then((data) => {
        setCollectionRates(data);
        currentValuesOfRates.setSelectCurrencyRate(data.rates[defaultOptions.selectCurrency.code])
        convertSelectCurrency();
        convertMainCurrency();
    });
}

const handleMainCurrencyChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    defaultOptions.mainCurrency = options[selectedIndex];
    defaultParam = defaultOptions.mainCurrency.code;

    refreshCurrencyPair();
}

$: {
    convertSelectCurrency();
    convertMainCurrency();
}
</script>

<section class="convertCurrencyPair__container">
    <div class="convertCurrencyPair__choicePair">
        <select bind:value={defaultOptions.mainCurrency} on:change={handleMainCurrencyChange}>
            {#each options as option, index}
                <option id={option.code} value={option}>{option.flag + ' (' + option.code + ') ' + option.name}</option>
            {/each}
        </select>
        <select bind:value={defaultOptions.selectCurrency} on:change={refreshCurrencyPair}>
            {#each options as option}
                <option id={option.code} value={option}>{option.flag + ' (' + option.code + ') ' + option.name}</option>
            {/each}
        </select>
    </div>

    <div class="convertCurrencyPair__inputCoins">
        <input type="number" bind:value={currentValuesOfRates.mainCurrency} on:input={convertSelectCurrency} />
        <input type="number" bind:value={currentValuesOfRates.selectCurrency} on:input={convertMainCurrency} />
    </div>
</section>