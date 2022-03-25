<template>
  <div class="home">
    <div class=" shadow w-3/4 min-h-screen mx-auto p-1 text-center">
      <div v-if="user_data.id" class="w-2/4 mx-auto">
        <label for="post" class="my-3 block text-xl font-medium text-gray-700"> New post </label>
        <div class="mt-1">
          <textarea v-model="form.post" id="post" name="post" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="My first post..."></textarea>
          <button @click="sendPost">Send</button>
        </div>
      </div>
      <div v-for="post in posts" :key="post.id" class="w-2/4 my-12 mx-auto h-32 flex flex-col items-center justify-center">
        <div class="flex justify-between w-full px-7">
          <h3>{{post.user_email}}</h3>
          <button v-if="user_data.id != post.user_id" @click="subAccount(post.user_id)">Sub to account</button>
        </div>
        <textarea v-if="user_data.id == post.user_id" type="text" v-model="post.text" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block min-h-full w-full sm:text-sm border border-gray-300 rounded-md" placeholder="My first post..."></textarea>
        <p v-else class="bg-gray-100 shadow-sm mt-1 block min-h-full w-full sm:text-sm border border-gray-300 rounded-md" placeholder="My first post...">{{post.text}}</p>
        <div v-if="post.user_id == user_data.id" class="flex gap-5">
          <button @click="deletePost(post)">Delete</button>
          |
          <button @click="editPost(post)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: 'FeedView',
  data() {
    return {
      posts: [],
      form: {
        post: "",
      }
    }
  },
  computed: {
    ...mapState('user', ['user_data']),
  },
  methods: {
    // POSTS
      async getAllPosts() {
        const { data, error } = await this.$supabase
          .from("posts")
          .select("*")
          .order('id', { ascending: false })
        if(data) {
          this.posts = data
          await this.getPostUser(data)
        } else {
          console.log(error)
        }
      },
      async getPostUser(e) {
        const { data, error } = await this.$supabase
          .from("users")
          .select("*")
        if(data) {
          e.map(post => {
            data.forEach(user => {
              if(post.user_id === user.id) {
                return post.user_email = user.email
              }
            })
          })
          const parsedPosts = JSON.parse(JSON.stringify(e))
          this.posts = parsedPosts
        } else {
          console.log(error)
        }
      },
      async sendPost() {
        const { data, error } = await this.$supabase
          .from("posts")
          .insert({
            user_id: this.user_data.id,
            text: this.form.post,
          })
        if(data) {
          this.getAllPosts()
          this.form.post = ""
        } else {
          console.log(error)
        }
      },
      async deletePost(e) {
        const { data, error } = await this.$supabase
          .from("posts")
          .delete()
          .match({
            id: e.id,
          })
          if(data) {
            this.getAllPosts()
          } else {
            console.log(error)
          }
      },
      async editPost(e) {
        const { data, error } = await this.$supabase
          .from("posts")
          .update({
            text: e.text,
          })
          .match({
            id: e.id,
          })
          if(data) {
            this.getAllPosts()
          } else {
            console.log(error)
          }
      },

      // SUB ACCOUNT
      async subAccount(e) {
        const { data } = await this.$supabase
          .from("subscriptions")
          .insert({
            subscriber: this.user_data.id,
            subscribed: e,
          })
          console.log(data)
      },
      async getUserRelations() {
          const { data, error } = await this.$supabase
              .from("subscriptions")
              .select()
              .eq("subscriber", this.user_data.id)
          if (data) {
              this.user_data.subscriptions = data
          } else {
              console.log(error)
          }
      },
  },
  created() {
    this.getAllPosts()
    if(this.user_data.email) {
      this.getUserRelations()
    }
  },
}
</script>
