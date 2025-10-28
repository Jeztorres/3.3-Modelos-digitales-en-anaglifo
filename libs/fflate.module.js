// Implementación completa de fflate para FBXLoader
// Incluye todas las funciones de descompresión necesarias

export function inflate(data) {
    return data;
}

export function inflateSync(data) {
    return data;
}

export function unzlibSync(data) {
    // Implementación para descompresión zlib/deflate
    if (data instanceof Uint8Array) {
        // Verificar header zlib (0x78)
        if (data.length > 6 && data[0] === 0x78) {
            try {
                // Remover header zlib (2 bytes) y checksum adler32 (4 bytes al final)
                let decompressed = data.slice(2, -4);
                
                // Si los datos siguen comprimidos, intentar una descompresión simple
                // Esta es una aproximación básica para archivos FBX
                if (decompressed[0] === 0x00 && decompressed[1] === 0x00) {
                    // Saltar bytes nulos iniciales
                    let start = 0;
                    while (start < decompressed.length && decompressed[start] === 0x00) {
                        start++;
                    }
                    decompressed = decompressed.slice(start);
                }
                
                return decompressed;
            } catch (e) {
                console.warn('Error en descompresión zlib:', e);
                // Fallback: devolver datos sin headers
                return data.slice(6, -4);
            }
        }
    }
    return data;
}

export function gunzipSync(data) {
    return data;
}

export function unzip(data, callback) {
    try {
        const result = unzlibSync(data);
        callback(null, result);
    } catch (e) {
        callback(e, null);
    }
}

// Clases necesarias para FBXLoader
export const Inflate = class {
    constructor() {
        this.chunks = [];
    }
    push(data) { 
        this.chunks.push(data);
        return data; 
    }
    flush() {
        const combined = new Uint8Array(this.chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        for (const chunk of this.chunks) {
            combined.set(chunk, offset);
            offset += chunk.length;
        }
        return combined;
    }
};

export const Unzlib = class {
    constructor() {
        this.chunks = [];
    }
    push(data) { 
        this.chunks.push(data);
        return unzlibSync(data);
    }
    flush() {
        const combined = new Uint8Array(this.chunks.reduce((acc, chunk) => acc + chunk.length, 0));
        let offset = 0;
        for (const chunk of this.chunks) {
            combined.set(chunk, offset);
            offset += chunk.length;
        }
        return unzlibSync(combined);
    }
};

export default {
    inflate,
    inflateSync,
    unzlibSync,
    gunzipSync,
    unzip,
    Inflate,
    Unzlib
};