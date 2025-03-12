<script>

export default {
    data() {
        return {
            listState: true,
        }
    },
    watch: {
        $route() {
            this.listState = true;
        }
    },

}


</script>

<template>
    <nav>
        <div class="ham-block">
            <label class="hamburger">
                <div class="ham-bar">
                <input type="checkbox" :checked="!listState"  @click="listState = !listState">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </label>
        </div>
        <div class="list-block" v-show="!listState">
            <div class="list">
                <button @click="listState = !listState">x</button>
                <router-link to="/">碼表應用程式</router-link>
                <router-link to="/Vue8of2">筆記應用程式</router-link>
                <router-link to="/Vue8of3">分帳應用程式</router-link>
                <router-link to="/Vue8of4">行事曆應用程式</router-link>
                <router-link to="/Vue8of5">體重追蹤應用程式</router-link>
                <router-link to="/Vue8of6">天氣查詢應用程式</router-link>
                <router-link to="/Vue8of7">國家資訊與地圖應用程式</router-link>
            </div>
        </div>
    </nav>
</template>

<style>
.ham-block {
    margin: 10px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
}

.hamburger {
    position: relative;
}
.ham-bar{
    padding: 12px;
    background-color: rgba(197, 197, 197, 0.71);
    border-radius: 12px;
    cursor: pointer;
}

.hamburger input {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
}

.bar {
    display: block;
    width: 30px;
    height: 3px;
    margin: 6px auto;
    border-radius: 40px;
    transition: all 0.3s cubic-bezier(0.37, -1.11, 0.79, 2.02);
    background-color: #404040;
}

.hamburger input:checked~.bar:nth-child(2) {
    transform: translateY(9.5px) rotate(45deg);
}

.hamburger input:checked~.bar:nth-child(3) {
    opacity: 0;
}

.hamburger input:checked~.bar:nth-child(4) {
    transform: translateY(-8px) rotate(-45deg);
}

nav a {
    color: black;
    margin: 8px 0;
    padding: 8px 0;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease-in-out;
}

nav a:hover {
    color: black;
    border-bottom: 2px solid black;
}

.router-link-active {
    background-color: white;
    color: black;
    border-radius: 4px;
}

.list-block {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.23);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    font-weight: 600;
}

.list {
    width: 300px;
    border: 2px solid black;
    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    z-index: 9;
    position: relative;
    box-shadow: 6px 8px;
}

.list button {
    width: 30px;
    height: 30px;
    font-size: 24px;
    padding: 0px;
    background: none;
    margin: 6px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
}

.list button:hover {
    background-color: black;
    color: white;
}

.list button:active {
    transform: scale(0.96);
}

@media (max-width: 768px) {
    .list {
        width: 100%;
        height: 100vh;
        border-radius: 0;
        padding-top: 100px;
        border: none;
    }

    .list button {
        display: none;
    }
}
</style>