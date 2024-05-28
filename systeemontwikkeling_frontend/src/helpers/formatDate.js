/**
 * format date to string with format HH:MM
 * @param {*} date 
 * @returns string
 */
export const formattedDate = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
