'use client';

import { useAdSensePreload } from './lazy-ad-unit';

export function AdSensePreloader() {
    useAdSensePreload();

    return null; // 这个组件不渲染任何内容，只负责预加载
}
