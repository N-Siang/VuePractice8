<script>
export default {

    chart: null,
    data() {
        return {
            weight: '',
            date: '',
            weightDatas: [],
            dateDatas: [],
            allDatas: [],
            modalState: true,
            weightState: true,
            dateState: true,
        }
    },
    methods: {
        getValue() {
            if (!this.weight) {
                this.weightState = false;
            }
            if (!this.date) {
                this.dateState = false;
            }

            if (this.weight && this.date) {
                this.allDatas.push({
                    weight: this.weight,
                    date: this.date
                });

                this.allDatas.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date)
                })
                this.weightDatas = this.allDatas.map(x => x.weight);
                this.dateDatas = this.allDatas.map(x => x.date);

                this.weight = "";
                this.date = "";
                this.weightState = true;
                this.dateState = true;
                this.modalState = true;
                this.chart.data.labels = JSON.parse(JSON.stringify(this.dateDatas));
                this.chart.data.datasets[0].data = JSON.parse(JSON.stringify(this.weightDatas));
                this.chart.update();
            }
        },
        deleteData(index) {
            this.weightDatas.splice(index, 1);
            this.dateDatas.splice(index, 1);
            this.allDatas.splice(index, 1);
        },
        savelocalStorage() {
            localStorage.setItem('weightDatas', JSON.stringify(this.weightDatas));
            localStorage.setItem('dateDatas', JSON.stringify(this.dateDatas));
            localStorage.setItem('allDatas', JSON.stringify(this.allDatas));
        }
    },
    watch: {
        weightDatas: {
            handler() {
                this.savelocalStorage();
            },
            deep: true
        },
        dateDatas: {
            handler() {
                this.savelocalStorage();
            },
            deep: true
        },
        allDatas: {
            handler() {
                this.savelocalStorage();
            },
            deep: true
        },

    }
    ,
    mounted() {
        if (localStorage.getItem('weightDatas')) {
            this.weightDatas = JSON.parse(localStorage.getItem('weightDatas'));
        };
        if (localStorage.getItem('dateDatas')) {
            this.dateDatas = JSON.parse(localStorage.getItem('dateDatas'));
        };
        if (localStorage.getItem('allDatas')) {
            this.allDatas = JSON.parse(localStorage.getItem('allDatas'));
        };

        this.chart = new Chart(this.$refs.myChart, {
            type: 'line',
            data: {
                labels: JSON.parse(JSON.stringify(this.dateDatas)),
                datasets: [{
                    label: 'weight',
                    data: JSON.parse(JSON.stringify(this.weightDatas)),
                    borderWidth: 2,
                    backgroundColor: 'orange',
                    borderColor: 'rgba(255, 166, 0, 0.6)',
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Weight Tracking',
                        font: {
                            size: 22
                        },
                    }
                }
            },
        })
    }
}

</script>

<template>
    <div id="app">
        <div class="container">

            <div class="chart-block">
                <button @click="modalState = false">+</button>
                <canvas id="myChart" ref="myChart"></canvas>
            </div>

            <div class="modal" v-show="!modalState">
                <div class="modal-content">
                    <div class="input-block">
                        <label for="weightInput">Weight</label>
                        <input type="number" name="" id="weightInput" v-model="weight" min="0">
                        <span :style="{ opacity: !weightState ? '1' : '0' }">*Please enter weight</span>
                    </div>
                    <div class="input-block">
                        <label for="dateInput">Date</label>
                        <input type="date" name="" id="dateInput" v-model="date">
                        <span :style="{ opacity: !dateState ? '1' : '0' }">*Please enter date</span>
                    </div>
                    <div class="button-block">
                        <button @click="modalState = true">close</button>
                        <button @click="getValue">Submit</button>
                    </div>
                </div>

            </div>

            <div class="data-block">
                <div class="titleList">Tracking Record</div>
                <div class="dataList" v-for="(item, index) in allDatas" :key="index">
                    <div>{{ item.date }} - {{ item.weight }}kg</div>
                    <button @click="deleteData(index)">Delete</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>


button {
    color: white;
    background-color: orange;
    font-weight: 600;
    border: 2px solid rgb(255, 255, 255);
    box-shadow: 0 0 0px 2px orange;
    cursor: pointer;
    transition: box-shadow 0.2s linear, opacity 0.2s linear;
}

button:hover {
    box-shadow: 0 0 0px 4px orange;
    opacity: 0.8;
}

button:active {
    transform: scale(0.90);
}

.container {
    max-width: 560px;
    margin:80px auto 0;
    padding: 0 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.chart-block {
    position: relative;
}

.chart-block button {
    width: 36px;
    height: 36px;
    font-size: 24px;
    border-radius: 10px;

    position: absolute;
    top: 0;
    left: 0;
}

#myChart {
    height: 260px;
}

.modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: #00000048;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(78, 78, 78);
}

.modal-content {
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 20px;
    padding: 30px;

}

.modal-content .input-block {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.modal-content .input-block input {
    height: 30px;
    padding: 6px;
}

.modal-content .input-block span {
    font-size: 14px;
    color: red;
}

.modal-content .button-block {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 10px;
}

.modal-content .button-block button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
}

.data-block {
    width: 100%;
    height: 300px;
    margin-top: 20px;
    border: 2px solid rgba(143, 143, 143, 0.345);
    overflow-y: auto;
    border-radius: 10px;
    padding: 0 40px;
}

.data-block .dataList {
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    padding: 0 4px 10px;
    border-bottom: 1px solid rgba(122, 122, 122, 0.6);
}

.data-block .titleList {
    margin: auto;
    text-align: center;
    padding: 8px 0;
    font-size: 22px;
    font-weight: 600;
    color: rgb(102, 102, 102);
    border-bottom: 2px solid rgba(102, 102, 102, 0.559);
}

.dataList button {
    border-radius: 4px;
}
</style>