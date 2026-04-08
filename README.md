# Hotel Manager

Aplicación web para la gestión de reservas de hotel, desarrollada con **Laravel**, **Inertia.js**, **React** y **TypeScript**.  
Este proyecto permite administrar reservas, consultar disponibilidad y habitaciones.

---

## Tabla de contenido

- [Descripción del proyecto](#descripción-del-proyecto)
- [Características principales](#características-principales)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura y estructura del proyecto](#arquitectura-y-estructura-del-proyecto)
- [Vista previa](#vista-previa)
- [Autor](#autor)
- [Licencia](#licencia)

---

## Descripción del proyecto

**Hotel Manager** es una aplicación web orientada a la gestión de reservas de un Hotel.  
Su objetivo es facilitar el registro, consulta y edición de reservas, así como la organización de la disponibilidad de horarios y el manejo de estados relacionados con reservas y pagos.

La aplicación está construida con una arquitectura moderna donde:

- **Laravel** se encarga de la lógica del backend.
- **Inertia.js** conecta backend y frontend sin necesidad de crear una API REST tradicional.
- **React + TypeScript** se usan para la interfaz de usuario.
- **Tailwind CSS** y **Shadcn UI** se utilizan para el diseño visual.
- **Vite** permite un entorno de desarrollo rápido y moderno.

---

## Características principales

- Autenticación de usuarios.
- Registro de nuevos usuarios.
- Creación de reservas.
- Consulta de disponibilidad de horas de inicio y fin.
- Búsqueda de reservas.
- Búsqueda de reservas por ID.
- Edición de reservas existentes.
- Manejo de habitaciones.
- Manejo de estados de reserva.
- Manejo de estados de pago.
- Interfaz moderna construida con React y TypeScript.

---

## Tecnologías utilizadas

### Backend & Base de datos
- **PHP 8.2**
- **Laravel 12**
- **Eloquent ORM**
- **Laravel Fortify**
- **Inertia Laravel**
- **MySQL**

### Frontend
- **React**
- **TypeScript**
- **Inertia React**
- **Vite**
- **Tailwind CSS**
- **Shadcn UI**
- **Axios**
- **React Hook Form**
- **Zod**
- **Radix UI**
- **Lucide React**
- **date-fns**

### Herramientas de desarrollo
- **Composer**
- **npm**

---

## Arquitectura y estructura del proyecto

El proyecto sigue una estructura organizada entre backend y frontend.

```bash
hotel-manager/
├── app/
│   ├── Actions/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   └── LoginController.php
│   │   │   ├── Controller.php
│   │   │   ├── PlaceController.php
│   │   │   └── ReservationController.php
│   │   └── Middleware/
│   ├── Models/
│   │   ├── Payment.php
│   │   ├── PaymentStatus.php
│   │   ├── Reservation.php
│   │   ├── ReservationStatus.php
│   │   ├── Room.php
│   │   └── User.php
│   ├── Providers/
│   └── Services/
│       ├── FoursquareService.php
│       ├── HoursService.php
│       ├── PaymentService.php
│       ├── PaymentStatusService.php
│       ├── ReservationService.php
│       ├── ReservationStatusService.php
│       └── RoomData.php
├── bootstrap/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── Layouts/
│   │   │   └── MainLayout.tsx
│   │   ├── Pages/
│   │   │   ├── Auth/
│   │   │   ├── Helpers/
│   │   │   ├── admin/
│   │   │   ├── placesView.tsx
│   │   │   └── reservationSearch.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── types/
│   │   ├── app.tsx
│   │   └── bootstrap.js
│   └── views/
├── routes/
│   ├── console.php
│   └── web.php
├── storage/
├── tests/
├── .editorconfig
├── .env.example
├── artisan
├── components.json
├── composer.json
├── package.json
├── phpunit.xml
├── postcss.config.js
├── tsconfig.json
└── vite.config.js
```

---

## Vista previa

### Pantalla de Login

![Login](https://res.cloudinary.com/doublebl/image/upload/v1775601662/login_tgpqru.png)

### Pantalla de Registro de Usuario

![Registro de usuario](https://res.cloudinary.com/doublebl/image/upload/v1775603626/register_qtz8bo.png)

### Pantalla de Registro de reserva
![Registro de reserva](https://res.cloudinary.com/doublebl/image/upload/v1775601662/dashboard_ghsj25.png)

### Pantalla de Confirmación de reserva
![Confirmación de reserva](https://res.cloudinary.com/doublebl/image/upload/v1775601662/confirm_reserv_jx1aas.png)

### Búsqueda de reservas
![Búsqueda de reservas](https://res.cloudinary.com/doublebl/image/upload/v1775601662/search_uqzk9j.png)

### Vista de reserva
![Vista de reserva](https://res.cloudinary.com/doublebl/image/upload/v1775601662/view_search_kszrbh.png)

### Vista de edición de reserva
![Edición de reservas](https://res.cloudinary.com/doublebl/image/upload/v1775601663/edit_search_fdlwe7.png)

---

## Autor

**Reyna Blacido**  
Puedes ver mis otros proyectos en mi perfil de [GitHub](https://github.com/BlackDoubleB).

---

## Licencia

Este proyecto está bajo la licencia [MIT](https://choosealicense.com/licenses/mit/). Siéntete libre de usarlo, modificarlo y distribuirlo.
