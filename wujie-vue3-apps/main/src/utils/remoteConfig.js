/**
 * Remote 模块配置工具
 * 支持根据环境动态获取 remote 模块的 URL
 * 
 * 配置优先级（从高到低）：
 * 1. window.__REMOTES__ - 手动设置的配置（最高优先级）
 * 2. 从 API 获取配置（如果配置了 API 地址）
 * 3. 根据域名自动判断环境
 */

// 配置 API 地址（可选，如果需要从服务器获取配置）
const REMOTE_CONFIG_API = window.__REMOTE_CONFIG_API__ || null

/**
 * 从 API 获取 remote 配置
 * @returns {Promise<Object|null>} remote 配置对象，失败返回 null
 */
async function fetchRemoteConfigFromAPI() {
  if (!REMOTE_CONFIG_API) {
    return null
  }

  try {
    const response = await fetch(REMOTE_CONFIG_API)
    if (response.ok) {
      const config = await response.json()
      return config
    }
  } catch (error) {
    console.warn('[RemoteConfig] 从 API 获取配置失败:', error)
  }
  
  return null
}

/**
 * 根据当前环境获取 remote URL 配置
 * 可以通过 window.__REMOTES__ 或其他方式设置环境变量
 */
function getRemoteConfigByHostname() {
  const hostname = window.location.hostname
  const protocol = window.location.protocol
  const port = window.location.port

  // 开发环境
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return {
      child1: `${protocol}//${hostname}:8081/remoteEntry.js`,
      child2: `${protocol}//${hostname}:8082/remoteEntry.js`,
    }
  }

  // 生产环境 - 可以根据实际域名配置
  // 例如：根据 hostname 判断是哪个环境
  if (hostname.includes('dev.')) {
    // 开发环境
    return {
      child1: `${protocol}//dev-child1.example.com/remoteEntry.js`,
      child2: `${protocol}//dev-child2.example.com/remoteEntry.js`,
    }
  } else if (hostname.includes('test.')) {
    // 测试环境
    return {
      child1: `${protocol}//test-child1.example.com/remoteEntry.js`,
      child2: `${protocol}//test-child2.example.com/remoteEntry.js`,
    }
  } else {
    // 生产环境
    return {
      child1: `${protocol}//child1.example.com/remoteEntry.js`,
      child2: `${protocol}//child2.example.com/remoteEntry.js`,
    }
  }
}

/**
 * 获取 remote 配置（同步版本）
 * 优先使用 window.__REMOTES__，否则根据域名判断
 */
function getRemoteConfig() {
  // 方式1: 从 window.__REMOTES__ 获取（如果已设置，最高优先级）
  if (typeof window !== 'undefined' && window.__REMOTES__) {
    return window.__REMOTES__
  }

  // 方式2: 根据当前域名/环境自动判断
  return getRemoteConfigByHostname()
}

/**
 * 获取指定 remote 模块的 URL
 * @param {string} moduleName - 模块名称
 * @returns {string} remote 模块的 URL
 */
export function getRemoteUrl(moduleName) {
  const config = getRemoteConfig()
  return config[moduleName] || ''
}

/**
 * 获取所有 remote 配置（同步版本）
 * @returns {Object} 所有 remote 配置
 */
export function getAllRemoteConfig() {
  return getRemoteConfig()
}

/**
 * 异步获取所有 remote 配置（支持从 API 获取）
 * @returns {Promise<Object>} 所有 remote 配置
 */
export async function getAllRemoteConfigAsync() {
  // 优先使用 window.__REMOTES__
  if (typeof window !== 'undefined' && window.__REMOTES__) {
    return window.__REMOTES__
  }

  // 尝试从 API 获取
  const apiConfig = await fetchRemoteConfigFromAPI()
  if (apiConfig) {
    return apiConfig
  }

  // 最后使用域名判断
  return getRemoteConfigByHostname()
}
