import { colors } from '../theme/colors';
const { pink, Indigo, blue, GREEN, yellow, ORANGE, red } = colors;
const rainbow = [pink, Indigo, blue, GREEN, yellow, ORANGE, red, pink];

export const comboConverter = (title,el,customStyle,clr) => {
	
	return `<div
    style="display: flex;
    flex-direction: column;
    padding: 0px 10px;
    align-items: center;"    
>
    <${el} style="color:${clr?clr:rainbow[Math.floor(Math.random() * 7)]};${customStyle}">${title}</${el}>
</div>`;
};

