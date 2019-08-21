const initialInfluxState = {
  vcpuCore: {
    loading: false,
    data: []
  },

  vcpuTotal: {
    loading: false,
    data: []
  },

  vmem: {
    loading: false,
    data: []
  }
};

const monitor = (state = initialInfluxState, action) => {
  switch(action.type) {
    case 'GET_MON_VCPU_CORE_USAGE_REQUEST': {
      return {
        ...state,
        vcpuCore: {
          loading: true,
        }
      }
    }

    case 'GET_MON_VCPU_CORE_USAGE_SUCCESS': {
      return {
        ...state,
        vcpuCore: {
          data: action.data,
          loading: false,
        }
      }
    }

    case 'GET_MON_VCPU_TOTAL_USAGE_REQUEST': {
      return {
        ...state,
        vcpuTotal: {
          loading: true,
        }
      }
    }

    case 'GET_MON_VCPU_TOTAL_USAGE_SUCCESS': {
      return {
        ...state,
        vcpuTotal: {
          loading: false,
          data: action.data
        }
      }
    }

    case 'GET_MON_VMEM_USAGE_REQUEST': {
      return {
        ...state,
        vmem: {
          loading: true,
        }
      }
    }

    case 'GET_MON_VMEM_USAGE_SUCCESS': {
      return {
        ...state,
        vmem: {
          loading: false,
          data: action.data
        }
      }
    }

    default: {
      return state
    }
  }
};

export { monitor };