import {ref} from 'vue';

export function usePermission() {
    const permission = {
        user: {
            value: {
                add: {
                    value: 'add user',
                    label: 'Thêm',
                },
                view: {
                    value: 'view user',
                    label: 'Xem',
                },
                update: {
                    value: 'update user',
                    label: 'Chỉnh sửa',
                },
            },
            label: 'Người dùng',
            hasChild: false,
        },
        advertisement: {
            value: {
                facebook: {
                    value : {
                        add: {
                            value: 'add ads fb',
                            label: 'Thêm',
                        },
                        view: {
                            value: 'view ads fb',
                            label: 'Xem',
                        },
                        update: {
                            value: 'update ads fb',
                            label: 'Chỉnh sửa',
                        },
                    },
                    label: 'Facebook',
                },
                google: {
                    value: {
                        add: {
                            value: 'add ads gg',
                            label: 'Thêm',
                        },
                        view: {
                            value: 'view ads gg',
                            label: 'Xem',
                        },
                        update: {
                            value: 'update ads gg',
                            label: 'Chỉnh sửa',
                        },
                    },
                    label: 'Google',
                },
            },
            label: 'Quảng cáo',
            hasChild: true,
        }
    }

    const permissionUser = [permission.advertisement.value.facebook.value.view.value, permission.advertisement.value.google.value.view.value]

    return {
        permission,
        permissionUser,
    };
}
