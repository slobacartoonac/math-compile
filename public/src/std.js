export function isspace(s) {
    return /\s/.test(s);
}
export function isdigit(s) {
    return /[0-9]/.test(s);
}
export function isalnum(s) {
    return /[a-zA-Z][a-zA-Z0-9]*/.test(s);
}
export function isalpha(s) {
    return /[a-zA-Z]/.test(s);
}
export function strtod(str) {
    let num = parseFloat(str);
    if (isNaN(num)) {
        return 0;
    }
    return num;
}
export const EOF = '\0';
//# sourceMappingURL=std.js.map