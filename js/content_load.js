$(document).ready(function() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var pair0 = vars[0].split("=");
    var pair1 = vars[1].split("=");
    $('#jsfilename').append(pair1[1] + '.js');
    $('#target-info-placeholder').show();
    $('#target-info').hide();
    if (pair0[1]) {
        load_coverage(pair0[1], pair1[1], function() {
            $('#target-info-placeholder').hide();
            $('#target-info').show();
        });
    }
    if (typeof prettyPrint === 'function') {
        prettyPrint();
    }
});

function load_coverage(url, file, callback) {
    var u = 'coverage/iotjs/' + url;
    firebase.database().ref(u).on('child_added', function(snapshot) {
        var actual_JSON = snapshot.val().coverage_info;
        Object.keys(actual_JSON).sort().forEach(function(key) {
            if (key == file) {
                var value = actual_JSON[key];
                var fraction1 = fraction2 = 0;
                var line_count = '\n';
                var content_html = '\n';
                var pct, lines, i, k = 0;

                if (value.coverage[0] == 0 && value.coverage[0] == 0) {
                    pct = 'n/a';
                    lines = 'n/a';
                } else {
                    pct = parseFloat(value.coverage[0] / value.coverage[1] * 100 ).toFixed(0) + '%';
                    lines = value.coverage[0] + '/' + value.coverage[1];
                }

                for (i = 0; i < value.lines.length; i++ ) {
                    var stat = '';
                    k++;
                    line_count += k + '\n';
                    if (value.lines[i][1] == 1) {
                        stat = '-no';
                    } else if (value.lines[i][1] == 2) {
                        stat = '-yes';
                    }
                    content_html += '<span class="cstat' + stat + '">' + value.lines[i][0] + '</span>';   
                }

                $('#all_files').attr('href','./index.html?v=' + url);
                $('#pct').append(pct);
                $('#lines').append(lines);
                $('#line-count').append(line_count);
                $('#prettyprint').append(content_html);
            }
        });
        callback();
    });
}
