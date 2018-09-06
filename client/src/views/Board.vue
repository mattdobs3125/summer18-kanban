<template>
  <div class="board">
    Welcome to {{boardId}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id">
      <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
      <button @click="deleteList(list._id)">Delete List</button>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import Task from '@/components/Task.vue'

  export default {
    props: ["boardId"],

    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    data() {
      return {
        newList: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      lists() {
        return this.$store.state.lists;
      }
    },
    methods: {
      addList() {
        this.$store.dispatch("addList", this.newList);
        // this.newList = { title: "", description: "" };
      },
      deleteList(listId) {
        this.$store.dispatch("deleteList", listId);
      }
    }
  };
</script>

<style>
</style>