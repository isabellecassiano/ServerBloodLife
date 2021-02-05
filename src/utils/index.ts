

export function formatName(name: string): string {
    let newName = name[0].toUpperCase();

    for (let i = 1; i < name.length; i++) {

        if (name[i - 1] == " ")
        newName += name[i].toUpperCase();
        else
        newName += name[i].toLowerCase();
    }
    return newName;
}
