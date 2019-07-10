<template>
    <div class="video-wrapper">
        <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ready="playerReadied"
        ></video-player>
    </div>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { setTimeout } from 'timers';

export default {
    components: {
        videoPlayer
    },
    props: {
      videoInfo: Object
    },
    data() {
        return {
            playerOptions: {
                // videojs options
                width: 375,
                height: 185,
                muted: false,
                language: "en",
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [
                    {
                        type: "video/ogg",
                        type:"video/webm",
                        type: "video/mp4",
                        src: this.videoInfo.videoPath
                    }
                ],
                poster: this.videoInfo.firstPicture,
            }
        };
    },
    mounted() {
      let width = window.innerWidth;
      let height = width*185/375;
      this.playerOptions.width = width;
      this.playerOptions.height = height;

      this.$nextTick(()  => { //兼容ios
          let video= this.$refs.videoPlayer;
          if(typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function"){
              WeixinJSBridge.invoke('getNetworkType', {}, function (res) {
                  //video.player.play();//这里使用的是基于video.js的vue-player插件
                  video.play();
              });
          }
      })

      setTimeout(() => { //兼容安卓
        this.$refs.videoPlayer.player.play();
      }, 0);
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        this.$refs.videoPlayer.player;
        
      },
      onPlayerPause(player) {

        // console.log('player pause!', player)
        
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        // you can use it to do something...
        // player.[methods]
      }
    }
};
</script>
<style lang="scss">
    .video-wrapper{
        width: 100%;
        height: 185px;
        .video-js .vjs-big-play-button{
            width: 50Px;
            height: 50Px;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    
</style>
