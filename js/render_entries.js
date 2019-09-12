var c_one_day_ms = 1000 * 60 * 60 * 24;

function render_testrun(uid, testrun, earlier_testrun) {
  var passed = 0;
  var skipped = 0;
  var failed = 0;

  $.each(testrun.tests, function(name, test_info) {
    if (test_info.result == "pass")
      passed++;
    else if (test_info.result == "skip")
      skipped++;
    else
      failed++;
  });

  var raw_html = '<div id="' + uid + '" class="testrun ';
  if (failed > 0)
    raw_html += 'fail';
  else
    raw_html += 'pass';

  raw_html += '">';
  raw_html += '<div class="morebtn"><i class="fa fa-angle-down fa-fw" aria-hidden="true"></i></div>';
  raw_html += '<div class="date">' + testrun.date.substr(0, 10) + '</div>';
  raw_html += '<div class="preview">';

  raw_html += _render_summary(passed, failed, skipped);
  raw_html += _render_binary(testrun.bin['target-es5_1-profile']);
  raw_html += _render_submodules(testrun.submodules);

  raw_html += '</div>'; // top-div
  raw_html += '<div>';

  raw_html += _render_tests_table(uid, testrun.tests, earlier_testrun.tests);

  raw_html += '</div>'; // bottom-div
  raw_html += '</div>';

  return raw_html;
}

function _render_summary(passed, failed, skipped) {
  var raw_html = '<ul class="numresults">';
  raw_html += '<li class="pass" title="Passed"><i class="fa fa-check fa-fw" aria-hidden="true"></i>' + passed + '</li>';
  raw_html += '<li class="fail" title="Failed"><i class="fa fa-times fa-fw" aria-hidden="true"></i>' + failed + '</li>';
  raw_html += '<li class="skip" title="Skipped"><i class="fa fa-step-forward fa-fw" aria-hidden="true"></i>' + skipped + '</li>';
  raw_html += '</ul>';

  return raw_html;
}

function _render_binary(binary) {
  function isInt(value) {
    return parseInt(Number(value)) == value;
  }

  var bin_size = binary.text + binary.rodata + binary.data;

  var raw_html = '<div class="binary"><table>';
  raw_html += '<tr><td class="sumlabel" title="Total binary size">binary size</td><td class="mono">'
    + bin_size + (isInt(bin_size) ? ' B' : '') + '</td></tr>';
  raw_html += '<tr><td>text</td><td class="mono">' + binary.text + (isInt(binary.text) ? ' B' : '') + '</td></tr>';
  raw_html += '<tr><td>bss</td><td class="mono">' + binary.bss + (isInt(binary.bss) ? ' B' : '') + '</td></tr>';
  raw_html += '<tr><td>data</td><td class="mono">' + binary.data + (isInt(binary.data) ? ' B' : '') + '</td></tr>';
  raw_html += '<tr><td>rodata</td><td class="mono">' + binary.rodata + (isInt(binary.rodata) ? ' B' : '') + '</td></tr>';
  raw_html += '</table></div>';

  return raw_html;
}

var g_submod_nice_name = {
  "iotjs": "IoT.js",
  "jerryscript": "JerryScript",
  "nuttx": "NuttX",
  "nuttx-apps": "NuttX Apps",
  "tizenrt": "TizenRT"
};
var g_submod_baseurl = {
  "iotjs": "https://github.com/Samsung/iotjs/commit/",
  "jerryscript": "https://github.com/jerryscript-project/jerryscript/commit/",
  "nuttx": "https://bitbucket.org/nuttx/nuttx/commits/",
  "nuttx-apps": "https://bitbucket.org/nuttx/apps/commits/",
  "tizenrt": "https://github.com/Samsung/TizenRT/commit/"
};

var g_submod_order = [
  "iotjs",
  "nuttx",
  "nuttx-apps",
  "tizenrt"
];

function _render_submodules(submodules) {
  var raw_html = '<div class="submodules"><table>';
  $.each(g_submod_order, function(idx, name) {
    if (!(name in submodules))
      return;

    var submod = submodules[name];
    raw_html += '<tr class="submod-row submod-' + name + '">';
    raw_html += '<td>' + g_submod_nice_name[name] + '</td>';
    raw_html += '<td class="mono"><a href="' + g_submod_baseurl[name] + submod.commit + '">' + submod.commit.substring(0, 6) + '</a></td>';
    raw_html += '<td>';
    raw_html += '<span class="message">' + submod.message + '</span>';
    raw_html += '<span class="author">' + submod.author + '</span>';
    raw_html += '<span class="date">' + submod.date + '</span>';
    raw_html += '</td>';
    raw_html += '</tr>';
  });

  raw_html += '</table></div>';

  return raw_html;
}

function _render_showhide() {
  var raw_html = '<div class="showhide">';
  raw_html += '<span title="Show/hide test results"><i class="fa fa-eye fa-fw" aria-hidden="true"></i></span>';
  raw_html += '<span><input type="checkbox"></input></span>';
  raw_html += '<span><input type="checkbox" checked></input></span>';
  raw_html += '<span><input type="checkbox"></input></span>';
  raw_html += '</form>';

  return raw_html;
}

function _render_tests_table(uid, tests, earlier_tests_map) {
  var raw_html = '<div class="tests">';
  raw_html += '<table>'
  raw_html += '<thead>'
  raw_html += '<tr>'
  raw_html +=  _render_showhide()
  raw_html += '</tr>'
  raw_html += '<tr>'
  raw_html += '<th rowspan="2">Test</th>'
  raw_html += '<th rowspan="2">Result</th>'
  raw_html += '<th colspan="3">Memory</th>'
  raw_html += '<th rowspan="2">Change</th>'
  raw_html += '<th rowspan="2">Output/Reason</th>'
  raw_html += '</tr>'
  raw_html += '<tr>'
  raw_html += '<th>Jerry</th>'
  raw_html += '<th>Malloc</th>'
  raw_html += '<th>Stack</th>'
  raw_html += '</tr>'
  raw_html += '</thead>'

  $.each(tests, function(idx, test) {
    var row_class = "fail";
    if (test.result == "pass")
      row_class = "pass hidden";
    else if (test.result == "skip")
      row_class = "skip hidden";

    var text = '';
    if (test.hasOwnProperty("output")) {
      text = test.output;
    }

    if (test.hasOwnProperty("reason")) {
      if (text)
        text += '<br>';
      text += test.reason;
    }

    raw_html += '<tr class="' + row_class + '">';
    raw_html += '<td>' + test.name + '</td>';
    raw_html += '<td>' + test.result + '</td>';

    if (test.hasOwnProperty('memstat')) {
      if (test.memstat['heap-jerry'] != 'n/a') {
        raw_html += '<td class="mono">' + test.memstat['heap-jerry'] + ' B</td>';
      } else {
        raw_html += '<td class="mono">' + test.memstat['heap-jerry'] + '</td>';
      }

      if (test.memstat['heap-system'] != 'n/a') {
        raw_html += '<td class="mono">' + test.memstat['heap-system'] + ' B</td>';
      } else {
        raw_html += '<td class="mono">' + test.memstat['heap-system'] + '</td>';
      }

      if (test.memstat['stack'] != 'n/a') {
        raw_html += '<td class="mono">' + test.memstat['stack'] + ' B</td>';
      } else {
        raw_html += '<td class="mono">' + test.memstat['stack'] + '</td>';
      }
    }
    else
    {
      raw_html += '<td class="mono">n/a</td>';
      raw_html += '<td class="mono">n/a</td>';
      raw_html += '<td class="mono">n/a</td>';
    }

    raw_html += '<td class="mono">';

    var total_memory = NaN;
    if (test.hasOwnProperty("memstat")) {
      total_memory = parseInt(test.memstat['heap-jerry'] + test.memstat['heap-system'] + test.memstat['stack']);
    }

    var can_compare_current = (
      test.result == "pass" &&
      !isNaN(total_memory)
    );

    if (can_compare_current) {
      var compared = false;
      for (var key in earlier_tests_map) {
        var earlier_test = earlier_tests_map[key];
        var earlier_total_memory = NaN;
        if (earlier_test.hasOwnProperty("memstat")) {
          var earlier_total_memory = parseInt(earlier_test.memstat['heap-jerry'] +
                                              earlier_test.memstat['heap-system'] +
                                              earlier_test.memstat['stack']);
        }
        if (earlier_test.name == test.name
            && earlier_test.result == "pass"
            && earlier_total_memory > 0) {
          var diff = total_memory - earlier_total_memory;
          var percent = (diff / earlier_total_memory) * 100.0;
          raw_html += (diff >= 0 ? '+' : '') + percent.toFixed(1) + '%';
          compared = true;
          break;
        }
      }
      if (!compared)
        raw_html += '<span class="light">n/a</span>'
    }
    else {
      raw_html += '<span class="light">n/a</span>'
    }

    raw_html += '</td>';
    raw_html += '<td>';

    var test_detail_id = uid + '_' + idx;
    raw_html += '<div id="' + test_detail_id + '">' + text;

    if (text.indexOf("<br>") !== -1) {
      raw_html += '<div class="morebtn"><i class="fa fa-angle-down fa-fw" aria-hidden="true"></i></div>';
    }

    raw_html += '</div>'
    raw_html += '</td>';
    raw_html += '</tr>';
  });

  raw_html += '</table></div>';

  return raw_html;
}

function date_floor(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function subtract_one_day(date) {
  date.setUTCDate(date.getUTCDate() - 1);
}

function render_testruns(idx, idx_end) {
  $("#testruns").empty();
  $("#loading").show();

  if (!firebase.apps.length) {
    return;
  }

  if (idx < 0 || idx >= g_db_keys.length)
    return;

  if (idx_end >= g_db_keys.length)
    idx_end = g_db_keys.length - 1;

  var prev_element = "";

  if (idx > 0) {
    g_db_ref.child(g_db_keys[idx - 1]).once("value", function(data) {
      prev_element = data.val();
    });
  }

  var testruns = [];
  var promises = [];

  if (idx == idx_end)
  {
    query = g_db_ref.child(g_db_keys[idx]);
    promises.push(query.once('value'));
  }
  else
  {
    for (var i = idx; i <= idx_end; i++) {
      query = g_db_ref.child(g_db_keys[i]);
      promises.push(query.once('value'));
    }
  }

  Promise.all(promises)
    .then(function (snaps) {
      snaps.forEach(function (snap) {
        testruns.push(snap.val());
      });

      var testruns_div = $("#testruns");
      testruns_div.empty();

      idx = 0;
      anim_idx = 0;
      for (; idx <= idx_end; idx++) {
        if (idx >= testruns.length)
          break;

        var testrun = testruns[idx];
        var testrun_id = "testrun_" + idx;
        var next_testrun = (idx + 1) >= testruns.length ? { tests: {} } : testruns[idx + 1];

        testruns_div.append(render_testrun(testrun_id, testrun, next_testrun));

        var testrun_ref = "#" + testrun_id;
        $(testrun_ref + " > .morebtn").click(function(ref) {
          return function() {
            $(ref).toggleClass('expanded');
          }
        }(testrun_ref));

        $.each(testrun.tests, function(idx, test) {
          var test_detail_ref = testrun_ref + '_' + idx;
          $(test_detail_ref + " .morebtn").click(function(detail_ref){
            return function() {
              $(detail_ref).toggleClass('expanded');
            }
          }(test_detail_ref));
        });

        $(testrun_ref + " .showhide span:nth-child(2) input").click(function(ref) {
          return function() {
            $(ref + " tr.pass").toggleClass('hidden');
          }
        }(testrun_ref));

        $(testrun_ref + " .showhide span:nth-child(4) input").click(function(ref) {
          return function() {
            $(ref + " tr.skip").toggleClass('hidden');
          }
        }(testrun_ref));

        $(testrun_ref + " .showhide span:nth-child(3) input").click(function(ref) {
          return function() {
            $(ref + " tr.fail").toggleClass('hidden');
        }
      }(testrun_ref));
    }

    render_done('entries');
  });
}

function render_pagination(length, step) {
  var containers = $(".pagination");
  var btn_cnt = Math.ceil(length / step);

  var list = $('<ul></ul>');
  for (var btn_idx = 0; btn_idx < btn_cnt; btn_idx++) {
    var start = btn_idx * step;
    var raw_html = '<li><a>' + (start + 1) + '-' + (start + step) + '</a></li>';

    var item = $(raw_html).click(function(idx, start) {
      return function() {
        render_testruns(start, start + step - 1);
        $(".pagination li").removeClass("active");
        $(".pagination li:nth-child(" + (idx + 1) + ")").addClass("active");
      }
    }(btn_idx, start));

    list.append(item);
  }

  $.each(containers, function(idx, container) {
    $(container).empty().append(list);
  });

  $(".pagination li:first-child").addClass("active");
}

$(document).ready(function() {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  var pair = vars[0].split("=");
  $('#coverage_link').attr('href','./coverage/index.html?v=' + pair[1]);
});
