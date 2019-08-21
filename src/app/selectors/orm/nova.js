export const selectServers = (state) => state.orm.nova.servers;

export const selectFlavors = (state) => state.orm.nova.flavors;

export const selectServer = (state) => state.orm.nova.server;

export const selectKeypairs = (state) => state.orm.nova.keypairs;

export const selectConsoleOutput = (state) => state.orm.nova.consoleOutput;

export const selectQuotaSet = (state) => state.orm.nova.quotaSet;