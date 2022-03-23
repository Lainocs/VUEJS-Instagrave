<template>
  <div class="home">
    <div class=" shadow w-3/4 h-screen mx-auto p-1 text-center">
      <div v-for="post in posts" :key="post.id" class="w-2/4 my-12 mx-auto h-32 bg-gray-200 flex flex-col items-center justify-center">
        <div class="flex justify-between w-full px-7">
          <h3>{{post.user_email}}</h3>
          <button @click="subAccount(post.user_id)">Sub to account</button>
        </div>
        <p>{{post.text}}</p>
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
    }
  },
  computed: {
    ...mapState('user', ['user_data']),
  },
  methods: {
      async getAllArticles() {
        const { data, error } = await this.$supabase
          .from("posts")
          .select("*")
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
      async subAccount(e) {
        console.log(e, this.user_data.id)
        const { data } = await this.$supabase
          .from("subscriptions")
          .insert({
            subscriber: this.user_data.id,
            subscribed: e,
          })
          console.log(data)
      },
  },
  created() {
    this.getAllArticles()
  },
}
</script>
