<script>
export default{
  data() {
      return {
          millisecond: 0,
          second: 0,
          minute: 0,
          text: '開始',
          state: true,
          interval: null,
      }
  },
  methods: {
      start() {
          if (this.state) {
              this.text = '暫停';
              this.interval = setInterval(this.timer, 10);
              this.state = false;
          } else {
              this.text = '繼續';
              clearInterval(this.interval);
              this.state = true;
          }
      },
      timer() {
          this.millisecond++;
          if (this.millisecond > 99) {
              this.millisecond = 0;
              this.second++;
          }
          if (this.second > 59) {
              this.second = 0;
              this.minute++;
          }
          if (this.minute > 59) {
              this.clean();
          }
      },
      formatTime(value) {
          return value < 10 ? '0' + value : value;
      },
      clean() {
          clearInterval(this.interval);
          this.text = '開始';
          this.millisecond = 0;
          this.second = 0;
          this.minute = 0;
          this.state = true;
      }
  }

}

</script>
<template>
  <div id="app">
      <div class="container">
          <div class="time">
              {{ formatTime(minute) }} : {{ formatTime(second) }} : {{ formatTime(millisecond) }}
          </div>
          <div class="btn-group">
              <button class="start-btn" @click="start">{{ text }}</button>
              <button class="reset-btn" @click="clean">清除</button>
          </div>
      </div>
  </div>
  
</template>

<style scoped>

    #app {
        width:100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .container {
        background: #fff;
        padding: 30px 0 0;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        max-width:600px;
        background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
        color: white;
        box-shadow:0px 0px 4px 2px rgba(0, 0, 0, 0.529);
        text-align: center;
    }

    .time {
        font-size: 60px;
        font-weight: bold;
        margin:30px 30px 60px;
        color: rgb(255, 255, 255);
        text-shadow:-2px -2px #949393,-1px -2px #6f6f6f
    }

    .btn-group {
        display: flex;
        justify-content: space-around;
        gap: 0.8px;
    }

    button {
        width: 100%;
        font-size: 22px;
        font-weight: 600;
        padding: 10px 20px;
        border: none; 
        cursor: pointer;
        transition: 0.3s;
        background-color: #cccccc3c;
        color: rgba(255, 255, 255, 0.805);
        backdrop-filter: 3px;
    }

    .start-btn{
        border-bottom-left-radius: 14px;
    }

    .reset-btn {
        border-bottom-right-radius: 14px;
    }

    .start-btn:hover {
        background:rgba(69, 191, 163, 0.8);
    }


    .reset-btn:hover {
        background: rgb(237, 69, 69,0.8);
    }
  
  </style>