<?php

return [
    [
        'label' => 'New Reservation',
        'route' => '/reservation/create',
        'icon'  => 'add',
        'roles' => ['admin', 'user'],
    ],
    [
        'label' => 'Search Reservation',
        'route' => '/reservation/search',
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
