<template>
 <div class="Comment">
  Comments
  <form @submit.prevent="addComment">
   <input type="text" placeholder="title" v-model="newComment.title" required>
   <input type="text" placeholder="description" v-model="newComment.description">
   <button type="submit">Create Comment</button>
  </form>
  <div v-for="comment in comments" :key="comment._id">
   <router-link :to="{name: 'comment', params: {commentId: comment._id}}">{{comment.title}}</router-link>
   <button @click="deleteComment(comment._id)">Delete Comment</button>
  </div>
 </div>
</template>

<script>
 export default {
  name: 'Comment'
 }
</script>

<style scoped>
</style>