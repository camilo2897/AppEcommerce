//creamos en la raíz del proyecto un archivo llamado metro.config.js con la siguiente información: 

const { getDefaultConfig } = require('expo/metro-config');
 
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
 
config.resolver.unstable_enablePackageExports = false;
 
module.exports = config;