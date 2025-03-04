var util = require('util');
var bleno = require('bleno');
const MemoriaCharacteristic = require('./memoria-characteristic');
const CPUCharacteristic = require('./cpu-characteristic');
const HostNameCharacteristic = require('./hostname-characteristic');
const DiskCharacteristic = require('./disk-characteristic');
const IPCharacteristic = require('./ip-characteristic');
const ServiceLedCharacteristic = require('./serviceLed-characteristic');
const ServiceGifCharacteristic = require('./serviceGif-characteristic');
const CPUTempCharacteristic = require('./cputemp-characteristic');

function BLEService(uuid) {
    const _this = new bleno.PrimaryService({
        uuid: uuid,
        characteristics: [
            new MemoriaCharacteristic(), //01
            new CPUCharacteristic(), //02
            new HostNameCharacteristic(), //03
            new DiskCharacteristic(), //04
            new IPCharacteristic(), //05
            new ServiceLedCharacteristic(), //06
            new ServiceGifCharacteristic(), //07
            new CPUTempCharacteristic() //08
        ]
    });
    return _this;
}

util.inherits(BLEService, bleno.PrimaryService);

module.exports = BLEService;