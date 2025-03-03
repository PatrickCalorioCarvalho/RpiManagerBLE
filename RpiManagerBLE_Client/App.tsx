/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ColorfulCard from '@freakycoder/react-native-colorful-card';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { BleManager, Device } from 'react-native-ble-plx';
const manager = new BleManager();
const bleName = 'RpiManagerBLE';
const serviceUUID = '69766611-4101-1039-7110-000000000000';
const MemoriaCharacteristicUUID = '69766611-4101-1039-7110-000000000001';
const CPUCharacteristicUUID = '69766611-4101-1039-7110-000000000002';
const HostNameCharacteristicUUID = '69766611-4101-1039-7110-000000000003';
const DiskCharacteristicUUID = '69766611-4101-1039-7110-000000000004';
const IPCharacteristicUUID = '69766611-4101-1039-7110-000000000005';
const ServiceLedCharacteristicUUID = '69766611-4101-1039-7110-000000000006';
const ServiceGifCharacteristicUUID = '69766611-4101-1039-7110-000000000007';
function App(): React.JSX.Element {

  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [Memoria, setMemoria] = useState<number>(0);
  const [CPU, setCPU] = useState<number>(0);
  const [HostName, setHostName] = useState<string>('');
  const [Disk, setDisk] = useState<number>(0);
  const [IP, setIP] = useState<string>('');
  const [ServiceLed, setServiceLed] = useState<string>('');
  const [ServiceGif, setServiceGif] = useState<string>('');
  const [ConnectDevice, setConnectDevice] = useState<Device| undefined>(undefined);

  useEffect(() => {
    async function getMemoria() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, MemoriaCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataMemoria  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('Memoria',dataMemoria);
            setMemoria(Number(dataMemoria));
          }
        }).catch(error=>{
          console.log('Erro ao Ler Memoria:',error);
        });
      }
    }
    async function getCPU() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, CPUCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataCPU  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('CPU',dataCPU);
            setCPU(Number(dataCPU));
          }
        }).catch(error=>{
          console.log('Erro ao Ler CPU:',error);
        });
      }
    }
    async function getHostName() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, HostNameCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataHostName  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('HostName',dataHostName);
            setHostName(dataHostName);
          }
        }).catch(error=>{
          console.log('Erro ao Ler HostName:',error);
        });
      }
    }
    async function getDisk() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, DiskCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataDisk  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('Disk',dataDisk);
            setDisk(Number(dataDisk));
          }
        }).catch(error=>{
          console.log('Erro ao Ler Disk:',error);
        });
      }
    }
    async function getIP() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, IPCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataIP  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('IP',dataIP);
            setIP(dataIP);
          }
        }).catch(error=>{
          console.log('Erro ao Ler IP:',error);
        });
      }
    }
    async function getServiceLed() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, ServiceLedCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataServiceLed  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('ServiceLed',dataServiceLed);
            setServiceLed(dataServiceLed);
          }
        }).catch(error=>{
          console.log('Erro ao Ler ServiceLed:',error);
        });
      }
    }
    async function getServiceGif() {
      if(ConnectDevice?.id)
      {
        await manager.readCharacteristicForDevice(ConnectDevice?.id,serviceUUID, ServiceGifCharacteristicUUID ).then(readData=>{
          if(readData.value)
          {
            var dataServiceGif  = Buffer.from(readData.value, 'base64').toString('utf8');
            console.log('ServiceGif',dataServiceGif);
            setServiceGif(dataServiceGif);
          }
        }).catch(error=>{
          console.log('Erro ao Ler ServiceGif:',error);
        });
      }
    }

    getMemoria();
    getCPU();
    getHostName();
    getDisk();
    getIP();
    getServiceLed();
    getServiceGif();
    const intervalId = setInterval(() => {
      getMemoria();
      getCPU();
      getServiceLed();
      getServiceGif();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [ConnectDevice]);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true;
    }
    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);
      if (apiLevel < 31 && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }
    return false;
  };

  const connect = async (device: Device) => {
    try {
    await manager.connectToDevice(device.id,{autoConnect: true}).then(async () =>{
      return true;
    }).catch(error => {
      console.log('ERRO', error);
      });
    } catch (error) {
      console.error('Error connecting to device:', error);
  }};

  async function scan () {
    const permission = await requestBluetoothPermission();
    if (permission) {
      console.log('BUSCANDO');
      manager.startDeviceScan(null, null, async (error, device) => {
        if (error) {
          console.log(error);
          return;
        }
        if (device?.name === bleName) {
          console.log('ACHOU');
          connect(device);
          manager.stopDeviceScan();
          await setTimeout(async () => {
            await manager.discoverAllServicesAndCharacteristicsForDevice(device.id);
            setIsConnect(true);
            setConnectDevice(device);
            console.log('CONECTADO');
          }, 3000);
        }
      });
    }else
    {
      console.log('SEM PERMISSAO');
    }
  }
  const disconnectFromDevice = async () => {
    if(ConnectDevice?.id)
    {
      await ConnectDevice.cancelConnection().then(()=>{
        console.log('DESCONECTADO');
        setIsConnect(false);
        setConnectDevice(undefined);
      }).catch(error=>{
        console.log(' Disconnect Failed: ', error);
        setIsConnect(false);
        setConnectDevice(undefined);
      });
    }
  };

  return (
    <>
    <StatusBar barStyle="dark-content" />
    {isConnect ? (
      <>
      <SafeAreaView>
      <View
          style={{
            margin:10,
          }}>
            <TouchableOpacity style={{
                    backgroundColor: '#B1303A',
                    paddingHorizontal: 80,
                    paddingVertical: 20,
                    borderRadius: 10,
                    alignItems:'center',
              }}
              onPress={disconnectFromDevice}
            >
              <Text style={{ fontSize: 18,color:'#ffffff'}}>Desconetar Dispositvo RpiManagerBLE</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView
        style={{
          marginTop: 10,
        }}
      >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <ColorfulCard
          style={{
            height: '100%',
            width: '35%',
            backgroundColor: '#5a65ff',
          }}
          title="Hostname"
          value={HostName}
          iconImageSource={require('./assets/hostname.png')}
          onPress={() => { } } footerTitle={''} footerValue={''} />
        <ColorfulCard
          style={{
            height: '100%',
            width: '25%',
            backgroundColor: '#7954ff',
          }}
          title="Space Free"
          value={`${Disk} GB`}
          iconImageSource={require('./assets/spacefree.png')}
          onPress={() => { } } footerTitle={''} footerValue={''} />
        <ColorfulCard
          style={{
            height: '100%',
            width: '35%',
            backgroundColor: '#5a65ff',
          }}
          title="IP address"
          value={IP}
          iconImageSource={require('./assets/ip.png')}
          onPress={() => { } } footerTitle={''} footerValue={''} />
      </View>
    </SafeAreaView><SafeAreaView
      style={{
        marginTop: 20,
      }}
    >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
              <ColorfulCard
                style={{
                  height: '100%',
                  width: '46%',
                  backgroundColor: '#fe8f61',
                }}
                title="Service LED RGB"
                value={ServiceLed}
                iconImageSource={require('./assets/service.png')}
                onPress={() => { } } footerTitle={''} footerValue={''} />
                <ColorfulCard
                style={{
                  height: '100%',
                  width: '46%',
                  backgroundColor: '#fe8f61',
                }}
                title="Service GIF OLED"
                value={ServiceGif}
                iconImageSource={require('./assets/service.png')}
                onPress={() => { } } footerTitle={''} footerValue={''} />
        </View>
      </SafeAreaView><SafeAreaView
        style={{
          marginTop: 16,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <AnimatedCircularProgress
            size={300}
            width={40}
            fill={Memoria}
            tintColor="#2bc3ff"
            backgroundColor="#002359">
            {() => (
              <><Text style={{ fontSize: 30,color:'#002359' }}>
                {Memoria.toString()} %
              </Text>
              <Text style={{ fontSize: 15,color:'#002359' }}>
                Memoria
              </Text></>
            )}
          </AnimatedCircularProgress>
          <AnimatedCircularProgress
            size={300}
            width={40}
            fill={CPU}
            tintColor="#2bc3ff"
            backgroundColor="#002359">
            {() => (
              <><Text style={{ fontSize: 30,color:'#002359' }}>
              {CPU.toString()} %
            </Text>
            <Text style={{ fontSize: 15,color:'#002359' }}>
              CPU
            </Text></>
            )}
          </AnimatedCircularProgress>
        </View>
      </SafeAreaView>
      </>
    ) : (

      <SafeAreaView>
      <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <TouchableOpacity style={{
                    backgroundColor: '#2c9628',
                    paddingHorizontal: 80,
                    paddingVertical: 20,
                    borderRadius: 10,
              }}
              onPress={scan}
            >
              <Text style={{ fontSize: 18,color:'#ffffff' }}>Procurar Dispositvo RpiManagerBLE</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
  )}
  </>
  );
}

export default App;
