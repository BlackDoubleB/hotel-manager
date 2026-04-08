<?php

return [
    [
        'label' => 'New Reservation',
        'route' => '/reservations/create',
        'icon'  => 'add',
        'roles' => ['admin', 'user'],
    ],
    [
        'label' => 'Search Reservation',
        'route' => '/reservations',
        'icon'  => 'search',
        'roles' => ['admin'],
    ],
    [
        'label' => 'Places',
        'route' => '/reservations/places',
        'icon'  => 'home',
        'roles' => ['admin', 'user'],
    ]
];
