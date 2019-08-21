const apiPath = {
  // Identity
  fetchToken: {
    path: '/v3/auth/tokens',
    type: 'identity',
  },

  getTokenData: {
    path: '/v3/auth/tokens',
    type: 'identity',
  },

  deleteToken: {
    path: '/v3/auth/tokens',
    type: 'identity',
  },

  getOwnProjects: {
    path: '/v3/users/${user_id}/projects',
    type: 'identity',
  },

  // Image
  getImages: {
    path: '/v2/images',
    type: 'image',
  },

  // Compute
  updateServer: {
    path: '/servers/${server_id}',
    type: 'compute',
  },

  getNovaLimit: {
    path: '/limits',
    type: 'compute',
  },

  getFlavors: {
    path: '/flavors/detail',
    type: 'compute',
  },

  getServers: {
    path: '/servers/detail',
    type: 'compute',
  },

  getServer: {
    path: '/servers/${server_id}',
    type: 'compute'
  },

  getProjectQuota: {
    path: '/os-quota-sets/${project_id}/detail',
    type: 'compute',
  },

  getTenantUsage: {
    path: '/os-simple-tenant-usage/${project_id}?detailed=1',
    type: 'compute'
  },

  getKeypairs: {
    path: '/os-keypairs',
    type: 'compute'
  },

  createServer: {
    path: '/servers',
    type: 'compute',
  },

  operateServer: {
    path: '/servers/${server_id}/action',
    type: 'compute'
  },

  // Volume
  getCinderLimit: {
    path: '/limits',
    type: 'volumev3'
  },

  getVolumes: {
    path: '/volumes/detail',
    type: 'volumev3'
  },

  getVolumeTypes: {
    path: '/types',
    type: 'volumev3'
  },

  createVolume: {
    path: '/volumes',
    type: 'volumev3'
  },

  getVolume: {
    path: '/volumes/${volume_id}',
    type: 'volumev3'
  },

  updateVolume: {
    path: '/volumes/${volume_id}',
    type: 'volumev3'
  },

  operateVolume: {
    path: '/volumes/${volume_id}/action',
    type: 'volumev3'
  },

  deleteVolume: {
    path: '/volumes/${volume_id}',
    type: 'volumev3'
  },

  // Network
  getNetworks: {
    path: '/v2.0/networks',
    type: 'network',
  },

  getSecurityGroups: {
    path: '/v2.0/security-groups?project_id=${project_id}',
    type: 'network'
  },

  getRouters: {
    path: '/v2.0/routers',
    type: 'network'
  },

  getRouter: {
    path: '/v2.0/routers/${router_id}',
    type: 'network'
  },

  getSubnets: {
    path: '/v2.0/subnets',
    type: 'network'
  },

  getPorts: {
    path: '/v2.0/ports',
    type: 'network'
  },

  getRouterPorts: {
    path: '/v2.0/ports?device_id=${router_id}',
    type: 'network'
  },

  getRouterSnatPorts: {
    path: '/v2.0/ports?device_id=${router_id}&device_owner=network:router_centralized_snat',
    type: 'network'
  },

  getRouterGatewayPorts: {
    path: '/v2.0/ports?device_id=${router_id}&device_owner=network:router_gateway',
    type: 'network'
  },

  getRouterInterfacePorts: {
    path: '/v2.0/ports?device_id=${router_id}&device_owner=network:router_interface_distributed',
    type: 'network'
  },

  // Monitor
  getMonVcpuCoreUsage: {
    path: '/query?q=',
    type: 'monitor'
  },

  getMonVcpuTotalUsage: {
    path: '/query?q=',
    type: 'monitor'
  },

  getMonVmemUsage: {
    path: '/query?q=',
    type: 'monitor'
  }
};


const proxyPrefix = {
  identity: '/os-identity',
  compute: '/os-compute',
  image: '/os-image',
  volumev3: '/os-volume',
  network: '/os-network',
  monitor: '/os-monitor',
};

export { apiPath, proxyPrefix }

