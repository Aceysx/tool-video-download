/**
 * localStorage 缓存管理
 */
import type { VideoInfo } from '../api/types';

const CACHE_PREFIX = 'video_cache_';
const CACHE_EXPIRY_KEY = 'video_cache_expiry_';
const CACHE_TTL = 3600 * 1000; // 1小时（毫秒）
const MAX_CACHE_SIZE = 50; // 最多缓存50个视频

interface CacheEntry {
    data: VideoInfo;
    timestamp: number;
}

/**
 * 生成缓存键
 */
function getCacheKey(url: string): string {
    return CACHE_PREFIX + Buffer.from(url).toString('base64').substring(0, 32);
}

/**
 * 生成过期时间键
 */
function getExpiryKey(url: string): string {
    return CACHE_EXPIRY_KEY + Buffer.from(url).toString('base64').substring(0, 32);
}

/**
 * 检查 localStorage 是否可用
 */
function isLocalStorageAvailable(): boolean {
    try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);

        return true;
    } catch {
        return false;
    }
}

/**
 * 缓存视频信息
 */
export function cacheVideoInfo(url: string, data: VideoInfo): void {
    if (!isLocalStorageAvailable()) {
        console.warn('localStorage not available');

        return;
    }

    try {
        const cacheKey = getCacheKey(url);
        const expiryKey = getExpiryKey(url);
        const timestamp = Date.now();

        const cacheEntry: CacheEntry = {
            data,
            timestamp
        };

        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        localStorage.setItem(expiryKey, (timestamp + CACHE_TTL).toString());

        // 检查缓存大小并清理旧缓存
        cleanOldCache();
    } catch (error) {
        console.error('Failed to cache video info:', error);
        // 如果存储失败（可能是空间不足），清理缓存后重试
        clearAllCache();
    }
}

/**
 * 获取缓存的视频信息
 */
export function getCachedVideoInfo(url: string): VideoInfo | null {
    if (!isLocalStorageAvailable()) {
        return null;
    }

    try {
        const cacheKey = getCacheKey(url);
        const expiryKey = getExpiryKey(url);

        const expiryTime = localStorage.getItem(expiryKey);
        if (!expiryTime || Date.now() > parseInt(expiryTime)) {
            // 缓存已过期
            localStorage.removeItem(cacheKey);
            localStorage.removeItem(expiryKey);

            return null;
        }

        const cached = localStorage.getItem(cacheKey);
        if (!cached) {
            return null;
        }

        const cacheEntry: CacheEntry = JSON.parse(cached);

        return cacheEntry.data;
    } catch (error) {
        console.error('Failed to get cached video info:', error);

        return null;
    }
}

/**
 * 清除指定视频的缓存
 */
export function clearVideoCache(url: string): void {
    if (!isLocalStorageAvailable()) {
        return;
    }

    try {
        const cacheKey = getCacheKey(url);
        const expiryKey = getExpiryKey(url);
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(expiryKey);
    } catch (error) {
        console.error('Failed to clear video cache:', error);
    }
}

/**
 * 清除所有缓存
 */
export function clearAllCache(): void {
    if (!isLocalStorageAvailable()) {
        return;
    }

    try {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
            if (key.startsWith(CACHE_PREFIX) || key.startsWith(CACHE_EXPIRY_KEY)) {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.error('Failed to clear all cache:', error);
    }
}

/**
 * 清理过期的缓存
 */
export function cleanExpiredCache(): void {
    if (!isLocalStorageAvailable()) {
        return;
    }

    try {
        const keys = Object.keys(localStorage);
        const now = Date.now();

        keys.forEach((key) => {
            if (key.startsWith(CACHE_EXPIRY_KEY)) {
                const expiryTime = localStorage.getItem(key);
                if (expiryTime && now > parseInt(expiryTime)) {
                    const cacheKey = key.replace(CACHE_EXPIRY_KEY, CACHE_PREFIX);
                    localStorage.removeItem(cacheKey);
                    localStorage.removeItem(key);
                }
            }
        });
    } catch (error) {
        console.error('Failed to clean expired cache:', error);
    }
}

/**
 * 清理旧缓存（LRU - 最近最少使用）
 */
function cleanOldCache(): void {
    if (!isLocalStorageAvailable()) {
        return;
    }

    try {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

        if (cacheKeys.length > MAX_CACHE_SIZE) {
            // 获取所有缓存项及其时间戳
            const cacheItems: Array<{ key: string; timestamp: number }> = [];

            cacheKeys.forEach((key) => {
                const cached = localStorage.getItem(key);
                if (cached) {
                    try {
                        const cacheEntry: CacheEntry = JSON.parse(cached);
                        cacheItems.push({
                            key,
                            timestamp: cacheEntry.timestamp
                        });
                    } catch {
                        // 忽略无效的缓存项
                    }
                }
            });

            // 按时间戳排序（最旧的在前）
            cacheItems.sort((a, b) => a.timestamp - b.timestamp);

            // 删除最旧的缓存项
            const itemsToDelete = cacheItems.slice(0, cacheItems.length - MAX_CACHE_SIZE);
            itemsToDelete.forEach((item) => {
                const expiryKey = item.key.replace(CACHE_PREFIX, CACHE_EXPIRY_KEY);
                localStorage.removeItem(item.key);
                localStorage.removeItem(expiryKey);
            });
        }
    } catch (error) {
        console.error('Failed to clean old cache:', error);
    }
}

/**
 * 获取缓存统计信息
 */
export function getCacheStats(): {
    totalItems: number;
    totalSize: number;
    oldestItem: number | null;
    newestItem: number | null;
} {
    if (!isLocalStorageAvailable()) {
        return { totalItems: 0, totalSize: 0, oldestItem: null, newestItem: null };
    }

    try {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter((key) => key.startsWith(CACHE_PREFIX));

        let totalSize = 0;
        let oldestItem: number | null = null;
        let newestItem: number | null = null;

        cacheKeys.forEach((key) => {
            const cached = localStorage.getItem(key);
            if (cached) {
                totalSize += cached.length;
                try {
                    const cacheEntry: CacheEntry = JSON.parse(cached);
                    if (oldestItem === null || cacheEntry.timestamp < oldestItem) {
                        oldestItem = cacheEntry.timestamp;
                    }
                    if (newestItem === null || cacheEntry.timestamp > newestItem) {
                        newestItem = cacheEntry.timestamp;
                    }
                } catch {
                    // 忽略无效的缓存项
                }
            }
        });

        return {
            totalItems: cacheKeys.length,
            totalSize,
            oldestItem,
            newestItem
        };
    } catch (error) {
        console.error('Failed to get cache stats:', error);

        return { totalItems: 0, totalSize: 0, oldestItem: null, newestItem: null };
    }
}
