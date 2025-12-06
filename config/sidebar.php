<?php

return [
    [
        'label' => 'New Reservation',
        'route' => 'reservations.index',
        'icon'  => 'add',
        'roles' => ['admin', 'user'],
    ],
    [
        'label' => 'Search Reservation',
        'route' => 'reservations.search',
        'icon'  => 'search',
        'roles' => ['admin'],
    ],
    [
        'label' => 'Calendar',
        'route' => 'reservations.calendar',
        'icon'  => 'calendar',
        'roles' => ['admin', 'user'],
    ],
    [
        'label' => 'Payments',
        'route' => 'reservations.payments',
        'icon'  => 'creditcard',
        'roles' => ['admin'], 
    ],
];
