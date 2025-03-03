var util = require('util');
var bleno = require('bleno');
const MemoriaCharacteristic = require('./memoria-characteristic');
const CPUCharacteristic = require('./cpu-characteristic');
const HostNameCharacteristic = require('./hostname-characteristic');
const DiskCharacteristic = require('./disk-characteristic');
const IPCharacteristic = require('./ip-characteristic');
const ServiceLedCharacteristic = require('./serviceLed-characteristic');
const ServiceGifCharacteristic = require('./serviceGif-characteristic');

function BLEService(uuid) {
    const _this = new bleno.PrimaryService({
        uuid: uuid,
        characteristics: [
            new MemoriaCharacteristic(),
            new CPUCharacteristic(),
            new HostNameCharacteristic(),
            new DiskCharacteristic(),
            new IPCharacteristic(),
            new ServiceLedCharacteristic(),
            new ServiceGifCharacteristic()
        ]
    });
    return _this;
}

util.inherits(BLEService, bleno.PrimaryService);

module.exports = BLEService;