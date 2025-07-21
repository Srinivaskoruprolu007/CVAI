export function formatSize(bytes: number): string {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const size = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat(String(bytes / Math.pow(k, i))).toFixed(2) + ' ' + size[i];
}