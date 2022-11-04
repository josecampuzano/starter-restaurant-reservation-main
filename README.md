# Periodic Tables: Restaurant Reservation Application

## Introduction
Periodic Tables is a restaurant reservation booking and table management system. Users of this application can view, create, edit, and delete reservations. Users can also search for reservations via mobile-number. Users can create new tables and seat reservations at a specific table. When seating the reservation at a table, validation will occur to ensure that the table size is of capable capacity for the reservation.


## Active Example

https://restaurant-reservation-client-hvp4.onrender.com/dashboard


## Server Paths 
Please see the table below for a lits of the paths the server is capable of. For new paths, please submit an issue with a description of the path and the use-case of the path. 


| Route | Method |  Description |
| ----- | ------ |  ----------- |
| `/reservations` | POST| creates and returns a new reservation |
| `/reservations?date='YYYY-MM-DD'`| GET | returns reservations by date (sorted asc) |
| `/reservations?mobile_number=123` |GET | returns reservations by partial match of phone number |
| `/reservations/:reservationId` |GET| returns reservation matching the reservationId |
| `/reservations/:reservationId` |PUT| updates and returns the reservation matching the reservationId |
| `/reservations/:reservationId/status` |PUT | updates only the status of a reservation |
| `/tables` |GET | returns all Tables |
| `/tables` |POST| creates and returns a new table |
| `/tables:table_id/seat` |PUT| updates a table with a reservation Id and changes status to "occupied" |
| `/tables:table_id/seat` |DELETE | updates a table by deleting reservation Id and changes status to "free" |

<br />

## Features

### Create Reservation
Create a new reservation by clicking on the `+ New Reservation` at the top of the page. Each reservation requires a first name, last name, mobile number, party size, reservation time, and reservation date.
> Errors will be thrown if one of the following were to occur: 
1. Invalid mobile number length 
2. Any of the fields are empty 
3. Date of reservation is in the past 
4. Time of reservation is not between the restaurant operating hours.

<br />

![Create Reservation](/readMeAssets/CreateReservation.png)
### Edit Reservation
You can edit any of the reservations that have not been seated by clicking on the `Edit` button found under `Actions` for each table. Clicking the edit button will redirect the user to an edit reservation page which will allow the user to edit any of the customer information. 

<br />


### Cancel Reservation
User has the ability to cancel any reservation that has been created and yet to be seated. Clicking on the `Cancel` button found under `Actions` for each table will generate a Window Confirmation dialog box will ask the user to confirm the cancellation. 

![Cancel Reservation](/readMeAssets/CancelReservationConfirmation.png)

### Seat Reservation
To seat a reservation, simply click on the `Seat` button, this will redirect the user to a new page where the user can view the reservation party size. A dropdown table will list all of the tables and the table's max seating. 

>If the party size is too big for the selected table, an error will notify the user that the selected table is too small.

![Seat Reservation](/readMeAssets/SeatReservationOptions.png)

<br />

### Example of a seated table
![Seated Table](/readMeAssets/SeatedTableExample.png)

### Search Reservation
At the top of the navbar is a link to a search page. When the user clicks on the link it will redirect them to the search form where the user can input any mobile number. If the number exists in the database, the reservations with a matching number will be displayed. It will also show the status of the mobile number as either `Seated`, `Booked`, `Cancelled`, or `Finished`.

![Search](/readMeAssets/SearchReservations.png)

### Example of search listing
![Search List](/readMeAssets/SearchReservationsResults.png)


### Create Table
User can click on the `New Table` button. It will redirect the user to the New Table page which allows the user to create a new table name and the seating capacity. 


## Database setup
1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in this [article](https://medium.com/@noogetz/how-to-setup-a-database-with-elephantsql-7d87ea9953d0).
2. After setting up your database instances, connect DBeaver to your new database instances by following the Official Documenation [Here](https://dbeaver.com/docs/wiki/Create-Connection/).

### Knex 
Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located. 

### Installation <a name="installation">
1. Fork and clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start:dev` to start your server in development mode.

## Running tests
This project has unit, integration, and end-to-end (e2e) tests. 
End-to-end tests use browser automation to interact with the application just like the user does.

## Built With
_Back end:_
* ![JavaScript-shield]
* ![Node.js-shield]
* ![Express-shield]
* ![PostgreSQL-shield]

_Font end:_
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* ![CSS-Shield]
* ![JavaScript-shield]

_Other:_
* ![JEST-Shield]
* ![VSCode-Shield]


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JavaScript-shield]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[Node.js-shield]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Express-shield]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[PostgreSQL-shield]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[CSS-Shield]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[JEST-Shield]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[VSCode-Shield]: https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white
