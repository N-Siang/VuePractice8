<script setup>
import MainNav from '@/components/MainNav.vue'

</script>

<template>
    <MainNav />
    <router-view />
</template>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
}

:root {
    --fc-border-color: #838383;
    --fc-button-text-color: #5a5a5a;
    --fc-button-bg-color: white;
    --fc-button-border-color: #5a5a5a;
    --fc-button-hover-bg-color: rgb(208, 208, 208);
    --fc-button-hover-border-color: #5a5a5a;
    --fc-button-active-bg-color: rgb(208, 208, 208);
    --fc-button-active-border-color: #5a5a5a;
    --fc-today-bg-color: rgb(212, 212, 212);
}

#calendar {
    max-width:600px;
    max-height: 560px;
    margin: auto;
}

.fc-event {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.fc .fc-toolbar.fc-header-toolbar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
    position: relative;
}

.fc-toolbar-chunk {
    display: flex;
}

.fc-myCustomButton-button {
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 800;
    position: absolute;
    top: 0%;
    left: 0%;
}
</style>
