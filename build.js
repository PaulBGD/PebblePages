var fs = require('fs');

[
    '_index.html',
    'styles.css',
    'script.js',
    'data.json'
].forEach(function(object) {
    if (!fs.existsSync(object)) {
        throw new Error('The mandatory file "' + object + '" does not exist!');
    }
});

var data = require('./data');
var index = fs.readFileSync('_index.html').toString('utf8');

index = replaceVariable(index, 'name', data.title);
var fields = '';
var i = 0;
for (var property in data.fields) {
    var field = data.fields[property];
    field.type = field.type || 'text';
    field.title = field.title || 'field.title';
    fields += '<label for="' + i + '" class="' + field.type + ' ' + i + '">' + field.title;
    var properties = {
        type: field.type,
        'data-target': property,
        placeholder: field.title
    };
    if (field.data) {
        for (var property2 in field.data) {
            properties[property2] = field.data[property2];
        }
    }
    var string = '';
    for (property2 in properties) {
        string += ' ' + property2 + '="' + properties[property2] + '"';
    }
    fields += '<input' + string + '>';
    fields += '<span></span></label>'; // span hack for firefox
    i++;
}
index = replaceVariable(index, 'form', fields);

// save, make backup
if (fs.existsSync('index.html')) {
    fs.createReadStream('index.html').pipe(fs.createWriteStream('index.backup.html'));
}
fs.writeFileSync('index.html', index, 'utf8');

function replaceVariable(string, name, value) {
    return string.replace(new RegExp('<% ' + name + ' %>', 'g'), value);
}
