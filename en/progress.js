!function(){var _r=['progress-fill','progress-pct','getElementById','textContent','style','width','now','floor','round','pow','random'];var _g=function(i){return _r[i];};
var _ta=new Date('2026-0'+(0x3+1)+'-'+(0x6+4)+'T00:00:00+09:00').getTime();
var _tb=new Date('2026-0'+(0x3+1)+'-'+(0xB+4)+'T'+(0x14+2)+':00:00+09:00').getTime();
var _pa=0xC,_pb=0x5A;
var _fe=document[_g(2)](_g(0)),_pe=document[_g(2)](_g(1));
var _cv=0;
function _calc(){var _n=Date[_g(6)]();if(_n<_ta)return _pa;if(_n>=_tb)return _pb;var _t=(_n-_ta)/(_tb-_ta),_e=_t<.5?2*_t*_t:1-Math[_g(9)](-2*_t+2,2)/2;return Math[_g(7)](_pa+_e*(_pb-_pa));}
function _draw(_v){var _w=Math[_g(8)](_v/_pb*100);_fe[_g(4)][_g(5)]=_w+'%';_pe[_g(3)]=_v+'%';}
function _anim(_to){if(_to<=_cv)return;var _id=setInterval(function(){_cv++;_draw(_cv);if(_cv>=_to)clearInterval(_id);},0x1E);}
_cv=0;_draw(0);
setTimeout(function(){_anim(_calc());},0x12C);
function _tick(){var _d=(2+Math[_g(10)]()*5)*6e4;setTimeout(function(){var _t=_calc();if(_cv<_t){_cv++;_draw(_cv);}_tick();},_d);}
_tick();}();
