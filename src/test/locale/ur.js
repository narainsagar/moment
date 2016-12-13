import {localeModule, test} from '../qunit';
import moment from '../../moment';
localeModule('ur');

var expectedMonths = 'جنوری جنوری_فروری فروری_مارچ مارچ_اپریل اپریل_مئی مئی_جون جون_جولائی جولائی_اگست اگست_ستمبر ستمبر_اکتوبر اکتوبر_نومبر نومبر_دسمبر دسمبر'.split('_');
var expectedWeeks = 'اتوار اتوار ا_پیر پیر پ_منگل منگل م_بدھ بدھ ب_جمعرات جمعرات ج_جمعہ جمعہ جم_سنیچر‌ سنیچر‌ س'.split('_');

test('parse', function (assert) {
    var tests = expectedMonths, i;
    function equalTest(input, mmm, i) {
        assert.equal(moment(input, mmm).month(), i, input + ' should be month ' + (i + 1));
    }
    for (i = 0; i < 12; i++) {
        tests[i] = tests[i].split(' ');
        equalTest(tests[i][0], 'MMM', i);
        equalTest(tests[i][1], 'MMM', i);
        equalTest(tests[i][0], 'MMMM', i);
        equalTest(tests[i][1], 'MMMM', i);
        equalTest(tests[i][0].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleLowerCase(), 'MMMM', i);
        equalTest(tests[i][0].toLocaleUpperCase(), 'MMMM', i);
        equalTest(tests[i][1].toLocaleUpperCase(), 'MMMM', i);
    }
});

test('format', function (assert) {
    var a = [
        ['dddd, Do MMMM YYYY, h:mm:ss a',      '3:25:50 اتوار، 14 فروری 2010، دوپہر بعد'], // 'Sunday, February 14th 2010, 3:25:50 pm'
        ['ddd, hA',                            'اتوار، دوپہر بعد 3'], // 'Sun, 3PM'
        ['M Mo MM MMMM MMM',                   '2 2 02 فروری فروری'],
        ['YYYY YY',                            '2010 10'],
        ['D Do DD',                            '14 14 14'],
        ['d do dddd ddd dd',                   '0 0 اتوار اتوار ا'],
        ['DDD DDDo DDDD',                      '45 45 045'],
        ['w wo ww',                            '6 6 06'],
        ['h hh',                               '3 03'],
        ['H HH',                               '15 15'],
        ['m mm',                               '25 25'],
        ['s ss',                               '50 50'],
        ['a A',                                'دوپہر بعد دوپہر بعد'],
        //['[the] DDDo [day of the year]',       'the 45th day of the year'],
        ['LTS',                                '15:25:50'],
        ['L',                                  '14/02/2010'],
        ['LL',                                 '14 فروری 2010'],
        ['LLL',                                '14 فروری 2010 15:25'],
        ['LLLL',                               'اتوار، 14 فروری 2010 15:25'],
        ['l',                                  '14/2/2010'],
        ['ll',                                 '14 فروری 2010'],
        ['lll',                                '14 فروری 2010 15:25'],
        ['llll',                               'اتوار، 14 فروری 2010 15:25']
    ],
    b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
    i;
    for (i = 0; i < a.length; i++) {
        assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
    }
});
/*
test('format month', function (assert) {
    var expected = expectedMonths, i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, i, 1]).format('MMMM MMM'), expected[i], expected[i]);
    }
});

test('format week', function (assert) {
    var expected = expectedWeeks, i;
    for (i = 0; i < expected.length; i++) {
        assert.equal(moment([2011, 0, 2 + i]).format('dddd ddd dd'), expected[i], expected[i]);
    }
});

test('from', function (assert) {
    var start = moment([2007, 1, 28]);
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 44}), true),  'a few seconds', '44 seconds = a few seconds');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 45}), true),  'a minute',      '45 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 89}), true),  'a minute',      '89 seconds = a minute');
    assert.equal(start.from(moment([2007, 1, 28]).add({s: 90}), true),  '2 minutes',     '90 seconds = 2 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 44}), true),  '44 minutes',    '44 minutes = 44 minutes');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 45}), true),  'an hour',       '45 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 89}), true),  'an hour',       '89 minutes = an hour');
    assert.equal(start.from(moment([2007, 1, 28]).add({m: 90}), true),  '2 hours',       '90 minutes = 2 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 5}), true),   '5 hours',       '5 hours = 5 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 21}), true),  '21 hours',      '21 hours = 21 hours');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 22}), true),  'a day',         '22 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 35}), true),  'a day',         '35 hours = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({h: 36}), true),  '2 days',        '36 hours = 2 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 1}), true),   'a day',         '1 day = a day');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 5}), true),   '5 days',        '5 days = 5 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 25}), true),  '25 days',       '25 days = 25 days');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 26}), true),  'a month',       '26 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 30}), true),  'a month',       '30 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 43}), true),  'a month',       '43 days = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 46}), true),  '2 months',      '46 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 74}), true),  '2 months',      '75 days = 2 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 76}), true),  '3 months',      '76 days = 3 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 1}), true),   'a month',       '1 month = a month');
    assert.equal(start.from(moment([2007, 1, 28]).add({M: 5}), true),   '5 months',      '5 months = 5 months');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 345}), true), 'a year',        '345 days = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({d: 548}), true), '2 years',       '548 days = 2 years');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 1}), true),   'a year',        '1 year = a year');
    assert.equal(start.from(moment([2007, 1, 28]).add({y: 5}), true),   '5 years',       '5 years = 5 years');
});

test('suffix', function (assert) {
    assert.equal(moment(30000).from(0), 'in a few seconds',  'prefix');
    assert.equal(moment(0).from(30000), 'a few seconds ago', 'suffix');
});

test('now from now', function (assert) {
    assert.equal(moment().fromNow(), 'a few seconds ago',  'now from now should display as in the past');
});

test('fromNow', function (assert) {
    assert.equal(moment().add({s: 30}).fromNow(), 'in a few seconds', 'in a few seconds');
    assert.equal(moment().add({d: 5}).fromNow(), 'in 5 days', 'in 5 days');
});

test('calendar day', function (assert) {
    var a = moment().hours(12).minutes(0).seconds(0);

    assert.equal(moment(a).calendar(),                   'Today at 12:00',      'today at the same time');
    assert.equal(moment(a).add({m: 25}).calendar(),      'Today at 12:25',      'Now plus 25 min');
    assert.equal(moment(a).add({h: 1}).calendar(),       'Today at 13:00',      'Now plus 1 hour');
    assert.equal(moment(a).add({d: 1}).calendar(),       'Tomorrow at 12:00',   'tomorrow at the same time');
    assert.equal(moment(a).subtract({h: 1}).calendar(),  'Today at 11:00',      'Now minus 1 hour');
    assert.equal(moment(a).subtract({d: 1}).calendar(),  'Yesterday at 12:00',  'yesterday at the same time');
});

test('calendar next week', function (assert) {
    var i, m;
    for (i = 2; i < 7; i++) {
        m = moment().add({d: i});
        assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('dddd [at] LT'),  'Today + ' + i + ' days end of day');
    }
});

test('calendar last week', function (assert) {
    var i, m;

    for (i = 2; i < 7; i++) {
        m = moment().subtract({d: i});
        assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days current time');
        m.hours(0).minutes(0).seconds(0).milliseconds(0);
        assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days beginning of day');
        m.hours(23).minutes(59).seconds(59).milliseconds(999);
        assert.equal(m.calendar(),       m.format('[Last] dddd [at] LT'),  'Today - ' + i + ' days end of day');
    }
});

test('calendar all else', function (assert) {
    var weeksAgo = moment().subtract({w: 1}),
        weeksFromNow = moment().add({w: 1});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '1 week ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 1 week');

    weeksAgo = moment().subtract({w: 2});
    weeksFromNow = moment().add({w: 2});

    assert.equal(weeksAgo.calendar(),       weeksAgo.format('L'),  '2 weeks ago');
    assert.equal(weeksFromNow.calendar(),   weeksFromNow.format('L'),  'in 2 weeks');
});

test('weeks year starting sunday formatted', function (assert) {
    assert.equal(moment([2012, 0,  1]).format('w ww wo'), '52 52 52nd', 'Jan  1 2012 should be week 52');
    assert.equal(moment([2012, 0,  2]).format('w ww wo'),   '1 01 1st', 'Jan  2 2012 should be week 1');
    assert.equal(moment([2012, 0,  8]).format('w ww wo'),   '1 01 1st', 'Jan  8 2012 should be week 1');
    assert.equal(moment([2012, 0,  9]).format('w ww wo'),   '2 02 2nd', 'Jan  9 2012 should be week 2');
    assert.equal(moment([2012, 0, 15]).format('w ww wo'),   '2 02 2nd', 'Jan 15 2012 should be week 2');
});
*/