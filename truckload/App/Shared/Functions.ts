export module Functions {
    export function kToLbs(pK: number): number {
        var nearExact = pK / 0.45359237;
        var lbs = Math.floor(nearExact);
        //var oz = (nearExact - lbs) * 16;
        return lbs;
    }
}