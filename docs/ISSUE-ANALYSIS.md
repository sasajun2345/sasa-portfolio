# 精选作品多语言切换问题排查与修复说明

## 问题概述
- 现象：从英文切换到中文时，精选作品列表不显示任何内容。
- 影响范围：`Gallery` 组件的中文数据加载。

## 根因分析
- 服务层缓存命中条件过宽：
  - 初次加载英文后，`cache` 被初始化为 `{ en: [], zh: [] }`
  - 切换到中文时，`cache.zh` 为空数组，但在 JS 中 `[]` 为 truthy
  - 命中缓存并直接返回空数组，导致中文列表为空且不触发实际拉取
- 代码引用：
  - 命中条件：`services/artworksService.ts:21-23`
  - 初始化缓存：`services/artworksService.ts:61-65`
  - 中文数据源存在且完整：`public/artworks/config.json:58-113`

## 修复方案
- 调整命中条件为“存在且非空并在有效期内”
  - 新条件：`cache && cache[lang] && cache[lang].length > 0 && (now - lastFetchTime) < CACHE_DURATION`
- 变更文件：
  - `services/artworksService.ts`

## 代码差异
```diff
- if (cache && cache[lang] && (now - lastFetchTime) < CACHE_DURATION) {
+ if (cache && cache[lang] && cache[lang].length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    return cache[lang];
  }
```

## 测试与验证
- 修复前复现：
  - 英文进入列表正常
  - 切到中文列表为空，Network 显示 `config.json` 为 200，但无中文映射（因命中空缓存）
- 修复后验证：
  - 中文切换首次拉取后列表显示 6 条作品
  - 5 分钟内再次切换中文命中缓存仍正常显示
  - 控制台无错误日志

## 备注
- 中文第 2 项 `detailUrl: "#"` 设计为不可点击，属预期行为；英文同项为外链可点击。

