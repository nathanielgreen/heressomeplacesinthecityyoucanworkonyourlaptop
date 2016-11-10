# Remote Me

*NOTE: RemoteMe is currently undergoing very heavy redevelopment*

*Remote Me*, (previously *Here's Some Places In The City You Can Work On Your Laptop* (HSPITCYCWOYL)) is a
web app that allows users to find, list, and rate areas in their city that are
laptop-work friendly areas (such as cafes, bars & hotels). All locations will be
listed on the interactive map.


## Live Version

A live interactive version of the project is currently unavailable whilst the
project undergoes some critical changes.

**NOTE:** Live version may not be the most up-to-date version of the project.


## Techonologies Used 

- Maps are built with Mapbox and Leaflet.js
- Javascript
- HTML & CSS
- LESS
- Node.js
- Express
- PostgreSQL


## Features Set

Features with a strikethrough have been implemented.

In no particular order:
- [x] ~~Add Express Backend~~
- [x] ~~Search 'Near Me' with specific radius~~
- [x] ~~Locations are stored in the database and placed on the map~~
- [x] ~~Temporary Marker placed when generating coordinates~~
- [x] ~~Search Box (for specific places)~~
- [x] ~~Search Defaults to Location and 1000m with no entries~~
- [ ] Place Features (e.g. free wifi, chargings ports, kind staff) **in
  progress**
  - [x] ~~Capacity~~
  - [x] ~~Wifi~~
  - [x] ~~Price~~
- [ ] Mobile View **in progress**
- [ ] Place Photos
- [ ] Place Profiles
  - Rating
  - Written Reviews
  - Multiple Photos 
- [x] ~~Users can add Places~~
- [ ] User Ratings
- [ ] User Accounts
  - Rating History 
  - Review History


## Known Bugs

Bugs with a strikethrough have been fixed for the current version.

- [x] ~~Markers not removed when they are out of a new chosen radius~~
- [x] ~~Loop breaks when null data is entered~~
- [x] ~~If a postcode is present 'Search Near Me' button still uses that
  address~~
- [x] ~~Null data (empty fields) can be entered into the database.~~
- [x] ~~Markers not showing up when search without a temp marker.~~
- [x] ~~Adding places not working due to isDataNull never returning true~~.
- [x] ~~Second coordinate being returned NaN for leaflet.~~
- [ ] Location finder is outdated.
 
