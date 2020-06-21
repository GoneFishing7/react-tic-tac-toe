(this["webpackJsonpreact-tic-tac-toe"]=this["webpackJsonpreact-tic-tac-toe"]||[]).push([[0],{11:function(t,e,n){t.exports=n(17)},16:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),s=n(10),o=n.n(s),i=n(1),l=n(2),u=n(4),c=n(3),p=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var r;Object(i.a)(this,n),(r=e.call(this,t)).state={toType:t.content,typed:""};for(var a=100,s=0;s<r.state.toType.length;s++){var o=200*Math.random();setTimeout((function(){r.setState((function(t){return{toType:t.toType.slice(1,t.toType.length),typed:t.typed+t.toType.slice(0,1)}}))}),a+o),a+=o}return r}return Object(l.a)(n,[{key:"render",value:function(){return a.a.createElement("h1",{className:"fake-typed-header"},">",this.state.typed,a.a.createElement("span",{className:"blinking unselectable"},"_"))}}]),n}(a.a.Component),h=n(5),d=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return a.a.createElement("td",{onClick:this.props.clickHandler,className:"cell"+(this.props.isMidVert?" middle-vert":"")},this.props.symbol)}}]),n}(a.a.Component),f=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"renderSquare",value:function(t,e){var n=this,r=this.props.squares[t][e];return a.a.createElement(d,{symbol:r,clickHandler:function(){n.props.handleClick(t,e)},isMidVert:1===e,key:e+", "+t})}},{key:"render",value:function(){var t=this;return a.a.createElement("table",{className:"board"},a.a.createElement("tbody",null,this.props.squares.map((function(e,n){return a.a.createElement("tr",{key:n,className:1===n?"middle-row":""},e.map((function(e,r){return t.renderSquare(n,r)})))}))))}}]),n}(a.a.Component),m=n(7),b=function(){function t(){Object(i.a)(this,t)}return Object(l.a)(t,null,[{key:"evaluateSquares",value:function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n++){var a,s=r[n],o=e[s],i=Object(m.a)(t);try{for(i.s();!(a=i.n()).done;){var l=a.value;if(l[0]===o&&l[1]===o&&l[2]===o)return s}}catch(c){i.e(c)}finally{i.f()}for(var u=0;u<t.length;u++)if(t[0][u]===o&&t[1][u]===o&&t[2][u]===o)return s;if(t[0][0]===o&&t[1][1]===o&&t[2][2]===o)return s;if(t[0][2]===o&&t[1][1]===o&&t[2][0]===o)return s}return null}},{key:"getBlankSquares",value:function(t){for(var e=[],n=0;n<t.length;n++)for(var r=0;r<t[n].length;r++)t[n][r]||e.push({row:n,cell:r});return e}},{key:"randFromArr",value:function(t){return t[Math.floor(Math.random()*t.length)]}},{key:"copyWithMove",value:function(t,e,n){for(var r=[],a=0;a<t.length;a++)r.push(t[a].slice());return e&&n&&(r[n.row][n.cell]=e),r}},{key:"boardToString",value:function(t){for(var e="\n    1   2   3\n  -------------\n",n=0;n<t.length;n++){e+=n+1+" |";for(var r=0;r<t[n].length;r++)e+=" "+(t[n][r]?t[n][r]:" ")+" |";e+="\n  -------------\n"}return e}}]),t}(),v=function(){function t(){Object(i.a)(this,t)}return Object(l.a)(t,null,[{key:"findRandomMove",value:function(t){var e=b.getBlankSquares(t);return b.randFromArr(e)}}]),t}();v.getMove=function(t,e,n){return b.getBlankSquares(t).length?("med"===e?function(t,e){return v.findBestMove(t,e,2)}:"imp"===e?v.findBestMove:v.findRandomMove)(t,n):{row:-1,cell:-1}},v.getEmotion=function(t,e,n,r){var a=b.evaluateSquares(t,r);if(a)return"ply1"===a?"(\u256f\xb0\u25a1\xb0\uff09\u256f\ufe35 \u253b\u2501\u253b":"(\u273f\u25e0\u203f\u25e0)";if(0===b.getBlankSquares(t).length)return"\u1555( \u141b )\u1557";if("imp"===e){var s=v.evaluateSquaresMinimax(t,"ply1"===n?-1:1,r);return 1===s?"(\u0ca0.\u0ca0)":0===s?"(\u2299\u02cd\u2299)":"\u2570(*\xb0\u25bd\xb0*)\u256f"}if("med"===e){var o=v.evaluateSquaresMinimax(t,"ply1"===n?-1:1,r,2);return 1===o?"(\u3063 \xb0\u0414 \xb0;)\u3063":0===o?"\u250c\u0f3c \u03c3 \u2038 \u03c3 \u0f3d\u2510":"\uff08\uff3e\u2200\uff3e\u25cf\uff09\uff89\uff7c"}return"esy"===e?"\u0f3c \u3064 \u25d5_\u25d5 \u0f3d\u3064":"w(\uff9f\u0414\uff9f)w"},v.findBestMove=function(t,e){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1/0,a=b.getBlankSquares(t),s=[],o=-2,i=Object(m.a)(a);try{for(i.s();!(n=i.n()).done;){var l=n.value,u=b.copyWithMove(t,e.ply2,l),c=-v.evaluateSquaresMinimax(u,-1,e,r);c>o?(o=c,s=[l]):c===o&&s.push(l)}}catch(h){i.e(h)}finally{i.f()}var p=b.randFromArr(s);return p},v.evaluateSquaresMinimax=function(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1/0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;if(a>=r)return-2;var s=b.evaluateSquares(t,n);if(s)return("ply1"===s?-1:1)*e;var o,i=1===e?"ply2":"ply1",l=b.getBlankSquares(t),u=-2,c=Object(m.a)(l);try{for(c.s();!(o=c.n()).done;){var p=o.value,h=b.copyWithMove(t,n[i],p),d=-v.evaluateSquaresMinimax(h,-e,n,r,a+1);null!==d&&(d>u&&(u=d))}}catch(f){c.e(f)}finally{c.f()}return 0===l.length?0:u};var y=v,g=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var t=["button"];return this.props.color?t.push("button-"+this.props.color):t.push("button-gray"),this.props.largeButton&&t.push("button-large"),this.props.roundedLeft&&t.push("button-rounded-left"),this.props.roundedRight&&t.push("button-rounded-right"),this.props.roundedNone&&t.push("button-rounded-none"),this.props.staticOnHover&&t.push("button-static"),this.props.position&&t.push(this.props.position),a.a.createElement("button",{onClick:this.props.handleClick,className:t.join(" ")},this.props.children)}}]),n}(a.a.Component),O=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(i.a)(this,n),(r=e.call(this,t)).AiTurnCheck=function(){if(!r.state.isFinished){var t=b.evaluateSquares(r.state.squares,r.state.symbols);if(t)return void r.setState({isFinished:!0,winner:t});if(0===b.getBlankSquares(r.state.squares).length)return void r.setState({isFinished:!0,winner:"Draw"});r.makeAiMove()}},r.updateAiEmotion=function(){if("hum"!==r.props.settings.playerTwoMode){var t=y.getEmotion(r.state.squares,r.props.settings.playerTwoMode,r.state.isP1sTurn?"ply1":"ply2",r.state.symbols);r.state.AiEmotion!==t&&r.setState({AiEmotion:t})}},r.makeAiMove=function(){r.state.isP1sTurn||"hum"===r.props.settings.playerTwoMode||r.setState((function(t){var e=y.getMove(r.state.squares,r.props.settings.playerTwoMode,r.state.symbols),n=b.copyWithMove(r.state.squares,r.state.symbols.ply2,e);return Object(h.a)(Object(h.a)({},t),{},{squares:n,isP1sTurn:!0})}))},r.reset=function(){r.setState({AiEmotion:null,isFinished:!1,isP1sTurn:"rnd"===r.props.settings.whoIsMovingFirst?Math.random()>=.5:"ply1"===r.props.settings.whoIsMovingFirst,squares:Array(3).fill(Array(3).fill(null)),symbols:{ply1:"ply1"===r.props.settings.whoIsO?"O":"X",ply2:"ply1"===r.props.settings.whoIsO?"X":"O"},winner:null})},r.handleClick=function(t,e){if(!r.state.isFinished&&!r.state.squares[t][e]&&(r.state.isP1sTurn||"hum"===r.props.settings.playerTwoMode)){var n=b.copyWithMove(r.state.squares);n[t][e]=r.state.symbols[r.state.isP1sTurn?"ply1":"ply2"],r.setState({squares:n,isP1sTurn:!r.state.isP1sTurn})}},r.state={isP1sTurn:"rnd"===t.settings.whoIsMovingFirst?Math.random()>=.5:"ply1"===t.settings.whoIsMovingFirst,symbols:{ply1:"ply1"===t.settings.whoIsO?"O":"X",ply2:"ply1"===t.settings.whoIsO?"X":"O"},isFinished:!1,squares:Array(3).fill(Array(3).fill(null)),winner:null,AiEmotion:null},r}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return a.a.createElement("div",null,a.a.createElement("h2",null,"Draw"===this.state.winner?"Draw!":this.state.winner?"".concat(this.state.winner," wins!"):""),a.a.createElement(f,{squares:this.state.squares,handleClick:this.handleClick}),a.a.createElement("p",null,"Current turn:"," ",this.state.isP1sTurn?"Player 1":"Player 2"," (",this.state.symbols[this.state.isP1sTurn?"ply1":"ply2"],")"),a.a.createElement(g,{color:"orange",handleClick:function(){t.reset()}},"Reset Board"),"hum"!==this.props.settings.playerTwoMode?a.a.createElement("p",null,"AI: ",this.state.AiEmotion||"\u311f( \u2594, \u2594 )\u310f"):"")}},{key:"componentDidMount",value:function(){this.AiTurnCheck(),this.updateAiEmotion()}},{key:"componentDidUpdate",value:function(){this.AiTurnCheck(),this.updateAiEmotion()}}]),n}(a.a.Component),S=n(6),k=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(){return Object(i.a)(this,n),e.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return a.a.createElement("div",{className:"button-group"},a.a.createElement("label",{htmlFor:this.props.id},this.props.label),a.a.createElement("div",{id:this.props.id},this.props.children))}}]),n}(a.a.Component),j=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(i.a)(this,n),(r=e.call(this,t)).DEFAULT_SETTINGS={},r.selectDefaultSettings=function(){r.setState((function(t){var e=Object(h.a)({},t);return Object.entries(r.DEFAULT_SETTINGS).forEach((function(t){var n=Object(S.a)(t,2),r=n[0],a=n[1];void 0!==e.buttonGroups[r]?e.buttonGroups[r].buttons[a].isSelected=!0:console.log("Error")})),Object.keys(t.buttonGroups).forEach((function(t){e.buttonGroups[t].buttons[r.DEFAULT_SETTINGS[t]||Object.keys(e.buttonGroups[t].buttons)[0]].isSelected=!0})),e}))},r.submit=function(){var t={};Object.entries(r.state.buttonGroups).forEach((function(e){var n=Object(S.a)(e,2),r=n[0],a=n[1],s=Object.keys(a.buttons).find((function(t){return a.buttons[t].isSelected}));t[r||"Error"]=s})),r.props.submitWithSettings(t)},r.getButtonGroups=function(){return a.a.createElement("div",{className:"button-groups"},Object.entries(r.state.buttonGroups).map((function(t,e){var n=Object(S.a)(t,2),s=n[0],o=n[1];return a.a.createElement(k,{id:s,label:o.labelText,key:e},Object.entries(o.buttons).map((function(t,e){var n=Object(S.a)(t,2),o=n[0],i=n[1];return a.a.createElement(g,{handleClick:function(){r.logSelect(s,o)},color:i.isSelected?"filled-purple":"gray",key:e,staticOnHover:i.isSelected},i.text)})))})))},r.logSelect=function(t,e){r.setState((function(n){var r=Object(h.a)({},n);return Object.entries(r.buttonGroups[t].buttons).forEach((function(t){var e=Object(S.a)(t,2);e[0];e[1].isSelected=!1})),r.buttonGroups[t].buttons[e].isSelected=!0,r}))},r.state={buttonGroups:{whoIsO:{labelText:"Who is O?",buttons:{ply1:{isSelected:!1,text:"Player 1"},ply2:{isSelected:!1,text:"Player 2"}}},whoIsMovingFirst:{labelText:"Who is moving first?",buttons:{rnd:{isSelected:!1,text:"Random"},ply1:{isSelected:!1,text:"Player 1"},ply2:{isSelected:!1,text:"Player 2"}}},playerTwoMode:{labelText:"Player Two is:",buttons:{esy:{isSelected:!1,text:"Easy Computer"},med:{isSelected:!1,text:"Medium Computer"},imp:{isSelected:!1,text:"Impossible Computer"},hum:{isSelected:!1,text:"Human"}}}}},r}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.selectDefaultSettings()}},{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"settings"},a.a.createElement("h2",null,"Settings"),this.getButtonGroups(),a.a.createElement(g,{handleClick:function(){t.submit()},color:"filled-green",largeButton:!0},"Play!"))}}]),n}(a.a.Component),E=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(i.a)(this,n),(r=e.call(this,t)).toggleDarkMode=function(){console.log("Toggling dark mode"),r.setState((function(t){return{colorMode:"light"===t.colorMode?"dark":"light"}}))},r.submitWithOptions=function(t){r.setState({showSettings:!1,showGame:!0,settings:t})},r.state={showSettings:!0,showGame:!1,settings:{whoIsO:null,whoIsMovingFirst:null,playerTwoMode:null},colorMode:"light"},r}return Object(l.a)(n,[{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"window ".concat(this.state.colorMode)},a.a.createElement(p,{content:"tic tac toe"}),a.a.createElement("hr",{className:"divider"}),this.state.showSettings&&a.a.createElement(j,{submitWithSettings:this.submitWithOptions}),this.state.showGame&&a.a.createElement(O,{settings:this.state.settings}),a.a.createElement(g,{color:"light"===this.state.colorMode?"filled-dark":"filled-light",handleClick:function(){t.toggleDarkMode()},position:"br"},"Dark Mode!"," ",a.a.createElement("span",{role:"img","aria-label":"emoji"},"\ud83d\ude0e")))}}]),n}(a.a.Component);n(16);o.a.render(a.a.createElement(E,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.b9fbd869.chunk.js.map