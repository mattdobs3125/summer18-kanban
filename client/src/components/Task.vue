<template>
    <div class="task">

        <p>{{taskData.title}}</p>
        <select @change="changeList">
            <option selected disabled>move to a new list</option>
            <option v-for="(value, key) in lists" :key="key" :value="key" v-if="value._id != taskData.listId">
                <h1>{{value.title}}</h1>
            </option>
        </select>
        <div>
            <div v-if="!showCommentForm">
                <button @click="showCommentForm = !showCommentForm">add comment</button>
            </div>
            <div v-else>
                <form @submit.prevent="addComment">
                    <input type="text" v-model="commentDescription" autofocus @focusout="showCommentForm = !showCommentForm">
                </form>
            </div>
        </div>
        <div v-for="(value, key) in comments" :key="key" class="comments">
            <div v-for="comment in value" :key="comment._id" v-if="comment.taskId == taskData._id">
                <h5>{{comment.description}}</h5>
                <button @click="deleteComment(comment._id)">Delete Comment</button>
            </div>
        </div>
        <button @click="deleteTask">delete task</button>
    </div>
</template>

<script>
    export default {
        name: "task",
        props: ["taskData"],
        data() {
            return {
                showCommentForm: false,
                commentDescription: ""
            };
        },
        computed: {
            tasks() {
                return this.$store.state.tasks;
            },
            comments() {
                return this.$store.state.comments;
            },
            lists() {
                return this.$store.state.lists;
            }
        },
        methods: {
            deleteTask() {
                this.$store.dispatch("deleteTask", {
                    taskId: this.taskData._id

                });
            },
            addComment() {
                let obj = {
                    description: this.commentDescription,
                    taskId: this.taskData._id,
                };
                this.$store.dispatch("addComment", obj);
                this.commentDescription = "";
                this.showCommentForm = false;
            },
            deleteComment(commentId) {
                let obj = {
                    commentId,
                    taskId: this.taskData._id
                };
                this.$store.dispatch("deleteComment", obj);
            },
            changeList(e) {
                let obj = {
                    listId: e.target.value,
                    oldList: this.taskData.listId,
                    taskId: this.taskData._id
                }
                console.log(obj)
                this.$store.dispatch('changeList', obj)
            }
        },
        mounted() {
            // this.$store.dispatch("getComments", this.taskData._id);
            this.$store.dispatch("getTasks")
        }
    };
</script>

<style>
    .task {
        display: flex;
        flex-direction: row;
        flex-wrap: column wrap;
        justify-content: center;
        background-color: lightgray;
    }

    .comments {
        background-color: white;
    }

    p {
        cursor: pointer;
    }
</style>