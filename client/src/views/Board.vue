<template>
  <div class="board">
    Welcome to {{boardId.title}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id">
      <List :listId="list._id">{{list.title}}</List>
      <button @click="deleteList(list)">Delete List</button>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import Task from '@/components/Task.vue'

  export default {
    props: ["boardId"],
    name: "board",
    components: { List },
    mounted() {
      this.$store.dispatch("getTasks")
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });

      } else this.$store.dispatch('getLists', this.boardId)
    },
    data() {
      return {
        newList: {
          title: "",
          description: "",
          boardId: this.boardId
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
      deleteList(list) {
        this.$store.dispatch("deleteList", list);
      }
    }
  };
</script>

<style>
</style>