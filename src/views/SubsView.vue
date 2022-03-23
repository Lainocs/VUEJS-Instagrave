<template>
    <div class="home">
        <div class=" shadow w-3/4 h-screen mx-auto p-1 text-center">
            <div v-for="post in posts" :key="post.id"
                class="w-2/4 my-12 mx-auto h-32 bg-gray-200 flex flex-col items-center justify-center">
                <h3>{{post.user_id}}</h3>
                <p>{{post.text}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SubView',
        data() {
            return {
                posts: [],
            }
        },
        methods: {
            async getAllArticles() {
                const {
                    data,
                    error
                } = await this.$supabase
                    .from("posts")
                    .select("*")
                if (data) {
                    this.posts = data
                    this.getPostUser(data)
                } else {
                    console.log(error)
                }
            },
            async getPostUser(e) {
                const {
                    data,
                    error
                } = await this.$supabase
                    .from("users")
                    .select("*")
                if (data) {
                    e.forEach(post => {
                        data.forEach(user => {
                            if (post.user_id === user.id) {
                                post.user_id = user.email
                            }
                        })
                    })
                } else {
                    console.log(error)
                }
            },
        },
        created() {
            this.getAllArticles()
        },
    }
</script>