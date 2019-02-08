export function createDescription(str: string, limit: any = false): string {
    let cleanStr = str.replace(/(<([^>]+)>)/ig,"");

    if (limit) {
        cleanStr = cleanStr.length > limit ? `${cleanStr.substring(0, limit)}...` : cleanStr.substring(0, limit);
    }

    return cleanStr;
}

export function createNonTruncatedDescription(str: string): string {
  return str.replace(/(<([^>]+)>)/ig,"");
}