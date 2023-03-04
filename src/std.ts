export function isspace(s: string) {
    return /\s/.test(s) || s == '';
}
export function isdigit(s: string){
    return /[0-9]/.test(s)
}
export function isalnum(s: string){
    return /[a-zA-Z0-9]/.test(s)
}
export function isalpha(s: string){
    return /[a-zA-Z]/.test(s)
}
export function strtod(str: string){
    let num = parseFloat(str)
    if(isNaN(num)){
        return 0
    }
    return num
}

export const EOF = '\0'