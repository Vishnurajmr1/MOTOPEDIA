export interface Sanitizer<I=any,O=any>{
    sanitize(value:I):O;
}