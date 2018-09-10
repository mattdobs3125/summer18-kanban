<template>
  <div class="list">
    <h2>{{lists}}</h2>
    
    <form @submit.prevent="addTask">
      <input type="text" required v-model="taskTitle">
      <button type='submit'>Add Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id">
      <task v-bind:taskData="task" />
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task";

  export default {
    name: "List",
    data() {
      return {
        taskTitle: ""
      };
    },
    props: ["listId"],
    computed: {
      lists() {
        return this.$store.state.lists;
      },
      theBoardId() {
        return this.boardId;
      },
      tasks() {
        return this.$store.state.tasks[this.listId];
      }
    },
    components: {
      Task
    },
    methods: {
      deleteList() {
        this.$store.dispatch("deleteList", this.lists.id);
      },
      addTask() {
        let obj = {
          title: this.taskTitle,
          listId: this.listId
        };
        console.log(obj)
        this.$store.dispatch("addTask", obj);
      }
    }
  };
</script>

<style scoped>
  .list {
    display: flex;
    flex-direction: column;
    /* flex-wrap: column wrap; */
    color: white;
    background-color: gray;
  }
</style>