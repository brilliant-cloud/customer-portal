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
  'name': '名称',
  'flavor': '规格',
  'vcpus': 'vCPU数量',
  'memory_mb': '内存(MB)',
  'local_gb': '系统盘(GB)',
  'hours': '开机时间',
  'started_at': '创建时间'
};

// Flavor
const FLAVOR_TABLE_COLUMN = [
  "name",
  "vcpus",
  "ram",
  "disk"
];

const FLAVOR_FIELD = {
  "name": "名称",
  "id": "规格ID",
  "vcpus": "vCPU数量",
  "ram": "内存大小",
  "disk": "系统盘大小"
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
  "OS-EXT-STS:task_state": "过渡状态",
  "addresses": "IP地址",
  "image": "镜像",
  "OS-EXT-STS:vm_state": "VM状态",
  "OS-EXT-SRV-ATTR:instance_name": "宿主机实例名",
  "OS-SRV-USG:launched_at": "启动时间",
  "flavor": "规格",
  "id": "云主机ID",
  "security_groups": "安全组",
  "user_id": "用户",
  "OS-DCF:diskConfig": "DiskConfig",
  "OS-EXT-STS:power_state": "电源状态",
  "OS-EXT-AZ:availability_zone": "可用区",
  "metadata": "元数据",
  "status": "状态",
  "updated": "更新时间",
  "hostId": "宿主机",
  "OS-EXT-SRV-ATTR:host": "宿主机",
  "key_name": "密钥对",
  "OS-EXT-SRV-ATTR:hypervisor_hostname": "宿主机主机名",
  "name": "名称",
  "created": "创建时间",
  "tenant_id": "项目",
  "os-extended-volumes:volumes_attached": "挂载的磁盘",
  "config_drive": "ConfigDrive"
};

const INSTANCE_STATUS = {
  "ACTIVE": "运行中",
  "BUILD": "构建中",
  "DELETED": "已删除",
  "ERROR": "错误",
  "HARD_REBOOT": "硬重启中",
  "MIGRATING": "迁移中",
  "PASSWORD": "重置密码中",
  "PAUSED": "暂停",
  "REBOOT": "软重启中",
  "REBUILD": "重建中",
  "RESCUED": "救援模式",
  "RESIZED": "更改规格",
  "REVERT_RESIZE": "撤消更改规格",
  "SOFT_DELETED": "软删除",
  "STOPPED": "停止",
  "SUSPENDED": "挂起",
  "SHUTOFF": "关闭",
  "UNKNOWN": "未知",
  "VERIFY_RESIZE": "确认变更规格",
};

const INSTANCE_POWER_STATE = {
  "1": {
    "en": "Running",
    "ch": "运行中"
  },
  "3": {
    "en": "Paused",
    "ch": "暂停"
  },
  "4": {
    "en": "Shutdown",
    "ch": "关闭"
  },
  "6": {
    "en": "Crashed",
    "ch": "崩溃"
  },
  "7": {
    "en": "Suspended",
    "ch": "挂起"
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
  "name": "名称",
  "status": "状态",
  "size": "大小",
  "owner": "所有者"
};

// Keypair
const KEYPAIR_TABLE_COLUMN = [
  "name",
  "fingerprint",
];

const KEYPAIR_FIELD = {
  "name": "名称",
  "fingerprint": "公钥指纹",
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
  "name": "名称",
  "description": "描述",
  "size": "大小(GB)",
  "volume_type": "磁盘类型",
  "status": "状态",
  "attachments": "连接到 serverID 的设备",
  "bootable": "可启动",
  "disk_format": "磁盘格式",
  "created_at": "创建时间"
};

const VOLUME_STATUS = {
  "creating": "创建中",
  "available": "可用",   // green
  "attaching": "绑定中",
  "detaching": "解绑中",
  "in-use": "在用",  // blue
  "deleting": "删除中",
  "error": "错误",    // red
  "error_deleting": "删除错误",  // red
  "error_extending": "扩容错误", // red
  "extending": "扩容中",
  // all others yellow.
};

const VOLUME_TYPE = {
  "Capacity": "容量型",
  "Performance": "性能型",
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
  'injected_file_content_bytes': '注入的文件内容字节数 (个)',
  'metadata_items': '元数据条目 (个)',
  'server_group_members': '主机组成员 (个)',
  'server_groups': '主机组 (个)',
  'ram': '内存 (MB)',
  'floating_ips': '浮动IP (个)',
  'key_pairs': '密钥对 (个)',
  'instances': '云主机 (个)',
  'security_group_rules': '安全组规则 (个)',
  'injected_files': '注入的文件 (个)',
  'cores': 'vCPU数量 (核)',
  'fixed_ips': '固定IP (个)',
  'injected_file_path_bytes': '注入文件路径的长度 (个)',
  'security_groups': '安全组 (个)',
};

//
const BREADCRUMB_FIELD = {
  'console': '控制台',
  'overview': '总览',
  'instances': '云主机',
  'volumes': '硬盘',
  'images': '镜像',
  'keypairs': 'SSH密钥',
  'vpc': 'VPC 网络',
  'routers': '路由器',
};

//
const MONITOR_TIME_SPAN = {
  "1hour": "1h",        //最近1小时
  "6hours": "6h",       //最近6小时
  "1day": "24h",        //最近1天
  "1month": "30d",      //最近1个月
  "6months": "180d",    //最近半年
  "1year": "365d",      //最近1年
};

const MONITOR_TIME_STEP = {
  "1hour": "20s",
  "6hours": "2m",
  "1day": "8m",
  "1month": "4h",
  "6months": "24h",
  "1year": "48h",
};

// 网络
const NETWORK_TABLE_COLUMN = [
  'name',
  'status',
  'admin_state_up',
  'router:external'
];

const NETWORK_FIELD = {
  "status": "状态",
  "name": "名称",
  "admin_state_up": "管理状态",
  "router:external": "外部网络",     // true是， false否
};

// 路由器
const ROUTER_TABLE_COLUMN = [
  'name',
  'status',
  'admin_state_up',
  'external_gateway_info'
];

const ROUTER_FIELD = {
  "name": "名称",
  "status": "状态",
  "admin_state_up": "管理状态",
  "external_gateway_info": "外部网关"     //只显示ip_address
};

// 子网
const SUBNET_TABLE_COLUMN = [
  'name',
  'cidr',
  'ip_version',
  'gateway_ip',
  'network_id',
];

const SUBNET_FIELD = {
  "name": "名称",
  "cidr": "网络地址",
  "ip_version": "IP协议版本",
  "gateway_ip": "网关地址",
  "network_id": "网络"
};

// 端口
const PORT_TABLE_COLUMN = [
  'name',
  'fixed_ips',
  'device_owner',
  'device_id',
  'status',
  'admin_state_up'
];

const PORT_FIELD = {
  "name": "名称",
  "fixed_ips": "固定IP", // 显示ip_address
  "device_owner": "连接的设备的类型",
  "device_id": "连接的设备的ID",
  "status": "状态",
  "admin_state_up": "管理状态",
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
