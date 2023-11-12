# AERO-UTILITIES
  Nov 2023

Aero Utilities is a JavaScript utility designed to facilitate DOM element manipulation based on different breakpoints, offering features such as element reordering and updating classes on the <body>.

-----------------------------------------------------------

## FEATURES

### Element Reordering:
* Move elements in the DOM to different targets at different breakpoints.

### Dynamic Element Handling:
* Automatically adapts to dynamically added elements with the same specified selector.

### Update Classes on <body>:
* Add classes to <body> based on the active breakpoint.

### Dynamic Breakpoints Update:
* Allows dynamic updating of breakpoints after initialization.

-----------------------------------------------------------

## HOW TO USE

### Usage for Element Reordering:
```js
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
```

### Usage for Updating Classes on <body>:
```js
const aeroUtilitiesDevices = new AeroUtilities();
```
### Usage for Updating Breakpoints values
```js
const customBreakpoints = {
	xxl: 1800,
	xl: 1400,
	lg: 1200,
	md: 900,
	sm: 600,
	xs: 0,
};
AeroUtilities.updateAllBreakpoints(customBreakpoints);
```
-----------------------------------------------------------

## AVAILABLE OPTIONS

### Element Reordering:
* Element: Selector of the element to be moved.
* Type: Should be set to 'reorder'.
* Breakpoints and corresponding actions:
   - xxl: [target, method]
   - xl:  [target, method]
   - lg:  [target, method]
   - md:  [target, method]
   - sm:  [target, method]
   - xs:  [target, method]

### Dynamic Element Handling:
* Automatically handles dynamically added elements with the specified selector.

### Dynamic Breakpoints Update:
* Allows dynamic updating of breakpoints after initialization.

-----------------------------------------------------------

## METHODS

### prependTo:
* The element will be prepended to the specified target.

### appendTo:
* The element will be appended to the specified target.

### insertBefore:
* The element will be inserted before the specified target.

### insertAfter:
* The element will be inserted after the specified target.

-----------------------------------------------------------

[!IMPORTANT]
> Ensure that the specified elements and targets exist on the page to avoid errors.
> The element reordering function will only be triggered when a real breakpoint change occurs.
