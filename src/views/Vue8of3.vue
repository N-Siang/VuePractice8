<script>
export default {

    data() {
        return {
            members: [],
            expenses: [],
            memberWindow: true,
            payWindow: true,
            memberName: "",
            feeName: "",
            cost: "",
            optionName: "",
            errorMember: true,
            errorFeeName: true,
            errorCost: true,
            errorOptionName: true,
        }
    },
    methods: {
        addMember() {
            this.errorMember = true;
            if (this.memberName) {
                this.members.push({ name: this.memberName, paid: 0 })
                this.memberWindow = true;
                this.error = true;
                this.memberName = "";
                this.saveLocalStorage();
            } else {
                this.errorMember = false;
            }
        },
        addExpense() {
            this.errorFeeName = true;
            this.errorCost = true;
            this.errorOptionName = true;

            if (!this.feeName) {
                this.errorFeeName = false;
            }
            if (!this.cost || this.cost <= 0) {
                this.errorCost = false;
            }
            if (!this.optionName) {
                this.errorOptionName = false;
            }
            if (this.optionName && this.feeName && this.cost > 0) {

                const payerData = {
                    optionName: this.optionName,
                    feeName: this.feeName,
                    cost: this.cost,
                };
                this.expenses.push(payerData);

                const payer = this.members.find(data => data.name === payerData.optionName);
                if (payer) {
                    payer.paid += Number(payerData.cost);
                };

                this.payWindow = true;
                this.optionName = "";
                this.feeName = "";
                this.cost = "";
                this.saveLocalStorage();
            }
        },
        calcExpense(item) {
            let sum = null;
            this.expenses.forEach(item => {
                sum += Number(item.cost)
            });

            return (Number(item.paid - (sum / this.members.length).toFixed(2)));
        },
        expensesDelete(index) {
            console.log(this.members);
            const calcDone = this.members.find(item => item.name === this.expenses[index].optionName);
            if (calcDone) {
                calcDone.paid = 0
            }

            this.expenses.splice(index, 1);
            this.saveLocalStorage();
        },
        cleanAll() {
            this.members = [];
            this.expenses = [];
            localStorage.removeItem('members');
            localStorage.removeItem('expenses');
        },
        saveLocalStorage() {
            localStorage.setItem('members', JSON.stringify(this.members));
            localStorage.setItem('expenses', JSON.stringify(this.expenses));
        },
    },

    mounted() {
        const saveMember = localStorage.getItem('members');
        const saveExpenses = localStorage.getItem('expenses');
        if (saveMember) {
            this.members = JSON.parse(saveMember);
        };
        if (saveExpenses) {
            this.expenses = JSON.parse(saveExpenses);
        };
    },



}


</script>

<template>
    <div id="app">
        <div class="container">
            <h2>分帳應用</h2>
            <div class="main-btn-block">
                <button @click="memberWindow = false">新增成員</button>
                <button @click="payWindow = false">新增支出款項</button>
                <button class="button-clean" @click="cleanAll">旅程結束</button>
            </div>

            <div class="member-list">
                <h3>分帳成員</h3>
                <div class="member-item" v-for="(item, index) in members" :key="index">
                    <span>{{ item.name }}</span>
                    <span class="balance" :class="(calcExpense(item) >= 0) ? 'positive' : 'negative'">
                        ${{ calcExpense(item).toLocaleString() }}
                    </span>
                </div>
            </div>

            <div class="expense-list">
                <h3>支出款項</h3>
                <div class="expense-item" v-for="(item, index) in expenses" :key="index">
                    <span>{{ item.feeName }} - {{ item.cost }}元 - {{ item.optionName }}</span>
                    <button @click="expensesDelete(index)"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>

        </div>


        <div class="modal" v-show="!memberWindow">
            <div class="modal-content">
                <h3>新增成員</h3>
                <input placeholder="成員姓名" v-model="memberName" />
                <span class="errorSpan" :style="{ opacity: errorMember ? '0' : '1' }">* 請輸入姓名</span>
                <div class="modal-btn-block">
                    <button @click="memberWindow = true">關閉</button>
                    <button @click="addMember">確認</button>
                </div>
            </div>
        </div>

        <div class="modal" v-show="!payWindow">
            <div class="modal-content">
                <h3>新增支出款項</h3>
                <input placeholder="款項名稱" v-model="feeName" />
                <span class="errorSpan" :style="{ opacity: errorFeeName ? '0' : '1' }">* 請輸入款項名稱</span>
                <input type="number" placeholder="款項金額" v-model="cost" />
                <span class="errorSpan" :style="{ opacity: errorCost ? '0' : '1' }">* 請輸入款項金額</span>
                <select v-model="optionName">
                    <option value="" disabled selected>請選擇姓名</option>
                    <option v-for="(item, index) in members" :key="index" :value="item.name">
                        {{ item.name }}
                    </option>
                </select>
                <span class="errorSpan" :style="{ opacity: errorOptionName ? '0' : '1' }">* 請選擇姓名</span>
                <div class="modal-btn-block">
                    <button @click="payWindow = true">關閉</button>
                    <button @click="addExpense">確認</button>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>

button {
    width: 100%;
    background-color: white;
    border: #696969 2px solid;
    color: #696969;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
}

button:hover {
    opacity: 0.8;
}

.container {
    max-width: 600px;
    margin: 40px auto;
    background-color: rgb(255, 255, 255);
    padding: 40px;
    border-radius: 8px;
    border: 2px solid #6969696d;
    color: #464646;
}

.main-btn-block {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.main-btn-block button {
    padding: 20px 10px;
}

.main-btn-block .button-clean {
    background: #696969;
    color: white;
    border: none;
}

.member-list,
.expense-list {
    margin-top: 20px;
}

.member-item,
.expense-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 2px dashed #6969696d;
}

.member-item span,
.expense-item span {
    font-size: 18px;
}

.member-item .balance {
    font-weight: bold;
}

.balance.negative {
    color: red;
}

.balance.positive {
    color: green;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal.active {
    display: flex;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
}

.modal-content input,
.modal-content select {
    width: 100%;
    padding: 10px;
    margin-bottom: 6px;
}

.modal-btn-block {
    display: flex;
    gap: 20px;
}

.modal-btn-block button {
    padding: 10px;
}


.errorSpan {
    font-size: 12px;
    color: red;
    min-height: 16px;
    display: block;
    margin-bottom: 12px;
}

.expense-item button {
    width: fit-content;
    border: none;
    background: none;
}

.expense-item button i {
    color: #1a3550;
    cursor: pointer;
    font-size: 18px;
}

.expense-item button i:hover {
    transform: scale(1.2);
    opacity: 0.8;
}

@media (max-width: 768px) {
    .container{
        border: none;
    }

    .main-btn-block {
        flex-wrap: wrap;
    }

    .main-btn-block button {
        width: calc(50% - 5px);
    }

    .main-btn-block .button-clean {
        width: 100%;
    }
}
</style>