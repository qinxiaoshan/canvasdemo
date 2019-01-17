<template>
  <div class="drawname">
    <el-row class="buttongroup">
        <el-button type="primary" @click="clear" size="medium">清除</el-button>
        <el-button type="warning" @click="save" size="medium">保存</el-button>
    </el-row>
    <canvas id="canvas" height="240px" ref="mycanvas" class="mycanvas">Canvas画板</canvas>
    <img v-bind:src="url" alt="">
  </div>
</template>

<script>
  var draw;
  var preHandler = function(e){e.preventDefault();}
  class Draw {
      constructor(el) {
          this.el = el
          this.canvas = document.getElementById(this.el)
          this.cxt = this.canvas.getContext('2d')
          this.stage_info = canvas.getBoundingClientRect()
          this.path = {
              beginX: 0,
              beginY: 0,
              endX: 0,
              endY: 0
          }
      }
      init(btn) {
          var that = this; 
          
          this.canvas.addEventListener('touchstart', function(event) {
              document.addEventListener('touchstart', preHandler, false); 
              that.drawBegin(event)
          })
          this.canvas.addEventListener('touchend', function(event) { 
              document.addEventListener('touchend', preHandler, false); 
              that.drawEnd()
              
          })
          this.clear(btn)
      }
      drawBegin(e) {
          var that = this;
          window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
          this.cxt.strokeStyle = "#000"
          this.cxt.beginPath()
          this.cxt.moveTo(
              e.changedTouches[0].clientX - this.stage_info.left,
              e.changedTouches[0].clientY - this.stage_info.top
          )
          this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left
          this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top
          canvas.addEventListener("touchmove",function(){
              that.drawing(event)
          })
      }
      drawing(e) {
          this.cxt.lineTo(
              e.changedTouches[0].clientX - this.stage_info.left,
              e.changedTouches[0].clientY - this.stage_info.top
          )
          this.path.endX = e.changedTouches[0].clientX - this.stage_info.left
          this.path.endY = e.changedTouches[0].clientY - this.stage_info.top
          this.cxt.stroke()
      }
      drawEnd() {
          document.removeEventListener('touchstart', preHandler, false); 
          document.removeEventListener('touchend', preHandler, false);
          document.removeEventListener('touchmove', preHandler, false);
          //canvas.ontouchmove = canvas.ontouchend = null
      }
      clear(btn) {
          this.cxt.clearRect(0, 0, 300, 600)
      }
      save(){
         return canvas.toDataURL("image/png")
      }
  }

  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        val:true,
        url:""
      }
    },
    mounted() {
        draw=new Draw('canvas');
        draw.init();
    },
    methods:{
      clear:function(){
          draw.clear();
      },
      save:function(){
          var data=draw.save();
          this.url = data;
          console.log(data)
      },
      mutate(word) {
        this.$emit("input", word);
      },
      canvassize:function(){
        var wW,wH;

      }
    }
  } 
</script>

<style lang="scss" scoped>
  #canvas { width: 100%; background: #eee; cursor: default; }
  #keyword-box { margin: 10px 0; }
  .buttongroup{ padding: 10px; text-align: center; }
</style>
