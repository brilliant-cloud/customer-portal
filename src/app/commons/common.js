import { apiPath, proxyPrefix } from 'app/config/api';
import _ from 'lodash';
import moment from 'moment';

const ormItems = (arr, key = 'id') => {
  return [getItems(arr, key), getItemsById(arr, key)];
};

// arr 是一个对象数组，返回由所有对象的 key 的键值组成的新数组
const getItems = (arr, key = 'id') => {
  let items = [];
  arr.forEach(item => {
    items.push(item[key]);
  });
  return items;
};

// arr 是一个对象数组
const getItemsById = (arr, key = 'id') => {
  let itemsById = {};
  arr.forEach(item => {
    itemsById[item[key]] = item;
  });
  return itemsById;
};

// 数组去重
const uniqueArr = (arr) => {
  return arr.filter((item, index, arr) => arr.indexOf(item) === index);
};

const decideIfLogged = () => {
  let isLogged = false;
  let scopedToken = localStorage.getItem('scopedToken');
    let expiresUTC = localStorage.getItem('expires_at');
    let urlPrefix = localStorage.getItem('urlPrefix');
    let projectID = localStorage.getItem('projectID');

    let nowUTC = moment.utc().format();
    if (scopedToken &&
      urlPrefix &&
      projectID &&
      moment(expiresUTC).isAfter(nowUTC)) {
      isLogged = true;
    } else {
      localStorage.clear();
    }
    return isLogged
};

// return a parsed URL object
const parseURL = (url) => {
  let parser = document.createElement('a');
  parser.href = url;
  return parser;
};

const parseURLPrefix = (data) => {
  let catalog = data.token.catalog;
  let urlPrefix = {};
  catalog.forEach((items) => {
    items.endpoints.forEach((item) => {
      if (item.interface === 'public') {
        urlPrefix[items.type] = parseURL(item.url).pathname
      }
    })
  });
  urlPrefix['monitor'] = '/';
  return urlPrefix;
};

//
const combineIdentityURL = (operation, tmpl={}) => {
  let serviceType = apiPath[operation].type;
  let url = proxyPrefix[serviceType] +
      apiPath[operation].path;
  return _.template(url)(tmpl);
};

// After Identity Passed.
const combineURL = (operation, tmpl={}) => {
  let serviceType = apiPath[operation].type;
  let urlPrefix = JSON.parse(localStorage.getItem('urlPrefix'));
  let url = proxyPrefix[serviceType] +
    urlPrefix[serviceType] +
    apiPath[operation].path;
  return _.template(url)(tmpl);
};

const getToken = () => {
  return localStorage.getItem('scopedToken');
};

const getQueryStatement = (serverID, timeSpan, timeStep) => {
  return {
    monVcpuCoreUsage: `SELECT derivative(mean(value), 1s) / 1000000000 
      FROM collectd.autogen.virt_value 
      WHERE host =~ /^${serverID}$/ 
      AND type = 'virt_vcpu' 
      AND type_instance =~ /.*/ 
      AND time > now() - ${timeSpan} 
      GROUP BY time(${timeStep}), host, type, type_instance`,

    monVcpuTotalUsage: `SELECT derivative(mean(value), 1s) / 1000000000 
      FROM collectd.autogen.virt_value 
      WHERE host =~ /^${serverID}$/ 
      AND type = 'virt_cpu_total' 
      AND type_instance =~ /.*/ 
      AND time > now() - ${timeSpan} 
      GROUP BY time(${timeStep}), host, type, type_instance`,

    monVmemUsage: `SELECT mean(value) 
      FROM collectd.autogen.virt_value 
      WHERE host =~ /^${serverID}$/ 
      AND type = 'memory' 
      AND (type_instance = 'unused' OR type_instance = 'available') 
      AND time > now() - ${timeSpan} 
      GROUP BY time(${timeStep}), host, type, type_instance`
  }
};

export {
  parseURLPrefix,
  combineURL,
  combineIdentityURL,
  getToken,
  getQueryStatement,
  decideIfLogged,
  uniqueArr,
  ormItems
};


