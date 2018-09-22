
export function getInitialsFromName(name: string) {
    const names = name.split(" ");
    var initials: string = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export function splitNameFirstLast(name: any): string[] {
    var words = name.split(" ");
    var nameResult: string[] = [];
    var otherWords = "";

    for (var i = 0; i < words.length; i++) {

        if (i === 0) {
            nameResult.push(words[0]);
        } else {
            otherWords += (otherWords.length > 0 ? " " : "") + `${words[i]}`;
        }
    }
    nameResult.push(otherWords);

    return nameResult;
};
