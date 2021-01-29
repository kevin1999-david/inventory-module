export function getBoolean(input: string | boolean): boolean {

    if (input.toString() == "true") {
        return true;
    } else {

        return false;
    }
}

export function getTextBoolean(value: boolean): string {
    if (value) {
        return "SI"
    }
    return "NO"
}

export function getFormattedDate(date: string): string {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
