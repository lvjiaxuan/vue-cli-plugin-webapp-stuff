const Fontmin = require('fontmin');

const text = {
  Normal: `1234567890`,
  Light: `1234567890`,
  Heavy: `1234567890`,
  Regular: `1234567890`,
  Medium: `1234567890`,
  Bold: '1234567890',
}

;['Normal', 'Light', 'Heavy', 'Regular', 'Medium', 'Bold'].forEach(item => {

  if(!text[item]) return ;

  new Fontmin().use(Fontmin.glyph({
    text: [...new Set(text[item].split(''))].join('').replace(/\s*/g, ''),
    hinting: false
  })).src('./fontmin-tool/ttf/SourceHanSansCN-' + item + '.ttf')
    .dest('./src/assets/fonts').run();
});