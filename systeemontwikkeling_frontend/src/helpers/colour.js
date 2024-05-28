
const body = document.querySelector('body');

/**
 * changes the background colour of the body and header
 * @param {*} name 
 * @returns void
 */
export const changeBackgroundColour = (name) => {
    const header = document.querySelector('header');
    const newColour = colours.find(c => c.name === name.toLocaleLowerCase()) ?? colours[0];
    body.style.backgroundColor = newColour.hex;
    newColour.textColour ? body.style.color = newColour.textColour : body.style.color = '#ffffff';
    header.style.backgroundColor = newColour.hex;
    
}

export const colours = [
    { name: 'default', hex: '#011B2C' },
    { name: 'jazz', hex: '#1F1C1B' },
    { name: 'yummy', hex: '#445A59' },
    { name: 'history', hex: '#EAE2D1', textColour: '#000000'},
    { name: 'dance', hex: '#333333' },
    { name: 'transparent', hex: 'transparent' },
]
