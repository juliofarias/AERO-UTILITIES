/*
//-----------------------------------------------------------

!! AERO UTILITIES - V2.0 !!
-> Nov 2023

//-----------------------------------------------------------

|| Aero Utilities is a JavaScript utility designed to facilitate DOM element manipulation based on different breakpoints, offering features such as element reordering and updating classes on the <body>.

//-----------------------------------------------------------

! FEATURES -----

* Element Reordering:
-> Move elements in the DOM to different targets at different breakpoints.

* Dynamic Element Handling:
-> Automatically adapts to dynamically added elements with the same specified selector.

* Update Classes on <body>:
-> Add classes to <body> based on the active breakpoint.

* Dynamic Breakpoints Update:
-> Allows dynamic updating of breakpoints after initialization.

//-----------------------------------------------------------

? HOW TO USE -----

* Usage for Element Reordering:

const myElement = new AeroUtilities({
  element: '#my-element',
  type: 'reorder',
  xxl: ['#content .content', 'prependTo'],
  xl: ['#content .content', 'prependTo'],
  lg: ['#content .content', 'prependTo'],
  md: ['#content .content', 'appendTo'],
  sm: ['#top .content', 'insertBefore'],
  xs: ['#top .content', 'insertAfter'],
});

* Usage for Updating Classes on <body>:

const aeroUtilitiesDevices = new AeroUtilities();

* Usage for Updating Breakpoints values

const customBreakpoints = {
	xxl: 1800,
	xl: 1400,
	lg: 1200,
	md: 900,
	sm: 600,
	xs: 0,
};
AeroUtilities.updateAllBreakpoints(customBreakpoints);

//-----------------------------------------------------------

! AVAILABLE OPTIONS -----

* Element Reordering:
-> Element: Selector of the element to be moved.
-> Type: Should be set to 'reorder'.
-> Breakpoints and corresponding actions:
   || xxl: [target, method]
   || xl:  [target, method]
   || lg:  [target, method]
   || md:  [target, method]
   || sm:  [target, method]
   || xs:  [target, method]

* Dynamic Element Handling:
-> Automatically handles dynamically added elements with the specified selector.

* Dynamic Breakpoints Update:
-> Allows dynamic updating of breakpoints after initialization.

//-----------------------------------------------------------

! METHODS -----

* prependTo:
-> The element will be prepended to the specified target.

* appendTo:
-> The element will be appended to the specified target.

* insertBefore:
-> The element will be inserted before the specified target.

* insertAfter:
-> The element will be inserted after the specified target.

//-----------------------------------------------------------

! IMPORTANT NOTES -----

-> Ensure that the specified elements and targets exist on the page to avoid errors.
-> The element reordering function will only be triggered when a real breakpoint change occurs.

//-----------------------------------------------------------
 */

class AeroUtilities {
	static instances = [];

	constructor(options = {}) {
		this.breakpoints = {
			xxl: 1536,
			xl: 1280,
			lg: 1024,
			md: 768,
			sm: 641,
			xs: 0,
		};

		this.options = options;
		this.activeBreakpoint = null;

		if (this.options.type === 'reorder') {
			this.handleResize = this.handleResize.bind(this);
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
			this.observeDynamicElements();
		} else if (!this.options.type || this.options.type === 'start') {
			this.handleResize = this.handleResize.bind(this);
			window.addEventListener('resize', this.handleResize);
			this.updateBodyClass();
		}

		this.initMutationObserver();

		AeroUtilities.instances.push(this);
	}

	observeDynamicElements() {
		const targetSelector = this.options.element;
		const handleMutations = mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
					const elementsAdded = Array.from(mutation.addedNodes).filter(node => {
						return node.classList && node.classList.contains(targetSelector.substring(1));
					});

					elementsAdded.forEach(element => {
						this.handleDynamicElement(element);
					});
				}
			});
		};

		const targetNode = document.querySelector(targetSelector);
		if (targetNode) {
			const observer = new MutationObserver(handleMutations);
			const observerOptions = {
				childList: true,
				subtree: true,
			};
			observer.observe(targetNode, observerOptions);
		}
	}

	handleDynamicElement(element) {
		const activeBreakpoint = this.getActiveBreakpoint(window.innerWidth);
		this.moveElements(activeBreakpoint, element);
	}

	handleResize() {
		const currentWidth = window.innerWidth;
		const activeBreakpoint = this.getActiveBreakpoint(currentWidth);

		if (this.options.type === 'reorder') {
			this.moveElements(activeBreakpoint);
		} else if (
			(!this.options.type || this.options.type === 'start') &&
			activeBreakpoint !== this.activeBreakpoint
		) {
			this.updateBodyClass(activeBreakpoint);
		}
	}

	getActiveBreakpoint(width) {
		for (const [breakpoint, breakpointWidth] of Object.entries(this.breakpoints)) {
			if (width >= breakpointWidth) {
				return breakpoint;
			}
		}
	}

	moveElements(activeBreakpoint, specificElement = null) {
		const [target, method] = this.options[activeBreakpoint] || [];
		const elementToMove = specificElement || document.querySelector(this.options.element);
		const targetElement = document.querySelector(target);

		if (elementToMove && targetElement && activeBreakpoint !== this.activeBreakpoint) {
			this.applyMoveMethod(elementToMove, targetElement, method);
			this.activeBreakpoint = activeBreakpoint;
		}
	}

	initMutationObserver() {
		const targetNode = document.documentElement;

		const config = {
			childList: true,
			subtree: true,
		};

		const callback = mutationsList => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					mutation.addedNodes.forEach(node => {
						if (node.nodeType === 1 && node.matches(this.options.element)) {
							this.handleResize();
						}
					});
				}
			}
		};

		this.mutationObserver = new MutationObserver(callback);
		this.mutationObserver.observe(targetNode, config);
	}

	applyMoveMethod(elementToMove, targetElement, method) {
		if (method === 'prependTo') {
			targetElement.prepend(elementToMove);
		} else if (method === 'appendTo') {
			targetElement.appendChild(elementToMove);
		} else if (method === 'insertBefore') {
			targetElement.parentNode.insertBefore(elementToMove, targetElement);
		} else if (method === 'insertAfter') {
			targetElement.parentNode.insertBefore(elementToMove, targetElement.nextSibling);
		}
	}

	camelToKebab(str) {
		if (typeof str !== 'string') {
			return str;
		}
		return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
	}

	updateBodyClass(breakpoint) {
		const newBreakpoint = breakpoint || this.getActiveBreakpoint(window.innerWidth);

		if (newBreakpoint !== this.activeBreakpoint) {
			this.removeBodyClass(this.activeBreakpoint);
			this.addBodyClass(newBreakpoint);

			this.activeBreakpoint = newBreakpoint;
		}
	}

	addBodyClass(breakpoint) {
		const kebabCaseBreakpoint = this.camelToKebab(breakpoint);
		document.body.classList.add(`${kebabCaseBreakpoint}`);
	}

	removeBodyClass(breakpoint) {
		const kebabCaseBreakpoint = this.camelToKebab(breakpoint);
		document.body.classList.remove(`${kebabCaseBreakpoint}`);
	}

	updateBreakpoints(newBreakpoints) {
		this.breakpoints = newBreakpoints;
		this.handleResize();
	}

	static updateAllBreakpoints(newBreakpoints) {
		AeroUtilities.instances.forEach(instance => {
			instance.updateBreakpoints(newBreakpoints);
		});
	}
}

export default AeroUtilities;
