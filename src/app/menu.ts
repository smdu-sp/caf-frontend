import { CalendarMonth, Home, Person, Event, TableChart, Storage } from '@mui/icons-material';


export interface IMenuOption {
    title:  string;
    href:   string;
    name:   string;
    icon:   any; 
};

export interface IMenu {
    userOptions:    IMenuOption[];
    adminOptions:   IMenuOption[];
}


export const menu: IMenu = {
    userOptions: [
        {
            title: 'Página Inicial',
            href: '/',
            name: '/',
            icon: Home,
        },
        {
            title: 'Tabela',
            href: '/tabela',
            name: '/tabela',
            icon: TableChart,
        },
        // {
        //     title: 'Notificações',
        //     href: '/notifica',
        //     name: 'notifica',
        //     icon: Notifications,
        // },
        {
            title: 'Database',
            href: '/database',
            name: '/database',
            icon: Storage,
        }
    ],
    adminOptions: [
        {
            title: 'Usuários',
            href: '/usuarios',
            name: 'usuarios',
            icon: Person,
        },
        {
            title: 'Feriados',
            href: '/feriados',
            name: 'feriados',
            icon: Event,
        },
        {
            title: 'Frequência',
            href: '/frequencia',
            name: 'frequencia',
            icon: CalendarMonth,
        } 
    ]
}