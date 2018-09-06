<template>
  <div class="list">
    <h2>{{listData}}</h2>
    <button @click="deleteList">Delete</button>
    <form @submit.prevent="addTask">
      <input type="text" required v-model="taskTitle">
    </form>
    <div v-for="(value, key) in tasks" :key="key">
      <div v-for="task in value" :key="task._id" v-if="task.listId == listData._id">
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
    props: ["listData"],
    computed: {
      lists() {
        return this.$store.state.lists;
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
        this.$store.dispatch("deleteList", this.listData._id);
      },
      addTask() {
        let obj = {
          title: this.taskTitle,
          listId: this.listData._id,
        };
        this.$store.dispatch("addTask", obj);
      }
    },
    mounted() {
      this.$store.dispatch("getTasks", this.listData._id);
    }
  };
</script>

<style scoped>
  .list {
    color: gray;
    background-color: red;
  }
</style>