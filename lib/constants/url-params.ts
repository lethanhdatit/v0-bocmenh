// Constants cho URL parameters để đồng bộ giữa ProductCard và Page
export const URL_PARAMS = {
  // Query parameter key cho attributes
  ATTRIBUTES: 'attrs',
  
  // Separator cho multiple attributes
  ATTR_SEPARATOR: ',',
  
  // Separator cho attribute name:value pairs  
  ATTR_VALUE_SEPARATOR: ':',
  
  // Reserved params không được coi là attributes
  RESERVED_PARAMS: ['page', 'limit', 'sort', 'q', 'search', 'attrs']
} as const;

// Helper functions cho attribute encoding/decoding
export function encodeAttributes(attributes: string[]): string {
  return attributes.join(URL_PARAMS.ATTR_SEPARATOR);
}

export function decodeAttributes(encodedAttrs: string): string[] {
  return encodedAttrs.split(URL_PARAMS.ATTR_SEPARATOR).filter(Boolean);
}

// SEO-friendly attribute encoding (for future use)
export function encodeAttributesForSEO(attributes: string[]): string {
  return attributes
    .map(attr => {
      // Convert "Màu sắc:Đỏ" to "mau-sac-do" 
      return attr
        .toLowerCase()
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    })
    .join(',');
}

// Generate SEO-friendly URL with attributes encoded in path (alternative approach)
export function buildSEOFriendlyPath(basePath: string, attributes?: string[]): string {
  if (!attributes || attributes.length === 0) {
    return basePath;
  }
  
  // Option 1: Query parameter (current approach)
  const params = new URLSearchParams();
  params.set(URL_PARAMS.ATTRIBUTES, encodeAttributes(attributes));
  return `${basePath}?${params.toString()}`;
  
  // Option 2: Path-based (for future consideration)
  // const seoAttrs = encodeAttributesForSEO(attributes);
  // return `${basePath}/filter/${seoAttrs}`;
}
