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

## How to run the solution

1. Ensure Visual Studio 2017 (15.8.1)+ is installed
2. Ensure .NET framework 4.7.1 dev pack is installed
3. Ensure npm is installed ( can be installed from https://nodejs.org/en/ )
4. Ensure Git is installed ( can be installed from https://git-scm.com/download/win )
5. Open a command prompt window and navigate to repos folder e.g. c:\dev\repos\
6. Execute command "git clone https://github.com/bouncify/truckload"
7. Navigate to the project folder e.g. c:\dev\repos\truckload\truckload
8. execute "npm install" to install packages
9. execute "npm run build-prod" to build the client bundle
10. Open the truckload solution in Visual Studio e.g. (open file c:\dev\repos\truckload\truckload.sln)
11. ReBuild the solution (click build> rebuild)
12. Run the solution (F5) this should produce "User without permissions" issue
13. To resolve the issue stop running
14. Expand server exporer> data connections> right click on "truckloadEntities" and then click "New Query"
15. At the command prompte type "whoami" this will display the current user e.g. desktop-pc\james
15. Execute the query e.g. exec sp_addrolemember 'db_owner', 'desktop-pc\james'  ( with the current user!)
16. Run the solution (F5)
17. Login with demouser and password123

## Useful components to install to develop the solution
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
* Could not find a part of the path … bin\roslyn\csc.exe this seems intermitant on first build, clicking build and clicking rebuild solution should resolve this
* Current Windows user might not have owner rights on the local db truckload database. See step in how to run to resolve this.
* Service broker might not be enabled on the database. ALTER DATABASE truckload SET ENABLE_BROKER should fix this.
