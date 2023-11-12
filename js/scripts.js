import AeroUtilities from './aero-utilities/aero-utilities.min.js';

/*----- AERO UTILITIES - Open -----*/
/* Update Classes on <body> */
const aeroUtilitiesDevices = new AeroUtilities();

/* Reorder Elements */
const myAeroUtilities = new AeroUtilities({
	element: '.element-to-move',
	type: 'reorder',
	xs: ['#top > .content', 'insertAfter'],
	sm: ['#top > .content', 'insertAfter'],
	md: ['#top > .content', 'insertBefore'],
	lg: ['.region-container', 'prependTo'],
	xl: ['.region-container', 'prependTo'],
});

const myAeroUtilities2 = new AeroUtilities({
	element: '.element-to-move-2',
	type: 'reorder',
	xs: ['#top > .content', 'insertAfter'],
	sm: ['#top > .content', 'insertAfter'],
	md: ['#top > .content', 'insertBefore'],
	lg: ['.region-container', 'prependTo'],
	xl: ['.region-container', 'prependTo'],
});

const myAeroUtilitiesDynamic = new AeroUtilities({
	element: '.element-to-move-dynamic',
	type: 'reorder',
	xs: ['#top > .content', 'insertBefore'],
	sm: ['#top > .content', 'insertAfter'],
	md: ['#top > .content', 'prependTo'],
	lg: ['.region-container', 'appendTo'],
	xl: ['.region-container', 'appendTo'],
});

/* Custom Breakpoints values */
const customBreakpoints = {
	xxl: 1800,
	xl: 1400,
	lg: 1200,
	md: 900,
	sm: 600,
	xs: 0,
};
AeroUtilities.updateAllBreakpoints(customBreakpoints);
/*----- AERO UTILITIES - Close -----*/

/* Create Dynamic Element */
const btnAddDynamicElement = document.querySelector('#btn-add-dynamic-element');
btnAddDynamicElement.addEventListener('click', () => {
	const divDynamicElement = document.createElement('div');
	divDynamicElement.innerText = 'element-to-move-dynamic';
	divDynamicElement.classList.add('element-to-move-dynamic');
	document.body.appendChild(divDynamicElement);
	btnAddDynamicElement.disabled = true;
});

/* Load Event */
window.addEventListener('load', () => {
	const preloader = document.getElementById('preloader');
	preloader.style.display = 'none';
});
