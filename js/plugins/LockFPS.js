/*:
 * @target MZ
 * @plugindesc v1.0 限制游戏最大帧率为60帧
 * @author 
 * @help 启用后游戏帧率将锁定在60帧以内
 */

// 保存原始请求动画帧函数
const _requestAnimationFrame = window.requestAnimationFrame;
let _lastTimestamp = 0;
const FPS_LIMIT = 60;
const FRAME_INTERVAL = 1000 / FPS_LIMIT; // 约16.67ms

window.requestAnimationFrame = function(callback) {
    const now = performance.now();
    const elapsed = now - _lastTimestamp;
    
    if (elapsed >= FRAME_INTERVAL) {
        _lastTimestamp = now - (elapsed % FRAME_INTERVAL);
        return _requestAnimationFrame.call(window, callback);
    } else {
        // 还没到时间，延迟一帧再检查
        setTimeout(() => {
            window.requestAnimationFrame(callback);
        }, FRAME_INTERVAL - elapsed);
        return 0;
    }
};