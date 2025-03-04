var bleno = require('bleno');
var BLEService = require('./ble-service');
var GetInfoHost = require('./getInfoHost');
var name = "RpiManagerBLE";
//69766611-4101-1039-7110-000000000000
var uuid = "69766611410110397110000000000000"

GetInfoHost.GetAll().then((info) => {
    console.log(info);
});

try {
  
  bleno.on('stateChange', function(state) {
    console.log('stateChange');
    if (state === 'poweredOn') {
      bleno.startAdvertising(name, uuid, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
    else {
      bleno.stopAdvertising();
    }
  });
  
  bleno.on('advertisingStart', function(err) {
    console.log('advertisingStart');
    if (!err) {
      console.log('advertising...');
      bleno.setServices([
          new BLEService(uuid)
      ]);
    }
  });
  
} catch (error) {
  console.log(error);
}
