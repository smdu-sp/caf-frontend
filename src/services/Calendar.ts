export default class CalendarService {
    static get_employee() {
        return [
            {
                id: 123, name: 'Lucas', events: [
                    {
                        type: 'present',
                        day: '28/07/2024'
                    },
                    {
                        type: 'present',
                        day: '19/07/2024'
                    },
                    {
                        type: 'present',
                        day: '22/07/2024'
                    },
                    {
                        type: 'present',
                        day: '24/07/2024'
                    },
                    {
                        type: 'present',
                        day: '20/07/2024'
                    },
                ]
            },
            {
                id: 231, name: 'João', events: [
                    {
                        type: 'present',
                        day: '10/07/2024'
                    },
                    {
                        type: 'present',
                        day: '11/07/2024'
                    },
                    {
                        type: 'present',
                        day: '12/07/2024'
                    },
                    {
                        type: 'present',
                        day: '13/07/2024'
                    },
                    {
                        type: 'absence',
                        day: '14/07/2024'
                    },
                    {
                        type: 'absence',
                        day: '01/07/2024'
                    },
                    {
                        type: 'absence',
                        day: '02/07/2024'
                    },
                    {
                        type: 'unjustified',
                        day: '03/07/2024'
                    },
                ]
            }
        ]
    }
}