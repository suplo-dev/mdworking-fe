import {ref} from 'vue';

export function useTable() {
    const filter = ref({
        column: null,
        sort_order: null,
        page: 1,
        per_page: 20,
    })

    const pagination = ref({
        total: null,
        current_page: 1,
    })

    const changeSort = (item) => {
        if (filter.value.column === item.column) {
            filter.value.sort_order = filter.value.sort_order === 'desc' ? 'asc' : 'desc';
        } else {
            filter.value.column = item.column;
            filter.value.sort_order = 'asc';
        }
    }

    const getSortClass = (item) => {
        if(filter.value.column === item.column){
            return filter.value.sort_order === 'asc' ? 'fa-duotone fa-sort-up' : 'fa-duotone fa-sort-down'
        }
        return 'fa-light fa-sort'
    }

    const selectPerPage = () => {
        return [20, 50, 100, 200]
    }

    const getPageItemClass = (item) => {
        if (parseInt(item.label) === pagination.value.current_page){
            return 'active'
        }
        return item.url === null && item.label !== '...' ? 'disabled' : ''
    }

    const changePage = (item, sub = 0) => {
        if (item.url){
            filter.value.page = (parseInt(item.label) ? parseInt(item.label) : filter.value.page) + sub
            pagination.value.current_page = (parseInt(item.label) ? parseInt(item.label) : pagination.value.current_page) + sub
        }
    }

    return {
        filter,
        pagination,
        changeSort,
        getSortClass,
        selectPerPage,
        getPageItemClass,
        changePage,
    };
}
