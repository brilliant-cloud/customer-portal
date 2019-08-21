import Overview from 'features/overview';
import Instance from 'features/instance';
import Image from 'features/image/';
import Volume from 'features/volume/';
import keypair from 'features/keypair';
import Router from 'features/router';
import Network from 'features/network';

const CONSOLE_ROUTES = {
  'overview': Overview,
  'instances': Instance,
  'images': Image,
  'volumes': Volume,
  'keypairs': keypair,
  'routers': Router,
  'networks': Network
};

// Usage
const TENANT_USAGE_TABLE_COLUMN = [
  'name',
  'vcpus',
  'memory_mb',
  'local_gb',
  'hours',
  'started_at',
];

const TENANT_USAGE_FIELD = {
  'name': 'Name',
  'flavor': 'Specification',
  'vcpus': 'vCPU quantity',
  'memory_mb': 'RAM(MB)',
  'local_gb': 'System Disk(GB)',
  'hours': 'Boot Time',
  'started_at': 'Creation Time'
};

// Flavor
const FLAVOR_TABLE_COLUMN = [
  "name",
  "vcpus",
  "ram",
  "disk"
];

const FLAVOR_FIELD = {
  "name": "Name",
  "id": "Specification ID",
  "vcpus": "vCPU Quantity",
  "ram": "Memory Size",
  "disk": "System Disk Size"
};

// Instance
const INSTANCE_TABLE_COLUMN = [
  "name",
  "image",
  "flavor",
  "addresses",
  "key_name",
  "created",
  "security_groups",
  "status",
  "OS-EXT-STS:task_state",
  "OS-EXT-STS:vm_state",
  "OS-EXT-STS:power_state",
];

const INSTANCE_FIELD = {
  "OS-EXT-STS:task_state": "Transition state",
  "addresses": "IP Address",
  "image": "Mirror",
  "OS-EXT-STS:vm_state": "VM status",
  "OS-EXT-SRV-ATTR:instance_name": "Host Instance Name",
  "OS-SRV-USG:launched_at": "Start Time",
  "flavor": "Specification",
  "id": "Cloud Host ID",
  "security_groups": "Security Group",
  "user_id": "User",
  "OS-DCF:diskConfig": "DiskConfig",
  "OS-EXT-STS:power_state": "Power Status",
  "OS-EXT-AZ:availability_zone": "Availability Zone",
  "metadata": "Metadata",
  "status": "Status",
  "updated": "Update Time",
  "hostId": "Host Machine",
  "OS-EXT-SRV-ATTR:host": "Host Machine",
  "key_name": "Key Pair",
  "OS-EXT-SRV-ATTR:hypervisor_hostname": "Hypervisor Host Name",
  "name": "Name",
  "created": "Creation Time",
  "tenant_id": "Project",
  "os-extended-volumes:volumes_attached": "Mounted Disk",
  "config_drive": "ConfigDrive"
};

const INSTANCE_STATUS = {
  "ACTIVE": "Running",
  "BUILD": "Building",
  "DELETED": "Deleted",
  "ERROR": "Error",
  "HARD_REBOOT": "Hard Reboot",
  "MIGRATING": "Migrating",
  "PASSWORD": "Password",
  "PAUSED": "Paused",
  "REBOOT": "Reboot",
  "REBUILD": "Rebuild",
  "RESCUED": "Rescued",
  "RESIZED": "Resized",
  "REVERT_RESIZE": "Revert Change",
  "SOFT_DELETED": "Soft Delete",
  "STOPPED": "Stopped",
  "SUSPENDED": "Suspended",
  "SHUTOFF": "Shut Down",
  "UNKNOWN": "Unknown",
  "VERIFY_RESIZE": "Confirm",
};

const INSTANCE_POWER_STATE = {
  "1": {
    "en": "Running"
  },
  "3": {
    "en": "Paused"
  },
  "4": {
    "en": "Shutdown"
  },
  "6": {
    "en": "Crashed"
  },
  "7": {
    "en": "Suspended"
  }
};

// Image
const IMAGE_TABLE_COLUMN = [
  "name",
  "status",
  "size",
  "owner"
];

const IMAGE_FIELD = {
  "name": "Name",
  "status": "Status",
  "size": "Size",
  "owner": "Owner"
};

// Keypair
const KEYPAIR_TABLE_COLUMN = [
  "name",
  "fingerprint",
];

const KEYPAIR_FIELD = {
  "name": "Name",
  "fingerprint": "Finger Print",
};

// Volume
const VOLUME_TABLE_COLUMN = [
  "name",
  "description",
  "size",
  "volume_type",
  "status",
  // "attachments",
  "bootable",
  "created_at",
  // "disk_format"
];

const VOLUME_FIELD = {
  "name": "Name",
  "description": "Description",
  "size": "Size(GB)",
  "volume_type": "Volume Type",
  "status": "Status",
  "attachments": "Volume Attached with serverID",
  "bootable": "Bootable",
  "disk_format": "Disk Format",
  "created_at": "Creation Time"
};

const VOLUME_STATUS = {
  "creating": "Creating",
  "available": "Available",   // green
  "attaching": "Attaching",
  "detaching": "DeAttaching",
  "in-use": "In Use",  // blue
  "deleting": "Deleting",
  "error": "Error",    // red
  "error_deleting": "Error Deleting",  // red
  "error_extending": "Error Details", // red
  "extending": "Expansion",
  // all others yellow.
};

const VOLUME_TYPE = {
  "Capacity": "Capacity",
  "Performance": "Performance",
};

// Quota
const QUOTA_LIST = [
  'instances',
  'cores',
  'metadata_items',
  'server_group_members',
  'ram',
  'server_groups',
  'floating_ips',
  'key_pairs',
  'security_group_rules',
  'injected_files',
  'fixed_ips',
];

const QUOTA_FIELD = {
  'injected_file_content_bytes': 'Injected File Content in Bytes (个)',
  'metadata_items': 'Metadata Entry (个)',
  'server_group_members': 'Server Group Members (个)',
  'server_groups': 'Server Groups (个)',
  'ram': 'RAM (MB)',
  'floating_ips': 'Floating IP (个)',
  'key_pairs': 'Key Pairs (个)',
  'instances': 'Instances (个)',
  'security_group_rules': 'Security Group Rules (个)',
  'injected_files': 'Injected Files (个)',
  'cores': 'vCPU Quantity ',
  'fixed_ips': 'Fixed IP (个)',
  'injected_file_path_bytes': 'Injected File Path (个)',
  'security_groups': 'Security Group (个)',
};

//
const BREADCRUMB_FIELD = {
  'console': 'console',
  'overview': 'overview',
  'instances': 'instances',
  'volumes': 'volumes',
  'images': 'images',
  'keypairs': 'SSHKeyPairs',
  'vpc': 'VPC Network',
  'routers': 'Router',
};

//
const MONITOR_TIME_SPAN = {
  "1hour": "1h",
  "6hours": "6h",
  "1day": "24h",
  "1month": "30d",
  "6months": "180d",
  "1year": "365d",
};

const MONITOR_TIME_STEP = {
  "1hour": "20s",
  "6hours": "2m",
  "1day": "8m",
  "1month": "4h",
  "6months": "24h",
  "1year": "48h",
};


const NETWORK_TABLE_COLUMN = [
  'name',
  'status',
  'admin_state_up',
  'router:external'
];

const NETWORK_FIELD = {
  "status": "Status",
  "name": "Name",
  "admin_state_up": "Management Status",
  "router:external": "External network",
};


const ROUTER_TABLE_COLUMN = [
  'name',
  'status',
  'admin_state_up',
  'external_gateway_info'
];

const ROUTER_FIELD = {
  "name": "Name",
  "status": "Status",
  "admin_state_up": "Management Status",
  "external_gateway_info": "External Gateway"
};


const SUBNET_TABLE_COLUMN = [
  'name',
  'cidr',
  'ip_version',
  'gateway_ip',
  'network_id',
];

const SUBNET_FIELD = {
  "name": "Name",
  "cidr": "CIDR",
  "ip_version": "IP Version",
  "gateway_ip": "Gateway IP",
  "network_id": "Network Id"
};


const PORT_TABLE_COLUMN = [
  'name',
  'fixed_ips',
  'device_owner',
  'device_id',
  'status',
  'admin_state_up'
];

const PORT_FIELD = {
  "name": "Name",
  "fixed_ips": "Fixed IP",
  "device_owner": "Type Of Connected device",
  "device_id": "ID Of Connected Device",
  "status": "Status",
  "admin_state_up": "Management Status",
};

export {
  CONSOLE_ROUTES,

  TENANT_USAGE_FIELD,
  TENANT_USAGE_TABLE_COLUMN,

  FLAVOR_TABLE_COLUMN,
  FLAVOR_FIELD,

  INSTANCE_TABLE_COLUMN,
  INSTANCE_FIELD,
  INSTANCE_STATUS,
  INSTANCE_POWER_STATE,

  IMAGE_TABLE_COLUMN,
  IMAGE_FIELD,

  KEYPAIR_TABLE_COLUMN,
  KEYPAIR_FIELD,

  VOLUME_TABLE_COLUMN,
  VOLUME_FIELD,
  VOLUME_STATUS,
  VOLUME_TYPE,

  QUOTA_LIST,
  QUOTA_FIELD,

  BREADCRUMB_FIELD,

  MONITOR_TIME_STEP,
  MONITOR_TIME_SPAN,

  NETWORK_FIELD,
  NETWORK_TABLE_COLUMN,

  ROUTER_FIELD,
  ROUTER_TABLE_COLUMN,

  SUBNET_FIELD,
  SUBNET_TABLE_COLUMN,

  PORT_FIELD,
  PORT_TABLE_COLUMN,
}
