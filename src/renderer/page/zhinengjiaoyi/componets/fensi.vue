<template>
    <div class="code">
     这是粉丝页面
    </div>
</template>

<script>

export default {
  name: "guanzhu",
  data() {
    return {
      
    };
  },
  methods:{
      change(){
          var navs =document.getElementsByName('listnavs')
          var cts = document.getElementsByName('content')
          for(var i=0;i<navs.length;i++){
            navs[i].index=i
            navs[i].onclick =function(){

              for(var j =0;j<navs.length;j++){
                navs[j].className=""
                cts[j].className=''
              }
              this.className="current"
              cts[this.index].className='show'
            }
          }
      }
      // close(){
      //     var guanbi = document.getElementById('close')
      //     var banner = document.getElementsByClassName('banner')[0]
      //     var timer =null
      //     guanbi.onclick = function(){

      //         timer =setInterval(function(){
      //           banner.style.opacity -=0.1
      //           if(banner.style.opacity<0){
      //             banner.style.display = 'none'
      //             clearInterval(timer)
      //           }
      //         },100)
      //       }
      // }
  },
  mounted(){
    //this.close()
    this.change()
    
  }
};
</script>
<style lang="scss" scoped>

 

</style>