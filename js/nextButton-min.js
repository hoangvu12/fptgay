var Button=videojs.getComponent("Button"),MyButton=videojs.extend(Button,{constructor:function(){Button.apply(this,arguments),this.addClass("vjs-icon-next-item")},handleClick:function(){episode=parseInt(episode)+1,loadPlayer()}});videojs.registerComponent("nextEpisode",MyButton);