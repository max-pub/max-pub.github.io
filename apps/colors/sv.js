export class SV {
    constructor(columnDelimiter = '\t', lineDelimiter = '\n') {
        this.lineDelimiter = lineDelimiter;
        this.columnDelimiter = columnDelimiter;
    }
    parse(string) {
        return string.split(this.lineDelimiter).map(line => line.split(this.columnDelimiter));
    }
    stringify(array){
        return array.map(line=>line.join(this.columnDelimiter)).join(this.lineDelimiter);
    }
}
