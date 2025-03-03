const si = require('systeminformation');
const os = require('os');
const { exec } = require('child_process');

function verificarServico(servico) {
  return new Promise((resolve, reject) => {
    const comando = `systemctl is-active --quiet ${servico}`;
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function GetMemoria() {
  const memoria = await si.mem();
  return (memoria ? (memoria.active / memoria.total) * 100 : 0).toFixed(2);
}

async function GetCPU() {
  const cpuLoadPercent = await si.currentLoad();
  return (cpuLoadPercent ? cpuLoadPercent.currentLoad : 0).toFixed(2);
}

async function GetFreeDisk() {
  const fsSize = await si.fsSize();
  return (fsSize && fsSize[0] ? (fsSize[0].size - fsSize[0].used) / (1024 ** 3) : 0).toFixed(2);
}

async function GetIP() {
  const redes = await si.networkInterfaces();
  return redes
  .filter((interfaceInfo) => interfaceInfo.ip4 && interfaceInfo.iface !== 'lo')
  .map((interfaceInfo) => interfaceInfo.ip4)[0] || 'Não encontrado';
}

async function GetHostName() {
  return os.hostname();
}

async function GetServiceGif() {
  var status = await verificarServico("GIF_DISPLAY");
  if(status) 
      return "Executando"
  return "Parado"
}

async function GetServiceLed() {
  var status = await verificarServico("LED_RGB");
  if(status) 
    return "Executando"
  return "Parado"
}

async function GetAll() {
  try {
    const memoriaUsadaPercent = GetMemoria()
    const cpuUsadaPercent = GetCPU()
    const espacoLivreGB = GetFreeDisk()
    const ipAddress = GetIP()
    const hostname = GetHostName();
    const servicoGif = GetServiceGif();
    const servicoLed = GetServiceLed();

    const informacoes = {
      memoria_usada_percent: memoriaUsadaPercent,
      cpu_usada_percent: cpuUsadaPercent,
      espaco_livre_GB: espacoLivreGB,
      servico_gif: servicoGif,
      servico_led: servicoLed,
      ip: ipAddress,
      hostname: hostname,
    };

    return informacoes;

  } catch (error) {
    console.error('Erro ao obter informações da máquina:', error);
    return null;
  }
}

module.exports = {GetMemoria,GetCPU,GetFreeDisk,GetIP,GetHostName,GetServiceGif,GetServiceLed,GetAll};