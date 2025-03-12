<script>
export default {
    data() {
                return {
                    modal: true,
                    activeName: '',
                    datas: [],
                    calendar: null,
                    NameState: true,
                    ActivityState: true,
                }
            },
            methods: {
                modalState() {
                    this.modal = !this.modal
                },
                getValue() {
                    let time = this.$refs.datetimepicker;
                    if (!this.activeName.trim()) {
                        this.NameState = false;
                    };
                    if (!time.value) {
                        this.ActivityState = false;
                    };
                    if (this.activeName.trim() && time.value) {
                        let dateData = {
                            id: Date.now().toString(),
                            title: this.activeName.trim(),
                            start: time.value.replaceAll('/', '-'),
                        };
                        this.datas.push(dateData);
                        this.calendar.addEvent(dateData);
                        this.modal = true;
                        time.value = '';
                        this.activeName = '';
                        this.NameState = true;
                        this.ActivityState = true;
                    }

                },
                deleteData(date) {
                    console.log(date);
                    
                    console.log(date.event.id);
                    
                    if (confirm('是否刪除此筆活動？')) {
                        this.datas = this.datas.filter((data) => data.id !== date.event.id);
                        date.event.remove();
                    }
                },
                savelocalStorage() {
                    localStorage.setItem('datas', JSON.stringify(this.datas))
                }
            },
            watch: {
                datas: {
                    handler() {
                        this.savelocalStorage();
                    },
                    deep: true
                }

            }
            ,
            mounted() {
                if (localStorage.getItem('datas')) {
                    this.datas = JSON.parse(localStorage.getItem('datas'));
                };

                this.$nextTick(() => {
                    $(this.$refs.datetimepicker).datetimepicker();
                });

                var calendarEl = this.$refs.calendarLoaded;
                this.calendar = new FullCalendar.Calendar(calendarEl, {
                    editable: true,
                    contentHeight: 560,
                    events: this.datas,
                    initialView: 'dayGridMonth',
                    customButtons: {
                        myCustomButton: {
                            text: '+',
                            click: this.modalState,
                        }
                    },
                    headerToolbar: {
                        left: 'title',
                        center: 'myCustomButton',
                        right: 'prev,next today'
                    },
                    eventClick: this.deleteData,
                    dayMaxEventRows: true,
                    views: {
                        timeGrid: {
                            dayMaxEventRows:0,
                        }
                    },
                    eventTimeFormat: {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }
                });
                this.calendar.render();
            },
}


</script>

<template>
<div id="app">
        <div class="container">
            <div id="calendar" ref="calendarLoaded">
            </div>
            <div class="modal" v-show="!modal">
                <!-- <div class="modal"> -->
                <div class="modal-content">
                    <div class="input-block">
                        <label for="ActivityName">Activity Name</label>
                        <input type="text" name="" id="ActivityName" v-model="activeName">
                        <span :style="{opacity:!NameState?'1':'0'}">*Please enter activity name</span>
                    </div>
                    <div class="input-block">
                        <label for="datetimepicker">Activity Date</label>
                        <input id="datetimepicker" type="text" ref="datetimepicker">
                        <span :style="{opacity:!ActivityState?'1':'0'}">*Please enter activity date</span>
                    </div>
                    <div class="button-block">
                        <button @click="modal=true">close</button>
                        <button @click="getValue">add</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
        #app {
            padding: 60px 20px;
        }

        .container {
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
        }

        .modal {
            width: 100%;
            height: 100vh;
            background-color: #a0a0a051;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
        }

        .modal-content {
            width: 300px;
            padding:40px 20px 20px;
            background-color: rgb(255, 255, 255);
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-radius: 10px;
            border: 2px solid var(--fc-border-color);
        }

        .modal-content .input-block {
            display: flex;
            gap: 10px;
            flex-direction: column;
            font-size: 16px;
        }

        .input-block label {
           font-weight: 600;
        }

        .input-block input {
            height: 30px;
            padding: 6px;
        }

        .input-block span {
            color: red;
            font-size: 14px;
        }

        .button-block {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 10px;
        }

        .button-block button {
            width: 100%;
            font-size: 16px;
            padding: 8px;
            cursor: pointer;
            border-radius: 4px;
            border: 1px solid var(--fc-border-color);
            background: var(--fc-button-bg-color);
        }

        .button-block button:hover {
            background: var(--fc-button-hover-bg-color);
        }
</style>