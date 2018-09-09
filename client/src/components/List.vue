<template>
  <div class="list">
    <!-- <h2>{{lists}}</h2> -->
    <p>this is task,vue</p>
    <form @submit.prevent="addTask">
      <input type="text" required v-model="taskTitle">
      <button @click="addTask">Add Task</button>
    </form>
    <div v-for="(value, key) in tasks[listId]" :key="key">
      <div v-for="task in value" :key="task._id" v-if="task.listId == lists._id">
        <task v-bind:taskData="task" />
      </div>
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
        return this.$store.state.lists
      },
      theBoardId() {
        return this.boardId;
      },
      tasks() {
        return this.$store.state.tasks;
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
          listId: this.listId,
        };
        this.$store.dispatch("addTask", obj);
      }
    },
 
  };
</script>

<style scoped>
  .list {
    color: white;
    background-color: gray;
  }
</style>