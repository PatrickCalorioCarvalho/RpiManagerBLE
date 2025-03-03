var util = require('util');
var bleno = require('bleno');
var GetInfoHost = require('./getInfoHost');

var value = 'IP';
//69766611-4101-1039-7110-000000000005
var uuid = "69766611410110397110000000000005"

function IPCharacteristic() {
    const _this = new bleno.Characteristic({
    uuid: uuid,
    properties: ['read'],
    onReadRequest: (offset, callback) => {
        if (offset) {
            callback(this.RESULT_ATTR_NOT_LONG, null);
        }else{
          GetInfoHost.GetIP().then((info) => {
            if (info) {
              var dataInfo = Buffer.from(info, 'utf-8');
              callback(this.RESULT_SUCCESS, dataInfo);
            }else
            {
              callback(this.RESULT_SUCCESS,Buffer.from(""));
            }
          });
            
        }
    },
    descriptors: [
      new bleno.Descriptor({
        uuid: uuid,
        value: value
      })
    ]
  });
  return _this;
}
  
util.inherits(IPCharacteristic, bleno.Characteristic);

module.exports = IPCharacteristic;