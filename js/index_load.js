$(document).ready(function() {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    var pair = vars[0].split('=');
    $('#target-info-placeholder').show();
    $('#target-info').hide();

    if (pair[1]) {
        load_coverage(pair[1], function() {
            $('#target-info-placeholder').hide();
            $('#target-info').show();
        });
    }
    if (typeof prettyPrint === 'function') {
        prettyPrint();
    }
});

function load_coverage(url, callback) {
    var u = 'coverage/iotjs/' + url;
    firebase.database().ref(u).on('child_added', function(snapshot) {
        var actual_JSON = snapshot.val().coverage_info;
        var fraction1 = fraction2 = 0;
        var prior;
        var raw_html1 = '';

        Object.keys(actual_JSON).sort().forEach(function(key) {
            var value = actual_JSON[key];
            if (value.coverage[0] != 0 && value.coverage[1] != 0) {
                fraction1 += value.coverage[0];
                fraction2 += value.coverage[1];
                var prior_statement = (parseFloat(value.coverage[0] / value.coverage[1]));
                if (prior_statement <= 0.3) {
                    prior = 'low';
                } else if (prior_statement > 0.3 && prior_statement <= 0.6) {
                    prior = 'medium';
                } else if (prior_statement > 0.6) {
                    prior = 'high';
                }
                var raw_html = '<tr><td class="file ' + prior + '" data-value="' + key + '.js"><a href="./content.html?v=' + url + '&js=' + key + '">' + key + '.js</a></td>';
                raw_html += '<td data-value="' + (prior_statement * 100).toFixed(0) + '" class="pic  ' + prior + '"><div class="chart"><div class="cover-fill cover-full" style="width: ' + (prior_statement * 100 ).toFixed(0) + '%;"></div><div class="cover-empty" style="width:0%;"></div></div></td>';
                raw_html += '<td data-value="' + (prior_statement * 100).toFixed(0) + '" class="pct  ' + prior + '">' + (prior_statement * 100 ).toFixed(0) + '%</td>';
                raw_html += '<td data-value="' + value.coverage[1] + '" class="abs  ' + prior + '">'+ value.coverage[0] + '/' + value.coverage[1] + '</td></tr>';
                $('#coverage_files').append(raw_html);
            } else {
                raw_html1 += '<tr><td class="file" data-value="' + key + '.js"><a href="./content.html?v=' + url + '&js=' + key + '">' + key + '.js</a></td>';
                raw_html1 += '<td data-value="0" class="pic"><div class="chart"><div class="cover-fill cover-full" style="width: 0%;"></div><div class="cover-empty" style="width:0%;"></div></div></td>';
                raw_html1 += '<td data-value="0" class="pct">n/a</td>';
                raw_html1 += '<td data-value="0" class="abs">Not reached by the test suite</td></tr>';
            }
        });
        
        var average = parseFloat(fraction1 / fraction2 * 100).toFixed(1) + '% ';
        var fraction = fraction1 + '/' + fraction2;
        var dt = '<span>  Commit: <a href="https://github.com/Samsung/iotjs/commit/' + snapshot.val().submodules.iotjs.commit +'" target="_blank">'+ snapshot.val().submodules.iotjs.commit.substring(0,6) + '</a></span>';
        dt += ' <span>  Date: ' + snapshot.val().submodules.iotjs.date.substring(0,10) + '</span>';
        
        $('#coverage_files').append(raw_html1);
        $('#average').append(average);
        $('#average_l').append(average);
        $('#fraction').append(fraction);
        $('#fraction_l').append(fraction);
        $('#coverage').append(dt);
        callback();
    });
}

$(document).click(function(e) {
    var target = e.target;
    var et  = document.getElementsByTagName('th');
    var targeted = e.target.className.split(' ');

    for( i = 0; i < et.length; i++) {
        if (et[i].classList.contains(targeted[0])) {
            if (et[i].classList.contains('sorted-desc')) {
                et[i].classList.remove('sorted-desc');
                et[i].classList.add('sorted');
            } else {
                et[i].classList.remove('sorted');
                et[i].classList.add('sorted-desc');
            }
        } else {
            et[i].classList.remove('sorted');
            et[i].classList.remove('sorted-desc');
        }
    }
});

function sortTable(n,s) {
    var table = '', rows = '', switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = $('#coverage_files');
    switching = true;
    dir = 'asc';
    while (switching) {
        switching = false;
        rows = $('tr');
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            if (s == 0) {
                x = rows[i].cells[n].dataset.value;
                y = rows[i+1].cells[n].dataset.value;
            } else {
                x = parseInt(rows[i].cells[n].dataset.value);
                y = parseInt(rows[i+1].cells[n].dataset.value);
            }
            if (dir == 'asc') {
                if (x > y) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == 'desc') {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
            switchcount ++; 
        } else {
            if (switchcount == 0 && dir == 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }
}
