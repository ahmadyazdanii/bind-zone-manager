# bind-zone-manager

[![npm version](https://badgen.net/npm/v/bind-zone-manager)](https://www.npmjs.com/package/bind-zone-manager)

Nodejs module for Parse and Generate zoneFile of Bind DNS. Manager system

### Installation

Use the [npm](https://www.npmjs.com/) for install 

````js
npm install bind-zone-manager --save
````

### Support
The module developed for [Bind9](https://www.isc.org/bind/) system and support basic zone files options.
### Usage

```javascript
/*
   import module
*/
const ZoneManager = require('bind-zone-manager') 

/* 
   generate new manager without zone File path if you want work
   with zoneFile follow `new ZoneManager(<ZoneFilePath>)` 
*/
const manager = new ZoneManager() 

/*
   Parse raw data, if you used <ZoneFilePath> for generate manager
   You do not need to define {RawData} in Parse function
*/
var parsedData = manager.Parse({RawData}) 

/*
   generate {custom-list} to string and you can write it to zone
   file or anything you want to do with it
*/
var generatedData = manager.Generate({custom-list})

```
##### {RawData}
```
zone "test.com" {
   type master;
   file "record-db-file-path";
};

zone "test2.com" {
   type master;
   file "record-db-file-path";
};
```

##### {custom-list}
```javascript
[
   { 
     Host:"test.com",
     Type:"master",
     DbFilePath:"record-db-file-path"
   },
   { 
     Host:"test2.com",
     Type:"master",
     DbFilePath:"record-db-file-path"
   }
]
```
### Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### License
[MIT](https://github.com/ahmadyazdanii/bind-zone-manager/blob/master/LICENSE)