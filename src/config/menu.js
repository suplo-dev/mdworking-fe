import {usePermission} from "@/composables/usePermission.js";
const {permission} = usePermission()
export const menu ={
    landingPage: [
        {
            routeName: 'about',
            label: 'Về MDConnect',
        },
        {
            routeName: 'news',
            label: 'Tin tức',
        },
        {
            routeName: 'network',
            label: 'Mạng lưới',
        },
        {
            routeName: 'career',
            label: 'Tuyển dụng',
        },
    ],
    dashboard: [
        {
            routeName: 'dashboard',
            label: 'Trang chủ',
            iconClass: 'fa-home',
        },
        {
            routeName: 'user',
            label: 'Quản lí tài khoản',
            iconClass: 'fa-user',
            permission: permission.user.value.view.value,
        },
        {
            routeName: 'advertisement',
            label: 'Quản lí quảng cáo',
            iconClass: 'fa-earth',
            children: [
                {
                    routeName: 'advertisement.facebook',
                    label: 'Facebook',
                    iconClass: 'fa-brands fa-facebook',
                    permission: permission.advertisement.value.facebook.value.view.value,
                },
                {
                    routeName: 'advertisement.google',
                    label: 'Google',
                    iconClass: 'fa-brands fa-google',
                    permission: permission.advertisement.value.google.value.view.value,
                },
            ]
        },
    ]
}