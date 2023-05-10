/**
 * the function is to retrieve the start date and the end date of last month
 * @returns [string, string]: the start date and the end date of last month as a string
 */
export function retrieveLastMonthRange(): [string, string] {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
    return [dateFormat(firstDay), dateFormat(lastDay)];
}

/**
 * dateFormate helps to format date as 'YYYYMMDD'
 * @param date: date to be formatted
 * @returns string: the formatted date
 */
export function dateFormat(date: Date): string {
    const [year, month, day] = [
        date.getFullYear(),
        date.getMonth().toString().length < 2 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
        date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate()
    ];
    return `${year}${month}${day}`;
}