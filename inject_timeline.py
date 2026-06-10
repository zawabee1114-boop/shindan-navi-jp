path = r'C:/Users/ZAWA/repos/shindan-navi-jp/src/pages/profile/index.astro'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

timeline_script = r'''
<script>
(function () {
  var LS_TIMELINE = 'sn_timeline_snapshots';
  var MULTI_INT_BIG5 = {
    linguistic:     { O:80, C:65, E:55, A:60, N:45 },
    logical:        { O:75, C:80, E:40, A:50, N:35 },
    spatial:        { O:90, C:55, E:55, A:60, N:40 },
    kinesthetic:    { O:65, C:60, E:75, A:65, N:40 },
    musical:        { O:85, C:50, E:60, A:65, N:55 },
    interpersonal:  { O:70, C:60, E:85, A:85, N:45 },
    intrapersonal:  { O:80, C:70, E:30, A:55, N:50 },
    naturalist:     { O:80, C:65, E:40, A:70, N:35 },
  };
  var PERFECTIONISM_BIG5 = {
    thorough:        { O:60, C:90, E:50, A:40, N:50 },
    particular:      { O:55, C:85, E:45, A:50, N:55 },
    procrastinating: { O:50, C:40, E:30, A:55, N:75 },
    expecting:       { O:50, C:70, E:50, A:65, N:70 },
  };
  var DISC_BIG5 = {
    D: { O:50, C:70, E:85, A:35, N:40 },
    i: { O:75, C:50, E:90, A:60, N:40 },
    S: { O:45, C:70, E:40, A:85, N:30 },
    C: { O:55, C:90, E:35, A:55, N:50 },
  };
  var LOVE_STYLE_BIG5 = {
    eros:   { O:75, C:60, E:70, A:65, N:40 },
    ludus:  { O:70, C:45, E:80, A:35, N:35 },
    storge: { O:55, C:75, E:50, A:80, N:30 },
    pragma: { O:55, C:85, E:50, A:60, N:35 },
    mania:  { O:60, C:55, E:65, A:55, N:80 },
    agape:  { O:70, C:70, E:60, A:90, N:25 },
  };
  var MONEY_STYLE_BIG5 = {
    avoidance: { O:50, C:40, E:45, A:60, N:75 },
    worship:   { O:60, C:55, E:65, A:40, N:55 },
    status:    { O:65, C:60, E:70, A:45, N:50 },
    vigilance: { O:50, C:85, E:40, A:55, N:45 },
  };
  var FRIEND_COMPAT_BIG5 = {
    'mood-maker':    { O:70, C:55, E:90, A:75, N:30 },
    'deep-listener': { O:65, C:65, E:35, A:90, N:40 },
    'lone-wolf':     { O:75, C:70, E:25, A:45, N:45 },
    'leader':        { O:60, C:75, E:80, A:55, N:35 },
    'peacemaker':    { O:55, C:65, E:50, A:85, N:35 },
    'explorer':      { O:90, C:45, E:70, A:60, N:40 },
  };
  var ZODIAC_BIG5 = {
    aries:{ O:65, C:55, E:80, A:45, N:45 }, taurus:{ O:55, C:80, E:40, A:70, N:40 },
    gemini:{ O:85, C:45, E:85, A:60, N:50 }, cancer:{ O:60, C:65, E:45, A:80, N:60 },
    leo:{ O:70, C:60, E:85, A:55, N:45 }, virgo:{ O:60, C:90, E:40, A:60, N:55 },
    libra:{ O:70, C:60, E:65, A:80, N:45 }, scorpio:{ O:70, C:70, E:45, A:50, N:65 },
    sagittarius:{ O:85, C:45, E:80, A:55, N:35 }, capricorn:{ O:50, C:85, E:40, A:55, N:45 },
    aquarius:{ O:90, C:50, E:60, A:55, N:40 }, pisces:{ O:80, C:45, E:50, A:80, N:65 },
  };
  var BLOOD_TYPE_BIG5 = {
    A:{ O:55, C:80, E:45, A:70, N:55 }, B:{ O:75, C:50, E:75, A:45, N:45 },
    O:{ O:65, C:65, E:70, A:65, N:40 }, AB:{ O:75, C:65, E:55, A:60, N:55 },
  };
  var WEIGHTS = {
    'multi-int':1.5, 'perfectionism':1.0, 'disc':1.2,
    'love_style':1.2, 'money_style':1.0, 'friend_compat':1.0, 'zodiac':0.5, 'blood_compat':0.5,
  };

  function getBig5(diagId, data) {
    var maps = {
      'multi-int': [MULTI_INT_BIG5, function(d){ return d.dominantType; }],
      'perfectionism': [PERFECTIONISM_BIG5, function(d){ return d.type || d.typeId; }],
      'disc': [DISC_BIG5, function(d){ return d.type || d.dominantType || d.typeId; }],
      'love_style': [LOVE_STYLE_BIG5, function(d){ return d.dominantStyle || d.type || d.typeId; }],
      'money_style': [MONEY_STYLE_BIG5, function(d){ return d.dominantType || d.type || d.typeId; }],
      'friend_compat': [FRIEND_COMPAT_BIG5, function(d){ return d.friendType || d.type || d.typeId; }],
    };
    var entry = maps[diagId];
    if (!entry) return null;
    var t = entry[1](data);
    return (t && entry[0][t]) ? entry[0][t] : null;
  }

  function aggregateBig5() {
    var sums = { O:0, C:0, E:0, A:0, N:0 };
    var totalW = 0, count = 0;
    var diagIds = ['multi-int', 'perfectionism', 'disc', 'love_style', 'money_style', 'friend_compat'];
    diagIds.forEach(function(id) {
      try {
        var raw = localStorage.getItem('sn_scores_' + id);
        if (!raw) return;
        var data = JSON.parse(raw);
        var b5 = getBig5(id, data);
        if (!b5) return;
        var w = WEIGHTS[id] || 1;
        sums.O += b5.O*w; sums.C += b5.C*w; sums.E += b5.E*w; sums.A += b5.A*w; sums.N += b5.N*w;
        totalW += w; count++;
      } catch(_) {}
    });
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.startsWith('zodiac_result_')) {
          var item = JSON.parse(localStorage.getItem(k));
          var d = item.value || item;
          var t = d.zodiacType || d.sign || d.type;
          if (t && ZODIAC_BIG5[t]) {
            var b5 = ZODIAC_BIG5[t];
            sums.O += b5.O*0.5; sums.C += b5.C*0.5; sums.E += b5.E*0.5; sums.A += b5.A*0.5; sums.N += b5.N*0.5;
            totalW += 0.5; count++;
          }
          break;
        }
      }
    } catch(_) {}
    try {
      var raw2 = localStorage.getItem('sn_blood_type') || localStorage.getItem('sn_scores_blood_compat');
      if (raw2) {
        var tid;
        try { tid = JSON.parse(raw2).type || JSON.parse(raw2).bloodType || JSON.parse(raw2).typeId; } catch(_) { tid = raw2.replace(/"/g,''); }
        if (tid && BLOOD_TYPE_BIG5[tid]) {
          var b5 = BLOOD_TYPE_BIG5[tid];
          sums.O += b5.O*0.5; sums.C += b5.C*0.5; sums.E += b5.E*0.5; sums.A += b5.A*0.5; sums.N += b5.N*0.5;
          totalW += 0.5; count++;
        }
      }
    } catch(_) {}
    if (totalW === 0) return null;
    return {
      O: Math.round(sums.O/totalW), C: Math.round(sums.C/totalW),
      E: Math.round(sums.E/totalW), A: Math.round(sums.A/totalW),
      N: Math.round(sums.N/totalW), count: count,
    };
  }

  function formatDateJst(d) {
    var jst = new Date(d.getTime() + 9*60*60*1000);
    return jst.toISOString().slice(0,10);
  }

  function saveSnapshot(big5, count) {
    try {
      var raw = localStorage.getItem(LS_TIMELINE);
      var arr = (raw ? JSON.parse(raw) : []);
      if (!Array.isArray(arr)) arr = [];
      var today = formatDateJst(new Date());
      var idx = -1;
      for (var i = 0; i < arr.length; i++) {
        if (formatDateJst(new Date(arr[i].capturedAt)) === today) { idx = i; break; }
      }
      var id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + '-' + Math.random().toString(36).slice(2));
      var snap = {
        id: id,
        capturedAt: new Date().toISOString(),
        big5: { O:big5.O, C:big5.C, E:big5.E, A:big5.A, N:big5.N },
        diagnosisCount: count,
        version: (idx >= 0 ? (arr[idx].version || 0) : 0) + 1,
      };
      if (idx >= 0) { arr[idx] = snap; } else { arr.push(snap); }
      arr.sort(function(a,b){ return new Date(a.capturedAt).getTime() - new Date(b.capturedAt).getTime(); });
      localStorage.setItem(LS_TIMELINE, JSON.stringify(arr));
    } catch(_) {}
  }

  function run() {
    var result = aggregateBig5();
    if (result && result.count > 0) saveSnapshot(result, result.count);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
</script>
'''

old = '</BaseLayout>'
new = timeline_script + '\n</BaseLayout>'
content = content.replace(old, new, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('OK:', 'sn_timeline_snapshots' in content)
