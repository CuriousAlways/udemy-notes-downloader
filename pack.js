const { readFileSync, existsSync, mkdirSync } = require('fs');
const { parse, resolve } = require('path');
const AdmZip = require('adm-zip');

const browsers = ['chrome', 'firefox'];
for (const b of browsers) {
  try {
    const { base } = parse(__dirname);
    const { version } = JSON.parse(
      readFileSync(resolve(__dirname, `build/${b}`, 'manifest.json'), 'utf8')
    );
  
    const outdir = 'release';
    //const filename = `${base}-v${version}.zip`;
    const zip = new AdmZip();
    
  
  
    zip.addLocalFolder(`build/${b}`);
    if (!existsSync(outdir)) {
      mkdirSync(outdir);
    }
    const filename = `${base}-v${version}_${b}.zip`;
    zip.writeZip(`${outdir}/${filename}`);
    console.log(
      `Success! Created a ${filename} file under ${outdir} directory. You can upload this file to web store.`
    );
  
  
  
    
  } catch (e) {
    console.error('Error! Failed to generate a zip file.');
    console.error(JSON.stringify(e));
  }
}