<script setup lang="ts">
import { computed } from 'vue';

type TSizeMode = 'small';

const props = defineProps<{
  color?: string
  size?: TSizeMode
}>();

const getClass = computed(() => {
  let c = ''
  if (props.size === 'small') c += 'small d-inblock ' 
  else if (props.size) c += 'small d-inblock'
  return c;
})

const getClassContainer = computed(() => {
  let c = ''
  if (props.size === 'small') c += 'min-loadc' 
  else if (props.size) c += 'min-loadc' 
  else { c += 'h-loadc' }
  return c
})

const getColor = computed(() => {
  return props.color || 'blue'
})

</script>

<template>
  <span :class="getClassContainer">
    <div class="windows8" :class="getClass" :style="{'--color': getColor}" :data-color="getColor">
      <div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div>
      <div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div>
      <div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div>
      <div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div>
      <div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div>
    </div>
  </span>
</template>

<style>
.h-loadc {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.min-loadc {
	position:relative;
}

.windows8:not(.small){position:relative;width:90px;height:90px;}

.window8small {
	display: inline-block;
	width: 50px;height:40px;
}

.loader{margin-left:auto;margin-right:auto;margin-top:15%;}
.loadertxt{margin-top:20px;text-align:center;color:white;}

.windows8 .wBall{position:absolute;width:86px;height:86px;opacity:0;-moz-transform:rotate(225deg);-moz-animation:orbit 4.95s infinite;-webkit-transform:rotate(225deg);-webkit-animation:orbit 4.95s infinite;-ms-transform:rotate(225deg);-ms-animation:orbit 4.95s infinite;-o-transform:rotate(225deg);-o-animation:orbit 4.95s infinite;transform:rotate(225deg);animation:orbit 4.95s infinite;}
.windows8[data-color] .wInnerBall{background: var(--color); position:absolute;width:11px;height:11px;left:0px;top:0px;-moz-border-radius:11px;-webkit-border-radius:11px;-ms-border-radius:11px;-o-border-radius:11px;border-radius:11px;}
.windows8 #wBall_1{-moz-animation-delay:1.08s;-webkit-animation-delay:1.08s;-ms-animation-delay:1.08s;-o-animation-delay:1.08s;animation-delay:1.08s;}
.windows8 #wBall_2{-moz-animation-delay:0.22s;-webkit-animation-delay:0.22s;-ms-animation-delay:0.22s;-o-animation-delay:0.22s;animation-delay:0.22s;}
.windows8 #wBall_3{-moz-animation-delay:0.43s;-webkit-animation-delay:0.43s;-ms-animation-delay:0.43s;-o-animation-delay:0.43s;animation-delay:0.43s;}
.windows8 #wBall_4{-moz-animation-delay:0.65s;-webkit-animation-delay:0.65s;-ms-animation-delay:0.65s;-o-animation-delay:0.65s;animation-delay:0.65s;}
.windows8 #wBall_5{-moz-animation-delay:0.86s;-webkit-animation-delay:0.86s;-ms-animation-delay:0.86s;-o-animation-delay:0.86s;animation-delay:0.86s;}
@-moz-keyframes orbit{0%{opacity:1;z-index:99;-moz-transform:rotate(180deg);-moz-animation-timing-function:ease-out;}
7%{opacity:1;-moz-transform:rotate(300deg);-moz-animation-timing-function:linear;-moz-origin:0%;}
30%{opacity:1;-moz-transform:rotate(410deg);-moz-animation-timing-function:ease-in-out;-moz-origin:7%;}
39%{opacity:1;-moz-transform:rotate(645deg);-moz-animation-timing-function:linear;-moz-origin:30%;}
70%{opacity:1;-moz-transform:rotate(770deg);-moz-animation-timing-function:ease-out;-moz-origin:39%;}
75%{opacity:1;-moz-transform:rotate(900deg);-moz-animation-timing-function:ease-out;-moz-origin:70%;}
76%{opacity:0;-moz-transform:rotate(900deg);}
100%{opacity:0;-moz-transform:rotate(900deg);}
}
@-webkit-keyframes orbit{0%{opacity:1;z-index:99;-webkit-transform:rotate(180deg);-webkit-animation-timing-function:ease-out;}
7%{opacity:1;-webkit-transform:rotate(300deg);-webkit-animation-timing-function:linear;-webkit-origin:0%;}
30%{opacity:1;-webkit-transform:rotate(410deg);-webkit-animation-timing-function:ease-in-out;-webkit-origin:7%;}
39%{opacity:1;-webkit-transform:rotate(645deg);-webkit-animation-timing-function:linear;-webkit-origin:30%;}
70%{opacity:1;-webkit-transform:rotate(770deg);-webkit-animation-timing-function:ease-out;-webkit-origin:39%;}
75%{opacity:1;-webkit-transform:rotate(900deg);-webkit-animation-timing-function:ease-out;-webkit-origin:70%;}
76%{opacity:0;-webkit-transform:rotate(900deg);}
100%{opacity:0;-webkit-transform:rotate(900deg);}
}
@-ms-keyframes orbit{0%{opacity:1;z-index:99;-ms-transform:rotate(180deg);-ms-animation-timing-function:ease-out;}
7%{opacity:1;-ms-transform:rotate(300deg);-ms-animation-timing-function:linear;-ms-origin:0%;}
30%{opacity:1;-ms-transform:rotate(410deg);-ms-animation-timing-function:ease-in-out;-ms-origin:7%;}
39%{opacity:1;-ms-transform:rotate(645deg);-ms-animation-timing-function:linear;-ms-origin:30%;}
70%{opacity:1;-ms-transform:rotate(770deg);-ms-animation-timing-function:ease-out;-ms-origin:39%;}
75%{opacity:1;-ms-transform:rotate(900deg);-ms-animation-timing-function:ease-out;-ms-origin:70%;}
76%{opacity:0;-ms-transform:rotate(900deg);}
100%{opacity:0;-ms-transform:rotate(900deg);}
}
@-o-keyframes orbit{0%{opacity:1;z-index:99;-o-transform:rotate(180deg);-o-animation-timing-function:ease-out;}
7%{opacity:1;-o-transform:rotate(300deg);-o-animation-timing-function:linear;-o-origin:0%;}
30%{opacity:1;-o-transform:rotate(410deg);-o-animation-timing-function:ease-in-out;-o-origin:7%;}
39%{opacity:1;-o-transform:rotate(645deg);-o-animation-timing-function:linear;-o-origin:30%;}
70%{opacity:1;-o-transform:rotate(770deg);-o-animation-timing-function:ease-out;-o-origin:39%;}
75%{opacity:1;-o-transform:rotate(900deg);-o-animation-timing-function:ease-out;-o-origin:70%;}
76%{opacity:0;-o-transform:rotate(900deg);}
100%{opacity:0;-o-transform:rotate(900deg);}
}
@keyframes orbit{0%{opacity:1;z-index:99;transform:rotate(180deg);animation-timing-function:ease-out;}
7%{opacity:1;transform:rotate(300deg);animation-timing-function:linear;origin:0%;}
30%{opacity:1;transform:rotate(410deg);animation-timing-function:ease-in-out;origin:7%;}
39%{opacity:1;transform:rotate(645deg);animation-timing-function:linear;origin:30%;}
70%{opacity:1;transform:rotate(770deg);animation-timing-function:ease-out;origin:39%;}
75%{opacity:1;transform:rotate(900deg);animation-timing-function:ease-out;origin:70%;}
76%{opacity:0;transform:rotate(900deg);}
100%{opacity:0;transform:rotate(900deg);}
}
.windows8.small{position:relative;width:25px;height:25px;display:inline-block;vertical-align:middle;}
.windows8.small .wBall{position:absolute;width:24px;height:24px;opacity:0;-moz-transform:rotate(225deg);-moz-animation:orbit 3.8499999999999996s infinite;-webkit-transform:rotate(225deg);-webkit-animation:orbit 3.8499999999999996s infinite;-o-transform:rotate(225deg);-o-animation:orbit 3.8499999999999996s infinite;-ms-transform:rotate(225deg);-ms-animation:orbit 3.8499999999999996s infinite;transform:rotate(225deg);animation:orbit 3.8499999999999996s infinite;}
.windows8.small .wBall .wInnerBall{position:absolute;width:4px;height:4px;left:0px;top:0px;-moz-border-radius:4px;-webkit-border-radius:4px;-o-border-radius:4px;-ms-border-radius:4px;border-radius:4px;}
.windows8.small #wBall_1{-moz-animation-delay:0.84s;-webkit-animation-delay:0.84s;-o-animation-delay:0.84s;-ms-animation-delay:0.84s;animation-delay:0.84s;}
.windows8.small #wBall_2{-moz-animation-delay:0.17s;-webkit-animation-delay:0.17s;-o-animation-delay:0.17s;-ms-animation-delay:0.17s;animation-delay:0.17s;}
.windows8.small #wBall_3{-moz-animation-delay:0.34s;-webkit-animation-delay:0.34s;-o-animation-delay:0.34s;-ms-animation-delay:0.34s;animation-delay:0.34s;}
.windows8.small #wBall_4{-moz-animation-delay:0.5s;-webkit-animation-delay:0.5s;-o-animation-delay:0.5s;-ms-animation-delay:0.5s;animation-delay:0.5s;}
.windows8.small #wBall_5{-moz-animation-delay:0.67s;-webkit-animation-delay:0.67s;-o-animation-delay:0.67s;-ms-animation-delay:0.67s;animation-delay:0.67s;}
@-moz-keyframes orbit{0%{opacity:1;z-index:99;-moz-transform:rotate(180deg);-moz-animation-timing-function:ease-out;}
7%{opacity:1;-moz-transform:rotate(300deg);-moz-animation-timing-function:linear;-moz-origin:0%;}
30%{opacity:1;-moz-transform:rotate(410deg);-moz-animation-timing-function:ease-in-out;-moz-origin:7%;}
39%{opacity:1;-moz-transform:rotate(645deg);-moz-animation-timing-function:linear;-moz-origin:30%;}
70%{opacity:1;-moz-transform:rotate(770deg);-moz-animation-timing-function:ease-out;-moz-origin:39%;}
75%{opacity:1;-moz-transform:rotate(900deg);-moz-animation-timing-function:ease-out;-moz-origin:70%;}
76%{opacity:0;-moz-transform:rotate(900deg);}
100%{opacity:0;-moz-transform:rotate(900deg);}
}
@-webkit-keyframes orbit{0%{opacity:1;z-index:99;-webkit-transform:rotate(180deg);-webkit-animation-timing-function:ease-out;}
7%{opacity:1;-webkit-transform:rotate(300deg);-webkit-animation-timing-function:linear;-webkit-origin:0%;}
30%{opacity:1;-webkit-transform:rotate(410deg);-webkit-animation-timing-function:ease-in-out;-webkit-origin:7%;}
39%{opacity:1;-webkit-transform:rotate(645deg);-webkit-animation-timing-function:linear;-webkit-origin:30%;}
70%{opacity:1;-webkit-transform:rotate(770deg);-webkit-animation-timing-function:ease-out;-webkit-origin:39%;}
75%{opacity:1;-webkit-transform:rotate(900deg);-webkit-animation-timing-function:ease-out;-webkit-origin:70%;}
76%{opacity:0;-webkit-transform:rotate(900deg);}
100%{opacity:0;-webkit-transform:rotate(900deg);}
}
@-o-keyframes orbit{0%{opacity:1;z-index:99;-o-transform:rotate(180deg);-o-animation-timing-function:ease-out;}
7%{opacity:1;-o-transform:rotate(300deg);-o-animation-timing-function:linear;-o-origin:0%;}
30%{opacity:1;-o-transform:rotate(410deg);-o-animation-timing-function:ease-in-out;-o-origin:7%;}
39%{opacity:1;-o-transform:rotate(645deg);-o-animation-timing-function:linear;-o-origin:30%;}
70%{opacity:1;-o-transform:rotate(770deg);-o-animation-timing-function:ease-out;-o-origin:39%;}
75%{opacity:1;-o-transform:rotate(900deg);-o-animation-timing-function:ease-out;-o-origin:70%;}
76%{opacity:0;-o-transform:rotate(900deg);}
100%{opacity:0;-o-transform:rotate(900deg);}
}
@-ms-keyframes orbit{0%{opacity:1;z-index:99;-ms-transform:rotate(180deg);-ms-animation-timing-function:ease-out;}
7%{opacity:1;-ms-transform:rotate(300deg);-ms-animation-timing-function:linear;-ms-origin:0%;}
30%{opacity:1;-ms-transform:rotate(410deg);-ms-animation-timing-function:ease-in-out;-ms-origin:7%;}
39%{opacity:1;-ms-transform:rotate(645deg);-ms-animation-timing-function:linear;-ms-origin:30%;}
70%{opacity:1;-ms-transform:rotate(770deg);-ms-animation-timing-function:ease-out;-ms-origin:39%;}
75%{opacity:1;-ms-transform:rotate(900deg);-ms-animation-timing-function:ease-out;-ms-origin:70%;}
76%{opacity:0;-ms-transform:rotate(900deg);}
100%{opacity:0;-ms-transform:rotate(900deg);}
}
@keyframes orbit{0%{opacity:1;z-index:99;transform:rotate(180deg);animation-timing-function:ease-out;}
7%{opacity:1;transform:rotate(300deg);animation-timing-function:linear;origin:0%;}
30%{opacity:1;transform:rotate(410deg);animation-timing-function:ease-in-out;origin:7%;}
39%{opacity:1;transform:rotate(645deg);animation-timing-function:linear;origin:30%;}
70%{opacity:1;transform:rotate(770deg);animation-timing-function:ease-out;origin:39%;}
75%{opacity:1;transform:rotate(900deg);animation-timing-function:ease-out;origin:70%;}
76%{opacity:0;transform:rotate(900deg);}
100%{opacity:0;transform:rotate(900deg);}
}
</style>
