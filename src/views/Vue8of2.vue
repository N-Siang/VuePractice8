<script>
export default {
    data() {
        return {
            noteHistory: [],
            currentIndex: null,
            text: '',
            currentNoteTitle: '',
            sidebarState: true,
        }
    },
    mounted() {
        if (localStorage.getItem('noteHistory')) {
            this.noteHistory = JSON.parse(localStorage.getItem('noteHistory'));
        }
        if (this.noteHistory.length > 0) {
            this.currentIndex = 0;
            this.text = this.noteHistory[this.currentIndex].note;
            this.currentNoteTitle = this.noteHistory[this.currentIndex].title;
        }
    },
    methods: {
        newnote() {
            if (this.currentIndex !== null && this.noteHistory[this.currentIndex]) {
                this.noteHistory[this.currentIndex].note = this.text;
                this.noteHistory[this.currentIndex].title = this.currentNoteTitle;
            }
            this.noteHistory.push({ title: '', note: '' });
            this.currentIndex = this.noteHistory.length - 1;
            this.text = '';
            this.currentNoteTitle = '';
            this.saveLocalStorage();
        },
        renew() {
            if (this.currentIndex === null) {
                this.noteHistory.push({ title: '', note: '' });
                this.currentIndex = 0;
            }
            this.noteHistory[this.currentIndex].title = this.currentNoteTitle;
            this.noteHistory[this.currentIndex].note = this.text;
            this.saveLocalStorage();
        },
        open(index) {
            this.currentIndex = index;
            this.text = this.noteHistory[index]?.note || "";
            this.currentNoteTitle = this.noteHistory[index]?.title || "";
            this.sidebarState = !this.sidebarState;
        },
        clean(index) {
            this.noteHistory.splice(index, 1);
            if (this.noteHistory.length === 0) {
                this.currentIndex = null;
                this.text = '';
                this.currentNoteTitle = '';
            } else if (this.currentIndex >= this.noteHistory.length) {
                this.currentIndex = this.noteHistory.length - 1;
                this.text = this.noteHistory[this.currentIndex].note;
                this.currentNoteTitle = this.noteHistory[this.currentIndex].title;
            }
            this.saveLocalStorage();
        },
        toggleSidebar() {
            this.sidebarState = !this.sidebarState;
        },
        saveLocalStorage() {
            localStorage.setItem('noteHistory', JSON.stringify(this.noteHistory));
        }
    }
}
</script>

<template>
    <div id="app">
        <div class="container">
            <div class="sidebar" :style="{ left: this.sidebarState ? '-100%' : '0%' }">
                <div class="note-list">
                    <button @click="toggleSidebar" class="toggle-btn"><i class="fa-solid fa-arrow-left"></i></button>
                    <div v-for="(item, index) in noteHistory" :key="index" class="note-item"
                        :class="{ active: currentIndex === index }">
                        <span>{{ item.title || 'Untitled' }}</span>
                        <div class="list-btn-block">
                            <button @click="open(index)">Open</button>
                            <button @click="clean(index)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="editor">
                <div class="button-block">
                    <button @click="toggleSidebar"><i class="fa-solid fa-folder"></i>Archives</button>
                    <button @click="newnote"><i class="fa-solid fa-plus"></i>New Note</button>
                </div>
                <input v-model="currentNoteTitle" placeholder="Note Title" @input="renew" />
                <textarea v-model="text" placeholder="Your Text ..." @input="renew"></textarea>
            </div>
        </div>
    </div>

</template>


<style scoped>
#app {
    height: 100vh;
    background-color: #e0e0e083;
    font-family: Arial, sans-serif;
    padding: 80px 0;
}

button {
    color: rgb(88, 88, 88);
    border: 2px solid rgb(152, 152, 152);
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    color: orange;
    border: 2px solid orange;
}

.container {
    display: flex;
    max-width: 1400px;
    margin: 0px auto;
    padding-top: 20px;
}

.sidebar {
    width: 400px;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    overflow-y: auto;
    position: fixed;
    top: 0;
    transition: all 0.4s ease;
}


.note-list {
    margin-top: 20px;
    overflow-y: auto;
}


.note-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 2px solid #85858521;
    cursor: pointer;
}

.note-item.active {
    border-bottom: 2px solid rgba(255, 166, 0, 0.645);
    color: orange;
}

.note-list span {
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.toggle-btn {
    width: 40px;
    height: 40px;
    margin: 0 0 20px;
}

.sidebar button {
    font-size: 16px;
    padding: 5px 10px;
}

.list-btn-block button {
    margin-left: 8px;
}


.editor {
    flex: 1;
    padding: 20px;
}

.button-block {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.button-block button {
    font-size: 18px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    margin-bottom: 10px;
    border: none;
    box-shadow: 0 0 1px 1px rgba(87, 87, 87, 0.037);
    border-radius: 4px;
}

textarea {
    width: 100%;
    height: calc(100vh - 300px);
    padding: 10px;
    font-size: 20px;
    color: rgb(0, 0, 0);
    background-color: #ffffff;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 1px 1px rgba(87, 87, 87, 0.037);
    resize: none;

}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .sidebar {
        width: 100%;
        height: 100vh;
    }

    .note-list span {
        max-width: 100px;
    }

    .button-block {
        justify-content: center;
    }

    .button-block button {
        width: 100%;
    }
}
</style>