export const selectNetworks = (state) => state.orm.neutron.networks;

export const selectRouters = (state) => state.orm.neutron.routers;

export const selectRouter = (state) => state.orm.neutron.router;

export const selectSubnets = (state) => state.orm.neutron.subnets;

export const selectPorts = (state) => state.orm.neutron.ports;

export const selectRouterPorts = (state) => state.orm.neutron.routerPorts;

export const selectRouterInterfacePorts = (state) => state.orm.neutron.routerInterfacePorts;

export const selectSecurityGroups = (state) => state.orm.neutron.securityGroups;