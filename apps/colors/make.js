var FS = require('fs');
// var TSV = require('tsv')
// PSV = new TSV.Parser("\t")
// var res = PSV.parse(FS.readFileSync('./colors.tsv','utf8'));
var colorsys = require('colorsys');

 class SV {
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




let tsv = FS.readFileSync('./colors.tsv', 'utf8');
let data = new SV('\t','\r\n').parse(tsv);
data = data.slice(1).map(line => {
    let hsl = colorsys.hex2Hsl(line[1]); 
    line[2] = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    line[3] = hsl.h
    return line;
});
data = data.sort((a,b)=> a[3]>b[3] ? 1 : -1);
let output = new SV('\t','\r\n').stringify(data);
console.log(output);
FS.writeFileSync('index.html',`<link rel="stylesheet" type="text/css" href="/base.css"><main>`
+ data.map(line=>`<div style='white-space: nowrap;'>
<span style='display: inline-block; height:30px; width: 200px; background:${line[0]};'>${line[0]}</span> 
<span style='display: inline-block; height:30px; width: 200px; background:${line[1]};'>${line[1]}</span> 
<span style='display: inline-block; height:30px; width: 200px; background:${line[2]};'>${line[2]}</span> 
 </div>`).join('\n') + '</main>');