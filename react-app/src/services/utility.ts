
export function expo(x: bigint, y: bigint) {
	let calced = BigInt(1);
	for (let i = 0; i < y; i++) {
		calced *= x
	}
	return calced;
}

export function expoMod(x: bigint, y: bigint, mod: bigint) {
	let calced = BigInt(1);
	for (let i = 0; i < y; i++) {
		calced *= x
        calced %= mod
	}
	return calced;
}
const toUInt64 = (number: any) => {
    let bigInteger;
    if( typeof number == "bigint"){
        bigInteger = number;
    }
    else{
        bigInteger = BigInt(number);
    }
    
    return BigInt.asUintN(64, bigInteger);
    // ↪ 0n
    // zero because of overflow
}

export function stringToHash(string: string): string {
                  
    var hash = BigInt(0);
    var setLimit = expo(BigInt(2), BigInt(64))
    if (string.length == 0) return hash.toString();
        
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash*BigInt(511) -hash)  + BigInt(char))
        hash = hash % setLimit
    }
    hash *= BigInt(2)
    hash += BigInt(1)
    return hash.toString();
}