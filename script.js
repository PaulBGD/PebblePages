(function(global) {
    var configuration = {};
    var hash = window.location.hash;
    hash = hash.substr(1, hash.length);

    if (hash.length > 0) {
        try {
            configuration = JSON.parse(decodeURIComponent(hash));
        } catch (err){
            console.error('Failed to load configuration', err);
        }
    }

    var fields = document.getElementsByTagName('input');
    var length = fields.length;
    while (length--) {
        var field = fields[length];
        setValue.call(field);
        field.addEventListener('change', setValue, false);
    }

    document.getElementById('save').onclick = function() {
        window.location = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(configuration));
    };

    function setValue() {
        var value = this.value;
        if (this.getAttribute('type') == 'checkbox') {
            value = this.checked;
        }
        configuration[this.getAttribute('data-target')] = value;
    }

    global.configuration = configuration; // for debugging
})(this);
