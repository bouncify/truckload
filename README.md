# truckload
## Dispatch Manager

This is a demo web app, it is a real time order dispatching system for a distribution company with multiple warehouses.

Developed using the following technologies:

* MVC 5, Entity Framework
* Kendo UI Controls (Progress)
* Webpack 4
* Typescript 3
* SignalR 2.3
* Knockout
* Bootstrap (Custom)
* jQuery
* SQL Service Broker with SQL Table dependency 
* Microsoft Identity Security

The solution includes everything including the local Db database, 

## Prerequisites to run the solution

* Visual Studio 2017 (15.8.1)+
* .NET framework 4.7.1
* Right click package.json and click restore packages

## Additional prerequisites to develop the solution
* NPM 6+
* Git for Windows
* Github (Visual Studio Extension)
* Webpack Task Runner (Visual Studio Extension)

## Brief User Guide
* login=demouser and password=password123
* Admin menu on the right hand side, includes CRUD screens for logins, trucks, trailers and drivers
* Order Central is the main part of the app where loads can be created by hitting the + sign on the load columns
* Orders from the left-hand panel can be dragged onto a load, between loads or back to the order panel
* Life cycle of a load is, orders are created, dragged to a load to match the trailer setup. Load will go red if too heavy or purple if the load quantity is too high. Once a load is configured it can be locked, so it can no longer be edited. The load can then be set to dispatched, which means the load has gone and permanently locked.

## Troubleshooting
* Current Windows user might not have owner rights on the local db truckload database. Use SQL Management studio to give the current windows user owner rights on the DB.
* Service broker might not be enabled on the database. ALTER DATABASE truckload SET ENABLE_BROKER should fix this.
