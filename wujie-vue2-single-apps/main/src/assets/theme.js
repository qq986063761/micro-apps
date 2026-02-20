/**
 * 主题变量配置
 * 提供给主应用和子应用使用，保持视觉风格统一
 */

// ==================== 颜色系统 ====================
const colors = {
  // 主色系
  primary: {
    main: '#409EFF',        // 主色
    light: '#66B1FF',       // 浅色
    lighter: '#85C1FF',     // 更浅
    extraLight: '#A0CFFF',  // 极浅
    dark: '#337ECC',        // 深色
    darker: '#2B85E4',      // 更深
  },
  
  // 功能色
  success: {
    main: '#67C23A',
    light: '#85CE61',
    lighter: '#B3E19D',
    dark: '#529B2E',
  },
  
  warning: {
    main: '#E6A23C',
    light: '#EEBE77',
    lighter: '#F3D19E',
    dark: '#CF9236',
  },
  
  danger: {
    main: '#F56C6C',
    light: '#F89898',
    lighter: '#FAB6B6',
    dark: '#DD6161',
  },
  
  info: {
    main: '#909399',
    light: '#B1B3B8',
    lighter: '#C8C9CC',
    dark: '#73767A',
  },
  
  // 中性色
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    text: {
      primary: '#303133',    // 主要文本
      regular: '#606266',    // 常规文本
      secondary: '#909399',  // 次要文本
      placeholder: '#C0C4CC', // 占位文本
      disabled: '#C0C4CC',   // 禁用文本
    },
    border: {
      base: '#DCDFE6',       // 基础边框
      light: '#E4E7ED',      // 浅色边框
      lighter: '#EBEEF5',    // 更浅边框
      extraLight: '#F2F6FC', // 极浅边框
    },
    fill: {
      base: '#F0F2F5',       // 基础填充
      light: '#F5F7FA',      // 浅色填充
      lighter: '#FAFAFA',    // 更浅填充
      extraLight: '#FAFCFF', // 极浅填充
      dark: '#EBEDF0',       // 深色填充
    },
    bg: {
      base: '#FFFFFF',       // 基础背景
      page: '#F2F3F5',       // 页面背景
      overlay: 'rgba(0, 0, 0, 0.8)', // 遮罩背景
    },
  },
  
  // 链接色
  link: {
    main: '#409EFF',
    hover: '#66B1FF',
    active: '#337ECC',
  },
}

// ==================== 字体系统 ====================
const typography = {
  // 字体族
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  
  // 字体大小
  fontSize: {
    xs: '12px',      // 极小
    sm: '13px',      // 小
    base: '14px',    // 基础
    md: '16px',      // 中
    lg: '18px',      // 大
    xl: '20px',      // 特大
    xxl: '24px',     // 超大
    xxxl: '28px',    // 极大
  },
  
  // 行高
  lineHeight: {
    tight: 1.25,     // 紧凑
    normal: 1.5,     // 正常
    relaxed: 1.75,   // 宽松
    loose: 2,        // 宽松
  },
  
  // 字重
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

// ==================== 间距系统 ====================
const spacing = {
  xs: '4px',      // 极小间距
  sm: '8px',      // 小间距
  md: '16px',     // 中间距
  lg: '24px',     // 大间距
  xl: '32px',     // 特大间距
  xxl: '48px',    // 超大间距
  xxxl: '64px',   // 极大间距
}

// ==================== 圆角系统 ====================
const borderRadius = {
  none: '0',
  sm: '2px',      // 小圆角
  base: '4px',    // 基础圆角
  md: '6px',      // 中圆角
  lg: '8px',      // 大圆角
  xl: '12px',     // 特大圆角
  full: '9999px', // 完全圆角
}

// ==================== 阴影系统 ====================
const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
}

// ==================== 过渡动画 ====================
const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timingFunction: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
}

// ==================== Z-index层级 ====================
const zIndex = {
  base: 1,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
}

// ==================== 断点系统（用于响应式） ====================
const breakpoints = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}

// ==================== 主题配置对象 ====================
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  
  // 便捷方法：获取颜色
  getColor: (category, variant = 'main') => {
    const colorObj = colors[category]
    return colorObj ? (colorObj[variant] || colorObj) : null
  },
  
  // 便捷方法：获取字体大小
  getFontSize: (size) => {
    return typography.fontSize[size] || typography.fontSize.base
  },
  
  // 便捷方法：获取间距
  getSpacing: (size) => {
    return spacing[size] || spacing.md
  },
  
  // 便捷方法：获取圆角
  getBorderRadius: (size) => {
    return borderRadius[size] || borderRadius.base
  },
  
  // 便捷方法：获取阴影
  getShadow: (size) => {
    return shadows[size] || shadows.base
  },
}

// 导出主题对象
export function getTheme() {
  return theme
}

/**
 * 将主题对象转换为 CSS 变量字符串
 * 用于注入到子应用的 :root 元素中
 * @param {Object} themeObj - 主题对象
 * @param {string} prefix - CSS 变量前缀，默认为 'theme'
 * @returns {string} CSS 变量字符串
 */
export function themeToCSSVars(themeObj, prefix = 'theme') {
  const cssVars = []
  
  /**
   * 将 camelCase 转换为 kebab-case
   * @param {string} str - 要转换的字符串
   * @returns {string} kebab-case 格式的字符串
   */
  function toKebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
  }
  
  /**
   * 递归遍历对象，生成 CSS 变量名和值
   * @param {Object} obj - 要遍历的对象
   * @param {string} parentKey - 父级键名
   */
  function traverse(obj, parentKey = '') {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      const cssVarName = parentKey ? `${parentKey}-${key}` : key
      
      // 如果是对象且不是函数，继续递归
      if (typeof value === 'object' && value !== null && !Array.isArray(value) && typeof value !== 'function') {
        traverse(value, cssVarName)
      } else if (typeof value !== 'function') {
        // 转换为 kebab-case 格式的 CSS 变量名
        const varName = `--${prefix}-${toKebabCase(cssVarName)}`
        cssVars.push(`${varName}: ${value};`)
      }
    })
  }
  
  traverse(themeObj)
  return cssVars.join('\n  ')
}

/**
 * 将主题注入到指定文档的 :root 元素
 * @param {Document} doc - 目标文档对象（子应用的 document）
 * @param {Object} themeObj - 主题对象
 * @param {string} prefix - CSS 变量前缀
 */
export function injectThemeToDocument(doc, themeObj, prefix = 'theme') {
  if (!doc || !doc.documentElement) {
    console.warn('无法注入主题：文档对象无效')
    return
  }
  
  const cssVars = themeToCSSVars(themeObj, prefix)
  const styleId = `theme-variables-${prefix}`
  
  // 查找是否已存在样式元素
  let styleElement = doc.getElementById(styleId)
  
  if (!styleElement) {
    // 创建 style 元素
    styleElement = doc.createElement('style')
    styleElement.id = styleId
    doc.head.appendChild(styleElement)
  }
  
  // 设置 CSS 变量
  styleElement.textContent = `:root {\n  ${cssVars}\n}`
} 
