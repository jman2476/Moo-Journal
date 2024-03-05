// styleMap.js
export const styleMap = {
    'SMALL': { fontSize: '12px' }, // Ensure units are included for CSS properties
    'MEDIUM': { fontSize: '18px' },
    'LARGE': { fontSize: '24px' },
    'HIGHLIGHT': { backgroundColor: 'yellow' },
};


export const combinedStyleConfig = [
    {
        style: 'SMALL',
        css: { fontSize: '12px' },
        label: 'Small',
        type: 'inline',
        className: 'editor-button-small',
        category:'text-size'
    },
    {
        style: 'MEDIUM',
        css: { fontSize: '18px' },
        label: 'Medium',
        type: 'inline',
        className: 'editor-button-medium',
        category:'text-size'
    },
    {
        style: 'LARGE',
        css: { fontSize: '24px' },
        label: 'Large',
        type: 'inline',
        className: 'editor-button-large',
        category:'text-size'
    },
    {
        style: 'HIGHLIGHT',
        css: { backgroundColor: 'yellow' },
        label: 'Highlight',
        type: 'inline',
        className: 'editor-button-highlight',
        category:'background-color'
    },
    {
        style: 'BOLD',
        css: { fontWeight: 'bold' },
        label: 'Bold',
        type: 'inline',
        className: 'editor-button-bold',
        category:'font-style'
    },
    {
        style: 'ITALIC',
        css: { fontStyle: 'italic' },
        label: 'Italic',
        type: 'inline',
        className: 'editor-button-italic',
        category:'font-style'
    },
    {
        style: 'UNDERLINE',
        css: { textDecoration: 'underline' },
        label: 'Underline',
        type: 'inline',
        className: 'editor-button-underline',
        category:'font-style'
    },
    {
        style: 'STRIKETHROUGH',
        css: { textDecoration: 'line-through' },
        label: 'Strikethrough',
        type: 'inline',
        className: 'editor-button-strikethrough',
        category:'font-style'
    },
    {
        style: 'FONT_COLOR_RED',
        css: { color: 'red' },
        label: 'Red Text',
        type: 'inline',
        className: 'editor-button-font-color-red',
        category:'text-color'
    },
    {
        style: 'FONT_COLOR_BLUE',
        css: { color: 'blue' },
        label: 'Blue Text',
        type: 'inline',
        className: 'editor-button-font-color-blue',
        category:'text-color'
    },
    {
        style: 'BACKGROUND_COLOR_GREEN',
        css: { backgroundColor: 'lightgreen' },
        label: 'Green Background',
        type: 'inline',
        className: 'editor-button-bg-color-green',
        category:'background-color'
    },
    {
        style: 'FONT_FAMILY_MONOSPACE',
        css: { fontFamily: '"Courier New", Courier, monospace' },
        label: 'Monospace',
        type: 'inline',
        className: 'editor-button-font-family-monospace',
        category:'font-family'
    },
    {
        style: 'TEXT_ALIGN_CENTER',
        css: { textAlign: 'center' },
        label: 'Center Align',
        type: 'block',
        className: 'editor-button-text-align-center',
        category:'text-align'
    }, // Note: Text alignment may require additional handling
    {
        style: 'TEXT_ALIGN_RIGHT',
        css: { textAlign: 'right' },
        label: 'Right Align',
        type: 'block',
        className: 'editor-button-text-align-right',
        category:'text-align'
    }, // Note: Text alignment may require additional handling
    {
        style: 'SUPERSCRIPT',
        css: { verticalAlign: 'super', fontSize: 'smaller' },
        label: 'Superscript',
        type: 'inline',
        className: 'editor-button-superscript',
        category:'advanced'
    },
    {
        style: 'SUBSCRIPT',
        css: { verticalAlign: 'sub', fontSize: 'smaller' },
        label: 'Subscript',
        type: 'inline',
        className: 'editor-button-subscript',
        category:'advanced'
    },
    {
        style: 'LINE_HEIGHT',
        css: { lineHeight: '1.5' },
        label: 'Line Height',
        type: 'inline',
        className: 'editor-button-line-height',
        category:'advanced'
    },
    {
        style: 'LETTER_SPACING',
        css: { letterSpacing: '2px' },
        label: 'Letter Spacing',
        type: 'inline',
        className: 'editor-button-letter-spacing',
        category:'advanced'
    },
];
