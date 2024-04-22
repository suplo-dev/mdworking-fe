import {ref} from 'vue';
import numeral from "numeral";

export function useNumber() {

    const formatNumber = (number, format = '0,0') => numeral(number).format(format)
    const formatDong = (number) => numeral(number).format('0,0') + ' đ̲'
    const formatPercent = (number) => numeral(number).format('0.00%')
    const formatN = (number) =>  (Math.round(number/100) / 10 + ' N').replace('.', ',')

    return {
        formatNumber, formatDong, formatPercent, formatN
    };
}
