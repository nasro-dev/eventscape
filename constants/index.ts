export const headerlinks = [
    {
        label: 'home',
        route: '/'
    },
    {
        label: 'create event',
        route: '/events/create'
    },
    {
        label: 'profile',
        route: '/profile'
    }
]

export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isfree: false,
    url: '',
}