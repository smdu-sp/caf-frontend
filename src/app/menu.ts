import { CalendarMonth, Home, Person, Payments, Event } from '@mui/icons-material';

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
            title: 'Pagamento',
            href: '/pagamento',
            name: 'pagamento',
            icon: Payments,
        },
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