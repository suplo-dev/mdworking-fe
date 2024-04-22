import {ref} from 'vue';
import moment from "moment/moment.js";

export function useDatetime() {
    const formatDateTime = (date, format = "HH:mm DD/MM/YYYY") => moment(date).format(format)
    const formatDate = (date, format = "DD/MM/YYYY") => moment(date).format(format)

    const startOfMonth = moment().startOf('month')
    const yesterday = moment().subtract(1, 'days')

    return {
        formatDateTime,
        formatDate,
        startOfMonth,
        yesterday,
    };
}
